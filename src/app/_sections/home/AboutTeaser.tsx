"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { HomeData } from "@/types/brand";
import { Reveal } from "@/components/animations/Reveal";

interface AboutTeaserProps {
  data: HomeData["aboutTeaser"];
}

export function AboutTeaser({ data }: AboutTeaserProps) {
  return (
    <section className="section">
      <div
        aria-hidden
        className="absolute -left-20 top-1/3 h-[420px] w-[420px] rounded-full bg-forest-500/20 blur-[140px]"
      />
      <div className="container relative">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Image card */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <Reveal>
              <div className="relative perspective-1200">
                <motion.div
                  whileHover={{ rotateY: -4, rotateX: 2 }}
                  transition={{ type: "spring", stiffness: 180, damping: 22 }}
                  className="preserve-3d relative aspect-[5/6] sm:aspect-[4/5] rounded-[2rem] overflow-hidden shadow-lift"
                >
                  <Image
                    src={data.image}
                    alt={data.title}
                    fill
                    sizes="(max-width: 1024px) 90vw, 45vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
                  <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/15" />

                  {/* Editorial stamp */}
                  <div className="absolute left-6 top-6">
                    <div className="chip">Since 2009 · San Francisco</div>
                  </div>
                </motion.div>

                {/* Floating marks card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.2 }}
                  className="absolute -right-3 sm:-right-8 -bottom-8 w-[88%] sm:w-[78%] glass rounded-2xl p-5 shadow-lift"
                >
                  <div className="grid grid-cols-3 divide-x divide-white/10">
                    {data.marks.map((m) => (
                      <div
                        key={m.label}
                        className="px-3 first:pl-0 last:pr-0 text-center"
                      >
                        <p className="font-display text-2xl text-cream-50">
                          {m.value}
                        </p>
                        <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-cream-100/55 leading-tight">
                          {m.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Decorative ring */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-8 -left-8 h-32 w-32 rounded-full border border-gold-400/20"
                />
              </div>
            </Reveal>
          </div>

          {/* Copy */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <Reveal>
              <p className="eyebrow">{data.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 h-section text-balance">{data.title}</h2>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-6 text-lg text-cream-100/75 leading-relaxed text-balance">
                {data.subtitle}
              </p>
            </Reveal>
            <Reveal delay={0.28}>
              <div className="mt-9">
                <Link
                  href={data.cta.href}
                  className="group inline-flex items-center gap-2.5 text-sm uppercase tracking-[0.28em] text-gold-300 hover:text-gold-200 transition-colors focus-ring rounded-md py-2"
                >
                  <span className="link-underline">{data.cta.label}</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}