import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
      <span className="rounded-full border border-hippo/40 bg-hippo/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-hippo">
        404 — Not found
      </span>
      <h1 className="mt-6 text-4xl font-bold text-white">We couldn&apos;t find that page</h1>
      <p className="mt-4 text-base text-slate-400">
        The link may be outdated or the content was removed. Use the navigation above or return to the home page to explore the latest downloads and articles.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild className="gap-2">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </Button>
        <Button
          asChild
          variant="ghost"
          className="border border-slate-800 bg-slate-900/60 text-slate-200 hover:bg-slate-800"
        >
          <Link href="/categories">
            Browse categories
          </Link>
        </Button>
      </div>
    </div>
  );
}
