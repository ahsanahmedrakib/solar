import ClientProviders from "@/components/Common/ClientProviders";
import { LazyLayout } from "@/components/Common/LazyLayout";
import { DEFAULT_OG_IMAGE, FACEBOOK_PAGE_ID, SITE_URL } from "@/lib/config";
import { absoluteUrl, getSiteInfo } from "@/lib/site";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export const dynamic = "force-dynamic";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const { companyName, tagline, metaTitle, metaDescription, keywords, favicon } =
    await getSiteInfo();

  const defaultDescription = metaDescription || tagline;
  const defaultTitle = metaTitle || companyName;
  const ogImage = absoluteUrl(DEFAULT_OG_IMAGE);

  const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
      default: defaultTitle,
      template: `%s | ${companyName}`,
    },
    description: defaultDescription,
    alternates: { canonical: "/" },
    openGraph: {
      title: defaultTitle,
      description: defaultDescription,
      url: SITE_URL,
      siteName: companyName,
      locale: "en_US",
      type: "website",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: defaultTitle,
      description: defaultDescription,
      images: [ogImage],
    },
    other: {
      "fb:pages": FACEBOOK_PAGE_ID,
    },
  };

  const keywordList = keywords
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);
  if (keywordList.length > 0) metadata.keywords = keywordList;
  if (favicon) metadata.icons = { icon: favicon };

  return metadata;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ClientProviders>
          <LazyLayout>{children}</LazyLayout>
        </ClientProviders>
      </body>
    </html>
  );
}

