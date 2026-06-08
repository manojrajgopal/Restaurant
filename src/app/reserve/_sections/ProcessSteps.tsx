"use client";

import { motion } from "framer-motion";
import type { ReservePageData } from "@/types/brand";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface ProcessStepsProps {
  data: ReservePageData["steps"];
}

export function ProcessSteps({ data }: ProcessStepsProps) {
  return (
    <section className="section">
      <div
        aria-hidden
        className="absolute -bottom-32 right-0 h-[420px] w-[420px] rounded-full bg-gold-400/10 blur-[140px]"
      />
      <div className="container relative">
        <SectionHeading eyebrow={data.eyebrow} title={data.title} />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 relative">
          {/* Connecting line */}
          <div
            aria-hidden
            className="hidden lg:block absolute top-12 left-12 right-12 h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent"
          />
          {data.items.map((it, i) => (
            <motion.div
              key={it.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="relative"
            >
              <div className="relative rounded-3xl glass p-7 h-full">
                <div className="flex items-center gap-4">
                  <span className="grid place-items-center h-12 w-12 rounded-xl bg-gradient-to-br from-gold-300 via-gold-500 to-gold-600 text-ink-950 font-display text-lg shadow-glow">
                    {it.step}
                  </span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
                <h3 className="mt-5 font-display text-lg text-cream-50">
                  {it.title}
                </h3>
                <p className="mt-2 text-sm text-cream-100/65 leading-relaxed">
                  {it.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}