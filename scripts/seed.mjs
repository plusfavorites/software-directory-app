import "dotenv/config";
import { createClient } from "@sanity/client";
import { seedDocuments } from "../sanity/seed/sample-data.mjs";

if (!process.env.SANITY_PROJECT_ID || !process.env.SANITY_DATASET) {
  throw new Error("Set SANITY_PROJECT_ID and SANITY_DATASET before seeding.");
}

if (!process.env.SANITY_WRITE_TOKEN) {
  throw new Error("Set SANITY_WRITE_TOKEN with write access before seeding.");
}

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: process.env.SANITY_API_VERSION || "2025-03-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

await Promise.all(
  seedDocuments.map((doc) =>
    client.createIfNotExists({
      ...doc,
      _type: doc._type,
      _id: doc._id,
    }),
  ),
);

console.log(`Seeded ${seedDocuments.length} documents to Sanity`);
