'use client';

import Link from 'next/link';

import { useUser } from '@/providers/user-provider';

import { Avatar } from './Avatar';
import { Dropdown, DropdownItem } from './Dropdown';

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
          {user && user.username === user.id && <Link href={`/welcome`}>Pick A Username!</Link>}
        </h3>
        {user ? (
          <Dropdown
            buttonChildren={
              <Avatar
                src={`/api/profile/${user.username}/avatar`}
                alt={`Profile picture for ${user.username}`}
              />
            }
          >
            <Link href={`/profile/${user.username}`}>
              <DropdownItem>Profile</DropdownItem>
            </Link>
            <Link href={`/profile/${user.username}`}>
              <DropdownItem>Games</DropdownItem>
            </Link>
            <Link href={'/logout'}>
              <DropdownItem>Logout</DropdownItem>
            </Link>
          </Dropdown>
        ) : (
          <h3 className="text-xl">
            <Link href={'/login'}>Login</Link>
          </h3>
        )}
      </div>
    </header>
  );
}
