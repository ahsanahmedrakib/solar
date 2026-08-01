"use client";

import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  /** Only fire once. Defaults to true. */
  once?: boolean;
  /** Ratio of the element that must be visible. Defaults to 0.15. */
  threshold?: number;
  /** Root margin. Defaults to "0px 0px -8% 0px". */
  rootMargin?: string;
}

/**
 * Observes an element and reports whether it has entered the viewport.
 * Defaults to firing once (the element stays "revealed" after first entry).
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOptions = {},
) {
  const { once = true, threshold = 0.15, rootMargin = "0px 0px -8% 0px" } = options;
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      const id = requestAnimationFrame(() => setInView(true));
      return () => cancelAnimationFrame(id);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, threshold, rootMargin]);

  return { ref, inView };
}
