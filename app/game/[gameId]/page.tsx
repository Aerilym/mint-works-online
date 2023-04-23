import { Button } from '@/components';

interface PageParams {
  params: {
    gameId: string;
  };
}

export default function Page({ params }: PageParams) {
  const gameId = params.gameId.toLocaleUpperCase();

  return (
    <div className="flex flex-col gap-8">
      <h1 className="mt-2 text-2xl">
        Lobby <span className="rounded bg-red-500 p-2 shadow-xl">{gameId}</span>
      </h1>
      <Button>Start Game</Button>
    </div>
  );
}
