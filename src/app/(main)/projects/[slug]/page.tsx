import SingleProject from "@/components/Projects/SingleProject";
import SingleProjectsBanner from "@/components/Projects/SingleProjectsBanner";

interface Props {
  params: Promise<{ slug: string }>;
}

const page = async ({ params }: Props) => {
  const { slug } = await params;
  return (
    <div>
      <SingleProjectsBanner title={slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} />
      <SingleProject slug={slug} />
    </div>
  );
};

export default page;
