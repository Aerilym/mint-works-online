'use client';

import { useSupabase } from '@/app/supabase-provider';
import { useRouter } from 'next/navigation';

export default function Logout() {
  const router = useRouter();
  const { supabase } = useSupabase();

  supabase.auth.signOut().then(() => {
    console.log('signed out');
    router.push('/');
  });

  return <div>Logging Out...</div>;
}
