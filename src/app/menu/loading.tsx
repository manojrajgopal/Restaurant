import { SkeletonSection } from "@/components/skeletons/SkeletonGrid";
import { Skeleton } from "@/components/skeletons/Skeleton";

export default function Loading() {
  return (
    <>
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="container space-y-5">
          <Skeleton className="h-3 w-28" rounded="rounded-full" />
          <Skeleton className="h-12 w-2/3 max-w-3xl" rounded="rounded-xl" />
        </div>
      </section>
      <SkeletonSection count={6} cols={3} />
    </>
  );
}
