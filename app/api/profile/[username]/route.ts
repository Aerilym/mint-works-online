import { createRouteHandlerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { headers, cookies } from 'next/headers';

import type { Database } from '@/lib/database.types';
import { Profile } from '@/app/types/database';

// do not cache this page
export const revalidate = 0;

interface GETOptions {
  params: {
    username: string;
  };
}

export async function GET(request: Request, { params }: GETOptions) {
  const username = params.username;

  const profile = await getProfileByUsername({ username });

  return new Response(JSON.stringify(profile), {
    headers: {
      'content-type': 'application/json',
    },
  });
}

/**
 * Get a profile from supabase by username
 * @param username - The username of the profile to get
 * @returns The profile
 */
export async function getProfileByUsername({ username }: { username: string }): Promise<Profile> {
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

  return profile;
}
