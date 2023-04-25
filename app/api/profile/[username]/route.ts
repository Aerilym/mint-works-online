import { createRouteHandlerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { headers, cookies } from 'next/headers';

import type { Database } from '@/lib/database.types';

// do not cache this page
export const revalidate = 0;

export async function GET({ params }: { params: { username: string } }) {
  const username = params.username;

  const supabase = createRouteHandlerSupabaseClient<Database>({
    headers,
    cookies,
  });

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single();

  if (error) throw new Error(error.message);
  if (!profile) throw new Error('No profile found');

  return new Response(JSON.stringify(profile), {
    headers: {
      'content-type': 'application/json',
    },
  });
}
