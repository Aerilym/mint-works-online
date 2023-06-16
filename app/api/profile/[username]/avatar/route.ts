import { getProfileByUsername } from '../route';

// cache this page for 1 hour
export const revalidate = 3600;

interface GETOptions {
  params: {
    username: string;
  };
}

export async function GET(request: Request, { params }: GETOptions) {
  const username = params.username;

  const profile = await getProfileByUsername({ username });

  const baseHeaders = {
    'cache-control': `public, max-age=${revalidate}`,
  };

  if (profile.avatar_url) {
    const res = await fetch(profile.avatar_url);

    if (res.ok) {
      return new Response(res.body, {
        headers: {
          ...baseHeaders,
          'content-type': res.headers.get('content-type') || 'image/png',
        },
      });
    }
  }

  if (profile.email_hash) {
    const imageUrl = new URL(`https://www.gravatar.com/avatar/${profile.email_hash}`);
    imageUrl.searchParams.set('d', '404'); // default
    imageUrl.searchParams.set('r', 'pg'); // rating
    imageUrl.searchParams.set('s', '200'); // size

    const res = await fetch(imageUrl);

    if (res.ok) {
      return new Response(res.body, {
        headers: { ...baseHeaders, 'content-type': res.headers.get('content-type') || 'image/png' },
      });
    }
  }

  return new Response('Image not found', {
    status: 404,
    headers: {
      ...baseHeaders,
      'content-type': 'image/png',
    },
  });
}
