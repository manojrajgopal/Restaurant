"use client";

import { Skeleton } from "./Skeleton";
import { cn } from "@/lib/utils";

interface SkeletonCardProps {
  className?: string;
  imageRatio?: string;
  lines?: number;
}

export function SkeletonCard({
  className,
  imageRatio = "aspect-[4/3]",
  lines = 3,
}: SkeletonCardProps) {
  return (
    <div
      className={cn(
        "glass rounded-3xl overflow-hidden p-0 flex flex-col",
        className
      )}
    >
      <Skeleton className={cn("w-full", imageRatio)} rounded="rounded-none" />
      <div className="p-6 space-y-3">
        <Skeleton className="h-5 w-3/4" rounded="rounded-md" />
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton
            key={i}
            className={cn("h-3", i === lines - 1 ? "w-1/2" : "w-full")}
            rounded="rounded-md"
          />
        ))}
        <div className="pt-3 flex gap-2">
          <Skeleton className="h-5 w-14" rounded="rounded-full" />
          <Skeleton className="h-5 w-20" rounded="rounded-full" />
        </div>
      </div>
    </div>
  );
}
