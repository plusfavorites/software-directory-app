import type { Metadata } from "next";
import { getPosts } from "@/lib/sanity";
import { BlogCard } from "@/components/blog-card";
import { SectionHeading } from "@/components/section-heading";

export const revalidate = 120;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Release notes, optimization tips, and editorials for download enthusiasts.",
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="space-y-8">
      <SectionHeading
        title="Ridnt Journal"
        description="Stories about the software we spotlight."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
