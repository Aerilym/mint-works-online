import { createRouteHandlerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { cookies, headers } from 'next/headers';

import type { Database } from '@/lib/database.types';
import type { Lobby } from '@/types/database';

// do not cache this page
export const revalidate = 0;

interface GETOptions {
  params: {
    userId: string;
  };
}

export async function GET(request: Request, { params }: GETOptions) {
  const userId = params.userId;

  const lobbyList = await getLobbyList({ userId });

  return new Response(JSON.stringify(lobbyList), {
    headers: {
      'content-type': 'application/json',
    },
  });
}

/**
 * Get a list of games from supabase by userId
 * @param userId - The userId of the games to get
 * @returns The list of games
 */
export async function getLobbyList({ userId }: { userId: string }): Promise<Array<Partial<Lobby>>> {
  const supabase = createRouteHandlerSupabaseClient<Database>({
    headers,
    cookies,
  });

  const { data: lobbies, error } = await supabase
    .from('lobbies')
    .select('*')
    .or(`player_1.eq.${userId},player_2.eq.${userId},player_3.eq.${userId},player_4.eq.${userId}`);

  if (error) throw new Error(error.message);
  if (!lobbies) throw new Error('No lobbies found');

  return lobbies as Array<Partial<Lobby>>;
}
