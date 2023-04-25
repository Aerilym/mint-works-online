import { redirect } from 'next/navigation';

import type { Profile } from '@/app/types/database';
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { headers, cookies } from 'next/headers';
import { GET as profileGet } from '@/app/api/user/[userId]/route';
import type { Database } from '@/lib/database.types';

async function getProfile({ userId }: { userId: string }): Promise<Profile> {
  const res = await profileGet({ params: { userId } });

  if (!res.ok) throw new Error('Failed to fetch profile');

  return (await res.json()) as Profile;
}
export default async function Page() {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  });

  const user = await supabase.auth.getUser();

  const userId = user.data.user?.id;

  if (!userId) redirect('/login');

  const profile = await getProfile({ userId });

  const username = profile.username;
  redirect(`/profile/${username}`);
}
