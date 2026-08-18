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
      <div className="solar-container px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:items-start">
          {/* ================= LEFT SIDEBAR ================= */}
          <aside className="w-full lg:w-[30%] lg:sticky lg:top-6 flex flex-col gap-6 shrink-0">
            <Reveal
              variant="fade-up"
              className="bg-secondary rounded-lg overflow-hidden border border-white shadow-sm"
            >
              <div className="font-heading bg-accent-500 text-white px-5 py-4 font-bold text-sm tracking-wide uppercase border border-b">
                Explore Our Blogs
              </div>
              <nav className="flex flex-col">
                {loading
                  ? Array.from({ length: 6 })?.map((_, i) => (
                      <div
                        key={i}
                        className="h-11 px-5 bg-gray-100 animate-pulse border-b border-forest-700/10"
                      />
                    ))
                  : allBlogs?.map((b) => (
                      <Link
                        key={b.id}
                        href={"/blogs/" + b.slug}
                        className={`flex items-center justify-between px-5 py-3.5 text-xs font-bold border-b border-forest-700/10 last:border-0 text-left transition-colors ${
                          b.slug === slug
                            ? "bg-accent-500 text-white"
                            : "text-accent-500 hover:bg-white"
                        }`}
                      >
                        <span>{b.title}</span>
                        <span className="text-base font-normal">→</span>
                      </Link>
                    ))}
              </nav>
            </Reveal>
          </aside>

          {/* ================= RIGHT MAIN CONTENT ================= */}
          <main className="w-full lg:w-[70%] flex flex-col gap-12 lg:pl-4">
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
                <p className="font-heading text-lg font-semibold text-accent-500">
                  Blog post not found
                </p>
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
      </div>
    </div>
  );
}

export default function SingleBlogPage({ slug }: { slug: string }) {
  return <SingleBlogPageInner key={slug} slug={slug} />;
}