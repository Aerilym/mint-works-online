import Link from 'next/link';

import { getGameList } from '@/app/api/user/[userId]/games/route';
import { Button } from '@/components';

export default async function UserGames({ userId }: { userId: string }) {
  const gameList = await getGameList({ userId });

  return (
    <div>
      <h2>Games</h2>
      <div className="flex flex-col">
        {gameList.map(({ game, players }) => {
          return (
            <Link key={game.game_id} href={`/game/${game.game_id}`}>
              <Button>
                <h4>Turn: {game.player_to_take_turn}</h4>
                <h4>Players: {players.length}</h4>
                <h4>{players.map((player) => player)}</h4>
              </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
