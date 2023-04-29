'use client';

import Link from 'next/link';

import { useUser } from '@/app/user-provider';

export default function Header() {
  const { user } = useUser();

  return (
    <header className="flex h-14 w-full justify-center bg-cyan-300 p-2">
      <div className="flex h-full w-full max-w-3xl items-center gap-4">
        <h2 className="grow text-2xl max-sm:hidden">
          <Link href={'/'}>Mint Works Online</Link>
        </h2>
        <h2 className="grow text-2xl sm:hidden">
          <Link href={'/'}>Mint</Link>
        </h2>

        <h3 className="text-xl">
          <Link href={'/game'}>Play</Link>
        </h3>
        <h3 className="text-xl">
          <Link href={'/'}>Info</Link>
        </h3>
        <h3 className="text-xl">
          {user ? (
            <Link href={`/profile/${user.username}`}>{user.username}</Link>
          ) : (
            <Link href={'/login'}>Login</Link>
          )}
        </h3>
        {user && (
          <h3 className="text-xl">
            <Link href={'/logout'}>Logout</Link>
          </h3>
        )}
      </div>
    </header>
  );
}
