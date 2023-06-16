import { createRouteHandlerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import Hashids from 'hashids';
import { cookies, headers } from 'next/headers';

import type { Database } from '@/lib/database.types';

// do not cache this page
export const revalidate = 0;

export async function POST(request: Request) {
  const body = await request.json();

  const { user_id } = body;

  const joinCode = await createLobby({ userId: user_id });

  return new Response(JSON.stringify({ joinCode }), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function createLobby({ userId }: { userId: string }): Promise<string> {
  const supabase = createRouteHandlerSupabaseClient<Database>({
    headers,
    cookies,
  });

  const row = {
    player_1: userId,
  };

  const { data: lobby, error: createLobbyError } = await supabase
    .from('lobbies')
    .insert([row])
    .select('*')
    .single();

  if (createLobbyError) throw new Error(createLobbyError.message);
  if (!lobby) throw new Error('No lobby data returned');

  //pad lobby id to 6 digits
  const paddedId = lobby.id.toString().padStart(6, '0');

  const hashids = new Hashids('Mint Works', 6, 'abcdefghjklmnopqrstuvwxyz23456789');
  const joinCode = hashids.encode('69', paddedId);

  const { error: lobbyUpdateError } = await supabase
    .from('lobbies')
    .update({ join_code: joinCode })
    .eq('id', lobby.id);

  if (lobbyUpdateError) throw new Error(lobbyUpdateError.message);

  return joinCode;
}
