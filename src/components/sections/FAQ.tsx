"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import type { FaqData } from "@/types/brand";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, staggerItem } from "@/components/animations/Reveal";
import { cn } from "@/lib/utils";

interface FAQProps {
  data: FaqData;
}

export function FAQ({ data }: FAQProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section">
      <div className="container">
        <SectionHeading
          eyebrow={data.eyebrow}
          title={data.title}
          subtitle={data.subtitle}
        />

        <Stagger className="mt-14 max-w-3xl mx-auto space-y-3" once>
          {data.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div key={item.question} variants={staggerItem}>
                <div
                  className={cn(
                    "rounded-2xl border transition-all duration-500",
                    isOpen
                      ? "border-gold-300/30 bg-[color:var(--surface-bg)] shadow-lift"
                      : "border-[color:var(--surface-border-soft)] hover:border-[color:var(--surface-border-strong)] bg-[color:var(--surface-bg-soft)]"
                  )}
                >
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center gap-5 text-left p-5 sm:p-6 focus-ring rounded-2xl"
                    >
                      <span className="font-display text-sm text-gold-300 w-8 shrink-0">
                        0{i + 1}
                      </span>
                      <span className="flex-1 font-display text-lg sm:text-xl text-cream-50">
                        {item.question}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className={cn(
                          "grid place-items-center h-9 w-9 rounded-full border transition-colors shrink-0",
                          isOpen
                            ? "bg-gold-400 text-onaccent border-gold-400"
                            : "border-[color:var(--surface-border-strong)] text-cream-100/70"
                        )}
                      >
                        <Plus className="h-4 w-4" />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          style={{ overflow: "hidden" }}
                        >
                          <div className="px-6 pb-6 pl-[4.5rem] text-[15px] text-cream-100/70 leading-relaxed">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
