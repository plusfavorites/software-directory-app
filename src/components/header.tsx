import Link from "next/link";
import { Download, Newspaper } from "lucide-react";

import { getSearchIndex } from "@/lib/sanity";
import { Button } from "@/components/ui/button";
import { SearchDrawer } from "@/components/search/search-drawer";

export async function Header() {
  const searchIndex = await getSearchIndex();

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
            FH
          </span>
          <div className="hidden flex-col text-left leading-tight sm:flex">
            <span>Ridnt</span>
            <span className="text-xs font-normal text-slate-500">
              Software directory
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          <Link href="/apps" className="hover:text-slate-900">
            Apps
          </Link>
          <Link href="/categories" className="hover:text-slate-900">
            Categories
          </Link>
          <Link href="/blog" className="hover:text-slate-900">
            Blog
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <SearchDrawer apps={searchIndex} />
          <Button asChild variant="secondary" className="hidden sm:inline-flex">
            <Link href="/blog">
              <Newspaper className="mr-2 h-4 w-4" />
              Insights
            </Link>
          </Button>
          <Button asChild className="hidden lg:inline-flex">
            <Link href="/apps">
              <Download className="mr-2 h-4 w-4" />
              Browse apps
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
