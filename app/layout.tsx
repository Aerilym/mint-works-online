import './globals.css';
import { Poppins } from 'next/font/google';
import SupabaseProvider from './supabase-provider';

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Mint Works Online',
  description: 'Play the award-winning worker placement board game Mint Works in your browser!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <SupabaseProvider>
          <header className="flex h-14 w-full items-center bg-cyan-300 p-2">
            <h2 className="text-2xl">Mint Works Online</h2>
          </header>
          <div className="flex h-full w-full flex-col items-center justify-center p-2">
            <main className="max-w-6xl">{children}</main>
          </div>
        </SupabaseProvider>
      </body>
    </html>
  );
}
