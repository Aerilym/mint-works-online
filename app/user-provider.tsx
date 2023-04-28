'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import { useSupabase } from './supabase-provider';
import { Profile } from './types/database';

interface UserData {
  id: string;
  username: string;
}

type UserContext = {
  user: UserData | null;
};

const Context = createContext<UserContext | undefined>(undefined);

export default function UserProvider({ children }: { children: React.ReactNode }) {
  const { supabase } = useSupabase();
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' || event === 'USER_UPDATED' || event === 'TOKEN_REFRESHED') {
        const userId = session?.user.id;

        if (!userId) throw new Error('No user id found!');

        const res = await fetch(`/api/user/${userId}`);
        const profile = (await res.json()) as Profile;

        if (!profile) throw new Error('No profile found!');

        setUser({
          id: userId,
          username: profile.username ?? userId,
        });
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <Context.Provider value={{ user }}>
      <>{children}</>
    </Context.Provider>
  );
}

export const useUser = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error('useUser must be used inside UserProvider');
  }

  return context;
};
