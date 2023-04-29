'use client';

import { User } from '@supabase/supabase-js';
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
    const handleUserUpdate = async (user: User) => {
      const res = await fetch(`/api/user/${user.id}`);
      const profile = (await res.json()) as Profile;

      if (!profile) throw new Error('No profile found!');

      setUser({
        id: user.id,
        username: profile.username ?? user.id,
      });
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' || event === 'USER_UPDATED' || event === 'TOKEN_REFRESHED') {
        if (!session) throw new Error('No session found!');
        handleUserUpdate(session.user);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    supabase.auth.getUser().then(({ data }) => {
      if (data.user) return handleUserUpdate(data.user);
      return setUser(null);
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
