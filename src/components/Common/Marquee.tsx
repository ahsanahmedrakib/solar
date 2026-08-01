"use client";

import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  className?: string;
  /** ms per loop — lower is faster. */
  duration?: number;
  /** Renders huge outlined (stroke-only) text like the Omera footer ticker. */
  outline?: boolean;
}

function MarqueeGroup({
  items,
  outline,
}: {
  items: string[];
  outline: boolean;
}) {
  return (
    <div className="marquee-group" aria-hidden="true">
      {items.map((item, i) => (
        <span
          key={i}
          className={cn(
            "marquee-item font-heading font-bold uppercase leading-none whitespace-nowrap",
            outline
              ? "text-stroke-accent text-5xl sm:text-7xl lg:text-8xl"
              : "text-white text-xl sm:text-2xl",
          )}
        >
          {item}
          {outline && <span>/</span>}
        </span>
      ))}
    </div>
  );
}

/**
 * Infinite horizontal scrolling ticker (footer-ticker style).
 * The track is duplicated so the loop is seamless.
 */
export default function Marquee({
  items,
  className,
  duration = 42000,
  outline = false,
}: MarqueeProps) {
  if (items.length === 0) return null;

  return (
    <div className={cn("marquee", className)}>
      <div
        className="marquee-track"
        style={{ animationDuration: `${duration}ms` }}
      >
        <MarqueeGroup items={items} outline={outline} />
        <MarqueeGroup items={items} outline={outline} />
      </div>
    </div>
  );
}

