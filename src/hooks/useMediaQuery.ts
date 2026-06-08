"use client";

import { useEffect, useState } from "react";

/**
 * Lightweight media query hook (SSR-safe).
 */
export function useMediaQuery(query: string, fallback = false) {
  const [matches, setMatches] = useState(fallback);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent | MediaQueryList) =>
      setMatches(e.matches);
    handler(mql);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return matches;
}
