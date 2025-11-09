import type { Metadata } from "next";

import { getCategories, getApps } from "@/lib/sanity";
import { CategoryCard } from "@/components/category-card";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Categories",
  description: "Filter FileWave downloads by platform and use case.",
};

export default async function CategoriesPage() {
  const [categories, apps] = await Promise.all([getCategories(), getApps()]);
  const counts = apps.reduce<Record<string, number>>((acc, app) => {
    acc[app.category.slug] = (acc[app.category.slug] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      <SectionHeading
        title="Browse categories"
        description="From browsers to multimedia and utilities, pick a lane."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard
            key={category._id}
            category={category}
            appCount={counts[category.slug] ?? 0}
          />
        ))}
      </div>
    </div>
  );
}
