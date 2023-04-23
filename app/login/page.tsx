'use client';

import { Auth } from '@supabase/auth-ui-react';
import { useSupabase } from '@/app/supabase-provider';

export default function Page() {
  const { supabase } = useSupabase();

  return (
    <div className="flex flex-col">
      <h1 className="mt-2 self-center text-2xl">Login</h1>
      <Auth supabaseClient={supabase} providers={['google', 'facebook', 'discord']} />
    </div>
  );
}
