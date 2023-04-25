'use client';

import { useSupabase } from '@/app/supabase-provider';
import { useRouter } from 'next/navigation';

export default async function Page() {
  const router = useRouter();
  const { supabase } = useSupabase();

  await supabase.auth.signOut();

  router.push('/');
}
