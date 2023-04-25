'use client';

import { Auth } from '@supabase/auth-ui-react';
import { useSupabase } from '@/app/supabase-provider';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const { supabase } = useSupabase();

  supabase.auth.onAuthStateChange((event) => {
    if (event === 'SIGNED_IN') {
      router.push('/profile');
    }
  });

  return (
    <div className="flex flex-col">
      <h1 className="mt-2 self-center text-2xl">Login</h1>
      <Auth
        supabaseClient={supabase}
        providers={['google', 'facebook', 'discord']}
        redirectTo="/profile"
      />
    </div>
  );
}
