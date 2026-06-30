"use client";

import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md">
        <div className="text-8xl font-black text-gray-200 mb-4 select-none">
          404
        </div>
        <h2 className="text-3xl font-bold text-[#051720] mb-3">
          Page Not Found
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-accent-600 hover:bg-[#399d3e] text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
          >
            <Home size={16} />
            Back to Home
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
