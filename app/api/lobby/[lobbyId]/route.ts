import { createRouteHandlerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { cookies, headers } from 'next/headers';

import type { Database } from '@/lib/database.types';
import { Lobby } from '@/types/database';

interface GETOptions {
  params: {
    lobbyId: string;
  };
}

interface DELETEOptions {
  params: {
    lobbyId: string;
  };
}

interface PUTOptions {
  params: {
    lobbyId: string;
  };
}

interface PATCHOptions {
  params: {
    lobbyId: string;
  };
}

// do not cache this page
export const revalidate = 0;

export async function GET(request: Request, { params }: GETOptions) {
  const lobbyId = params.lobbyId;

  const lobby = await singleGetLobby({ lobbyId });

  return new Response(JSON.stringify(lobby), {
    headers: {
      'content-type': 'application/json',
    },
  });
}

export async function DELETE(request: Request, { params }: DELETEOptions) {
  const lobbyId = params.lobbyId;

  try {
    await deleteLobby({ lobbyId });
  } catch (error: unknown) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      headers: {
        'content-type': 'application/json',
      },
      status: 400,
      statusText: (error as Error).message,
    });
  }

  return new Response('Lobby Joined', {
    headers: {
      'content-type': 'application/json',
    },
  });
}

export async function PUT(request: Request, { params }: PUTOptions) {
  const lobbyId = params.lobbyId;

  const { user_id } = await request.json();

  try {
    await joinLobby({ lobbyId, userId: user_id });
  } catch (error: unknown) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      headers: {
        'content-type': 'application/json',
      },
      status: 400,
      statusText: (error as Error).message,
    });
  }

  return new Response('Lobby Joined', {
    headers: {
      'content-type': 'application/json',
    },
  });
}

export async function PATCH(request: Request, { params }: PATCHOptions) {
  const lobbyId = params.lobbyId;

  const { announce } = await request.json();

  try {
    await changeLobbyAnnounce({ lobbyId, announce });
  } catch (error: unknown) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      headers: {
        'content-type': 'application/json',
      },
      status: 400,
      statusText: (error as Error).message,
    });
  }

  return new Response('Lobby made public', {
    headers: {
      'content-type': 'application/json',
    },
  });
}

async function singleGetLobby({ lobbyId }: { lobbyId: string }): Promise<Lobby> {
  const supabase = createRouteHandlerSupabaseClient<Database>({
    headers,
    cookies,
  });

  const { data: lobby, error } = await supabase.from('lobbies').select().eq('id', lobbyId).single();

  if (error) throw new Error(error.message);

  return lobby;
}

async function deleteLobby({ lobbyId }: { lobbyId: string }): Promise<void> {
  const supabase = createRouteHandlerSupabaseClient<Database>({
    headers,
    cookies,
  });

  const { error } = await supabase.from('lobbies').delete().eq('id', lobbyId);

  if (error) throw new Error(error.message);
}

type PlayerPosition = Lobby['player_1'] | Lobby['player_2'] | Lobby['player_3'] | Lobby['player_4'];

async function addUserToLobby({
  lobbyId,
  userId,
  playerPosition,
}: {
  lobbyId: string;
  userId: string;
  playerPosition: PlayerPosition;
}): Promise<void> {
  const supabase = createRouteHandlerSupabaseClient<Database>({
    headers,
    cookies,
  });
  const { error } = await supabase
    .from('lobbies')
    .update({
      [playerPosition as keyof Lobby]: userId,
    })
    .eq('id', lobbyId);

  if (error) throw new Error(error.message);
}

async function joinLobby({ lobbyId, userId }: { lobbyId: string; userId: string }): Promise<void> {
  const lobby = await singleGetLobby({ lobbyId });

  const emptyPlayerPosition = ['player_1', 'player_2', 'player_3', 'player_4'].find(
    (playerPosition) => !lobby[playerPosition as keyof Lobby]
  );

  if (!emptyPlayerPosition) throw new Error('Lobby is full');

  await addUserToLobby({ lobbyId, userId, playerPosition: emptyPlayerPosition });
}

async function changeLobbyAnnounce({
  lobbyId,
  announce,
}: {
  lobbyId: string;
  announce: boolean;
}): Promise<void> {
  const supabase = createRouteHandlerSupabaseClient<Database>({
    headers,
    cookies,
  });
  const { error } = await supabase
    .from('lobbies')
    .update({
      announce,
    })
    .eq('id', lobbyId);

  if (error) throw new Error(error.message);
}
