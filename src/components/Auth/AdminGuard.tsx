"use client";

import { useAuth } from "@/components/Auth/AuthProvider";
import { DEFAULT_ADMIN_LOGO } from "@/data/settings";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";

export function AdminGuard({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [user, loading, router, pathname]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-admin-bg">
        <Image src={DEFAULT_ADMIN_LOGO} alt="Loading" width={0} height={0} sizes="100vw" className="h-16 w-auto animate-pulse opacity-70" priority />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
