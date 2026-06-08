"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { GalleryData, HomeData } from "@/types/brand";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealImage } from "@/components/motion/RevealImage";
import { cn } from "@/lib/utils";

interface GalleryPreviewProps {
  data: HomeData["galleryPreview"];
  gallery: GalleryData;
}

const layout = [
  "sm:col-span-2 sm:row-span-2",
  "sm:col-span-1",
  "sm:col-span-1",
  "sm:col-span-1",
  "sm:col-span-2",
  "sm:col-span-1",
];

export function GalleryPreview({ data, gallery }: GalleryPreviewProps) {
  const images = gallery.images.slice(0, data.limit);

  return (
    <section className="section-tight">
      <div className="container">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <SectionHeading
            eyebrow={data.eyebrow}
            title={data.title}
            subtitle={data.subtitle}
            align="left"
          />
          <Link
            href={data.cta.href}
            className="group inline-flex items-center gap-2.5 text-sm uppercase tracking-[0.28em] text-gold-300 hover:text-gold-200 transition-colors focus-ring rounded-md py-2 shrink-0 self-start lg:self-end"
          >
            <span className="link-underline">{data.cta.label}</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 auto-rows-[180px] sm:auto-rows-[220px] lg:auto-rows-[260px] gap-3 sm:gap-4">
          {images.map((img, i) => (
            <motion.figure
              key={img.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-12% 0px -12% 0px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -4 }}
              className={cn(
                "relative overflow-hidden rounded-2xl sm:rounded-3xl group shadow-soft",
                layout[i] ?? "sm:col-span-1"
              )}
            >
              <RevealImage
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                hoverZoom
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent pointer-events-none" />
              <span className="absolute left-3 bottom-3 text-[10px] uppercase tracking-[0.22em] text-cream-50/85">
                {img.caption}
              </span>
              <div className="absolute inset-0 ring-1 ring-inset ring-[color:var(--ring-media)] rounded-2xl sm:rounded-3xl" />
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}