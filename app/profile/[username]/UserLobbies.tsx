import Link from 'next/link';

import { getLobbyList } from '@/app/api/user/[userId]/lobbies/route';
import { Button } from '@/components';

export default async function UserLobbies({ userId }: { userId: string }) {
  const lobbies = await getLobbyList({ userId });

  return (
    <div>
      <h2>Lobbies</h2>
      <div className="flex flex-col">
        {lobbies.map((lobby) => (
          <Link key={lobby.join_code} href={`/lobby/${lobby.join_code}`}>
            <Button>
              <h3>{lobby.join_code}</h3>
              <h4>{lobby.game_id ? 'Started' : 'Not Started'}</h4>
              <h4>
                Players:
                {
                  [lobby.player_1, lobby.player_2, lobby.player_3, lobby.player_4].filter(Boolean)
                    .length
                }
              </h4>
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
