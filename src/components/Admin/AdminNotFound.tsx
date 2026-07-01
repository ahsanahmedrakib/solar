"use client"

import { FileQuestion } from "lucide-react";
import Link from "next/link";

export default function AdminNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="w-20 h-20 rounded-2xl bg-(--admin-surface-2) border border-(--admin-border) flex items-center justify-center mb-6">
        <FileQuestion size={36} className="text-(--admin-text-muted)" />
      </div>
      <h2 className="text-2xl font-bold text-(--admin-text-primary) mb-2">
        Page Not Found
      </h2>
      <p className="text-(--admin-text-secondary) text-sm max-w-sm mb-8">
        The page you&apos;re looking for doesn&apos;t exist under the admin
        panel. It may have been moved or removed.
      </p>
      <div className="flex gap-3">
        <Link
          href="/admin"
          className="admin-btn-primary px-5 py-2.5 text-sm"
        >
          Go to Dashboard
        </Link>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="admin-btn-outline px-5 py-2.5 text-sm"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
