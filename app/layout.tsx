import './globals.css';

export const metadata = {
  title: 'Mint Works Online',
  description: 'Play the award-winning worker placement board game Mint Works in your browser!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="flex h-14 w-full items-center bg-mintCard-deed p-2">
          <h2 className="text-2xl">Mint Works</h2>
        </header>
        <main className="flex h-full w-full flex-col items-center justify-center p-2">
          <div className="max-w-4xl">{children}</div>
        </main>
      </body>
    </html>
  );
}
