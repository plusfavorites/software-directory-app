import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  getAppsByCategory,
  getCategoryBySlug,
  getCategories,
} from "@/lib/sanity";
import { AppCard } from "@/components/app-card";
import { SectionHeading } from "@/components/section-heading";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 120;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata(
  props: Props,
): Promise<Metadata | undefined> {
  const params = await props.params;
  const category = await getCategoryBySlug(params.slug);
  if (!category) return;

  return buildMetadata({
    title: `${category.name} downloads`,
    description:
      category.description ??
      `Browse the best ${category.name} apps with clean mirror links.`,
    path: `/categories/${category.slug}`,
  });
}

export default async function CategoryPage(props: Props) {
  const params = await props.params;
  const category = await getCategoryBySlug(params.slug);
  if (!category) notFound();

  const apps = await getAppsByCategory(category.slug);

  return (
    <div className="space-y-8">
      <SectionHeading
        title={`${category.name} apps`}
        description={
          category.description ??
          `${apps.length} curated downloads in ${category.name}.`
        }
      />
      {apps.length ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {apps.map((app) => (
            <AppCard key={app._id} app={app} />
          ))}
        </div>
      ) : (
        <p className="rounded-3xl border border-dashed border-border bg-white p-10 text-center text-slate-500">
          No apps in this category yet. Check back soon!
        </p>
      )}
    </div>
  );
}
