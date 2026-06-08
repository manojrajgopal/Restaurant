"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { ReactNode, ElementType } from "react";
import { fadeUp, viewportReveal, viewportOnce } from "@/lib/motion";

interface FadeInOnViewProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variants?: Variants;
  /** Render as a different element/tag */
  as?: ElementType;
  /** Play once instead of replaying on scroll up & down (default: replay). */
  once?: boolean;
}

/**
 * Drop-in viewport-triggered fade/slide. Honors prefers-reduced-motion.
 * Replays on re-entry (scroll up & down) unless `once` is set.
 */
export function FadeInOnView({
  children,
  className,
  delay = 0,
  variants = fadeUp,
  as,
  once = false,
}: FadeInOnViewProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion(as ?? "div");
  if (reduce) {
    const Tag = (as ?? "div") as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }
  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={once ? viewportOnce : viewportReveal}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
