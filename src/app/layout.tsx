import Footer from "@/components/Common/Footer";
import Navbar from "@/components/Common/Navbar";
import FloatingChatWidget from "@/components/Common/FloatingChatWidget";
import ToastProvider from "@/components/Common/ToastProvider";
import { connectToDatabase } from "@/lib/db";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { db } = await connectToDatabase();
    const settings = await db
      .collection("settings")
      .findOne({ settingsId: "global" });
    const faviconField = settings?.sections
      ?.find((s: any) => s.id === "general")
      ?.fields?.find((f: any) => f.id === "site-favicon");
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
        <Navbar />
        {children}
        <Footer />
        <FloatingChatWidget />
        <ToastProvider />
      </body>
    </html>
  );
}

