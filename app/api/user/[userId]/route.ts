import { createRouteHandlerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { headers, cookies } from 'next/headers';

import type { Database } from '@/lib/database.types';
import type { Profile } from '@/app/types/database';

// do not cache this page
export const revalidate = 0;

export async function GET({ params }: { params: { userId: string } }) {
  const userId = params.userId;

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

  return new Response(JSON.stringify(profile), {
    headers: {
      'content-type': 'application/json',
    },
  });
}

export async function PATCH(request: Request, { params }: { params: { userId: string } }) {
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
