"use client";

import { motion } from "framer-motion";
import type { AboutPageData } from "@/types/brand";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface ProcessProps {
  data: AboutPageData["process"];
}

export function Process({ data }: ProcessProps) {
  return (
    <section className="section bg-noise">
      <div
        aria-hidden
        className="absolute -bottom-20 left-0 h-[420px] w-[420px] rounded-full bg-forest-500/25 blur-[140px]"
      />
      <div className="container relative">
        <SectionHeading
          eyebrow={data.eyebrow}
          title={data.title}
          subtitle={data.subtitle}
        />

        <div className="mt-16 relative max-w-4xl mx-auto">
          {/* Vertical rail */}
          <div
            aria-hidden
            className="absolute left-6 sm:left-1/2 sm:-translate-x-1/2 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-gold-400/40 to-transparent"
          />

          <ol className="space-y-12">
            {data.steps.map((step, i) => {
              const right = i % 2 === 1;
              return (
                <li key={step.title} className="relative">
                  <div
                    className={`grid sm:grid-cols-2 gap-6 sm:gap-12 ${
                      right ? "sm:[direction:rtl]" : ""
                    }`}
                  >
                    {/* Marker column */}
                    <div className="pl-16 sm:pl-0 sm:text-right sm:pr-12 [direction:ltr]">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.6, delay: 0.05 }}
                      >
                        <p
                          className={`font-display text-4xl text-gold-gradient ${
                            right ? "sm:text-left" : "sm:text-right"
                          }`}
                        >
                          {step.time}
                        </p>
                        <p
                          className={`mt-2 text-[11px] uppercase tracking-[0.32em] text-cream-100/55 ${
                            right ? "sm:text-left" : "sm:text-right"
                          }`}
                        >
                          Step {String(i + 1).padStart(2, "0")}
                        </p>
                      </motion.div>
                    </div>

                    {/* Card */}
                    <div className="pl-16 sm:pl-12 [direction:ltr]">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        whileHover={{ y: -4 }}
                        className="relative rounded-2xl glass p-6 sm:p-7 shadow-lift"
                      >
                        <h3 className="font-display text-xl sm:text-2xl text-cream-50">
                          {step.title}
                        </h3>
                        <p className="mt-3 text-[15px] text-cream-100/70 leading-relaxed">
                          {step.description}
                        </p>
                      </motion.div>
                    </div>
                  </div>

                  {/* Node */}
                  <div
                    aria-hidden
                    className="absolute left-6 sm:left-1/2 top-3 -translate-x-1/2"
                  >
                    <span className="relative grid place-items-center h-4 w-4">
                      <span className="absolute inset-0 rounded-full bg-gold-400/30 animate-ping" />
                      <span className="relative h-2 w-2 rounded-full bg-gold-400 shadow-[0_0_0_4px_rgba(8,8,6,1)]" />
                    </span>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}