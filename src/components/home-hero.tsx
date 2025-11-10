import Link from "next/link";
import { Download, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-border bg-slate-900 px-8 py-16 text-white">
      <div className="max-w-2xl space-y-6">
        <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-200">
          Curated mirrors - No malware
          <ShieldCheck className="h-4 w-4" />
        </p>
        <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
          Download trusted desktop apps, without the noise.
        </h1>
        <p className="text-lg text-slate-200">
          Ridnt indexes hand-reviewed releases with clean changelogs,
          related alternatives, and global mirror links so your download is
          always fast and verified.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/apps">
              <Download className="mr-2 h-5 w-5" />
              Browse latest releases
            </Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href="/categories">Explore categories</Link>
          </Button>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle,_rgba(255,255,255,0.08)_0%,_transparent_70%)] md:block" />
    </section>
  );
}
