"use client";

import { Skeleton } from "./Skeleton";
import { SkeletonCard } from "./SkeletonCard";
import { cn } from "@/lib/utils";

interface SkeletonGridProps {
  count?: number;
  cols?: 2 | 3 | 4;
  className?: string;
  imageRatio?: string;
}

export function SkeletonGrid({
  count = 6,
  cols = 3,
  className,
  imageRatio,
}: SkeletonGridProps) {
  const colsClass = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  }[cols];

  return (
    <div className={cn("grid gap-6", colsClass, className)}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} imageRatio={imageRatio} />
      ))}
    </div>
  );
}

/** Centered section-skeleton block, used as a Suspense fallback. */
export function SkeletonSection({
  count = 4,
  cols = 4,
}: {
  count?: number;
  cols?: 2 | 3 | 4;
}) {
  return (
    <section className="section">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <Skeleton className="h-3 w-32 mx-auto" rounded="rounded-full" />
          <Skeleton className="h-10 w-3/4 mx-auto" rounded="rounded-md" />
          <Skeleton className="h-3 w-2/3 mx-auto" rounded="rounded-md" />
        </div>
        <div className="mt-14">
          <SkeletonGrid count={count} cols={cols} />
        </div>
      </div>
    </section>
  );
}
