import { Button } from '@/components';

import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { headers, cookies } from 'next/headers';

import type { Database } from '@/lib/database.types';
import LiveGame from './LiveGame';

interface PageParams {
  params: {
    gameId: string;
  };
}

export default async function Page({ params }: PageParams) {
  const gameId = params.gameId;

  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  });

  const user = await supabase.auth.getUser();

  const userId = user.data.user?.id;

  const { data: game, error } = await supabase
    .from('game')
    .select('*')
    .eq('game_id', gameId)
    .single();

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  return (
    <div className="flex flex-col gap-8">
      <h1 className="mt-2 text-2xl">
        Game <span className="rounded bg-red-500 p-2 shadow-xl">{gameId}</span>
      </h1>
      {game && (
        <LiveGame gameId={gameId} initialGame={game} playerName={profile?.username ?? 'Guest'} />
      )}
    </div>
  );
}
