import Link from "next/link";
import Image from "next/image";
import { Monitor, Download } from "lucide-react";

import type { App } from "@/types/content";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Props = {
  app: App;
  showCategory?: boolean;
};

export function AppCard({ app, showCategory = false }: Props) {
  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <Link
        href={`/apps/${app.slug}`}
        className="relative block h-40 w-full overflow-hidden"
      >
        <Image
          src={
            app.heroImage
              ? `${app.heroImage}?auto=format&fit=crop&w=600&q=80`
              : "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600"
          }
          alt={app.title}
          fill
          className="object-cover"
          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 backdrop-blur">
          v{app.version}
        </span>
      </Link>

      <CardHeader>
        {showCategory ? (
          <Badge variant="outline" className="w-fit">
            {app.category.name}
          </Badge>
        ) : null}
        <CardTitle className="line-clamp-1 text-xl">
          <Link href={`/apps/${app.slug}`}>{app.title}</Link>
        </CardTitle>
        <p className="text-sm text-slate-600">
          {app.shortDescription ?? app.description}
        </p>
      </CardHeader>
      <CardContent className="mt-auto">
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1">
            <Monitor className="h-4 w-4" />
            {app.os?.length ? app.os.join(", ") : "All platforms"}
          </span>
          {app.downloads ? (
            <span className="inline-flex items-center gap-1 text-slate-700">
              <Download className="h-4 w-4" />
              {Intl.NumberFormat("en", { notation: "compact" }).format(
                app.downloads,
              )}{" "}
              downloads
            </span>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
