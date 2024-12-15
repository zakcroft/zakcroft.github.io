// app/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Image from "next/image";
import Link from "next/link";

export const revalidate = false; // No revalidation, purely static

type Post = {
  slug: string;
  title: string;
  date: string;
  image: string;
};

export default function Home() {
  const postsDir = path.join(process.cwd(), "posts"); // Updated path
  let filenames: string[] = [];

  try {
    filenames = fs.readdirSync(postsDir);
  } catch (error) {
    console.error(`Error reading posts directory: ${error}`);
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">My Blog</h1>
        <p className="text-center text-red-500">Failed to load posts.</p>
      </div>
    );
  }
  console.log("filenames", filenames);
  const posts: Post[] = filenames
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => {
      const filePath = path.join(postsDir, filename);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContents);
      console.log("data", data);
      return {
        slug: filename.replace(".md", ""),
        title: data.title as string,
        date: data.publishedAt as string,
        image: data.coverImage as string,
      };
    });

  console.log("posts", posts); // This will log to the server console

  // Sort posts by date descending
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="max-w-7xl mx-auto md:mt-10 px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {posts.map(({ slug, title, date, image }) => (
          <Link
            href={`/posts/${slug}`}
            key={slug}
            className="block bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-48">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover rounded-t-lg"
                sizes="(max-width: 640px) 100vw,
                       (max-width: 1024px) 50vw,
                       33vw"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{title}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(date).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
