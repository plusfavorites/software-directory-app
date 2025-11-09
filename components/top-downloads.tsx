import Link from 'next/link';
import type { App } from '@/types/sanity';

interface TopDownloadsProps {
  apps: App[];
}

export function TopDownloads({ apps }: TopDownloadsProps) {
  if (!apps.length) return null;

  return (
    <section className="rounded-xl border border-hippo/40 bg-gradient-to-br from-hippo/20 via-slate-900 to-slate-950 p-6">
      <h2 className="text-lg font-semibold text-white">Top downloads</h2>
      <ul className="mt-4 space-y-3 text-sm text-slate-200">
        {apps.map((app) => (
          <li key={app._id} className="flex items-center justify-between gap-3">
            <div>
              <Link href={`/apps/${app.slug}`} className="font-semibold text-white">
                {app.title}
              </Link>
              <p className="text-xs text-slate-400">v{app.version}</p>
            </div>
            <Link
              href={`/apps/${app.slug}`}
              className="rounded-full border border-hippo px-3 py-1 text-xs text-hippo transition hover:bg-hippo hover:text-white"
            >
              Download
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
