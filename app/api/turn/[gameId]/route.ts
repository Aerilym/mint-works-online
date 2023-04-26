import { createRouteHandlerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { headers, cookies } from 'next/headers';

import type { Database } from '@/lib/database.types';
import { MintWorksStateManager, MintWorksTurnFactory } from 'mint-works';
import { MintWorksEngineState } from 'mint-works/dist/mint_works';

// do not cache this page
export const revalidate = 0;

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { gameId: string };
  }
) {
  const gameId = params.gameId;

  const supabase = createRouteHandlerSupabaseClient<Database>({
    headers,
    cookies,
  });

  const { data: game, error } = await supabase
    .from('game')
    .select('state')
    .eq('game_id', gameId)
    .single();

  if (error) throw new Error(error.message);
  if (!game) throw new Error('No game data found');

  // TODO: This works but is throwing a type error. Need to investigate and fix.
  // @ts-ignore
  const state = JSON.parse(game.state);

  const turnFactory = new MintWorksTurnFactory({
    state,
  });

  const turns = turnFactory.getTurns();

  return new Response(
    JSON.stringify({
      valid_turns: turns,
    }),
    {
      headers: {
        'content-type': 'application/json',
      },
    }
  );
}

export async function PUT(
  request: Request,
  {
    params,
  }: {
    params: { gameId: string };
  }
) {
  const gameId = params.gameId;

  const { turn } = await request.json();

  const supabase = createRouteHandlerSupabaseClient<Database>({
    headers,
    cookies,
  });

  const { data: game, error: getGameError } = await supabase
    .from('game')
    .select('state')
    .eq('game_id', gameId)
    .single();

  if (getGameError) throw new Error(getGameError.message);
  if (!game) throw new Error('No game data found');

  // TODO: This works but is throwing a type error. Need to investigate and fix.
  // @ts-ignore
  const state = JSON.parse(game.state);

  const stateManager = new MintWorksStateManager({
    state,
    turn,
  });

  const updatedState = await stateManager.simulateTurn();

  const { error: updateGameError } = await supabase
    .from('game')
    .update({ state: JSON.stringify(updatedState), player_to_take_turn: state.playerToTakeTurn })
    .eq('game_id', gameId);

  if (updateGameError) throw new Error(updateGameError.message);

  return new Response('Turn applied successfully!');
}
