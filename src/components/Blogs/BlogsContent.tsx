"use client";

import { DEFAULT_BLOGS, type Blog } from "@/data/blogs";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BlogsContents() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBlogs() {
      try {
        const res = await fetch("/api/blogs");
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setBlogs(json.data);
        } else {
          setBlogs(DEFAULT_BLOGS);
        }
      } catch (error) {
        console.error("Failed to load blogs", error);
        setBlogs(DEFAULT_BLOGS);
      } finally {
        setLoading(false);
      }
    }
    loadBlogs();
  }, []);

  return (
    <div className="mx-auto px-4 md:px-8 lg:px-20 py-20 bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 6 })?.map((_, i) => (
              <div
                key={i}
                className="h-105 rounded-2xl overflow-hidden bg-gray-200 animate-pulse"
              />
            ))
          : blogs?.map((blog, index) => (
              <div
                key={blog.id || index}
                className="relative h-105 rounded-2xl overflow-hidden shadow-md group flex flex-col justify-between p-6 text-white"
                style={{
                  backgroundImage: `url(${blog.imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/10 z-0" />

                <div className="relative z-10 self-start">
                  <span className="inline-block bg-white/20 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-md border border-white/10 tracking-wide">
                    {blog.category}
                  </span>
                </div>

                <div className="relative z-10 flex flex-col gap-4 mt-auto">
                  <h3 className="text-xl lg:text-2xl font-semibold leading-snug tracking-tight">
                    {blog.title}
                  </h3>

                  <Link
                    href={"blogs/" + blog.slug}
                    className="flex items-center gap-2 text-sm font-medium w-fit group-hover:text-green-400 transition-colors duration-200"
                  >
                    <span>Read More</span>
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white group-hover:bg-green-600 transition-colors duration-200">
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
                          d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                        />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

