import { client } from '@/lib/sanity.client';
import { postsQuery } from '@/lib/queries';
import type { Post } from '@/types/sanity';
import { siteDescription, siteName, siteUrl } from '@/lib/site-config';

function cdata(value: string): string {
  return `<![CDATA[${value.replace(/]]>/g, ']]]]><![CDATA[>')}]]>`;
}

export async function GET() {
  const posts = await client.fetch<Post[]>(postsQuery);
  const latestPublished = posts[0]?.publishedAt;

  const items = posts.slice(0, 20);

  const rss = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n  <channel>\n    <title>${siteName} Blog</title>\n    <link>${siteUrl}/blog</link>\n    <description>${cdata(siteDescription)}</description>${
    latestPublished ? `\n    <lastBuildDate>${new Date(latestPublished).toUTCString()}</lastBuildDate>` : ''
  }\n${items
      .map((post) => {
        const publishedDate = new Date(post.publishedAt).toUTCString();
        const excerpt = post.excerpt ? cdata(post.excerpt) : '';
        const coverImage = post.coverImage?.url ? `\n      <enclosure url="${post.coverImage.url}" type="image/jpeg" />` : '';
        return `    <item>\n      <title>${cdata(post.title)}</title>\n      <link>${siteUrl}/blog/${post.slug}</link>\n      <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>\n      <pubDate>${publishedDate}</pubDate>${
          excerpt ? `\n      <description>${excerpt}</description>` : ''
        }${coverImage}\n    </item>`;
      })
      .join('\n')}\n  </channel>\n</rss>`;

  return new Response(rss, {
    status: 200,
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
