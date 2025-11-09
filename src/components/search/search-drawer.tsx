"use client";

import * as React from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import { Command, Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type SearchableApp = {
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  heroImage?: string;
};

type Props = {
  apps: SearchableApp[];
};

export function SearchDrawer({ apps }: Props) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const fuse = React.useMemo(
    () =>
      new Fuse(apps, {
        keys: ["title", "category", "shortDescription"],
        includeScore: true,
        threshold: 0.35,
      }),
    [apps],
  );

  const results = React.useMemo(() => {
    if (!query) return apps.slice(0, 5);
    return fuse.search(query).map((match) => match.item);
  }, [apps, fuse, query]);

  React.useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === "Escape") {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="group flex h-10 min-w-[160px] items-center justify-between gap-6 text-left text-sm text-slate-500"
      >
        <span className="flex items-center gap-2">
          <Search className="h-4 w-4 text-slate-400" />
          Search apps
        </span>
        <kbd className="flex items-center gap-1 rounded border border-border bg-white px-2 py-1 text-[10px] uppercase tracking-wide text-slate-400">
          <Command className="h-3 w-3" />
          K
        </kbd>
      </Button>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/60 px-4 py-10 backdrop-blur"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-3xl rounded-3xl border border-border bg-white shadow-2xl">
            <div className="flex items-center gap-2 border-b border-border px-6 py-4">
              <Search className="h-5 w-5 text-slate-400" />
              <Input
                autoFocus
                placeholder="Search for apps, categories, or developers..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="border-0 focus-visible:ring-0"
              />
              <Button
                size="icon"
                variant="ghost"
                aria-label="Close search"
                onClick={() => setOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="max-h-[420px] overflow-y-auto px-6 py-4">
              {results.length === 0 ? (
                <p className="py-8 text-center text-sm text-slate-500">
                  No apps match “{query}”.
                </p>
              ) : (
                <ul className="space-y-3">
                  {results.map((app) => (
                    <li key={app.slug}>
                      <Link
                        href={`/apps/${app.slug}`}
                        className="flex gap-4 rounded-2xl border border-transparent px-3 py-2 transition hover:border-border hover:bg-slate-50"
                        onClick={() => setOpen(false)}
                      >
                        <div
                          className={cn(
                            "hidden h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl bg-slate-200 sm:block",
                            !app.heroImage && "grid place-items-center text-xs",
                          )}
                        >
                          {app.heroImage ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={`${app.heroImage}?w=160&h=160&fit=crop`}
                              alt={app.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            app.title
                              .split(" ")
                              .map((word) => word[0])
                              .join("")
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900">
                            {app.title}
                          </p>
                          <p className="text-sm text-slate-600">
                            {app.shortDescription}
                          </p>
                          <Badge variant="outline" className="mt-2 w-fit">
                            {app.category}
                          </Badge>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
