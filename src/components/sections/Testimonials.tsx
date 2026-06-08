"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import type { TestimonialsData } from "@/types/brand";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface TestimonialsProps {
  data: TestimonialsData;
}

export function Testimonials({ data }: TestimonialsProps) {
  const [index, setIndex] = useState(0);
  const count = data.items.length;
  const active = data.items[index];

  const next = () => setIndex((i) => (i + 1) % count);
  const prev = () => setIndex((i) => (i - 1 + count) % count);

  return (
    <section id="testimonials" className="section">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />
      <div className="container">
        <SectionHeading
          eyebrow={data.eyebrow}
          title={data.title}
          subtitle={data.subtitle}
        />

        <div className="mt-16 grid lg:grid-cols-12 gap-10 items-center">
          {/* Avatar mosaic */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Orbits */}
              <div
                aria-hidden
                className="absolute inset-0 rounded-full border border-white/5"
              />
              <div
                aria-hidden
                className="absolute inset-6 rounded-full border border-gold-400/15"
              />
              <div
                aria-hidden
                className="absolute inset-14 rounded-full border border-white/5"
              />

              {/* Center active avatar */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-1/4 rounded-full overflow-hidden shadow-lift ring-2 ring-gold-400/40"
                >
                  <Image
                    src={active.avatar}
                    alt={active.name}
                    fill
                    sizes="220px"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Orbiting avatar pills */}
              {data.items.map((t, i) => {
                const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
                const r = 46; // %
                const x = 50 + Math.cos(angle) * r;
                const y = 50 + Math.sin(angle) * r;
                const isActive = i === index;
                return (
                  <button
                    key={t.name}
                    onClick={() => setIndex(i)}
                    aria-label={`Show review from ${t.name}`}
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    className={`absolute h-12 w-12 sm:h-14 sm:w-14 rounded-full overflow-hidden ring-2 transition-all duration-500 focus-ring ${
                      isActive
                        ? "ring-gold-400 scale-110 shadow-glow"
                        : "ring-white/15 hover:ring-gold-300/60 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quote */}
          <div className="lg:col-span-7 relative">
            <Quote
              aria-hidden
              className="h-16 w-16 text-gold-400/30"
              strokeWidth={1}
            />
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={active.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="mt-2 font-display text-2xl sm:text-3xl lg:text-[2.1rem] leading-snug text-cream-50 text-balance">
                  &ldquo;{active.quote}&rdquo;
                </p>
                <footer className="mt-8 flex items-center gap-4">
                  <div>
                    <p className="font-display text-xl text-cream-50">
                      {active.name}
                    </p>
                    <p className="text-sm text-cream-100/60">{active.role}</p>
                  </div>
                  <div className="ml-auto flex items-center gap-1 text-gold-300">
                    {Array.from({ length: active.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-current"
                        aria-hidden
                      />
                    ))}
                  </div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>

            <div className="mt-10 flex items-center gap-3">
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="grid place-items-center h-11 w-11 rounded-full glass text-cream-50 hover:text-gold-300 transition-colors focus-ring"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={next}
                aria-label="Next testimonial"
                className="grid place-items-center h-11 w-11 rounded-full glass text-cream-50 hover:text-gold-300 transition-colors focus-ring"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <span className="ml-3 text-xs text-cream-100/50 tracking-widest">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(count).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
