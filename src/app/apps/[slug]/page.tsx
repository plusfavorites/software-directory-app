import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Calendar, Monitor, User, Folder } from "lucide-react";

import { buildMetadata } from "@/lib/seo";
import { getAppBySlug, getApps } from "@/lib/sanity";
import { DownloadLinks } from "@/components/download-links";
import { Badge } from "@/components/ui/badge";
import { RelatedApps } from "@/components/related-apps";

export const revalidate = 120;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const apps = await getApps();
  return apps.map((app) => ({ slug: app.slug }));
}

export async function generateMetadata(
  props: Props,
): Promise<Metadata | undefined> {
  const params = await props.params;
  const app = await getAppBySlug(params.slug);
  if (!app) return;
  return buildMetadata({
    title: `${app.title} - Download`,
    description: app.shortDescription ?? app.description,
    path: `/apps/${app.slug}`,
    images: app.heroImage ? [app.heroImage] : undefined,
  });
}

export default async function AppDetailPage(props: Props) {
  const params = await props.params;
  const app = await getAppBySlug(params.slug);
  if (!app) notFound();

  return (
    <article className="space-y-10">
      <section className="grid gap-8 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-6">
          <div className="space-y-4">
            <Badge variant="outline" className="w-fit">
              {app.category.name}
            </Badge>
            <h1 className="text-4xl font-semibold text-slate-900">
              {app.title}
            </h1>
            <p className="text-lg text-slate-600">
              {app.shortDescription ?? app.description}
            </p>
          </div>

          <div className="relative h-72 w-full overflow-hidden rounded-3xl border border-border md:h-96">
            <Image
              src={
                app.heroImage
                  ? `${app.heroImage}?w=1400&h=700&fit=crop`
                  : "https://images.unsplash.com/photo-1527443224154-9c9e48047312?w=1400"
              }
              alt={app.title}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 60vw, 100vw"
            />
          </div>

          <div className="grid gap-4 rounded-3xl border border-border bg-white p-6 md:grid-cols-2">
            <InfoRow icon={<Monitor className="h-5 w-5" />} label="Platforms">
              {app.os?.length ? app.os.join(", ") : "All platforms"}
            </InfoRow>
            <InfoRow icon={<User className="h-5 w-5" />} label="Developer">
              {app.developer}
            </InfoRow>
            <InfoRow icon={<Folder className="h-5 w-5" />} label="Category">
              {app.category.name}
            </InfoRow>
            <InfoRow icon={<Calendar className="h-5 w-5" />} label="Updated">
              {new Date(app.releaseDate).toLocaleDateString()}
            </InfoRow>
          </div>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-slate-900">Overview</h2>
            <p className="text-slate-600">{app.description}</p>
          </section>

          {app.screenshots?.length ? (
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-slate-900">
                Screenshots
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {app.screenshots.map((shot) => (
                  <div
                    key={shot.url}
                    className="relative h-56 w-full overflow-hidden rounded-2xl border border-border"
                  >
                    <Image
                      src={`${shot.url}?w=800&h=600&fit=crop`}
                      alt={shot.alt ?? app.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              Download mirrors
            </h2>
            <p className="mb-4 text-sm text-slate-500">
              Direct vendor links and community mirrors. No installers, no
              bundleware.
            </p>
            <DownloadLinks links={app.downloadLinks} />
          </div>

          <RelatedApps slug={app.slug} />
        </aside>
      </section>
    </article>
  );
}

type InfoRowProps = {
  icon: ReactNode;
  label: string;
  children: ReactNode;
};

function InfoRow({ icon, label, children }: InfoRowProps) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-surface px-4 py-3">
      <span className="text-brand">{icon}</span>
      <div>
        <p className="text-xs uppercase tracking-wide text-slate-400">
          {label}
        </p>
        <p className="font-medium text-slate-900">{children}</p>
      </div>
    </div>
  );
}



