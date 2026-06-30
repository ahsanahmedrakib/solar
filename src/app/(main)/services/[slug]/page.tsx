import SingleService from "@/components/Services/SingleService";
import SingleServicesBanner from "@/components/Services/SingleServicesBanner";

interface Props {
  params: Promise<{ slug: string }>;
}

const page = async ({ params }: Props) => {
  const { slug } = await params;
  return (
    <div>
      <SingleServicesBanner title={slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} />
      <SingleService slug={slug} />
    </div>
  );
};

export default page;
