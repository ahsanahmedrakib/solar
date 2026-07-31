import { MainSitePageLoading } from "@/components/Common/MainSitePageLoading";
import JsonLd from "@/components/SEO/JsonLd";
import { FACEBOOK_PAGE_URL, SITE_URL } from "@/lib/config";
import { absoluteUrl, getSiteInfo } from "@/lib/site";
import dynamic from "next/dynamic";

const HomePage = dynamic(() => import("@/components/Home/HomePage"), {
  loading: () => <MainSitePageLoading />,
});

export default async function Home() {
  const info = await getSiteInfo();

  const sameAs = [
    info.facebookUrl || FACEBOOK_PAGE_URL,
    info.linkedinUrl,
  ].filter((url): url is string => Boolean(url));

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: info.companyName,
    url: SITE_URL,
    logo: absoluteUrl(info.logo),
    description: info.metaDescription || info.tagline,
    email: info.email,
    telephone: info.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: info.address,
      addressCountry: "BD",
    },
    sameAs,
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: info.companyName,
    url: SITE_URL,
  };

  return (
    <div>
      <JsonLd data={organization} />
      <JsonLd data={website} />
      <HomePage />
    </div>
  );
}

