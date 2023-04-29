import { createRouteHandlerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { cookies, headers } from 'next/headers';

import type { Profile } from '@/app/types/database';
import type { Database } from '@/lib/database.types';

// do not cache this page
export const revalidate = 0;

interface GETOptions {
  params: {
    userId: string;
  };
}

export async function GET(request: Request, { params }: GETOptions) {
  const userId = params.userId;

  const profile = await getProfileById({ userId });

  return new Response(JSON.stringify(profile), {
    headers: {
      'content-type': 'application/json',
    },
  });
}

interface PATCHOptions {
  params: {
    userId: string;
  };
}

export async function PATCH(request: Request, { params }: PATCHOptions) {
  const userId = params.userId;

  const changedProfile = (await request.json()) as Profile;

  const supabase = createRouteHandlerSupabaseClient<Database>({
    headers,
    cookies,
  });

  const { data: updatedProfile, error } = await supabase
    .from('profiles')
    .update(changedProfile)
    .eq('id', userId)
    .select('*')
    .single();

  if (error) throw new Error(error.message);
  if (!updatedProfile) throw new Error('No profile found');

  return new Response(JSON.stringify(updatedProfile), {
    headers: {
      'content-type': 'application/json',
    },
  });
}

/**
 * Get a profile from supabase by user id
 * @param userId - The id of the profile to get
 * @returns The profile
 */
export async function getProfileById({ userId }: { userId: string }): Promise<Profile> {
  const supabase = createRouteHandlerSupabaseClient<Database>({
    headers,
    cookies,
  });

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw new Error(error.message);
  if (!profile) throw new Error('No profile found');

  return profile;
}
