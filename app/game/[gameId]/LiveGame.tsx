'use client';

import { useEffect, useState } from 'react';

import { useSupabase } from '@/app/supabase-provider';
import { Turn } from 'mint-works/dist/turn';
import type { Game } from '@/app/types/database';

export default function LiveGame({
  gameId,
  initialGame,
  playerName,
}: {
  gameId: string;
  initialGame: Game;
  playerName: string;
}) {
  const { liveGame, availableTurns } = useLiveGame(initialGame, gameId, playerName);

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
      <h2>Current turn: {liveGame.player_to_take_turn}</h2>
      <h2>Available turns:</h2>
      <ul>
        {availableTurns.map((turn, i) => (
          <li key={i}>
            <button onClick={() => handleSendTurn(turn)}>{JSON.stringify(turn.action)}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function useLiveGame(initialGame: Game, gameId: string, playerName: string) {
  const [liveGame, setLiveGame] = useState<Game>(initialGame);
  const [availableTurns, setAvailableTurns] = useState<Array<Turn>>([]);

  const { supabase } = useSupabase();

  useEffect(() => {
    const handleUpdateTurns = async () => {
      const res = await fetch(`/api/turn/${gameId}`, {
        method: 'GET',
      });

      const { valid_turns } = await res.json();

      setAvailableTurns(valid_turns);
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
          setLiveGame(payload.new as Game);

          if (payload.new.player_to_take_turn === playerName) {
            handleUpdateTurns();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [gameId, playerName, supabase]);

  return { liveGame, availableTurns };
}
