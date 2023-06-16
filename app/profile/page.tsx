import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { getProfileById } from '@/app/api/user/[userId]/route';
import type { Database } from '@/lib/database.types';

export default async function Page() {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  });

  const user = await supabase.auth.getUser();

  const userId = user.data.user?.id;

  if (!userId) redirect('/login');

  const profile = await getProfileById({ userId });

  const username = profile.username;
  redirect(`/profile/${username}`);
}
