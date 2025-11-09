import Link from 'next/link';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { App } from '@/types/sanity';
import { formatDate } from '@/lib/utils';

interface AppCardProps {
  app: App;
}

export function AppCard({ app }: AppCardProps) {
  return (
    <article className="flex flex-col gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-5 transition hover:border-hippo hover:bg-slate-900/80">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Link href={`/apps/${app.slug}`} className="text-lg font-semibold text-white">
            {app.title}
          </Link>
          <p className="text-xs uppercase tracking-wide text-hippo">v{app.version}</p>
        </div>
        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">{app.category.name}</span>
      </div>
      <p className="line-clamp-3 text-sm text-slate-400">{app.description}</p>
      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
        <span>Developer: {app.developer}</span>
        <span>Updated: {formatDate(app.releaseDate)}</span>
      </div>
      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
        {app.os.map((os) => (
          <span key={os} className="rounded-full bg-slate-800 px-2 py-1">
            {os}
          </span>
        ))}
      </div>
      <Button asChild className="mt-auto gap-2">
        <Link href={`/apps/${app.slug}`}>
          <Download className="h-4 w-4" /> View downloads
        </Link>
      </Button>
    </article>
  );
}
