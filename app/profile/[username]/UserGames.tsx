import Link from 'next/link';

import { getGameList } from '@/app/api/user/[userId]/games/route';
import { Button } from '@/components';

export default async function UserGames({ userId }: { userId: string }) {
  const games = await getGameList({ userId });

  return (
    <div>
      <h2>Games</h2>
      <div className="flex flex-col">
        {games.map((game) => (
          <Link key={game.game_id} href={`/game/${game.game_id}`}>
            <Button>
              <h3>{game.game_id}</h3>
              <h4>Turn: {game.player_to_take_turn}</h4>
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
