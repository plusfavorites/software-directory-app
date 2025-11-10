import Link from "next/link";
import { getApps, getTopDownloads, getCategories, getPosts } from "@/lib/sanity";
import { HomeHero } from "@/components/home-hero";
import { SectionHeading } from "@/components/section-heading";
import { AppCard } from "@/components/app-card";
import { CategoryCard } from "@/components/category-card";
import { BlogCard } from "@/components/blog-card";
import { Button } from "@/components/ui/button";


export const revalidate = 120;



export default async function HomePage() {
  const [apps, topDownloads, categories, posts] = await Promise.all([
    getApps(),
    getTopDownloads(),
    getCategories(),
    getPosts(),
  ]);

  const latestApps = apps.slice(0, 6);
  const recentPosts = posts.slice(0, 2);

  return (
    <div className="space-y-12">
      <HomeHero />

      <section className="space-y-6">
        <SectionHeading
          title="Latest releases"
          description="Fresh builds pulled straight from Sanity with mirror links."
          actionSlot={
            <Button asChild variant="secondary">
              <Link href="/apps">View all apps</Link>
            </Button>
          }
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {latestApps.map((app) => (
            <AppCard key={app._id} app={app} showCategory />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          title="Top downloads"
          description="Trending picks with the fastest mirrors right now."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {topDownloads.map((app) => (
            <AppCard key={app._id} app={app} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          title="Browse by category"
          description="Find browsers, multimedia suites, developer tools, utilities, and more."
          actionSlot={
            <Button asChild variant="ghost">
              <Link href="/categories">See all categories</Link>
            </Button>
          }
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.slice(0, 6).map((category) => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          title="Latest from the blog"
          description="Release spotlights, optimization tips, and community news."
          actionSlot={
            <Button asChild>
              <Link href="/blog">Go to blog</Link>
            </Button>
          }
        />
        <div className="grid gap-6 md:grid-cols-2">
          {recentPosts.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
