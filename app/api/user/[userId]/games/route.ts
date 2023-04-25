import { createRouteHandlerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { headers, cookies } from 'next/headers';

import type { Database } from '@/lib/database.types';

// do not cache this page
export const revalidate = 0;

export async function GET({ params }: { params: { userId: string } }) {
  const userId = params.userId;

  const supabase = createRouteHandlerSupabaseClient<Database>({
    headers,
    cookies,
  });

  const { data: games, error } = await supabase
    .from('lobbies')
    .select('game_id (game_id, player_to_take_turn)')
    .not('game_id', 'is', null)
    .or(`player_1.eq.${userId},player_2.eq.${userId},player_3.eq.${userId},player_4.eq.${userId}`);

  if (error) throw new Error(error.message);
  if (!games) throw new Error('No games found');

  // As there is a table join, game.game_id is actually the game object
  const gameList = games.map((game) => game.game_id);

  return new Response(JSON.stringify(gameList), {
    headers: {
      'content-type': 'application/json',
    },
  });
}
