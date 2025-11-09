import Link from 'next/link';
import { client } from '@/lib/sanity.client';
import { appsQuery, categoriesQuery, postsQuery } from '@/lib/queries';
import type { App, Category, Post } from '@/types/sanity';
import { AppCard } from '@/components/app-card';
import { BlogCard } from '@/components/blog-card';
import { CategoryPill } from '@/components/category-pill';
import { TopDownloads } from '@/components/top-downloads';

export default async function HomePage() {
  const [apps, categories, posts] = await Promise.all([
    client.fetch<App[]>(appsQuery),
    client.fetch<Category[]>(categoriesQuery),
    client.fetch<Post[]>(postsQuery),
  ]);

  const topDownloads = apps.filter((app) => app.topDownloads).slice(0, 5);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div>
          <h1 className="text-3xl font-bold text-white">Discover trusted software downloads</h1>
          <p className="mt-2 text-slate-400">
            Browse curated releases, compare versions and download from fast mirrors. Powered by Sanity CMS and Next.js 15.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {categories.map((category) => (
              <CategoryPill key={category._id} category={category} />
            ))}
          </div>
        </div>
        <TopDownloads apps={topDownloads} />
      </section>

      <section className="mt-12">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Latest apps</h2>
          <Link href="/categories" className="text-sm text-hippo hover:text-white">
            View all
          </Link>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {apps.slice(0, 9).map((app) => (
            <AppCard key={app._id} app={app} />
          ))}
        </div>
      </section>

      <section className="mt-16">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Latest from the blog</h2>
          <Link href="/blog" className="text-sm text-hippo hover:text-white">
            Read more
          </Link>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {posts.slice(0, 4).map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
