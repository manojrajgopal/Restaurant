"use client";

import { motion } from "framer-motion";
import type { HighlightsData } from "@/types/brand";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { RevealCard, cardItem } from "@/components/animations/Reveal";
import { MotionCard } from "@/components/motion/MotionCard";
import { cn } from "@/lib/utils";

interface HighlightsProps {
  data: HighlightsData;
}

export function Highlights({ data }: HighlightsProps) {
  return (
    <section id="highlights" className="section">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--hairline)] to-transparent"
      />
      <div className="container">
        <SectionHeading
          eyebrow={data.eyebrow}
          title={data.title}
          subtitle={data.subtitle}
        />

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {data.items.map((item, i) => (
            <RevealCard
              key={item.title}
              index={i}
              effect="blur"
              className="group relative h-full"
            >
              <MotionCard className="h-full" tilt={7} lift={10}>
                <div className="relative h-full rounded-3xl glass glow-ring p-7 overflow-hidden [transform-style:preserve-3d]">
                  {/* Accent wash */}
                  <div
                    aria-hidden
                    className={cn(
                      "absolute -top-20 -right-20 h-48 w-48 rounded-full blur-3xl opacity-70 bg-gradient-to-br",
                      item.accent
                    )}
                  />
                  {/* Big number */}
                  <span className="absolute right-6 top-5 font-display text-6xl text-[color:var(--ghost)] leading-none">
                    0{i + 1}
                  </span>

                  <div className="relative depth-pop-sm">
                    <motion.div
                      variants={cardItem}
                      whileHover={{ rotate: 6, scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 260, damping: 18 }}
                      className="grid place-items-center h-14 w-14 rounded-2xl bg-gradient-to-br from-[color:var(--surface-bg-strong)] to-[color:var(--surface-bg-soft)] border border-[color:var(--surface-border)] text-gold-300 shadow-ring"
                    >
                      <DynamicIcon name={item.icon} className="h-6 w-6" />
                    </motion.div>
                    <motion.h3
                      variants={cardItem}
                      className="mt-7 font-display text-xl text-cream-50"
                    >
                      {item.title}
                    </motion.h3>
                    <motion.p
                      variants={cardItem}
                      className="mt-3 text-sm text-cream-100/70 leading-relaxed"
                    >
                      {item.description}
                    </motion.p>
                  </div>

                  {/* Bottom shine on hover */}
                  <div
                    aria-hidden
                    className="absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-300/0 to-transparent group-hover:via-gold-300/70 transition-colors duration-500"
                  />
                </div>
              </MotionCard>
            </RevealCard>
          ))}
        </div>
      </div>
    </section>
  );
}
