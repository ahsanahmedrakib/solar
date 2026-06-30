"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

const Navbar = dynamic(() => import("@/components/Common/Navbar"), { ssr: false });
const Footer = dynamic(() => import("@/components/Common/Footer"), { ssr: false });
const FloatingChatWidget = dynamic(
  () => import("@/components/Common/FloatingChatWidget"),
  { ssr: false },
);

export function LazyLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <FloatingChatWidget />
    </>
  );
}
