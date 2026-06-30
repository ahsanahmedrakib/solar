import dynamic from "next/dynamic";
import { MainSitePageLoading } from "@/components/Common/MainSitePageLoading";

const SingleServicePage = dynamic(
  () => import("@/components/Services/SingleServicePage"),
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
      <SingleServicePage slug={slug} title={title} />
    </div>
  );
}
