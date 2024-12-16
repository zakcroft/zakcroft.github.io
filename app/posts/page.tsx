// app/posts/[slug]/page.jsx
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  const postsDir = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDir);
  return filenames.map((filename) => ({
    slug: filename.replace('.md', ''),
  }));
}

export default function PostPage({ params }) {
  const postsDir = path.join(process.cwd(), 'posts');
  const filePath = path.join(postsDir, `${params.slug}.md`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  if (!data.title) {
    notFound();
  }

  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1 className="text-center mx-auto">{data.title}</h1>
      <p>
        <em className="text-center mx-auto">{data.publishedAt}</em>
      </p>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
}
