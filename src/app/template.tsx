import type { ReactNode } from "react";

/**
 * App Router template — re-mounts on every navigation, giving us a clean
 * page-transition entry. Keeps layout (Navbar/Footer) static.
 *
 * IMPORTANT (iOS WebKit perf): this used to be a `framer-motion` wrapper that
 * rendered the WHOLE page at `opacity: 0; filter: blur(8px)` until JS hydrated
 * and ran the enter animation. On memory-constrained devices (iPhone 13/14 —
 * 4 GB RAM) the heavy compositor work elsewhere on the page stalls the main
 * thread, so that JS-driven reveal could be delayed for tens of seconds,
 * leaving the page blank. The enter animation is now pure CSS (`.page-enter`),
 * which is compositor-driven, never gated on React hydration, and never uses a
 * page-wide `filter: blur()` (a major iOS repaint cost).
 */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
