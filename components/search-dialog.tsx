'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Loader2, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

type SearchResult = {
  _id: string;
  title: string;
  slug: string;
  version?: string;
  developer?: string;
  category?: {
    slug: string;
    name: string;
  };
};

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);

  async function runSearch(value: string) {
    setQuery(value);
    if (!value.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`/api/search?query=${encodeURIComponent(value)}`);
      const data = (await response.json()) as { results?: SearchResult[] };
      setResults(data.results ?? []);
    } catch (error) {
      console.error('Search failed', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button variant="ghost" className="gap-2 bg-transparent px-3 py-2 text-slate-200 hover:bg-slate-800">
          <Search className="h-4 w-4" />
          <span className="hidden sm:inline">Search apps</span>
          <span className="text-xs text-slate-500 sm:hidden">Search</span>
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60" />
        <Dialog.Content className="fixed left-1/2 top-24 w-[90vw] max-w-xl -translate-x-1/2 rounded-lg border border-slate-800 bg-slate-900 p-6 shadow-2xl">
          <Dialog.Title className="text-lg font-semibold text-white">Search apps</Dialog.Title>
          <input
            className="mt-4 w-full rounded-md border border-slate-800 bg-slate-950 px-4 py-2 text-sm text-white focus:border-hippo focus:outline-none"
            placeholder="Search by name, developer or category"
            value={query}
            onChange={(event) => runSearch(event.target.value)}
            autoFocus
          />
          <div className="mt-4 max-h-80 space-y-2 overflow-y-auto">
            {isLoading && (
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Loader2 className="h-4 w-4 animate-spin" />
                Searching...
              </div>
            )}
            {!isLoading && query && results.length === 0 && (
              <p className="text-sm text-slate-400">No results. Try another keyword.</p>
            )}
            {results.map((result) => (
              <Link
                key={result._id}
                href={`/apps/${result.slug}`}
                onClick={() => setOpen(false)}
                className={cn(
                  'block rounded-md border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-200 transition hover:border-hippo hover:text-white'
                )}
              >
                <span className="font-semibold text-white">{result.title}</span>
                {result.version && <span className="ml-2 text-xs text-slate-500">v{result.version}</span>}
                <div className="text-xs text-slate-500">{result.developer}</div>
                {result.category && (
                  <div className="text-xs text-hippo">#{result.category.name}</div>
                )}
              </Link>
            ))}
          </div>
          <Dialog.Close asChild>
            <button className="absolute right-4 top-4 text-slate-500 hover:text-white">Esc</button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
