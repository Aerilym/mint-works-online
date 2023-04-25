import { createRouteHandlerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { headers, cookies } from 'next/headers';

import type { Database } from '@/lib/database.types';

// do not cache this page
export const revalidate = 0;

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { userId: string };
  }
) {
  const userId = params.userId;

  const supabase = createRouteHandlerSupabaseClient<Database>({
    headers,
    cookies,
  });

  const { data: profile, error } = await supabase
    .from('profile')
    .select('username')
    .eq('id', userId)
    .single();

  if (error) throw new Error(error.message);
  if (!profile) throw new Error('No profile found');

  return new Response(
    JSON.stringify({
      username: profile.username,
    }),
    {
      headers: {
        'content-type': 'application/json',
      },
    }
  );
}
