'use client';
import Link from 'next/link';
import Layout from '@/app/components/template/Layout';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  router.push('/game');
  return (
    <Layout>
      <Link href="/game">Go To Demo</Link>
    </Layout>
  );
}
