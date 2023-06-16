'use client';

import Link from 'next/link';

import { Button } from '@/components';
import { useSupabase } from '@/providers/supabase-provider';

import LiveLobby from './LiveLobby';

interface PageParams {
  params: {
    joinCode: string;
  };
}

export default async function Page({ params }: PageParams) {
  const joinCode = params.joinCode.toLocaleUpperCase();

  const { supabase } = useSupabase();

  const { data: lobby, error } = await supabase
    .from('lobbies')
    .select('*')
    .eq('join_code', joinCode.toLowerCase())
    .single();

  if (error) console.error(error);

  if (!lobby)
    return (
      <div>
        <div>Invalid join code {joinCode}</div>
        <Link href="/game">
          <Button>Enter a new code</Button>
        </Link>
      </div>
    );

  return (
    <div className="flex flex-col gap-8">
      <h1 className="mt-2 text-2xl">
        Lobby <span className="rounded bg-red-500 p-2 shadow-xl">{joinCode}</span>
      </h1>

      {lobby && <LiveLobby lobbyId={lobby.id} initialLobby={lobby} />}
    </div>
  );
}
