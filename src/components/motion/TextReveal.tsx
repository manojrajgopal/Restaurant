"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { easing, viewportReveal } from "@/lib/motion";

interface TextRevealProps {
  text: string;
  /** Wrap each word in italic + gold gradient */
  highlightLast?: boolean;
  /** Highlight word indices (0-based) */
  highlightWords?: number[];
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p";
  delay?: number;
  step?: number;
}

const lineVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const wordVariants: Variants = {
  hidden: { y: "115%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.85, ease: easing.out },
  },
};

/**
 * Animates a string word-by-word from below a clip-mask.
 * Each word sits inside an inline-block overflow-hidden container so
 * the rise is visually masked.
 */
export function TextReveal({
  text,
  highlightLast,
  highlightWords = [],
  className,
  as = "h2",
  delay = 0,
  step = 0.06,
}: TextRevealProps) {
  const reduce = useReducedMotion();
  const words = useMemo(() => text.split(/\s+/g), [text]);
  const Tag = as;

  if (reduce) {
    return <Tag className={className}>{text}</Tag>;
  }

  const variants: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: step, delayChildren: delay },
    },
  };

  return (
    <Tag className={className}>
      <motion.span
        variants={variants}
        initial="hidden"
        whileInView="show"
        viewport={viewportReveal}
        className="inline"
      >
        {words.map((word, i) => {
          const isHL =
            highlightWords.includes(i) ||
            (highlightLast && i === words.length - 1);
          return (
            <span
              key={`${word}-${i}`}
              className="inline-block overflow-hidden align-bottom pr-[0.25em]"
            >
              <motion.span
                variants={wordVariants}
                className={cn(
                  "inline-block will-change-transform pb-[0.15em]",
                  isHL && "italic text-gold-gradient"
                )}
              >
                {word}
              </motion.span>
            </span>
          );
        })}
      </motion.span>
    </Tag>
  );
}

/* Helper for the same effect without viewport — fires on mount.
   Useful for hero headlines that are above the fold. */
export function TextRevealOnMount({
  text,
  highlightLast,
  highlightWords = [],
  className,
  as = "h1",
  delay = 0,
  step = 0.07,
}: TextRevealProps) {
  const reduce = useReducedMotion();
  const words = useMemo(() => text.split(/\s+/g), [text]);
  const Tag = as;

  if (reduce) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className}>
      <motion.span
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: step, delayChildren: delay } },
        }}
        className="inline"
      >
        {words.map((word, i) => {
          const isHL =
            highlightWords.includes(i) ||
            (highlightLast && i === words.length - 1);
          return (
            <span
              key={`${word}-${i}`}
              className="inline-block overflow-hidden align-bottom pr-[0.25em]"
            >
              <motion.span
                variants={wordVariants}
                className={cn(
                  "inline-block will-change-transform pb-[0.15em]",
                  isHL && "italic text-gold-gradient"
                )}
              >
                {word}
              </motion.span>
            </span>
          );
        })}
      </motion.span>
    </Tag>
  );
}
