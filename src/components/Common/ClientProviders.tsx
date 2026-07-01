"use client";

import { AuthProvider } from "@/components/Auth/AuthProvider";
import ToastProvider from "@/components/Common/ToastProvider";
import type { ReactNode } from "react";

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <ToastProvider />
    </AuthProvider>
  );
}
