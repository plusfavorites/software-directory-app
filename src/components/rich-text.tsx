"use client";

import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={`${value?.asset?._ref || value?.asset?._id}`}
        alt={value?.alt ?? ""}
        className="my-6 rounded-xl"
      />
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noreferrer"
        className="text-brand underline underline-offset-2"
      >
        {children}
      </a>
    ),
  },
};

type Props = {
  value: PortableTextBlock[];
};

export function RichText({ value }: Props) {
  return <PortableText value={value} components={components} />;
}
