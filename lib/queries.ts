import groq from 'groq';

export const appsQuery = groq`
  *[_type == "app"] | order(releaseDate desc) {
    _id,
    title,
    "slug": slug.current,
    version,
    os,
    developer,
    description,
    releaseDate,
    screenshots[]{"url": asset->url},
    downloadLinks,
    topDownloads,
    category->{
      _id,
      name,
      "slug": slug.current,
      icon
    }
  }
`;

export const appBySlugQuery = groq`
  *[_type == "app" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    version,
    os,
    developer,
    description,
    releaseDate,
    screenshots[]{"url": asset->url},
    downloadLinks,
    topDownloads,
    body,
    category->{
      _id,
      name,
      "slug": slug.current,
      icon
    }
  }
`;

export const relatedAppsQuery = groq`
  *[_type == "app" && references($categoryId) && slug.current != $slug][0...3] {
    _id,
    title,
    "slug": slug.current,
    version,
    downloadLinks,
    category->{
      name,
      "slug": slug.current
    }
  }
`;

export const categoriesQuery = groq`
  *[_type == "category"] | order(name asc) {
    _id,
    name,
    icon,
    "slug": slug.current
  }
`;

export const categoryAppsQuery = groq`
  *[_type == "app" && category->slug.current == $slug] {
    _id,
    title,
    "slug": slug.current,
    version,
    os,
    developer,
    description,
    releaseDate,
    downloadLinks,
    category->{
      _id,
      name,
      "slug": slug.current
    }
  }
`;

export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    coverImage{
      "url": asset->url
    },
    tags
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    body,
    publishedAt,
    coverImage{
      "url": asset->url
    },
    tags
  }
`;

export const searchAppsQuery = groq`
  *[_type == "app" && (title match $term || developer match $term || category->name match $term)] {
    _id,
    title,
    "slug": slug.current,
    version,
    developer,
    category->{
      name,
      "slug": slug.current
    }
  }
`;
