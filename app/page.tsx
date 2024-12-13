// This is app/page.tsx
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

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
      title: data.title as string,
      date: data.date as string
    }
  })

  posts.sort((a, b) => {
    // Convert dates to numeric timestamps before comparing
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>My Blog</h1>
      <ul>
        {posts.map(({ slug, title, date }) => (
          <li key={slug}>
            <a href={`/posts/${slug}`}>{title}</a> - {date}
          </li>
        ))}
      </ul>
    </div>
  )
}
