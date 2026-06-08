"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { GalleryData } from "@/types/brand";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

interface GalleryProps {
  data: GalleryData;
}

const spanMap: Record<NonNullable<GalleryData["images"][number]["span"]>, string> = {
  tall: "sm:row-span-2 sm:aspect-[3/5]",
  wide: "sm:col-span-2 sm:aspect-[16/9]",
  square: "aspect-square",
};

export function Gallery({ data }: GalleryProps) {
  return (
    <section id="gallery" className="section">
      <div className="container">
        <SectionHeading
          eyebrow={data.eyebrow}
          title={data.title}
          subtitle={data.subtitle}
        />

        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 auto-rows-[180px] sm:auto-rows-[210px] lg:auto-rows-[240px] gap-3 sm:gap-4">
          {data.images.map((img, i) => (
            <motion.figure
              key={img.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-12% 0px -12% 0px" }}
              transition={{
                duration: 0.7,
                delay: (i % 4) * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -4 }}
              className={cn(
                "group relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-soft",
                img.span ? spanMap[img.span] : "aspect-square"
              )}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent" />
              <div className="absolute inset-0 ring-1 ring-inset ring-[color:var(--ring-media)] rounded-2xl sm:rounded-3xl" />

              <figcaption className="absolute left-4 right-4 bottom-4 flex items-end justify-between gap-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-gold-300">
                    {img.category}
                  </p>
                  <p className="font-display text-lg text-cream-50 leading-tight mt-0.5">
                    {img.caption}
                  </p>
                </div>
              </figcaption>

              {/* Always-visible mini caption (mobile) */}
              <span className="sm:hidden absolute left-3 bottom-3 text-[10px] uppercase tracking-[0.22em] text-cream-50/85">
                {img.caption}
              </span>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
