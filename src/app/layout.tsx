import './globals.css';

export const metadata = {
  title: 'Mint Works Online',
  description: 'Play the award-winning worker placement board game Mint Works in your browser!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
