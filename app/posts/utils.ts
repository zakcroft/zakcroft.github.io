import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function getBlogPosts() {
  const postsDir = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDir);

  return filenames.map((filename) => {
    const filePath = path.join(postsDir, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    return {
      slug: filename.replace('.md', ''),
      metadata: { ...data },
      content,
    };
  });
}

export function formatDate(dateString, full) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: full ? 'long' : 'short',
    day: 'numeric',
  });
}
