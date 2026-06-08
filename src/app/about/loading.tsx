import { SkeletonSection } from "@/components/skeletons/SkeletonGrid";
import { Skeleton } from "@/components/skeletons/Skeleton";

export default function Loading() {
  return (
    <>
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="container space-y-5">
          <Skeleton className="h-3 w-32" rounded="rounded-full" />
          <Skeleton className="h-12 w-3/4 max-w-3xl" rounded="rounded-xl" />
          <Skeleton className="h-4 w-2/3 max-w-2xl" rounded="rounded-md" />
        </div>
      </section>
      <SkeletonSection count={3} cols={3} />
    </>
  );
}
