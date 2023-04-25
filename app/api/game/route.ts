import { createRouteHandlerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import { headers, cookies } from 'next/headers';

import type { Database } from '@/lib/database.types';
import { MintWorks } from 'mint-works';
import { Turn } from 'mint-works/dist/turn';
import { redirect } from 'next/navigation';

// do not cache this page
export const revalidate = 0;

export async function POST(request: Request) {
  const body = await request.json();

  const { lobby_id: id } = body;

  const supabase = createRouteHandlerSupabaseClient<Database>({
    headers,
    cookies,
  });

  const engine = new MintWorks();

  const { data: lobby, error: lobbyError } = await supabase
    .from('lobbies')
    .select('*')
    .eq('id', id)
    .single();

  if (lobbyError) throw new Error(lobbyError.message);
  if (!lobby) throw new Error('No lobby data returned');

  const playerIds = [];

  if (lobby.player_1) playerIds.push(lobby.player_1);
  if (lobby.player_2) playerIds.push(lobby.player_2);
  if (lobby.player_3) playerIds.push(lobby.player_3);
  if (lobby.player_4) playerIds.push(lobby.player_4);

  const { data: players, error: playersError } = await supabase
    .from('profiles')
    .select('*')
    .in('id', playerIds);

  if (playersError) throw new Error(playersError.message);
  if (!players) throw new Error('No player data returned');

  players.forEach((player, index) => {
    const enginePlayer: Parameters<MintWorks['addPlayer']> = [
      {
        name: player.username ?? `Player ${index + 1}`,
        age: 21,
        tokens: 3,
        interactionHooks: {
          getTurnFromInterface(turns: Array<Turn>) {
            return new Promise((resolve) => resolve(turns[0]));
          },
          getPlayerSelectionFromInterface(players: Array<string>) {
            return new Promise((resolve) => resolve(players[0]));
          },
        },
      },
    ];
    engine.addPlayer(...enginePlayer);
  });

  engine.createGame();

  if (!engine.gameEngine) throw new Error('No game engine found');

  const state = engine.gameEngine.getEngineState();

  const { data: game, error: gameError } = await supabase
    .from('game')
    .insert({
      state: JSON.stringify(state),
      player_to_take_turn: state.playerToTakeTurn ?? state.startingPlayerToken,
    })
    .select('game_id')
    .single();

  if (gameError) throw new Error(gameError.message);
  if (!game) throw new Error('No game data returned from creation');
  if (!game.game_id) throw new Error('No game ID returned from creation');

  const { error: updateLobbyError } = await supabase
    .from('lobbies')
    .update({
      game_id: game.game_id,
    })
    .eq('id', id);

  if (updateLobbyError) throw new Error(updateLobbyError.message);

  return new Response(
    JSON.stringify({
      game_id: game.game_id,
    }),
    {
      headers: {
        'content-type': 'application/json',
      },
    }
  );
}
