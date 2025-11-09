'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SearchDialog } from '@/components/search-dialog';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/categories/browsers', label: 'Browsers' },
  { href: '/categories/multimedia', label: 'Multimedia' },
  { href: '/categories/utilities', label: 'Utilities' },
  { href: '/blog', label: 'Blog' },
  { href: '/studio', label: 'Studio' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-hippo text-white">SW</span>
          <div>
            <span className="block text-base font-bold">SoftWave</span>
            <span className="block text-xs text-slate-400">Curated downloads</span>
          </div>
        </Link>
        <nav className="hidden gap-6 text-sm font-medium md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'transition hover:text-white',
                pathname === item.href ? 'text-white' : 'text-slate-400'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <SearchDialog />
      </div>
    </header>
  );
}
