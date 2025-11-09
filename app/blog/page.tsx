import { client } from '@/lib/sanity.client';
import { postsQuery } from '@/lib/queries';
import type { Post } from '@/types/sanity';
import { BlogCard } from '@/components/blog-card';

export const metadata = {
  title: 'Blog',
  description: 'Latest software release stories, tutorials and curated download news.',
};

export default async function BlogPage() {
  const posts = await client.fetch<Post[]>(postsQuery);

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-bold text-white">SoftWave blog</h1>
      <p className="mt-2 text-slate-400">
        Insights, release highlights and productivity tips from the software world.
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {posts.map((post) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
