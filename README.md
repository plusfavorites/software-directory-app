## FileWave – FileHippo-style directory

Complete Next.js 15 + Sanity starter that mirrors the FileHippo UX:

- App Router + TypeScript
- Tailwind CSS + ShadCN components
- Sanity Studio in `/studio`
- Dynamic routes for apps, categories, blog
- Search (client-side Fuse.js) + related apps
- Metadata API + XML sitemap + RSS feed

### 1. Environment

```bash
cp .env.example .env.local
# fill SANITY_* values + NEXT_PUBLIC_SITE_URL
```

### 2. Run everything

```bash
npm install
npm run dev          # Next.js app
npm run studio:dev   # optional Sanity Studio (http://localhost:3333)
```

### 3. Seed Sanity (optional)

Sample data (3 apps, 2 categories, 2 posts) lives in `sanity/seed/sample-data.ts`.
After authenticating with Sanity:

```bash
npm run studio:dev
# in a second terminal (requires SANITY_WRITE_TOKEN)
node scripts/seed.mjs
```

You can also `import { seedDocuments }` manually; the frontend automatically falls back
to the same sample data when the CMS is not configured yet.

### Project structure

```
src/app           # App Router routes + API endpoints
src/components    # UI, cards, layout, search drawer
src/lib           # Sanity client, GROQ queries, sample data, SEO helpers
sanity/schema     # App/category/post schema definitions
studio            # Standalone Sanity Studio config (npx sanity dev --cwd studio)
```

### Useful scripts

| Script           | Description                                   |
| ---------------- | --------------------------------------------- |
| `npm run dev`    | Next.js development server                    |
| `npm run build`  | Production build (Next.js + route handlers)   |
| `npm run lint`   | ESLint                                        |
| `npm run studio:dev` | Sanity Studio locally                    |
| `npm run studio:deploy` | Deploy Studio to Sanity hosting       |

### Deployment

Deploy the Next.js app on Vercel (or any Node 18+ host) and connect the Sanity
project via environment variables. The `/api/sitemap` and `/api/rss` routes
generate metadata feeds automatically at request time. ShadCN UI components are
co-located in `src/components/ui`.
