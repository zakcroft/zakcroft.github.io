import Link from 'next/link'

export default function Header() {
  return (
    <header className="-ml-[8px] mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <Link href="/" passHref>
          <h1 className="text-5xl font-bold mb-8 text-center cursor-pointer">
            Zak Croft
          </h1>
        </Link>
      </div>
    </header>
  )
}
