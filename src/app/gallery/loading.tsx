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
        <div className="container">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 auto-rows-[210px] gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton
                key={i}
                className={`${i === 0 ? "sm:col-span-2 sm:row-span-2" : ""}`}
                rounded="rounded-3xl"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
