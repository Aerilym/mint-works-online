import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { cookies, headers } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { createLobby } from '@/app/api/lobby/route';
import { Button } from '@/components';
import type { Database } from '@/lib/database.types';

export default async function Page() {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  });

  const user = await supabase.auth.getUser();

  const userId = user.data.user?.id;

  if (!userId) redirect('/login');

  const joinCode = await createLobby({ userId });

  return (
    <div>
      <h1>Game Created</h1>
      <Link href={`/lobby/${joinCode}`}>
        <Button>Go to lobby</Button>
      </Link>
    </div>
  );
}
