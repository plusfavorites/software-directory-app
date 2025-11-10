## Ridnt - FileHippo-style directory

Complete Next.js 15 + Sanity build that mirrors the FileHippo UX:

- App Router + TypeScript
- Tailwind CSS + ShadCN components
- Sanity Studio in `/studio`
- Dynamic routes for apps, categories, blog
- Search (Fuse.js) + related apps
- Metadata API + XML sitemap + RSS feed

### 1. Environment

`.env.local` is checked in with your live project details (ensure
`NEXT_PUBLIC_SITE_URL` includes `https://` for production deployments):

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
SANITY_PROJECT_ID=tq2oqx4a
SANITY_DATASET=production
SANITY_API_VERSION=2025-03-01
```

Change `NEXT_PUBLIC_SITE_URL` for deployment and set `SANITY_WRITE_TOKEN`
before seeding content.

### 2. Run everything

```bash
npm install
npm install --prefix studio   # install Studio deps once
npm run dev          # Next.js app
npm run studio:dev   # or: cd studio && npm run dev (Studio at http://localhost:3333)
```

### 3. Seed Sanity (optional)

Sample docs (3 apps, 2 categories, 2 posts) live in
`sanity/seed/sample-data.mjs`. After authenticating with Sanity:

```bash
npm run studio:dev
SANITY_WRITE_TOKEN=*** node scripts/seed.mjs
```

The frontend now relies entirely on the connected Sanity project, so seeding is
the recommended way to load starter content.

### Project structure

```
src/app           # App Router routes + API endpoints
src/components    # UI, cards, layout, search drawer
src/lib           # Sanity client, GROQ queries, SEO helpers
sanity/schema     # App/category/post schema definitions
studio            # Sanity Studio config (npx sanity dev --cwd studio)
```

### Useful scripts

| Script                | Description                                 |
| -------------------- | ------------------------------------------- |
| `npm run dev`        | Next.js development server                  |
| `npm run build`      | Production build                            |
| `npm run lint`       | ESLint                                      |
| `npm run studio:dev` | Sanity Studio locally                       |
| `npm run studio:deploy` | Deploy Studio to Sanity managed hosting |

### Deployment

Deploy the Next.js app on Vercel (or any Node 18+ host) and keep the Sanity
environment variables in sync. The `/api/sitemap` and `/api/rss` routes
generate SEO feeds automatically; ShadCN UI components live in
`src/components/ui`.
