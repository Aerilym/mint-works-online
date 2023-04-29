'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useSupabase } from '@/app/supabase-provider';
import { Button } from '@/components';

import LiveLobby from './LiveLobby';

interface PageParams {
  params: {
    joinCode: string;
  };
}

export default async function Page({ params }: PageParams) {
  const joinCode = params.joinCode.toLocaleUpperCase();

  const router = useRouter();

  const { supabase } = useSupabase();

  const { data: lobby, error } = await supabase
    .from('lobbies')
    .select('*')
    .eq('join_code', joinCode.toLowerCase())
    .single();

  if (error) console.error(error);

  const user = await supabase.auth.getUser();
  const userId = user.data.user?.id;

  const isLobbyOwner = lobby?.player_1 === userId;

  const handleStartGame = async () => {
    const res = await fetch(`/api/game`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lobby_id: lobby?.id,
      }),
    });

    const { game_id } = await res.json();

    router.push(`/game/${game_id}`);
  };

  const handleJoinGame = async () => {
    const { error } = await supabase
      .from('lobbies')
      .update({
        player_2: userId,
      })
      .eq('id', lobby?.id);
    if (error) console.error(error);
  };

  return (
    <div className="flex flex-col gap-8">
      <h1 className="mt-2 text-2xl">
        Lobby <span className="rounded bg-red-500 p-2 shadow-xl">{joinCode}</span>
      </h1>

      {lobby && <LiveLobby lobbyId={lobby.id} initialLobby={lobby} />}

      {userId ? (
        isLobbyOwner ? (
          <Button disabled>Join Game</Button>
        ) : (
          <Button onClick={handleJoinGame}>Join Game</Button>
        )
      ) : (
        <Link href={'/login'}>
          <Button>Login to Join</Button>
        </Link>
      )}
      {isLobbyOwner ? (
        <Button onClick={handleStartGame}>Start Game</Button>
      ) : (
        <Button disabled>Owner must start game</Button>
      )}
    </div>
  );
}
