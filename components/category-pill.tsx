import Link from 'next/link';
import type { Category } from '@/types/sanity';

interface CategoryPillProps {
  category: Category;
}

export function CategoryPill({ category }: CategoryPillProps) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950/50 px-4 py-2 text-sm text-slate-200 transition hover:border-hippo hover:text-white"
    >
      <span>{category.icon ?? '🗂️'}</span>
      <span>{category.name}</span>
    </Link>
  );
}
