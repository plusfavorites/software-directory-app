import type { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';
import { Archivo } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { siteDescription, siteKeywords, siteName, siteUrl } from '@/lib/site-config';

const archivo = Archivo({ subsets: ['latin'], variable: '--font-archivo' });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — Modern Software Downloads`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: siteKeywords,
  openGraph: {
    title: `${siteName} — Modern Software Downloads`,
    description: siteDescription,
    siteName,
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} — Modern Software Downloads`,
    description: siteDescription,
  },
  alternates: {
    canonical: siteUrl,
    types: {
      'application/rss+xml': '/api/rss',
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#0B63CE',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={archivo.variable}>
      <body className="bg-slate-950">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 bg-slate-900">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
