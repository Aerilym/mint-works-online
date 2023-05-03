'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components';
import { ProfileCard } from '@/components/ProfileCard';
import { useSupabase } from '@/providers/supabase-provider';
import { useUser } from '@/providers/user-provider';
import type { Lobby, Profile } from '@/types/database';

export default function LiveLobby({
  lobbyId,
  initialLobby,
}: {
  lobbyId: number;
  initialLobby: Lobby;
}) {
  const { user } = useUser();
  const router = useRouter();
  const { liveLobby, player_1, player_2, player_3, player_4 } = useLiveLobby(initialLobby, lobbyId);

  const isLobbyOwner = liveLobby.player_1 === user?.id;

  const handleStartGame = async () => {
    const res = await fetch(`/api/game`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lobby_id: liveLobby.id,
      }),
    });

    const { game_id } = await res.json();

    router.push(`/game/${game_id}`);
  };

  const handleJoinLobby = async () => {
    if (!user) return console.error('User not logged in');

    const res = await fetch(`/api/lobby/${liveLobby.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: user?.id,
      }),
    });

    if (!res.ok) console.error(res.statusText);
  };

  const handleDeleteLobby = async () => {
    if (!user) return console.error('User not logged in');
    if (!isLobbyOwner) return console.error('User is not lobby owner');

    const res = await fetch(`/api/lobby/${liveLobby.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: user?.id,
      }),
    });

    if (!res.ok) console.error(res.statusText);
  };

  const handleOpenToPublic = async () => {
    if (!user) return console.error('User not logged in');
    if (!isLobbyOwner) return console.error('User is not lobby owner');

    const res = await fetch(`/api/lobby/${liveLobby.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        announce: true,
      }),
    });

    if (!res.ok) console.error(res.statusText);
  };

  const handleCloseToPublic = async () => {
    if (!user) return console.error('User not logged in');
    if (!isLobbyOwner) return console.error('User is not lobby owner');

    const res = await fetch(`/api/lobby/${liveLobby.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        announce: false,
      }),
    });

    if (!res.ok) console.error(res.statusText);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <span className="text-lg">Join Code</span>
        <span>{liveLobby.join_code}</span>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-lg">Player 1</span>
        {player_1 ? <ProfileCard profile={player_1} /> : <span>Waiting for player 1...</span>}
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-lg">Player 2</span>
        {player_2 ? <ProfileCard profile={player_2} /> : <span>Waiting for player 2...</span>}
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-lg">Player 3</span>
        {player_3 ? <ProfileCard profile={player_3} /> : <span>Waiting for player 3...</span>}
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-lg">Player 4</span>
        {player_4 ? <ProfileCard profile={player_4} /> : <span>Waiting for player 4...</span>}
      </div>
      <div>
        {user && isLobbyOwner && liveLobby.announce ? (
          <Button onClick={handleCloseToPublic}>Close to Public</Button>
        ) : (
          <Button onClick={handleOpenToPublic}>Open to Public</Button>
        )}

        {user ? (
          isLobbyOwner ? (
            <Button className="bg-red-500" onClick={handleDeleteLobby}>
              Delete Lobby
            </Button>
          ) : (
            <Button onClick={handleJoinLobby}>Join Lobby</Button>
          )
        ) : (
          <Link href={'/login'}>
            <Button>Login to Join</Button>
          </Link>
        )}
        {isLobbyOwner ? (
          <Button onClick={handleStartGame}>Start Game</Button>
        ) : (
          <Button className="bg-opacity-50" disabled>
            Owner must start game
          </Button>
        )}
      </div>
      {liveLobby.game_id && (
        <Link href={`/game/${liveLobby.game_id}`}>
          <Button>Game in progress... Click to join</Button>
        </Link>
      )}
    </div>
  );
}

function useLiveLobby(initialLobby: Lobby, lobbyId: number) {
  const [liveLobby, setLiveLobby] = useState<Lobby>(initialLobby);
  const [player_1, setPlayer_1] = useState<Profile>();
  const [player_2, setPlayer_2] = useState<Profile>();
  const [player_3, setPlayer_3] = useState<Profile>();
  const [player_4, setPlayer_4] = useState<Profile>();

  const { supabase } = useSupabase();

  useEffect(() => {
    const handlePlayerUpdate = async (lobby: Lobby) => {
      const profileUpdates = [];
      if (lobby.player_1 !== player_1?.id) {
        profileUpdates.push(lobby.player_1);
      } else if (lobby.player_2 !== player_2?.id) {
        profileUpdates.push(lobby.player_2);
      } else if (lobby.player_3 !== player_3?.id) {
        profileUpdates.push(lobby.player_3);
      } else if (lobby.player_4 !== player_4?.id) {
        profileUpdates.push(lobby.player_4);
      }

      if (profileUpdates.length === 0) return;

      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .in('id', profileUpdates);

      if (error) console.error(error);

      profiles?.forEach((profile) => {
        if (profile.id === lobby.player_1) {
          setPlayer_1(profile);
        } else if (profile.id === lobby.player_2) {
          setPlayer_2(profile);
        } else if (profile.id === lobby.player_3) {
          setPlayer_3(profile);
        } else if (profile.id === lobby.player_4) {
          setPlayer_4(profile);
        }
      });
    };

    handlePlayerUpdate(liveLobby);

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
          handlePlayerUpdate(payload.new as Lobby);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [liveLobby, lobbyId, player_1?.id, player_2?.id, player_3?.id, player_4?.id, supabase]);

  return { liveLobby, player_1, player_2, player_3, player_4 };
}
