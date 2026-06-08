import { SkeletonSection } from "@/components/skeletons/SkeletonGrid";
import { Skeleton } from "@/components/skeletons/Skeleton";

export default function Loading() {
  return (
    <>
      {/* Hero placeholder */}
      <section className="relative min-h-[100svh] pt-32 lg:pt-40 pb-24 overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-32 -left-32 h-[480px] w-[480px] rounded-full bg-gold-400/10 blur-[140px]"
        />
        <div className="container relative grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <Skeleton className="h-7 w-44" rounded="rounded-full" />
            <div className="space-y-4">
              <Skeleton className="h-14 w-11/12" rounded="rounded-xl" />
              <Skeleton className="h-14 w-10/12" rounded="rounded-xl" />
              <Skeleton className="h-14 w-7/12" rounded="rounded-xl" />
            </div>
            <Skeleton className="h-4 w-9/12" rounded="rounded-md" />
            <Skeleton className="h-4 w-7/12" rounded="rounded-md" />
            <div className="flex gap-3 pt-3">
              <Skeleton className="h-12 w-40" rounded="rounded-full" />
              <Skeleton className="h-12 w-36" rounded="rounded-full" />
            </div>
          </div>
          <div className="lg:col-span-5">
            <Skeleton
              className="aspect-[4/5] w-full max-w-md mx-auto"
              rounded="rounded-[2rem]"
            />
          </div>
        </div>
      </section>

      <SkeletonSection count={3} cols={3} />
    </>
  );
}
