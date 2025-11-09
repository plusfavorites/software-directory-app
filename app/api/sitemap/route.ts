import { client } from '@/lib/sanity.client';
import { appsQuery, categoriesQuery, postsQuery } from '@/lib/queries';
import type { App, Category, Post } from '@/types/sanity';
import { siteUrl } from '@/lib/site-config';

type SitemapEntry = {
  loc: string;
  lastmod?: string;
};

function normaliseDate(value?: string | null): string | undefined {
  if (!value) {
    return undefined;
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return undefined;
  }
  return date.toISOString();
}

export async function GET() {
  const [apps, categories, posts] = await Promise.all([
    client.fetch<App[]>(appsQuery),
    client.fetch<Category[]>(categoriesQuery),
    client.fetch<Post[]>(postsQuery),
  ]);

  const now = new Date().toISOString();

  const entries: SitemapEntry[] = [
    { loc: siteUrl, lastmod: now },
    ...apps.map((app) => ({
      loc: `${siteUrl}/apps/${app.slug}`,
      lastmod: normaliseDate(app.releaseDate),
    })),
    ...categories.map((category) => ({
      loc: `${siteUrl}/categories/${category.slug}`,
      lastmod: now,
    })),
    ...posts.map((post) => ({
      loc: `${siteUrl}/blog/${post.slug}`,
      lastmod: normaliseDate(post.publishedAt),
    })),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries
    .map(({ loc, lastmod }) => {
      const lastmodTag = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : '';
      return `  <url>\n    <loc>${loc}</loc>${lastmodTag}\n  </url>`;
    })
    .join('\n')}\n</urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
