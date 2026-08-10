"use client";

import ImageSlider from "@/components/Common/ImageSlider";
import Reveal from "@/components/Common/Reveal";
import RevealImage from "@/components/Common/RevealImage";
import { DEFAULT_BLOGS, type Blog } from "@/data/blogs";
import { useQueryBlogs } from "@/lib/queries";
import Link from "next/link";

function SingleBlogPageInner({ slug }: { slug: string }) {
  const { data: rawBlogs = [], isFetching: blogsLoading } = useQueryBlogs();
  const allBlogs = rawBlogs?.length > 0 ? rawBlogs : DEFAULT_BLOGS;
  const blog = allBlogs.find((b: Blog) => b.slug === slug) ?? null;
  const loading = blogsLoading;

  return (
    <div className="bg-white min-h-screen text-accent-500 font-sans antialiased">
      <main className="max-w-4xl mx-auto px-4 py-12 sm:px-6 md:py-20 flex flex-col gap-8">
        {loading ? (
          <div className="animate-pulse flex flex-col gap-6">
            <div className="w-full h-56 sm:h-96 md:h-112.5 rounded-lg bg-gray-200" />
            <div className="space-y-3">
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-5/6 rounded bg-gray-200" />
              <div className="h-4 w-4/6 rounded bg-gray-200" />
            </div>
            <div className="space-y-3">
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-3/4 rounded bg-gray-200" />
            </div>
          </div>
        ) : blog ? (
          <>
            <div className="flex flex-col">
              <RevealImage className="w-full h-56 sm:h-96 md:h-112.5 rounded-lg overflow-hidden shadow-md border border-gray-100">
                <ImageSlider
                  cover={blog.imageUrl}
                  images={blog.images}
                  alt={blog.title}
                />
              </RevealImage>
              <div className="single-image-pagination" />
            </div>

            <Reveal variant="fade-up">
              <article className="prose prose-gray max-w-none text-sm sm:text-base text-gray-600 leading-relaxed">
                <div dangerouslySetInnerHTML={{ __html: blog.blogDetails }} />
              </article>
            </Reveal>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <p className="text-lg font-semibold">Blog post not found</p>
            <Link
              href="/blogs"
              className="mt-4 text-accent-600 hover:underline"
            >
              ← Back to all blogs
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

export default function SingleBlogPage({ slug }: { slug: string }) {
  return <SingleBlogPageInner key={slug} slug={slug} />;
}
