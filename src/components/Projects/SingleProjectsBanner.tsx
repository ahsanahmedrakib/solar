import PageBanner from "@/components/Common/PageBanner";

export default function SingleProjectsBanner({ title }: { title: string }) {
  return (
    <PageBanner
      title={title}
      crumb={title}
      crumbParent={{ label: "Projects", href: "/projects" }}
    />
  );
}
