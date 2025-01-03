import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDir);
  return filenames.map((filename) => ({
    slug: filename.replace('.md', ''),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const slug = (await params).slug;
  const postsDir = path.join(process.cwd(), 'posts');
  const filePath = path.join(postsDir, `${slug}.md`);

  // console.log('params', params);

  if (!fs.existsSync(filePath)) {
    return {
      title: '404 - Not Found',
      description: 'The page you are looking for does not exist.',
    };
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(fileContents);

  const metadataTitle = data.title || 'Zak Croft';
  const metadataDescription = data.description || 'A collection of writings.';

  return {
    metadataBase: new URL('https://zakcroft.github.io'),
    title: metadataTitle,
    description: metadataDescription,
    authors: [{ name: 'Zak Croft' }],
    openGraph: {
      title: metadataTitle,
      description: metadataDescription,
      url: `/posts/${slug}`,
      type: 'article',
      images: [
        {
          url: data.coverImage || '/images/daos.jpg',
          width: 1200,
          height: 630,
          alt: metadataTitle,
        },
      ],
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const postsDir = path.join(process.cwd(), 'posts');
  const filePath = path.join(postsDir, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1 className="text-center mx-auto">{data.title}</h1>
      {data.publishedAt && (
        <p className="text-sm text-gray-500 text-center">
          <em className="text-center mx-auto">{data.publishedAt}</em>
        </p>
      )}
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </article>
  );
}
