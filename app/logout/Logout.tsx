'use client';

import { useRouter } from 'next/navigation';

import { useSupabase } from '@/app/supabase-provider';

export default function Logout() {
  const router = useRouter();
  const { supabase } = useSupabase();

  supabase.auth.signOut().then(() => {
    console.log('signed out');
    router.push('/');
  });

  return <div>Logging Out...</div>;
}
