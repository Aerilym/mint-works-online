import UserGames from './UserGames';

interface PageParams {
  params: {
    username: string;
  };
}

export default async function Page({ params }: PageParams) {
  const username = params.username;
  return (
    <div className="flex flex-col items-center gap-8">
      {/* @ts-expect-error Async Server Component */}
      <UserGames username={username} />
    </div>
  );
}
