import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'

export const revalidate = false; // No revalidation, purely static

export default function Home() {
  const postsDir = path.join(process.cwd(), 'posts')
  const filenames = fs.readdirSync(postsDir)

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDir, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(fileContents)
    return {
      slug: filename.replace('.md', ''),
      title: data.title,
      date: data.date
    }
  })

  posts.sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>My Blog</h1>
      <ul>
        {posts.map(({ slug, title, date }) => (
          <li key={slug}>
            <Link href={`/posts/${slug}`}>{title}</Link> - {date}
          </li>
        ))}
      </ul>
    </div>
  )
}
