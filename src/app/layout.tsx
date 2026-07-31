import ClientProviders from "@/components/Common/ClientProviders";
import { LazyLayout } from "@/components/Common/LazyLayout";
import { getSiteInfo } from "@/lib/site";
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

  const metadata: Metadata = {
    title: {
      default: metaTitle || companyName,
      template: `%s | ${companyName}`,
    },
    description: metaDescription || tagline,
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

