"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Star, Play } from "lucide-react";
import type { BrandData, HeroData } from "@/types/brand";
import { CTAButton } from "@/components/ui/CTAButton";
import { Badge } from "@/components/ui/Badge";
import { DynamicIcon } from "@/components/ui/DynamicIcon";

interface HeroProps {
  hero: HeroData;
  brand: BrandData;
}

export function Hero({ hero, brand }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-[100svh] pt-32 lg:pt-40 pb-24 lg:pb-32 overflow-hidden bg-noise"
    >
      {/* Background image (cinematic) */}
      <motion.div
        style={{ scale, opacity }}
        className="absolute inset-0 -z-20"
      >
        <Image
          src={hero.backgroundImage}
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/85 to-ink-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-transparent to-ink-950/60" />
      </motion.div>

      {/* Decorative orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-32 h-[480px] w-[480px] rounded-full bg-gold-400/15 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-forest-500/30 blur-[160px]"
      />

      <div className="relative container">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT: Copy */}
          <motion.div style={{ y }} className="lg:col-span-7 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full glass text-xs uppercase tracking-[0.28em] text-cream-100/80"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-gold-300 animate-ping opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-400" />
              </span>
              {hero.eyebrow}
            </motion.div>

            <h1 className="mt-8 h-display text-balance">
              {hero.headline.map((line, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.15 + i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="block"
                >
                  {line}{" "}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.15 + hero.headline.length * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="block italic text-gold-gradient"
              >
                {hero.highlight}.
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-7 max-w-xl text-base sm:text-lg leading-relaxed text-cream-100/75 text-balance"
            >
              {hero.subheadline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <CTAButton
                href={hero.primaryCta.href}
                label={hero.primaryCta.label}
              />
              <CTAButton
                href={hero.secondaryCta.href}
                label={hero.secondaryCta.label}
                variant="secondary"
                icon={false}
              />
            </motion.div>

            {/* Badges */}
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mt-10 flex flex-wrap gap-2"
            >
              {hero.badges.map((b) => (
                <li key={b.label}>
                  <Badge variant="default">
                    <DynamicIcon name={b.icon} className="h-3 w-3 text-gold-300" />
                    {b.label}
                  </Badge>
                </li>
              ))}
            </motion.ul>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.05 }}
              className="mt-12 grid grid-cols-3 gap-4 sm:gap-6 max-w-md"
            >
              {hero.stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-3xl sm:text-4xl text-cream-50">
                    {s.value}
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-cream-100/55">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT: 3D-style stacked visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative perspective-1200">
              <motion.div
                initial={{ opacity: 0, y: 40, rotateY: -10 }}
                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{
                  duration: 1.2,
                  delay: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ rotateY: 4, rotateX: -2 }}
                className="preserve-3d relative mx-auto aspect-[4/5] max-w-md rounded-[2rem] overflow-hidden shadow-lift"
              >
                <Image
                  src={hero.foregroundImage}
                  alt={`${brand.brandName} signature dish`}
                  fill
                  sizes="(max-width: 1024px) 80vw, 40vw"
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />

                {/* Top-right reflection highlight */}
                <div
                  aria-hidden
                  className="absolute -top-20 -right-10 h-48 w-48 rounded-full bg-white/15 blur-2xl"
                />

                {/* Glass frame stroke */}
                <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/15" />
              </motion.div>

              {/* Floating glass card */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="absolute -left-4 sm:-left-12 bottom-10 sm:bottom-12 w-[260px] sm:w-[300px] animate-float"
              >
                <div className="glass rounded-2xl p-4 sm:p-5 shadow-lift">
                  <div className="flex items-center gap-3">
                    <div className="relative h-14 w-14 rounded-xl overflow-hidden shrink-0">
                      <Image
                        src={hero.floatingCard.image}
                        alt={hero.floatingCard.title}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-[0.25em] text-gold-300">
                        Tonight
                      </p>
                      <p className="font-display text-base text-cream-50 truncate">
                        {hero.floatingCard.title}
                      </p>
                      <p className="text-xs text-cream-100/65 truncate">
                        {hero.floatingCard.subtitle}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-gold-300">
                      {Array.from({
                        length: Math.round(hero.floatingCard.rating),
                      }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-3.5 w-3.5 fill-current"
                          aria-hidden
                        />
                      ))}
                      <span className="ml-2 text-xs text-cream-100/70">
                        {hero.floatingCard.rating}
                      </span>
                    </div>
                    <button className="grid place-items-center h-9 w-9 rounded-full bg-gold-400 text-ink-950 hover:bg-gold-300 transition-colors">
                      <Play className="h-3.5 w-3.5 fill-current" aria-hidden />
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Floating ribbon top-right */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.85 }}
                className="absolute -right-2 sm:-right-6 top-6 sm:top-10"
              >
                <div className="glass rounded-2xl px-4 py-3 flex items-center gap-3 shadow-lift">
                  <div className="grid place-items-center h-8 w-8 rounded-lg bg-gold-400/20 text-gold-300">
                    <DynamicIcon name="sparkles" className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-cream-100/55">
                      Chef&rsquo;s Counter
                    </p>
                    <p className="text-sm text-cream-50 font-medium">
                      6 seats left
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Orbital ring decoration */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10"
              >
                <div className="absolute inset-0 m-auto h-[110%] w-[110%] rounded-full border border-white/5" />
                <div className="absolute inset-0 m-auto h-[85%] w-[85%] rounded-full border border-gold-400/15" />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="hidden lg:flex items-center gap-3 mt-20 text-[10px] uppercase tracking-[0.32em] text-cream-100/40"
        >
          <span>Scroll to discover the room</span>
          <span className="block w-12 h-px bg-gradient-to-r from-cream-100/40 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
