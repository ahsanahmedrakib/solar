import dynamic from "next/dynamic";
import { MainSitePageLoading } from "@/components/Common/MainSitePageLoading";

const SingleProjectPage = dynamic(
  () => import("@/components/Projects/SingleProjectPage"),
  { loading: () => <MainSitePageLoading /> },
);

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const title = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  return (
    <div>
      <SingleProjectPage slug={slug} title={title} />
    </div>
  );
}
