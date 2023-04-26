import { createRouteHandlerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { headers, cookies } from 'next/headers';

import type { Database } from '@/lib/database.types';
import { Game } from '@/app/types/database';

// do not cache this page
export const revalidate = 0;

interface GETOptions {
  params: {
    userId: string;
  };
}

export async function GET(request: Request, { params }: GETOptions) {
  const userId = params.userId;

  const gameList = await getGameList({ userId });

  return new Response(JSON.stringify(gameList), {
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
export async function getGameList({ userId }: { userId: string }): Promise<Array<Partial<Game>>> {
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

  return gameList as Array<Partial<Game>>;
}
