import ClientProviders from "@/components/Common/ClientProviders";
import { LazyLayout } from "@/components/Common/LazyLayout";
import { DEFAULT_SECTIONS } from "@/data/settings";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { connectToDatabase } from "@/lib/db";
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

const defaultGeneral = DEFAULT_SECTIONS.find((s) => s.id === "general");

function df(id: string): string {
  return defaultGeneral?.fields?.find((f) => f.id === id)?.value ?? "";
}

type SettingsField = {
  id?: string;
  value?: string;
};

type SettingsSection = {
  id?: string;
  fields?: SettingsField[];
};

type SettingsDocument = {
  sections?: SettingsSection[];
};

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { db } = await connectToDatabase();
    const settings = (await db
      .collection("settings")
      .findOne({ settingsId: "global" })) as SettingsDocument | null;
    const generalFields = settings?.sections
      ?.find((s: SettingsSection) => s.id === "general")
      ?.fields;
    const companyName = generalFields?.find(
      (f: SettingsField) => f.id === "company-name",
    )?.value;
    const tagline = generalFields?.find(
      (f: SettingsField) => f.id === "brand-tagline",
    )?.value;
    const favicon = generalFields?.find(
      (f: SettingsField) => f.id === "site-favicon",
    )?.value;

    const metadata: Metadata = {
      title: companyName || df("company-name"),
    };
    if (tagline) metadata.description = tagline;
    if (favicon) metadata.icons = { icon: favicon };
    return metadata;
  } catch {
    return {
      title: df("company-name"),
      description: df("brand-tagline"),
      icons: { icon: df("site-favicon") },
    };
  }
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

