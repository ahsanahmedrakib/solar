"use client";

import { DEFAULT_BLOGS } from "@/data/blogs";
import { useQueryBlogs } from "@/lib/queries";
import { useMemo } from "react";
import BlogsCard from "./BlogsCard";

export default function BlogsContents() {
  const { data: rawBlogs = [], isFetching: loading } = useQueryBlogs();

  const blogs = useMemo(() => {
    if (rawBlogs?.length > 0) return rawBlogs;
    return DEFAULT_BLOGS;
  }, [rawBlogs]);

  if (loading) {
    return (
      <section className="bg-white py-20 lg:py-25 font-sans overflow-x-hidden">
        <div className="solar-container space-y-12 lg:space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
            <div className="lg:col-span-7 space-y-4">
              <div className="h-6 w-28 rounded-full bg-gray-200 animate-pulse" />
              <div className="h-12 w-full max-w-xl rounded bg-gray-200 animate-pulse" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 })?.map((_, i) => (
              <div
                key={i}
                className="relative w-full aspect-[0.84/1] rounded-lg bg-gray-200 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="py-20 lg:py-25 bg-white">
      <div className="solar-container">
        <BlogsCard blogs={blogs} />
      </div>
    </div>
  );
}

