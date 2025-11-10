import type { Metadata } from "next";
import { buildAbsoluteUrl } from "@/lib/site-url";

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
  const url = buildAbsoluteUrl(path);
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
