import { getRelatedApps } from "@/lib/sanity";
import { AppCard } from "./app-card";

type Props = {
  slug: string;
};

export async function RelatedApps({ slug }: Props) {
  const related = await getRelatedApps(slug);
  if (!related.length) return null;

  return (
    <section className="space-y-4">
      <div>
        <h3 className="text-xl font-semibold text-slate-900">
          Related downloads
        </h3>
        <p className="text-sm text-slate-500">
          Similar apps in the same category you might like.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {related.map((app) => (
          <AppCard key={app._id} app={app} showCategory />
        ))}
      </div>
    </section>
  );
}
