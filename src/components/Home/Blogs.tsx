"use client";

import type { Blog } from "@/data/blogs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBlogs() {
      try {
        const res = await fetch("/api/blogs");
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const sorted = json.data.sort(
            (a: Blog, b: Blog) =>
              new Date(b.date).getTime() - new Date(a.date).getTime(),
          );
          setBlogs(sorted.slice(0, 3));
        }
      } catch (error) {
        console.error("Failed to load blogs", error);
      } finally {
        setLoading(false);
      }
    }
    loadBlogs();
  }, []);

  if (loading) {
    return (
      <section className="bg-white py-16 px-4 sm:px-6 lg:py-24 lg:px-20 mx-auto font-sans overflow-x-hidden">
        <div className="space-y-12 lg:space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
            <div className="lg:col-span-7 space-y-4">
              <div className="h-6 w-28 rounded-full bg-gray-200 animate-pulse" />
              <div className="h-12 w-full max-w-xl rounded bg-gray-200 animate-pulse" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="relative w-full aspect-[0.84/1] rounded-4xl bg-gray-200 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (blogs.length === 0) return null;

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:py-24 lg:px-20 mx-auto font-sans overflow-x-hidden">
      <div className="space-y-12 lg:space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#F3F4F6] px-3 py-1.5 rounded-full text-xs font-semibold text-gray-700">
              <span className="w-1.5 h-1.5 bg-accent-600 rounded-full"></span>
              Latest Blogs
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#051720] tracking-tight leading-[1.15]">
              Insights, trend and updates from the solar industry
            </h2>
          </div>

          <div className="lg:col-span-5 space-y-5 lg:pl-6">
            <p className="text-gray-500 text-sm sm:text-base font-normal leading-relaxed">
              Stay up to date with in-depth insights, emerging trends, and
              important updates from the solar industry. Our articles cover
              everything from new.
            </p>
            <div>
              <button className="inline-flex items-center gap-2 bg-accent-600 hover:bg-[#399d3e] transition-colors text-white font-semibold text-sm px-6 py-3.5 rounded-lg shadow-sm group">
                View All Blogs
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-4 h-4 transform transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="relative w-full aspect-[0.84/1] rounded-4xl overflow-hidden group shadow-md bg-gray-100"
            >
              <Image
                src={blog.imageUrl}
                alt={blog.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/10 z-10" />

              <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between z-20">
                <div>
                  <span className="inline-block bg-white/20 backdrop-blur-md text-white text-[11px] sm:text-xs font-semibold px-3 py-1.5 rounded-md tracking-wide">
                    {blog.category}
                  </span>
                </div>

                <div className="space-y-4 sm:space-y-5">
                  <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug tracking-tight">
                    {blog.title}
                  </h3>

                  <Link href={"blogs/" + blog.slug}>
                    <div className="flex items-center gap-2 pt-1 border-t border-white/10">
                      <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
                        Read More
                      </span>
                      <div className="w-6 h-6 rounded-full bg-accent-600 text-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2.5}
                          stroke="currentColor"
                          className="w-3 h-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
