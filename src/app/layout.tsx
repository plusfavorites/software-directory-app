import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { siteUrl } from "@/lib/site-url";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "FileWave - FileHippo-style software directory",
    template: "%s | FileWave",
  },
  description:
    "Discover trusted desktop apps, curated mirror links, and daily software news powered by Sanity + Next.js.",
  keywords: [
    "FileHippo alternative",
    "software download directory",
    "Next.js Sanity starter",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} bg-surface antialiased`}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="container flex-1 space-y-12 py-10">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
