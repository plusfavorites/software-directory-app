# SoftWave — FileHippo-style directory

SoftWave is a FileHippo-inspired software download directory built with **Next.js 15 (App Router)**, **Sanity v3**, **Tailwind CSS** and **shadcn/ui**. It showcases how to combine the Next.js App Router with Sanity GROQ queries to power dynamic pages, metadata generation, RSS and sitemap feeds.

## Features

- Next.js 15 App Router with TypeScript
- Sanity Studio (v3) embedded under `/studio`
- Pre-configured Sanity schema for apps, categories and blog posts
- Sample seed data (3 apps, 3 categories, 2 blog posts)
- Dynamic routes for apps, categories and blog posts
- Client-side search modal hitting a GROQ-powered API route
- Top downloads, related apps and category filtering
- RSS feed and XML sitemap generated at request time (with caching headers)
- SEO helpers including robots.txt generation and a custom 404 page
- Tailwind CSS and shadcn/ui components for a FileHippo-inspired UI

## Getting started

```bash
pnpm install  # or npm/yarn
pnpm dev      # start Next.js and the Sanity Studio
```

Configure the following environment variables to point to your Sanity project when deploying:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION` (defaults to `2024-06-01`)
- `NEXT_PUBLIC_SITE_URL` (used for sitemap, RSS links and metadata)

You can tweak the default metadata, site title and keywords from [`lib/site-config.ts`](lib/site-config.ts).

The Sanity Studio is available at `http://localhost:3000/studio` when running `pnpm dev`.

## Seeding sample content

Use the data in [`sanity/seed-data.ts`](sanity/seed-data.ts) to import starter apps, categories and blog posts into your Sanity dataset. You can adapt the sample objects for `sanity dataset import` or copy them directly into the Sanity Studio.

## Folder structure

```
app/                 # Next.js App Router routes, API handlers and layouts
components/          # UI components (App cards, search dialog, etc.)
lib/                 # Sanity client configuration and GROQ queries
sanity/              # Sanity config and schema definitions
studio/              # Reserved for future Studio customisations
```

This starter is optimised for Vercel deployments and serves as a reference implementation for a modern software download portal.
