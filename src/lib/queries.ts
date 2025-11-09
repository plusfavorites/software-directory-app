import { groq } from "next-sanity";

export const appsQuery = groq`*[_type == "app"]{
  _id,
  title,
  "slug": slug.current,
  version,
  os,
  developer,
  description,
  shortDescription,
  downloadLinks,
  releaseDate,
  downloads,
  "heroImage": heroImage.asset->url,
  "screenshots": screenshots[]{
    "url": asset->url,
    alt
  },
  "category": category->{
    _id,
    name,
    "slug": slug.current,
    icon,
    description
  }
} | order(releaseDate desc)`;

export const categoriesQuery = groq`*[_type == "category"]{
  _id,
  name,
  "slug": slug.current,
  icon,
  description
} | order(name asc)`;

export const postsQuery = groq`*[_type == "post"]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage{
    "url": asset->url
  },
  body,
  tags,
  publishedAt
} | order(publishedAt desc)`;

export const appBySlugQuery = groq`*[_type == "app" && slug.current == $slug][0]{
  ...,
  "slug": slug.current,
  "heroImage": heroImage.asset->url,
  "screenshots": screenshots[]{
    "url": asset->url,
    alt
  },
  "category": category->{
    _id,
    name,
    "slug": slug.current,
    icon,
    description
  }
}`;

export const appsByCategoryQuery = groq`*[_type == "app" && category->slug.current == $slug]{
  _id,
  title,
  "slug": slug.current,
  shortDescription,
  heroImage{
    "url": asset->url
  },
  version,
  downloads,
  "category": category->{
    _id,
    name,
    "slug": slug.current
  }
} | order(downloads desc)`;

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage{
    "url": asset->url
  },
  body,
  tags,
  publishedAt
}`;
