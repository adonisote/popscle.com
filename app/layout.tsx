import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import { CSPostHogProvider } from './providers';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['200', '300', '500', '600', '800'],
});

export const metadata: Metadata = {
  title: 'Popscle',
  description: 'Resources to Learn Anything. Curated by People you Trust.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <CSPostHogProvider>
        <body className={manrope.className}>{children}</body>
      </CSPostHogProvider>
    </html>
  );
}
