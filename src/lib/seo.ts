import type { Metadata } from "next";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  "https://software-directory-app.vercel.app";

type SeoInput = {
  title: string;
  description: string;
  path?: string;
  images?: string[];
};

export function buildMetadata({
  title,
  description,
  path = "",
  images = [],
}: SeoInput): Metadata {
  const url = new URL(path, baseUrl).toString();
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images: images.length ? images.map((src) => ({ url: src })) : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images.length ? images : undefined,
    },
  };
}
