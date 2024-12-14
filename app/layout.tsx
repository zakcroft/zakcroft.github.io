import './global.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from './components/Header'
import Footer from './components/footer'


export const metadata: Metadata = {
  title: 'My Blog',
  description: 'A minimal blog built with the Next.js App Router',
}

const inter = Inter({ subsets: ['latin'] })

const cx = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        'text-black bg-white dark:text-neutral-100 dark:bg-black',
        inter.className
      )}
    >
      <body className="antialiased max-w-xl mx-4 mx-auto">
        <main className="flex-auto min-w-0 flex flex-col px-2 md:px-0">
          <Header />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  )
}
