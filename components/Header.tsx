'use client';

import { useSupabase } from '@/app/supabase-provider';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Database } from '@/lib/database.types';

export default function Header() {
  const [profile, setProfile] = useState<Database['public']['Tables']['profiles']['Row']>();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const { supabase } = useSupabase();

  useEffect(() => {
    supabase.auth.getUser().then((user) => {
      if (!user.data.user?.id) return;
      setLoggedIn(true);
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
    <header className="flex h-14 w-full items-center justify-around bg-cyan-300 p-2">
      <h2 className="text-2xl">
        <Link href={'/'}>Mint Works Online</Link>
      </h2>
      <div className="flex flex-row">
        <h3 className="text-xl">
          <Link href={'/game'}>Play</Link>
        </h3>
        <h3 className="text-xl">
          <Link href={'/'}>Info</Link>
        </h3>
      </div>
      <div className="flex flex-row">
        <h3 className="text-xl">
          {loggedIn ? profile?.username : <Link href={'/login'}>Login</Link>}
        </h3>
      </div>
    </header>
  );
}
