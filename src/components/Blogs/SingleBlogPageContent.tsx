"use client";

import SingleBlogBanner from "./SingleBlogBanner";
import SingleBlogPage from "./SingleBlogPage";

export default function SingleBlogPageContent({ slug, title }: { slug: string; title: string }) {
  return (
    <>
      <SingleBlogBanner title={title} date="" category="" />
      <SingleBlogPage slug={slug} />
    </>
  );
}
