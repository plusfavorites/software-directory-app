# Sample seed data

The `seedDocuments` export in `sanity/seed/sample-data.mjs` mirrors the demo
content used by the Next.js frontend (3 apps, 2 categories, 2 posts). Once your
Sanity project is configured, run the following to import everything:

```bash
node scripts/seed.mjs
```

Make sure you define `SANITY_PROJECT_ID`, `SANITY_DATASET`, and a
`SANITY_WRITE_TOKEN` before running the script. The app will automatically fall
back to the same sample data if those env vars are missing.
