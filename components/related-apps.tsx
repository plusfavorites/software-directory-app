import Link from 'next/link';
import type { App } from '@/types/sanity';

interface RelatedAppsProps {
  apps: App[];
}

export function RelatedApps({ apps }: RelatedAppsProps) {
  if (!apps.length) {
    return null;
  }

  return (
    <section className="mt-10">
      <h3 className="text-lg font-semibold text-white">Related apps</h3>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {apps.map((app) => (
          <Link
            key={app._id}
            href={`/apps/${app.slug}`}
            className="block rounded-lg border border-slate-800 bg-slate-950/50 p-4 text-sm text-slate-300 transition hover:border-hippo hover:text-white"
          >
            <div className="font-semibold text-white">{app.title}</div>
            <div className="text-xs text-slate-400">v{app.version}</div>
            <div className="mt-2 text-xs uppercase tracking-wide text-hippo">{app.category.name}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
