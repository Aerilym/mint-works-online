import { createRouteHandlerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { cookies, headers } from 'next/headers';

import type { Database } from '@/lib/database.types';
import type { Game } from '@/types/database';

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
export async function getGameList({ userId }: { userId: string }) {
  const supabase = createRouteHandlerSupabaseClient<Database>({
    headers,
    cookies,
  });

  const { data: lobbyJoin, error } = await supabase
    .from('lobbies')
    .select(
      'player_1 (username), player_2 (username), player_3 (username), player_4 (username), game_id (game_id, state, player_to_take_turn)'
    )
    .not('game_id', 'is', null)
    .or(`player_1.eq.${userId},player_2.eq.${userId},player_3.eq.${userId},player_4.eq.${userId}`);

  if (error) throw new Error(error.message);
  if (!lobbyJoin) throw new Error('No games found');

  // As there is a table join, game.game_id is actually the game object
  const gameList = lobbyJoin.map((join) => {
    const playerList = [join.player_1, join.player_2, join.player_3, join.player_4]
      .filter(Boolean)
      .filter(
        (player) => player && 'username' in player && typeof player.username === 'string'
      ) as { username: string }[];
    return {
      game: join.game_id as Partial<Game>,
      players: playerList.map((player) => player.username),
    };
  });

  return gameList;
}
