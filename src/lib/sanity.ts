import { cache } from "react";
import { createClient } from "next-sanity";
import { App, BlogPost, Category } from "@/types/content";
import {
  appBySlugQuery,
  appsByCategoryQuery,
  appsQuery,
  categoriesQuery,
  postBySlugQuery,
  postsQuery,
} from "./queries";
import {
  sampleApps,
  sampleCategories,
  samplePosts,
} from "./sample-data";

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID;
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET;
const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ||
  process.env.SANITY_API_VERSION ||
  "2025-03-01";

export const sanityServerClient =
  projectId && dataset
    ? createClient({
        projectId,
        dataset,
        apiVersion,
        useCdn: true,
        perspective: "published",
      })
    : null;

export const getApps = cache(async (): Promise<App[]> => {
  if (sanityServerClient) {
    const result = await sanityServerClient.fetch<App[]>(appsQuery);
    if (result?.length) return result;
  }
  return sampleApps;
});

export const getTopDownloads = cache(async (): Promise<App[]> => {
  const apps = await getApps();
  return [...apps]
    .sort((a, b) => (b.downloads ?? 0) - (a.downloads ?? 0))
    .slice(0, 6);
});

export const getCategories = cache(async (): Promise<Category[]> => {
  if (sanityServerClient) {
    const result = await sanityServerClient.fetch<Category[]>(categoriesQuery);
    if (result?.length) return result;
  }
  return sampleCategories;
});

export const getAppsByCategory = cache(async (slug: string) => {
  if (sanityServerClient) {
    const result = await sanityServerClient.fetch<App[]>(
      appsByCategoryQuery,
      { slug },
    );
    if (result?.length) return result;
  }
  const apps = await getApps();
  return apps.filter((app) => app.category.slug === slug);
});

export const getAppBySlug = cache(async (slug: string) => {
  if (sanityServerClient) {
    const app = await sanityServerClient.fetch<App | null>(appBySlugQuery, {
      slug,
    });
    if (app) return app;
  }
  const apps = await getApps();
  return apps.find((app) => app.slug === slug) ?? null;
});

export const getPosts = cache(async (): Promise<BlogPost[]> => {
  if (sanityServerClient) {
    const posts = await sanityServerClient.fetch<BlogPost[]>(postsQuery);
    if (posts?.length) return posts;
  }
  return samplePosts;
});

export const getPostBySlug = cache(async (slug: string) => {
  if (sanityServerClient) {
    const post = await sanityServerClient.fetch<BlogPost | null>(
      postBySlugQuery,
      { slug },
    );
    if (post) return post;
  }
  const posts = await getPosts();
  return posts.find((post) => post.slug === slug) ?? null;
});

export const getCategoryBySlug = cache(async (slug: string) => {
  const categories = await getCategories();
  return categories.find((category) => category.slug === slug) ?? null;
});

export const getRelatedApps = cache(async (slug: string) => {
  const app = await getAppBySlug(slug);
  if (!app) return [];
  const apps = await getApps();
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
