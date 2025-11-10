import { getPosts } from "@/lib/sanity";
import { siteUrl } from "@/lib/site-url";

export async function GET() {
  const posts = await getPosts();

  const items = posts
    .map(
      (post) => `<item>
  <title><![CDATA[${post.title}]]></title>
  <link>${siteUrl}/blog/${post.slug}</link>
  <guid>${siteUrl}/blog/${post.slug}</guid>
  <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
  <description><![CDATA[${post.excerpt}]]></description>
</item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>FileWave blog</title>
    <link>${siteUrl}/blog</link>
    <description>Trusted download editorials, powered by Sanity.</description>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
