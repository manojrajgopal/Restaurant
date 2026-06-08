"use client";

import { motion } from "framer-motion";
import type { AboutPageData } from "@/types/brand";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, staggerItem } from "@/components/animations/Reveal";

interface PhilosophyProps {
  data: AboutPageData["philosophy"];
}

export function Philosophy({ data }: PhilosophyProps) {
  return (
    <section className="section">
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

        <Stagger className="mt-14 grid sm:grid-cols-2 gap-5">
          {data.items.map((item, i) => (
            <motion.article
              key={item.title}
              variants={staggerItem}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              className="group relative"
            >
              <div className="relative rounded-3xl glass p-8 sm:p-10 overflow-hidden h-full">
                <span
                  aria-hidden
                  className="absolute top-4 right-6 font-display text-[10px] uppercase tracking-[0.3em] text-cream-100/30"
                >
                  Principle {String(i + 1).padStart(2, "0")}
                </span>
                <div
                  aria-hidden
                  className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-gold-400/15 blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                />
                <span className="font-display italic text-5xl text-gold-gradient">
                  {item.number}
                </span>
                <h3 className="mt-6 font-display text-2xl text-cream-50">
                  {item.title}
                </h3>
                <p className="mt-3 text-[15px] text-cream-100/70 leading-relaxed">
                  {item.description}
                </p>
                {/* Bottom shine */}
                <div
                  aria-hidden
                  className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-300/0 to-transparent group-hover:via-gold-300/70 transition-colors duration-700"
                />
              </div>
            </motion.article>
          ))}
        </Stagger>
      </div>
    </section>
  );
}