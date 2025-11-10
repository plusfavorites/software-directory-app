import { getApps, getCategories, getPosts } from "@/lib/sanity";
import { siteUrl } from "@/lib/site-url";

export async function GET() {
  const [apps, categories, posts] = await Promise.all([
    getApps(),
    getCategories(),
    getPosts(),
  ]);

  const urls = [
    { loc: `${siteUrl}/`, lastmod: new Date().toISOString() },
    { loc: `${siteUrl}/apps`, lastmod: new Date().toISOString() },
    { loc: `${siteUrl}/categories`, lastmod: new Date().toISOString() },
    { loc: `${siteUrl}/blog`, lastmod: new Date().toISOString() },
    ...apps.map((app) => ({
      loc: `${siteUrl}/apps/${app.slug}`,
      lastmod: app.releaseDate,
    })),
    ...categories.map((category) => ({
      loc: `${siteUrl}/categories/${category.slug}`,
      lastmod: new Date().toISOString(),
    })),
    ...posts.map((post) => ({
      loc: `${siteUrl}/blog/${post.slug}`,
      lastmod: post.publishedAt,
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `<url>
  <loc>${url.loc}</loc>
  <lastmod>${url.lastmod}</lastmod>
</url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
