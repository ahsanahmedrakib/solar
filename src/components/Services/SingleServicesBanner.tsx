import PageBanner from "@/components/Common/PageBanner";

export default function SingleServicesBanner({ title }: { title: string }) {
  return (
    <PageBanner
      title={title}
      crumb={title}
      crumbParent={{ label: "Services", href: "/services" }}
    />
  );
}
