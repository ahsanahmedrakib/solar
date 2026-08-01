"use client";

import Reveal from "@/components/Common/Reveal";
import { DEFAULT_BLOGS } from "@/data/blogs";
import { useQueryBlogs } from "@/lib/queries";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import BlogsCard from "../Blogs/BlogsCard";

export default function Blogs() {
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

  // if (blogs?.length === 0) return null;

  return (
    <section className="bg-white py-20 lg:py-25 font-sans overflow-x-hidden">
      <div className="solar-container space-y-12 lg:space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
          <div className="lg:col-span-7 space-y-4">
            <Reveal variant="fade-up">
              <span className="section-eyebrow">Latest Blogs</span>
            </Reveal>
            <Reveal variant="fade-up" delay={100}>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-[52px] font-bold text-accent-500 tracking-tight leading-[1.1]">
                Insights, trend and updates from the solar industry
              </h2>
            </Reveal>
          </div>

          <Reveal variant="fade-up" delay={180} className="lg:col-span-5">
            <div className="space-y-5 lg:pl-6">
              <p className="text-[#888888] text-sm sm:text-base font-normal leading-relaxed">
                Stay up to date with in-depth insights, emerging trends, and
                important updates from the solar industry. Our articles cover
                everything from new.
              </p>
              <Link href="/blogs" className="btn-brand group inline-flex">
                View All Blogs
                <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
          </Reveal>
        </div>

        <BlogsCard blogs={blogs?.slice(0, 3)} />
      </div>
    </section>
  );
}
