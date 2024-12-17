import './global.css';
import type { Metadata } from 'next';
import { Lexend } from 'next/font/google';
import Header from './components/Header';
import Footer from './components/footer';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Zak Croft',
  description: 'A collection of writings.',
  openGraph: {
    title: 'Zak Croft',
    description: 'A collection of writings.',
    url: 'https://zakcroft.github.io/', // Replace with your domain
    type: 'website',
    images: [
      {
        url: 'https://zakcroft.github.io/images/daos.jpg', // Replace with a default image URL
        width: 1200,
        height: 630,
        alt: 'default image',
      },
    ],
  },
};

const font = Lexend({ subsets: ['latin'] });

const cx = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={cx('text-black bg-white dark:text-neutral-100 dark:bg-black', font.className)}>
      <body className="antialiased max-w-2xl mx-4 mx-auto">
        <main className="flex-auto min-w-0 flex flex-col px-2 md:px-0">
          <Header />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
