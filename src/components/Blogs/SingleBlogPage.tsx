"use client";

import { DEFAULT_BLOGS, type Blog } from "@/data/blogs";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function SingleBlogPage({ slug }: { slug: string }) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  const [commentData, setCommentData] = useState({
    comment: "",
    name: "",
    email: "",
    website: "",
    saveInfo: false,
  });

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Comment Data Submitted:", commentData);
  };

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/blogs");
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const found = json.data.find((b: Blog) => b.slug === slug);
          if (found) setBlog(found);
        } else {
          const fallback = DEFAULT_BLOGS.find((b) => b.slug === slug);
          if (fallback) setBlog(fallback);
        }
      } catch (error) {
        console.error("Failed to load blog", error);
        const fallback = DEFAULT_BLOGS.find((b) => b.slug === slug);
        if (fallback) setBlog(fallback);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [slug]);

  return (
    <div className="bg-white min-h-screen text-[#011c2b] font-sans antialiased selection:bg-green-100">
      <main className="max-w-4xl mx-auto px-4 py-12 sm:px-6 md:py-20 flex flex-col gap-8">
        {loading ? (
          <div className="animate-pulse flex flex-col gap-6">
            <div className="w-full h-56 sm:h-96 md:h-112.5 rounded-2xl bg-gray-200" />
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
            <div
              className="w-full h-56 sm:h-96 md:h-112.5 rounded-2xl bg-cover bg-center shadow-md border border-gray-100"
              style={{ backgroundImage: `url('${blog.imageUrl}')` }}
            />

            <article className="prose prose-gray max-w-none text-sm sm:text-base text-gray-600 leading-relaxed">
              <div
                dangerouslySetInnerHTML={{ __html: blog.blogDetails }}
              />
            </article>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-y border-gray-100 py-6 my-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[#011c2b] text-xs font-bold mr-1">
                  Tags:
                </span>
                {blog.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-[#4caf50] hover:bg-[#43a047] text-white text-xs font-medium px-3 py-1 rounded transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2">
                {["f", "t", "in"].map((social, idx) => (
                  <button
                    key={idx}
                    className="w-8 h-8 rounded bg-[#4caf50] hover:bg-[#43a047] text-white text-xs font-bold flex items-center justify-center transition-colors uppercase"
                    aria-label={`Share on ${social}`}
                  >
                    {social}
                  </button>
                ))}
              </div>
            </div>

            <section className="mt-4">
              <h3 className="text-[#011c2b] text-xl font-bold tracking-tight mb-1">
                Leave a Reply
              </h3>
              <p className="text-gray-400 text-xs mb-6">
                Your email address will not be published. Required fields are
                marked *
              </p>

              <form
                onSubmit={handleCommentSubmit}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col gap-2">
                  <label className="text-[#011c2b] text-xs font-bold tracking-wide">
                    Comment *
                  </label>
                  <textarea
                    rows={6}
                    required
                    className="w-full bg-[#f4f7f9] rounded-xl px-4 py-3 border-none outline-none focus:ring-2 focus:ring-[#4caf50] text-sm text-[#011c2b] transition-all resize-none"
                    value={commentData.comment}
                    onChange={(e) =>
                      setCommentData({
                        ...commentData,
                        comment: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[#011c2b] text-xs font-bold tracking-wide">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full bg-[#f4f7f9] rounded-xl px-4 py-3 border-none outline-none focus:ring-2 focus:ring-[#4caf50] text-sm text-[#011c2b] transition-all"
                      value={commentData.name}
                      onChange={(e) =>
                        setCommentData({
                          ...commentData,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[#011c2b] text-xs font-bold tracking-wide">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full bg-[#f4f7f9] rounded-xl px-4 py-3 border-none outline-none focus:ring-2 focus:ring-[#4caf50] text-sm text-[#011c2b] transition-all"
                      value={commentData.email}
                      onChange={(e) =>
                        setCommentData({
                          ...commentData,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[#011c2b] text-xs font-bold tracking-wide">
                      Website
                    </label>
                    <input
                      type="url"
                      className="w-full bg-[#f4f7f9] rounded-xl px-4 py-3 border-none outline-none focus:ring-2 focus:ring-[#4caf50] text-sm text-[#011c2b] transition-all"
                      value={commentData.website}
                      onChange={(e) =>
                        setCommentData({
                          ...commentData,
                          website: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="flex items-start gap-2.5 mt-2">
                  <input
                    id="saveInfo"
                    type="checkbox"
                    className="w-4 h-4 rounded text-[#4caf50] focus:ring-[#4caf50] border-gray-300 mt-0.5 accent-[#4caf50] cursor-pointer"
                    checked={commentData.saveInfo}
                    onChange={(e) =>
                      setCommentData({
                        ...commentData,
                        saveInfo: e.target.checked,
                      })
                    }
                  />
                  <label
                    htmlFor="saveInfo"
                    className="text-gray-500 text-xs select-none cursor-pointer leading-normal"
                  >
                    Save my name, email, and website in this browser for the next
                    time I comment.
                  </label>
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    className="bg-[#4caf50] hover:bg-[#43a047] text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-lg shadow-sm transition-colors duration-150"
                  >
                    Post Comment
                  </button>
                </div>
              </form>
            </section>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <p className="text-lg font-semibold">Blog post not found</p>
            <Link
              href="/blogs"
              className="mt-4 text-[#4caf50] hover:underline"
            >
              ← Back to all blogs
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
