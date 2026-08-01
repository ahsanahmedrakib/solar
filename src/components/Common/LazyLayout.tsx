"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

const Navbar = dynamic(() => import("@/components/Common/Navbar"));
const Footer = dynamic(() => import("@/components/Common/Footer"));
const Preloader = dynamic(() => import("@/components/Common/Preloader"));
const Marquee = dynamic(() => import("@/components/Common/Marquee"));
const FloatingChatWidget = dynamic(
  () => import("@/components/Common/FloatingChatWidget"),
  { ssr: false },
);

const TICKER_ITEMS = [
  "Generate Your Own Power",
  "Reap the Returns",
  "Heal the World",
  "Efficiency & Power",
  "24/7 Support",
];

export function LazyLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Preloader />
      <Navbar />
      {children}
      <Marquee
        items={TICKER_ITEMS}
        outline
        className="bg-forest-700 py-8 sm:py-12 border-y border-white/10"
      />
      <Footer />
      <FloatingChatWidget />
    </>
  );
}
