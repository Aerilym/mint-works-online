'use client';

import { useSupabase } from '@/app/supabase-provider';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Database } from '@/lib/database.types';

export default function Header() {
  type Profile = Database['public']['Tables']['profiles']['Row'];

  const [profile, setProfile] = useState<Profile>();
  const { supabase } = useSupabase();

  useEffect(() => {
    supabase.auth.getUser().then((user) => {
      if (!user.data.user?.id) return;
      supabase
        .from('profiles')
        .select('*')
        .eq('id', user.data.user?.id)
        .single()
        .then(({ data }) => {
          if (!data) return;
          setProfile(data);
        });
    });
  }, [supabase]);

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
        <h3 className="text-xl">{profile?.username ?? <Link href={'/login'}>Login</Link>}</h3>
      </div>
    </header>
  );
}
