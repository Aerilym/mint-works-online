import Link from 'next/link';
import Layout from '@/app/components/template/Layout';

export default function Home() {
  return (
    <Layout>
      <Link href="/game">Go To Demo</Link>
    </Layout>
  );
}
