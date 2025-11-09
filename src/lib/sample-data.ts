import { App, BlogPost, Category } from "@/types/content";
import data from "../../data/sample-data.json";

type RawData = {
  categories: Category[];
  apps: (Omit<App, "category"> & { categoryId: string })[];
  posts: BlogPost[];
};

const raw = data as RawData;

const categoriesById = Object.fromEntries(
  raw.categories.map((category) => [category._id, category]),
);

export const sampleCategories = raw.categories as Category[];

export const sampleApps = raw.apps.map((app) => {
  const { categoryId, ...rest } = app;
  return {
    ...rest,
    category: categoriesById[categoryId],
  };
}) as App[];

export const samplePosts = raw.posts as BlogPost[];
