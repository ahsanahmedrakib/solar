"use client";

import { AuthProvider } from "@/components/Auth/AuthProvider";
import QueryProvider from "@/components/Common/QueryProvider";
import ToastProvider from "@/components/Common/ToastProvider";
import type { ReactNode } from "react";

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <AuthProvider>
        {children}
        <ToastProvider />
      </AuthProvider>
    </QueryProvider>
  );
}
