"use client";

import { motion } from "framer-motion";
import type { HighlightsData } from "@/types/brand";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { Stagger, staggerItem } from "@/components/animations/Reveal";
import { cn } from "@/lib/utils";

interface HighlightsProps {
  data: HighlightsData;
}

export function Highlights({ data }: HighlightsProps) {
  return (
    <section id="highlights" className="section">
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

        <Stagger className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {data.items.map((item, i) => (
            <motion.article
              key={item.title}
              variants={staggerItem}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              className="group relative h-full"
            >
              <div className="relative h-full rounded-3xl glass p-7 overflow-hidden">
                {/* Accent wash */}
                <div
                  aria-hidden
                  className={cn(
                    "absolute -top-20 -right-20 h-48 w-48 rounded-full blur-3xl opacity-70 bg-gradient-to-br",
                    item.accent
                  )}
                />
                {/* Big number */}
                <span className="absolute right-6 top-5 font-display text-6xl text-white/[0.04] leading-none">
                  0{i + 1}
                </span>

                <div className="relative">
                  <div className="grid place-items-center h-14 w-14 rounded-2xl bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/10 text-gold-300 shadow-ring">
                    <DynamicIcon name={item.icon} className="h-6 w-6" />
                  </div>
                  <h3 className="mt-7 font-display text-xl text-cream-50">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm text-cream-100/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom shine on hover */}
                <div
                  aria-hidden
                  className="absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-300/0 to-transparent group-hover:via-gold-300/70 transition-colors duration-500"
                />
              </div>
            </motion.article>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
