"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { easing, viewportReveal } from "@/lib/motion";
import { TextReveal } from "@/components/motion/TextReveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  /** Highlight word indices in the title (0-based), italic + gold gradient. */
  highlightWords?: number[];
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
  highlightWords,
}: SectionHeadingProps) {
  const reduce = useReducedMotion();
  const centered = align === "center";

  if (reduce) {
    return (
      <div
        className={cn(
          "max-w-3xl",
          centered ? "mx-auto text-center" : "text-left",
          className
        )}
      >
        {eyebrow && (
          <span className={cn("eyebrow", centered ? "justify-center" : "justify-start")}>
            {eyebrow}
          </span>
        )}
        <h2 className="h-section text-balance mt-5">{title}</h2>
        {subtitle && (
          <p className="mt-5 text-base sm:text-lg text-cream-100/70 text-balance leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    );
  }

  return (
    <motion.div
      className={cn(
        "max-w-3xl",
        centered ? "mx-auto text-center" : "text-left",
        className
      )}
      initial="hidden"
      whileInView="show"
      viewport={viewportReveal}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.12 } },
      }}
    >
      {eyebrow && (
        <motion.span
          variants={{
            hidden: { opacity: 0, y: 14 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: easing.out },
            },
          }}
          className={cn("eyebrow", centered ? "justify-center" : "justify-start")}
        >
          {eyebrow}
        </motion.span>
      )}

      <TextReveal
        text={title}
        as="h2"
        className="h-section text-balance mt-5"
        highlightWords={highlightWords}
        step={0.05}
      />

      {subtitle && (
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
            show: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.7, ease: easing.out },
            },
          }}
          className="mt-5 text-base sm:text-lg text-cream-100/70 text-balance leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
