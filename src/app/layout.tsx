import ClientProviders from "@/components/Common/ClientProviders";
import { LazyLayout } from "@/components/Common/LazyLayout";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { connectToDatabase } from "@/lib/db";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    const faviconField = settings?.sections
      ?.find((s: SettingsSection) => s.id === "general")
      ?.fields?.find((f: SettingsField) => f.id === "site-favicon");
    const favicon = faviconField?.value || "/favicon.png";
    return {
      title: "Sunex - Solar & Renewable Energy",
      description: "Sunex - Solar & Renewable Energy",
      icons: { icon: favicon },
    };
  } catch {
    return {
      title: "Sunex - Solar & Renewable Energy",
      description: "Sunex - Solar & Renewable Energy",
      icons: { icon: "/favicon.png" },
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

