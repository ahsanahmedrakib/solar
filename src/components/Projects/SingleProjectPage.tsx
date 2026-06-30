"use client";

import SingleProjectsBanner from "./SingleProjectsBanner";
import SingleProject from "./SingleProject";

export default function SingleProjectPage({ slug, title }: { slug: string; title: string }) {
  return (
    <>
      <SingleProjectsBanner title={title} />
      <SingleProject slug={slug} />
    </>
  );
}
