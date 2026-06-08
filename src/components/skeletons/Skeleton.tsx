"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  rounded?: string;
}

/**
 * Base shimmering skeleton block (gold-toned, matches premium palette).
 */
export function Skeleton({ className, rounded = "rounded-2xl" }: SkeletonProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-white/[0.04] border border-white/5",
        rounded,
        className
      )}
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(110deg, rgba(255,255,255,0) 8%, rgba(217,173,74,0.10) 18%, rgba(255,255,255,0) 33%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 2.2s linear infinite",
        }}
      />
    </div>
  );
}
