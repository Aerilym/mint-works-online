'use client';

import type { MintWorksEngineState } from 'mint-works/dist/mint_works';
import type { Building, HandPlan } from 'mint-works/dist/plan';
import type { Turn } from 'mint-works/dist/turn';
import { useEffect, useState } from 'react';

import { Plan } from '@/app/plan/Plan';
import { Button } from '@/components';
import { useSupabase } from '@/providers/supabase-provider';
import { useUser } from '@/providers/user-provider';
import type { Game } from '@/types/database';

export default function LiveGame({ gameId, initialGame }: { gameId: string; initialGame: Game }) {
  const { user } = useUser();
  const { state, playerToTakeTurn, availableTurns } = useLiveGame(initialGame, gameId);

  const userPlayer = state.players?.find((player) => player.label === user?.username);

  const handleSendTurn = async (turn: Turn) => {
    const res = await fetch(`/api/turn/${gameId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        turn,
      }),
    });

    if (!res.ok) {
      console.error('Error sending turn!');
      console.error(res);
    }
  };

  return (
    <div>
      <h1>Game {gameId}</h1>
      <div className="flex w-screen flex-row gap-20">
        <div className="w-min">
          <h2>Plan Supply:</h2>
          <div className="flex h-80 flex-row gap-4">
            {state.planSupply?.map((plan) => (
              <Plan key={plan.name} plan={plan} />
            ))}
          </div>
          <h2>Current turn: {playerToTakeTurn}</h2>
          <h2>Available turns:</h2>
          <div className="flex max-w-2xl flex-col gap-2">
            {availableTurns.map((turn, i) => (
              <Button key={i} onClick={() => handleSendTurn(turn)}>
                {JSON.stringify(turn.action)}
              </Button>
            ))}
          </div>
        </div>
        <div>
          {user && userPlayer && (
            <div>
              <h2>Your neighbourhood:</h2>
              <div>
                <h3>{user.username}</h3>
                <h4>{userPlayer.tokens} tokens</h4>
                <Neighbourhood neighbourhood={userPlayer.neighbourhood} />
              </div>
            </div>
          )}
          <h2>Other neighbourhoods:</h2>
          <div>
            {state.players
              ?.filter((player) => player.label !== user?.username)
              .map((player) => (
                <div key={player.label}>
                  <h3>{player.label}</h3>
                  <h4>{player.tokens} tokens</h4>
                  <Neighbourhood neighbourhood={player.neighbourhood} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function useLiveGame(
  initialGame: Game,
  gameId: string
): {
  state: MintWorksEngineState;
  playerToTakeTurn?: string;
  availableTurns: Array<Turn>;
} {
  const { user } = useUser();
  const [state, setLiveState] = useState<MintWorksEngineState>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    JSON.parse(initialGame.state as any) as MintWorksEngineState
  );
  const [playerToTakeTurn, setPlayerToTakeTurn] = useState<string | undefined>();
  const [availableTurns, setAvailableTurns] = useState<Array<Turn>>([]);

  const { supabase } = useSupabase();

  useEffect(() => {
    const handleUpdateTurns = async () => {
      const res = await fetch(`/api/turn/${gameId}`, {
        method: 'GET',
      });

      const { valid_turns } = (await res.json()) as { valid_turns: Array<Turn> };

      if (!res.ok) throw new Error('Error fetching turns!');

      if (valid_turns.length === 0) throw new Error('No valid turns!');

      if (valid_turns[0].playerName === user?.username) {
        setAvailableTurns(valid_turns);
      } else {
        setAvailableTurns([]);
      }
    };
    const channel = supabase
      .channel('custom-filter-channel')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'game',
          filter: `game_id=eq.${gameId}`,
        },
        (payload) => {
          console.log('Change received!', payload);
          setLiveState(payload.new.state);
          setPlayerToTakeTurn(payload.new.player_to_take_turn);
          handleUpdateTurns();
        }
      )
      .subscribe();

    handleUpdateTurns();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [gameId, supabase, user?.username]);

  return {
    state,
    playerToTakeTurn,
    availableTurns,
  };
}

function Neighbourhood({
  neighbourhood,
}: {
  neighbourhood: {
    plans: Array<HandPlan>;
    buildings: Array<Building>;
  };
}) {
  return (
    <div className="flex flex-col">
      <div className="flex h-80 flex-row gap-4">
        {neighbourhood?.plans.map((plan) => (
          <Plan key={plan.name} plan={plan} />
        ))}
      </div>
      <div className="flex h-80 flex-row gap-4">
        {neighbourhood?.buildings.map((building) => (
          <Plan key={building.name} plan={building} />
        ))}
      </div>
    </div>
  );
}
