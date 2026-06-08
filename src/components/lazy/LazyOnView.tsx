"use client";

import { useState, type ReactNode, type CSSProperties } from "react";
import { useInViewObserver } from "@/hooks/useInViewObserver";

interface LazyOnViewProps {
  children: ReactNode;
  /** Skeleton/placeholder shown until the section enters the viewport */
  fallback?: ReactNode;
  /** Reserve vertical space to prevent CLS while deferred */
  minHeight?: number | string;
  /** IntersectionObserver rootMargin */
  rootMargin?: string;
  className?: string;
}

/**
 * Defers rendering the children tree until it scrolls near the viewport.
 * Keeps initial JS evaluation light and avoids animating offscreen.
 *
 * Used as: <LazyOnView fallback={<SkeletonGrid />}>...</LazyOnView>
 */
export function LazyOnView({
  children,
  fallback,
  minHeight = 400,
  rootMargin = "300px 0px",
  className,
}: LazyOnViewProps) {
  const [ref, inView] = useInViewObserver<HTMLDivElement>({
    rootMargin,
    once: true,
  });
  const [hasRendered, setHasRendered] = useState(false);

  if (inView && !hasRendered) {
    // Defer state-set to next tick to avoid render-loop edge cases
    queueMicrotask(() => setHasRendered(true));
  }

  const style: CSSProperties | undefined =
    !hasRendered && minHeight
      ? { minHeight: typeof minHeight === "number" ? `${minHeight}px` : minHeight }
      : undefined;

  return (
    <div ref={ref} style={style} className={className}>
      {hasRendered ? children : fallback ?? null}
    </div>
  );
}
