export type DownloadLink = {
  name: string;
  url: string;
};

export type Category = {
  _id: string;
  name: string;
  slug: string;
  icon?: string;
  description?: string;
};

export type AppScreenshot = {
  url: string;
  alt?: string;
};

export type App = {
  _id: string;
  title: string;
  slug: string;
  version: string;
  os: string[];
  developer: string;
  category: Category;
  description: string;
  screenshots: AppScreenshot[];
  downloadLinks: DownloadLink[];
  releaseDate: string;
  heroImage?: string;
  downloads?: number;
  shortDescription?: string;
};

import type { PortableTextBlock } from "@portabletext/types";

export type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string;
  body: PortableTextBlock[];
  tags: string[];
  publishedAt: string;
};
