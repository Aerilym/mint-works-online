'use client';

import { redirect } from 'next/navigation';

import { useUser } from '@/providers/user-provider';
import type { Profile } from '@/types/database';

import EditUser from '../profile/[username]/EditUser';

export default async function Page() {
  const { user } = useUser();

  if (!user) return redirect('/login');

  let profile = {} as Profile;
  try {
    const res = await fetch(`/api/user/${user.id}`);
    profile = (await res.json()) as Profile;
  } catch (error) {
    console.error(error);
    redirect(`/profile`);
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <EditUser profile={profile} blankUsername />
    </div>
  );
}
