import data from "../../data/sample-data.json" assert { type: "json" };

const categoryDocs = data.categories.map((category) => ({
  _type: "category",
  _id: category._id,
  name: category.name,
  slug: { _type: "slug", current: category.slug },
  icon: category.icon,
  description: category.description,
}));

const appDocs = data.apps.map((app) => ({
  _type: "app",
  _id: app._id,
  title: app.title,
  slug: { _type: "slug", current: app.slug },
  version: app.version,
  os: app.os,
  developer: app.developer,
  category: {
    _type: "reference",
    _ref: app.categoryId,
  },
  description: app.description,
  shortDescription: app.shortDescription,
  downloadLinks: app.downloadLinks,
  releaseDate: app.releaseDate,
  downloads: app.downloads,
}));

const postDocs = data.posts.map((post) => ({
  _type: "post",
  _id: post._id,
  title: post.title,
  slug: { _type: "slug", current: post.slug },
  excerpt: post.excerpt,
  body: post.body,
  tags: post.tags,
  publishedAt: post.publishedAt,
}));

export const seedDocuments = [...categoryDocs, ...appDocs, ...postDocs];
