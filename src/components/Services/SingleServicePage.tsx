"use client";

import SingleServicesBanner from "./SingleServicesBanner";
import SingleService from "./SingleService";

export default function SingleServicePage({ slug, title }: { slug: string; title: string }) {
  return (
    <>
      <SingleServicesBanner title={title} />
      <SingleService slug={slug} />
    </>
  );
}
