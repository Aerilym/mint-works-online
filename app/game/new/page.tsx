import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import Hashids from 'hashids';
import { cookies, headers } from 'next/headers';
import Link from 'next/link';

import { Button } from '@/components';
import type { Database } from '@/lib/database.types';

export default async function Page() {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  });

  const user = await supabase.auth.getUser();

  const userId = user.data.user?.id;

  const row = {
    player_1: userId,
  };

  const { data: lobby, error } = await supabase.from('lobbies').insert([row]).select('*').single();

  let joinCode = '';
  if (lobby) {
    //pad lobby id to 6 digits
    const paddedId = lobby.id.toString().padStart(6, '0');

    const hashids = new Hashids('Mint Works', 6, 'abcdefghikmnopqrstuvwxyz23456789');
    joinCode = hashids.encode('69', paddedId);

    await supabase.from('lobbies').update({ join_code: joinCode }).eq('id', lobby.id);
  }

  return (
    <div>
      <div>{userId ? userId : 'Loading...'}</div>
      <div>{row ? JSON.stringify(row) : 'Loading...'}</div>
      <div>{lobby ? JSON.stringify(lobby) : error ? error.message : 'Loading...'}</div>
      <Link href={`/lobby/${joinCode}`}>
        <Button>Go to lobby</Button>
      </Link>
    </div>
  );
}
