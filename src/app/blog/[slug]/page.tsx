import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, Tag } from "lucide-react";

import { getPosts, getPostBySlug } from "@/lib/sanity";
import { buildMetadata } from "@/lib/seo";
import { RichText } from "@/components/rich-text";
import { Badge } from "@/components/ui/badge";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
  props: Props,
): Promise<Metadata | undefined> {
  const params = await props.params;
  const post = await getPostBySlug(params.slug);
  if (!post) return;

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    images: post.coverImage ? [post.coverImage] : undefined,
  });
}

export default async function BlogPostPage(props: Props) {
  const params = await props.params;
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <header className="space-y-4 text-center">
        <Badge variant="outline" className="mx-auto w-fit">
          Editorial
        </Badge>
        <h1 className="text-4xl font-semibold text-slate-900">{post.title}</h1>
        <p className="text-lg text-slate-500">{post.excerpt}</p>
        <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
          <span className="inline-flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString()}
            </time>
          </span>
          <span className="inline-flex items-center gap-2">
            <Tag className="h-4 w-4" />
            {post.tags.join(", ")}
          </span>
        </div>
      </header>

      {post.coverImage ? (
        <div className="relative h-72 w-full overflow-hidden rounded-3xl border border-border md:h-96">
          <Image
            src={`${post.coverImage}?w=1400&h=700&fit=crop`}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 720px, 100vw"
          />
        </div>
      ) : null}

      <div className="prose max-w-none text-base text-slate-600">
        <RichText value={post.body} />
      </div>
    </article>
  );
}
