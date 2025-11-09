import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { client } from '@/lib/sanity.client';
import { categoriesQuery, categoryAppsQuery } from '@/lib/queries';
import type { App, Category } from '@/types/sanity';
import { AppCard } from '@/components/app-card';

interface CategoryPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const categories = await client.fetch<Category[]>(categoriesQuery);
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const categories = await client.fetch<Category[]>(categoriesQuery);
  const category = categories.find((item) => item.slug === params.slug);
  if (!category) {
    return {
      title: 'Category not found',
    };
  }
  return {
    title: `${category.name} downloads`,
    description: `Download the best ${category.name} apps with trusted mirror links.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const categories = await client.fetch<Category[]>(categoriesQuery);
  const category = categories.find((item) => item.slug === params.slug);

  if (!category) {
    notFound();
  }

  const apps = await client.fetch<App[]>(categoryAppsQuery, { slug: params.slug });

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-bold text-white">{category.name} software downloads</h1>
      <p className="mt-2 text-slate-400">
        Browse trusted releases within the {category.name} category and download them via fast mirror links.
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {apps.map((app) => (
          <AppCard key={app._id} app={app} />
        ))}
      </div>
      {apps.length === 0 && <p className="mt-6 text-sm text-slate-400">No apps yet in this category.</p>}
    </div>
  );
}
