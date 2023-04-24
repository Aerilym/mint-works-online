'use client';

import { useEffect, useState } from 'react';

import { useSupabase } from '@/app/supabase-provider';
import Link from 'next/link';
import { Button } from '@/components';
import type { Lobby } from '@/app/types/database';

export default function LiveLobby({
  lobbyId,
  initialLobby,
}: {
  lobbyId: number;
  initialLobby: Lobby;
}) {
  const liveLobby = useLiveLobby(initialLobby, lobbyId);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <span className="text-lg">Join Code</span>
        <span>{liveLobby.join_code}</span>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-lg">Player 1</span>
        <span>{liveLobby.player_1}</span>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-lg">Player 2</span>
        <span>{liveLobby.player_2}</span>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-lg">Player 3</span>
        <span>{liveLobby.player_3}</span>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-lg">Player 4</span>
        <span>{liveLobby.player_4}</span>
      </div>
      {liveLobby.game_id && (
        <Link
          href={{
            pathname: '/game/[gameId]',
            query: { gameId: liveLobby.game_id },
          }}
        >
          <Button>Game in progress... Click to join</Button>
        </Link>
      )}
    </div>
  );
}

function useLiveLobby(initialLobby: Lobby, lobbyId: number) {
  const [liveLobby, setLiveLobby] = useState<Lobby>(initialLobby);

  const { supabase } = useSupabase();

  useEffect(() => {
    const channel = supabase
      .channel('custom-filter-channel')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'lobbies',
          filter: `id=eq.${lobbyId}`,
        },
        (payload) => {
          console.log('Change received!', payload);
          setLiveLobby(payload.new as Lobby);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [lobbyId, supabase]);

  return liveLobby;
}
