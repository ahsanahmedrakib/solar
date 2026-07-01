"use client";

import { DEFAULT_ADMIN_LOGO, DEFAULT_LOGO } from "@/data/settings";
import Image from "next/image";

interface LoadingScreenProps {
  variant?: "admin" | "main";
  text?: string;
}

export function LoadingScreen({
  variant = "main",
  text,
}: LoadingScreenProps) {
  const logoSrc = variant === "admin" ? DEFAULT_ADMIN_LOGO : DEFAULT_LOGO;
  const bgClass =
    variant === "admin" ? "bg-admin-bg" : "bg-gray-50";

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center ${bgClass}`}
    >
      <Image
        src={logoSrc}
        alt="Loading"
        width={0}
        height={0}
        sizes="100vw"
        className="h-20 w-auto animate-pulse opacity-70"
        priority
      />
      {text && (
        <p className="mt-4 text-sm text-gray-500 font-medium">{text}</p>
      )}
    </div>
  );
}
