import type { Metadata } from 'next';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import { notFound } from 'next/navigation';
import { client } from '@/lib/sanity.client';
import { appBySlugQuery, appsQuery, relatedAppsQuery } from '@/lib/queries';
import type { App } from '@/types/sanity';
import { formatDate } from '@/lib/utils';
import { DownloadButton } from '@/components/download-button';
import { RelatedApps } from '@/components/related-apps';
import type { DownloadLink } from '@/types/sanity';

interface AppPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const apps = await client.fetch<App[]>(appsQuery);
  return apps.map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({ params }: AppPageProps): Promise<Metadata> {
  const app = await client.fetch<App | null>(appBySlugQuery, { slug: params.slug });
  if (!app) {
    return {
      title: 'App not found',
    };
  }
  return {
    title: `${app.title} ${app.version}`,
    description: app.description,
    openGraph: {
      title: `${app.title} ${app.version}`,
      description: app.description,
      type: 'article',
    },
  };
}

type AppDetail = App & { body?: PortableTextBlock[] };

export default async function AppPage({ params }: AppPageProps) {
  const app = await client.fetch<AppDetail | null>(appBySlugQuery, { slug: params.slug });

  if (!app) {
    notFound();
  }

  const relatedApps = await client.fetch<App[]>(relatedAppsQuery, {
    categoryId: app.category?._id,
    slug: app.slug,
  });

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <article className="rounded-2xl border border-slate-800 bg-slate-950/60 p-8">
          <header className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-hippo px-3 py-1 text-xs uppercase text-hippo">
                {app.category?.name ?? 'Uncategorized'}
              </span>
              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">v{app.version}</span>
              <span className="text-xs text-slate-400">Updated {formatDate(app.releaseDate)}</span>
            </div>
            <h1 className="text-4xl font-bold text-white">{app.title}</h1>
            <p className="text-slate-300">{app.description}</p>
            <div className="flex flex-wrap gap-2 text-xs text-slate-400">
              {app.os?.map((os: string) => (
                <span key={os} className="rounded-full bg-slate-800 px-2 py-1">
                  {os}
                </span>
              ))}
            </div>
          </header>

          {app.screenshots?.length ? (
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {app.screenshots.map((shot, index) => (
                <div key={index} className="relative h-48 overflow-hidden rounded-lg border border-slate-800">
                  <Image
                    src={shot.url}
                    alt={`${app.title} screenshot ${index + 1}`}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          ) : null}

          {app.body && (
            <div className="prose prose-invert prose-slate mt-8 max-w-none">
              <PortableText value={app.body} />
            </div>
          )}
        </article>
        <aside className="space-y-6">
          <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
            <h2 className="text-lg font-semibold text-white">Mirror downloads</h2>
            <p className="mt-1 text-xs text-slate-400">
              Choose a mirror below. All downloads are hosted by the software vendor.
            </p>
            <div className="mt-4 space-y-3">
              {app.downloadLinks?.map((link: DownloadLink) => (
                <DownloadButton key={link.url} link={link} />
              ))}
            </div>
          </section>
          <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6 text-sm text-slate-300">
            <h2 className="text-lg font-semibold text-white">App details</h2>
            <ul className="mt-3 space-y-2">
              <li>
                <span className="font-semibold text-white">Developer:</span> {app.developer}
              </li>
              <li>
                <span className="font-semibold text-white">Release date:</span> {formatDate(app.releaseDate)}
              </li>
            </ul>
          </section>
        </aside>
      </div>
      <RelatedApps apps={relatedApps} />
    </div>
  );
}
