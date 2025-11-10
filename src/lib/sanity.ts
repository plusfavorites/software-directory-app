import { cache } from "react";
import { createClient } from "next-sanity";
import type { App, BlogPost, Category } from "@/types/content";
import {
  appBySlugQuery,
  appsByCategoryQuery,
  appsQuery,
  categoriesQuery,
  postBySlugQuery,
  postsQuery,
} from "./queries";
const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID;
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET;
const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ||
  process.env.SANITY_API_VERSION ||
  "2025-03-01";

if (!projectId || !dataset) {
  throw new Error(
    "Sanity project ID and dataset are required. Define SANITY_PROJECT_ID and SANITY_DATASET.",
  );
}

export const sanityServerClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});

export const getApps = cache(async (): Promise<App[]> => {
  return sanityServerClient.fetch<App[]>(appsQuery);
});

export const getTopDownloads = cache(async (): Promise<App[]> => {
  const apps = await getApps();
  return [...apps]
    .sort((a, b) => (b.downloads ?? 0) - (a.downloads ?? 0))
    .slice(0, 6);
});

export const getCategories = cache(async (): Promise<Category[]> =>
  sanityServerClient.fetch(categoriesQuery),
);

export const getAppsByCategory = cache(async (slug: string) => {
  return sanityServerClient.fetch<App[]>(appsByCategoryQuery, { slug });
});

export const getAppBySlug = cache(async (slug: string) => {
  return sanityServerClient.fetch<App | null>(appBySlugQuery, { slug });
});

export const getPosts = cache(async (): Promise<BlogPost[]> => {
  return sanityServerClient.fetch<BlogPost[]>(postsQuery);
});

export const getPostBySlug = cache(async (slug: string) => {
  return sanityServerClient.fetch<BlogPost | null>(postBySlugQuery, { slug });
});

export const getCategoryBySlug = cache(async (slug: string) => {
  const categories = await getCategories();
  return categories.find((category) => category.slug === slug) ?? null;
});

export const getRelatedApps = cache(async (slug: string) => {
  const app = await getAppBySlug(slug);
  if (!app) return [];
  const apps = await getAppsByCategory(app.category.slug);
  return apps
    .filter(
      (item) => item.slug !== slug && item.category.slug === app.category.slug,
    )
    .slice(0, 4);
});

export const getSearchIndex = cache(async () => {
  const apps = await getApps();
  return apps.map((app) => ({
    title: app.title,
    slug: app.slug,
    category: app.category.name,
    shortDescription: app.shortDescription ?? app.description.slice(0, 120),
    heroImage: app.heroImage,
  }));
});
