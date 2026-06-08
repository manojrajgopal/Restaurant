"use client";

import { motion } from "framer-motion";
import type { ReservePageData } from "@/types/brand";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cardItem } from "@/components/animations/Reveal";

interface ProcessStepsProps {
  data: ReservePageData["steps"];
}

const stepVariants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1] as const,
      staggerChildren: 0.06,
      delayChildren: i * 0.08 + 0.15,
    },
  }),
};

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
              custom={i}
              variants={stepVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, margin: "-12% 0px -12% 0px" }}
              className="relative"
            >
              <div className="relative rounded-3xl glass p-7 h-full">
                <motion.div variants={cardItem} className="flex items-center gap-4">
                  <span className="grid place-items-center h-12 w-12 rounded-xl bg-gradient-to-br from-gold-300 via-gold-500 to-gold-600 text-onaccent font-display text-lg shadow-glow">
                    {it.step}
                  </span>
                  <div className="h-px flex-1 bg-[color:var(--surface-border)]" />
                </motion.div>
                <motion.h3 variants={cardItem} className="mt-5 font-display text-lg text-cream-50">
                  {it.title}
                </motion.h3>
                <motion.p variants={cardItem} className="mt-2 text-sm text-cream-100/65 leading-relaxed">
                  {it.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}