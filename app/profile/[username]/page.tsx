import { redirect } from 'next/navigation';

import { getProfileByUsername } from '@/app/api/profile/[username]/route';
import type { Profile } from '@/types/database';

import UserGames from './UserGames';
import UserProfile from './UserProfile';

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

  return (
    <div className="flex flex-col items-center gap-8">
      {profile && <UserProfile profile={profile} />}
      {/* @ts-expect-error Async Server Component */}
      {profile.id && <UserGames userId={profile.id} />}
    </div>
  );
}
