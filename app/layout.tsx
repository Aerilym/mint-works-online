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
        {children}
      </body>
    </html>
  );
}
