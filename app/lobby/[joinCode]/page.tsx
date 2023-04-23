import { Button } from '@/components';

import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { headers, cookies } from 'next/headers';

import type { Database } from '@/lib/database.types';

interface PageParams {
  params: {
    joinCode: string;
  };
}

export default async function Page({ params }: PageParams) {
  const joinCode = params.joinCode.toLocaleUpperCase();

  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  });

  const { data: lobby, error } = await supabase
    .from('lobbies')
    .select('*')
    .eq('join_code', joinCode.toLowerCase())
    .single();

  return (
    <div className="flex flex-col gap-8">
      <h1 className="mt-2 text-2xl">
        Lobby <span className="rounded bg-red-500 p-2 shadow-xl">{joinCode}</span>
      </h1>
      {lobby ? JSON.stringify(lobby) : error ? error.message : 'Loading...'}
      <Button>Start Game</Button>
    </div>
  );
}
