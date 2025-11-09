import Link from "next/link";
import { LucideIcon, Boxes, Globe, Play, Zap } from "lucide-react";
import type { Category } from "@/types/content";
import { Card } from "@/components/ui/card";

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Play,
  Utilities: Boxes,
  Default: Zap,
};

type Props = {
  category: Category;
  appCount?: number;
};

export function CategoryCard({ category, appCount }: Props) {
  const Icon =
    iconMap[category.icon ?? ""] ?? iconMap[category.name] ?? iconMap.Default;

  return (
    <Card className="p-5 transition hover:-translate-y-1">
      <Link href={`/categories/${category.slug}`} className="flex flex-col gap-3">
        <Icon className="h-8 w-8 text-brand" />
        <div>
          <p className="text-lg font-semibold text-slate-900">{category.name}</p>
          <p className="text-sm text-slate-500">
            {category.description ?? "Browse curated tools"}
          </p>
        </div>
        {appCount !== undefined ? (
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            {appCount} apps
          </p>
        ) : null}
      </Link>
    </Card>
  );
}
