import Image from 'next/image';
import Link from 'next/link';
import type { Post } from '@/types/sanity';
import { formatDate } from '@/lib/utils';

interface BlogCardProps {
  post: Post;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="flex flex-col gap-4 rounded-xl border border-slate-800 bg-slate-950/60 p-5">
      {post.coverImage?.url && (
        <div className="relative h-40 w-full overflow-hidden rounded-lg">
          <Image
            src={post.coverImage.url}
            alt={post.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="flex-1">
        <Link href={`/blog/${post.slug}`} className="text-lg font-semibold text-white">
          {post.title}
        </Link>
        <p className="mt-2 line-clamp-3 text-sm text-slate-400">{post.excerpt}</p>
      </div>
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>{formatDate(post.publishedAt)}</span>
        <div className="flex flex-wrap gap-2 text-hippo">
          {post.tags.map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </div>
      </div>
    </article>
  );
}
