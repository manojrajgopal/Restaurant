"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { GalleryData, GalleryPageData } from "@/types/brand";
import { RevealImage } from "@/components/motion/RevealImage";
import { cn } from "@/lib/utils";

interface GalleryGridProps {
  gallery: GalleryData;
  filters: GalleryPageData["filters"];
}

const spanMap: Record<NonNullable<GalleryData["images"][number]["span"]>, string> = {
  tall: "sm:row-span-2 sm:aspect-[3/5]",
  wide: "sm:col-span-2 sm:aspect-[16/9]",
  square: "aspect-square",
};

export function GalleryGrid({ gallery, filters }: GalleryGridProps) {
  const [active, setActive] = useState<string>(filters[0]?.id ?? "all");

  const images = useMemo(() => {
    if (active === "all") return gallery.images;
    return gallery.images.filter((i) => i.category === active);
  }, [active, gallery.images]);

  return (
    <section className="section">
      <div className="container">
        {/* Filter pills */}
        <div className="flex justify-center">
          <div
            role="tablist"
            aria-label="Gallery filters"
            className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl sm:rounded-full glass max-w-full overflow-x-auto"
          >
            {filters.map((f) => {
              const isActive = f.id === active;
              return (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(f.id)}
                  className={cn(
                    "relative px-5 py-2.5 rounded-xl sm:rounded-full text-sm transition-colors focus-ring whitespace-nowrap",
                    isActive
                      ? "text-onaccent"
                      : "text-cream-100/75 hover:text-cream-50"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="gallery-tab"
                      className="absolute inset-0 rounded-xl sm:rounded-full bg-gradient-to-br from-gold-200 via-gold-400 to-gold-600 shadow-glow"
                      transition={{ type: "spring", stiffness: 300, damping: 28 }}
                    />
                  )}
                  <span className="relative">{f.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 auto-rows-[180px] sm:auto-rows-[220px] lg:auto-rows-[260px] gap-3 sm:gap-4"
        >
          <AnimatePresence mode="popLayout">
            {images.map((img, i) => (
              <motion.figure
                layout
                key={img.src}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{
                  duration: 0.55,
                  delay: (i % 4) * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -4 }}
                className={cn(
                  "group relative isolate overflow-hidden rounded-2xl sm:rounded-3xl shadow-soft",
                  img.span ? spanMap[img.span] : "aspect-square"
                )}
              >
                <RevealImage
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  hoverZoom
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent pointer-events-none" />
                <div className="absolute inset-0 ring-1 ring-inset ring-[color:var(--ring-media)] rounded-2xl sm:rounded-3xl pointer-events-none" />

                <figcaption className="absolute left-4 right-4 bottom-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-gold-300">
                    {img.category}
                  </p>
                  <p className="font-display text-lg text-cream-50 leading-tight mt-0.5">
                    {img.caption}
                  </p>
                </figcaption>

                <span className="sm:hidden absolute left-3 bottom-3 text-[10px] uppercase tracking-[0.22em] text-cream-50/85">
                  {img.caption}
                </span>
              </motion.figure>
            ))}
          </AnimatePresence>
        </motion.div>

        {images.length === 0 && (
          <p className="mt-12 text-center text-sm text-cream-100/55 italic">
            Nothing in this category yet — check back soon.
          </p>
        )}
      </div>
    </section>
  );
}