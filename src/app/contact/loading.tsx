import { Skeleton } from "@/components/skeletons/Skeleton";

export default function Loading() {
  return (
    <>
      <section className="relative pt-40 pb-16 overflow-hidden">
        <div className="container space-y-5">
          <Skeleton className="h-3 w-28" rounded="rounded-full" />
          <Skeleton className="h-12 w-2/3 max-w-3xl" rounded="rounded-xl" />
        </div>
      </section>
      <section className="section">
        <div className="container grid lg:grid-cols-2 gap-10">
          <Skeleton className="h-[420px]" rounded="rounded-3xl" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-40" rounded="rounded-md" />
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" rounded="rounded-2xl" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
