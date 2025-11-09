export interface DownloadLink {
  name: string;
  url: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  icon?: string;
}

export interface App {
  _id: string;
  title: string;
  slug: string;
  version: string;
  os: string[];
  developer: string;
  description: string;
  category: Category;
  releaseDate: string;
  downloadLinks: DownloadLink[];
  screenshots?: { url: string }[];
  topDownloads?: boolean;
  body?: unknown;
}

export interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: { url: string };
  publishedAt: string;
  tags: string[];
}
