"use client";

import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";
import type { CSSProperties, ElementType, ReactNode } from "react";

export type RevealVariant =
  | "fade-up"
  | "fade-down"
  | "fade"
  | "zoom"
  | "slide-left"
  | "slide-right"
  | "scale";

interface RevealProps {
  children: ReactNode;
  /** Animation direction/style. Defaults to "fade-up". */
  variant?: RevealVariant;
  /** Delay in ms before the animation starts. */
  delay?: number;
  /** Duration in ms. */
  duration?: number;
  /** Renders the wrapper as a different element (default div). */
  as?: ElementType;
  className?: string;
  id?: string;
  style?: CSSProperties;
}

/**
 * Wraps content in a scroll-triggered reveal animation.
 * Content stays hidden until it scrolls into view, then animates in once.
 */
export default function Reveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 800,
  as: Tag = "div",
  className,
  id,
  style,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      id={id}
      data-variant={variant}
      className={cn("reveal", inView && "reveal-revealed", className)}
      style={{
        ...style,
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </Tag>
  );
}
