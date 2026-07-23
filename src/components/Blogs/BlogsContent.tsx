"use client";

import { DEFAULT_BLOGS } from "@/data/blogs";
import { useQueryBlogs } from "@/lib/queries";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

export default function BlogsContents() {
  const { data: rawBlogs = [], isFetching: loading } = useQueryBlogs();

  const blogs = useMemo(() => {
    if (rawBlogs?.length > 0) return rawBlogs;
    return DEFAULT_BLOGS;
  }, [rawBlogs]);

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
              <Link
                href={"blogs/" + blog.slug}
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

                  <div className="flex items-center gap-2 text-sm font-medium w-fit group-hover:text-green-400 transition-colors duration-200">
                    <span>Read More</span>
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white group-hover:bg-green-600 transition-colors duration-200">
                      <ArrowUpRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
}

