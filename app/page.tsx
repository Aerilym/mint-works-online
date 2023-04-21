import Link from 'next/link';
import { Button } from './components/Button';

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <Link href="/game">
        <Button className="">Play a game</Button>
      </Link>
      <Link href="/plan">
        <Button>See plan cards</Button>
      </Link>
    </div>
  );
}
