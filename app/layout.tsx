import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { CSPostHogProvider } from './providers';

const poppins = Poppins({ subsets: ['latin'], weight: ['100', '300', '500'] });

export const metadata: Metadata = {
  title: 'Popscle',
  description:
    'The Best Resources for Learning Anything, Curated by the Internet.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <CSPostHogProvider>
        <body className={poppins.className}>{children}</body>
      </CSPostHogProvider>
    </html>
  );
}
