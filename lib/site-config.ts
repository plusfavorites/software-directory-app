const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://softwave.example.com';

export const siteUrl = rawSiteUrl.endsWith('/') ? rawSiteUrl.slice(0, -1) : rawSiteUrl;

export const siteName = 'SoftWave';

export const siteDescription =
  'Discover curated desktop applications, read release notes and download from trusted mirrors, powered by Sanity and Next.js.';

export const siteKeywords = ['software downloads', 'filehippo', 'desktop apps', 'sanity cms', 'nextjs'];
