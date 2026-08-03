import PageBanner from "@/components/Common/PageBanner";

interface SolutionBannerProps {
  title: string;
  titleAccent: string;
  crumb: string;
}

export default function SolutionBanner({
  title,
  titleAccent,
  crumb,
}: SolutionBannerProps) {
  return (
    <PageBanner
      title={title}
      titleAccent={titleAccent}
      crumb={crumb}
      eyebrow="Solution"
    />
  );
}
