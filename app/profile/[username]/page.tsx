import { redirect } from 'next/navigation';
import type { Profile } from '@/app/types/database';
import UserGames from './UserGames';
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { headers, cookies } from 'next/headers';
import { getProfileByUsername } from '@/app/api/profile/[username]/route';
import type { Database } from '@/lib/database.types';
import UserProfile from './UserProfile';
import { useUser } from '@/app/user-provider';

interface PageParams {
  params: {
    username: string;
  };
}

export default async function Page({ params }: PageParams) {
  const username = params.username;

  // TODO: change this for some sort of 404 profile not found or something
  let profile = {} as Profile;
  try {
    profile = await getProfileByUsername({ username });
  } catch (error) {
    console.error(error);
    redirect(`/profile`);
  }

  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  });

  return (
    <div className="flex flex-col items-center gap-8">
      {profile && <UserProfile profile={profile} />}
      {/* @ts-expect-error Async Server Component */}
      {profile.id && <UserGames userId={profile.id} />}
    </div>
  );
}
