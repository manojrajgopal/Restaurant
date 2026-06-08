"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { PageBannerData } from "@/types/brand";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

interface PageBannerProps {
  data: PageBannerData;
  /** Used by Breadcrumbs (e.g. "Our Story") */
  pageLabel: string;
  /** Optional decorative kicker — defaults to the eyebrow */
  align?: "left" | "center";
}

export function PageBanner({ data, pageLabel, align = "left" }: PageBannerProps) {
  return (
    <section className="relative overflow-hidden pt-36 pb-24 lg:pt-44 lg:pb-32 bg-noise">
      {/* Background image */}
      <div className="absolute inset-0 -z-20">
        <Image
          src={data.image}
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/85 to-ink-950" />
        <div className="absolute inset-0 vignette" />
      </div>

      {/* Orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-20 h-[420px] w-[420px] rounded-full bg-gold-400/15 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-20 h-[420px] w-[420px] rounded-full bg-forest-500/25 blur-[140px]"
      />

      <div className="container relative">
        <Breadcrumbs current={pageLabel} />

        <div
          className={
            align === "center"
              ? "mt-8 max-w-3xl mx-auto text-center"
              : "mt-8 max-w-3xl"
          }
        >
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow"
          >
            {data.eyebrow}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 h-display text-balance"
          >
            {data.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-6 text-lg text-cream-100/75 leading-relaxed text-balance"
          >
            {data.subtitle}
          </motion.p>
        </div>
      </div>

      {/* Bottom hairline */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[color:var(--hairline)] to-transparent"
      />
    </section>
  );
}