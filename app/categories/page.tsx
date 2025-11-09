import { client } from '@/lib/sanity.client';
import { categoriesQuery } from '@/lib/queries';
import type { Category } from '@/types/sanity';
import { CategoryPill } from '@/components/category-pill';

export const metadata = {
  title: 'Categories',
  description: 'Browse software downloads by category and discover trusted tools for every workflow.',
};

export default async function CategoriesPage() {
  const categories = await client.fetch<Category[]>(categoriesQuery);

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-bold text-white">Browse categories</h1>
      <p className="mt-2 text-slate-400">
        Explore desktop software by category to quickly find browsers, multimedia suites and utilities.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        {categories.map((category) => (
          <CategoryPill key={category._id} category={category} />
        ))}
      </div>
    </div>
  );
}
