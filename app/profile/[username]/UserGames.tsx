import { Game, Profile } from '@/app/types/database';

import { GET as profileGet } from '@/app/api/profile/[username]/route';
import { GET as gamesGet } from '@/app/api/user/[userId]/games/route';

async function getProfile({ username }: { username: string }): Promise<Profile> {
  const res = await profileGet({ params: { username } });

  if (!res.ok) throw new Error('Failed to fetch profile');

  return (await res.json()) as Profile;
}

async function getGames({ userId }: { userId: string }): Promise<Array<Game>> {
  const res = await gamesGet({ params: { userId } });

  if (!res.ok) throw new Error('Failed to fetch games');

  return (await res.json()) as Array<Game>;
}

export default async function UserGames({ username }: { username: string }) {
  const profile = await getProfile({ username });
  const games = await getGames({ userId: profile.id });

  return (
    <div>
      <h1>User {username}</h1>
      <h2>Profile</h2>
      <pre>{JSON.stringify(profile, null, 2)}</pre>

      <h2>Games</h2>
      <pre>{JSON.stringify(games, null, 2)}</pre>
    </div>
  );
}
