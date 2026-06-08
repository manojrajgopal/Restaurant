"use client";

import { useEffect, useRef, useState } from "react";

interface Options {
  rootMargin?: string;
  threshold?: number | number[];
  /** Disconnect after first intersection */
  once?: boolean;
}

/**
 * Tiny IntersectionObserver hook. Returns [ref, inView].
 */
export function useInViewObserver<T extends HTMLElement>(
  { rootMargin = "0px 0px -10% 0px", threshold = 0.1, once = true }: Options = {}
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  const seen = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          seen.current = true;
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, threshold, once]);

  return [ref, inView] as const;
}
