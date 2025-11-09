import { notFound } from 'next/navigation';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import type { Metadata } from 'next';
import { client } from '@/lib/sanity.client';
import { postBySlugQuery, postsQuery } from '@/lib/queries';
import type { Post } from '@/types/sanity';
import { formatDate } from '@/lib/utils';

interface BlogPostPageProps {
  params: { slug: string };
}

type BlogPostDetail = Post & { body: PortableTextBlock[] };

export async function generateStaticParams() {
  const posts = await client.fetch<Post[]>(postsQuery);
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await client.fetch<Post | null>(postBySlugQuery, { slug: params.slug });
  if (!post) {
    return {
      title: 'Post not found',
    };
  }
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      images: post.coverImage?.url ? [{ url: post.coverImage.url }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await client.fetch<BlogPostDetail | null>(postBySlugQuery, { slug: params.slug });

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <header className="space-y-4">
        <h1 className="text-4xl font-bold text-white">{post.title}</h1>
        <div className="text-sm text-slate-400">
          Published {formatDate(post.publishedAt)}
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-hippo">
          {post.tags?.map((tag: string) => (
            <span key={tag}>#{tag}</span>
          ))}
        </div>
      </header>
      {post.coverImage?.url && (
        <div className="relative mt-6 h-72 w-full overflow-hidden rounded-xl">
          <Image
            src={post.coverImage.url}
            alt={post.title}
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="prose prose-invert prose-slate mt-8 max-w-none">
        <PortableText value={post.body} />
      </div>
    </article>
  );
}
