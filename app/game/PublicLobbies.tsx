'use client';

import Link from 'next/link';

import { Button } from '@/components';
import { useSupabase } from '@/providers/supabase-provider';

export async function PublicLobbies() {
  const { supabase } = useSupabase();

  const { data: lobbies, error } = await supabase.from('lobbies').select('*').is('announce', true);

  if (error) console.error(error);

  return (
    <div>
      <h1>Public Lobbies</h1>
      <div className="flex flex-col gap-4">
        {lobbies && lobbies.length > 0 ? (
          lobbies.map((lobby) => (
            <Link key={lobby.id} href={`/lobby/${lobby.join_code}`}>
              <Button className="flex flex-col gap-2">
                <span className="text-lg">Join Code</span>
                <span>{lobby.join_code}</span>
              </Button>
            </Link>
          ))
        ) : (
          <span>No public lobbies</span>
        )}
      </div>
    </div>
  );
}
