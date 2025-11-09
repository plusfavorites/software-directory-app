import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";
import type { BlogPost } from "@/types/content";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  post: BlogPost;
};

export function BlogCard({ post }: Props) {
  return (
    <Card className="overflow-hidden">
      <Link
        href={`/blog/${post.slug}`}
        className="relative block h-48 overflow-hidden"
      >
        <Image
          src={
            post.coverImage
              ? `${post.coverImage}?w=900&h=600&fit=crop`
              : "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900"
          }
          alt={post.title}
          fill
          className="object-cover"
          sizes="(min-width: 768px) 50vw, 100vw"
        />
      </Link>
      <CardHeader>
        <CardTitle className="text-xl">
          <Link href={`/blog/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </CardTitle>
        <p className="text-sm text-slate-500">{post.excerpt}</p>
      </CardHeader>
      <CardContent className="flex items-center gap-2 text-xs text-slate-500">
        <Calendar className="h-4 w-4" />
        <time dateTime={post.publishedAt}>
          {new Date(post.publishedAt).toLocaleDateString()}
        </time>
      </CardContent>
    </Card>
  );
}
