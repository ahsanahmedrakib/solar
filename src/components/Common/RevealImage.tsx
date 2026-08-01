"use client";

import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface RevealImageProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

/**
 * Wraps an image (or media) in an Omera-style reveal:
 * the child is slightly zoomed + faded until the block scrolls into view.
 */
export default function RevealImage({
  children,
  className,
  delay = 0,
  duration = 1000,
}: RevealImageProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn(
        "reveal-image relative overflow-hidden",
        inView && "reveal-revealed",
        className,
      )}
    >
      <div
        className="absolute inset-0"
        style={{
          transitionDelay: `${delay}ms`,
          transitionDuration: `${duration}ms`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
