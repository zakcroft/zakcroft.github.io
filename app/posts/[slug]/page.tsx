import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { notFound } from 'next/navigation'
import Head from "next/head";


export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), 'posts')
  const filenames = fs.readdirSync(postsDir)
  return filenames.map((filename) => ({
    slug: filename.replace('.md', ''),
  }))
}

export default function PostPage({ params }) {
  const postsDir = path.join(process.cwd(), 'posts')
  const filePath = path.join(postsDir, `${params.slug}.md`)

  if (!fs.existsSync(filePath)) {
    notFound()
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  if (!data.title) {
    notFound()
  }

  return (
         <>
      <Head>
        <title>{data.title}</title>
        <meta name="description" content={data.description || ""} />
        <meta property="og:title" content={data.title} />
        <meta property="og:description" content={data.description || ""} />
        <meta property="og:image" content={data.coverImage || ""} />
        <meta
          property="og:url"
          content={`https://yourblogdomain.com/posts/${params.slug}`}
        />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={data.title} />
        <meta name="twitter:description" content={data.description || ""} />
        <meta name="twitter:image" content={data.coverImage || ""} />
      </Head>
      <article className="prose dark:prose-invert max-w-none">
        <h1 className="text-center mx-auto">{data.title}</h1>
        {data.date && (
            <p className="text-sm text-gray-500">
              <em>{data.date}</em>
            </p>
        )}
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </article>
           </>
  )
}
