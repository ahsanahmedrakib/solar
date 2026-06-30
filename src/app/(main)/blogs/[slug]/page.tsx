import SingleBlogBanner from "@/components/Blogs/SingleBlogBanner";
import SingleBlogPage from "@/components/Blogs/SingleBlogPage";

interface Props {
  params: Promise<{ slug: string }>;
}

const page = async ({ params }: Props) => {
  const { slug } = await params;
  const titleStr = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return (
    <div>
      <SingleBlogBanner title={titleStr} date="" category="" />
      <SingleBlogPage slug={slug} />
    </div>
  );
};

export default page;
