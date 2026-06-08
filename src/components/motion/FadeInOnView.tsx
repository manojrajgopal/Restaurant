"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { ReactNode, ElementType } from "react";
import { fadeUp, viewportOnce } from "@/lib/motion";

interface FadeInOnViewProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variants?: Variants;
  /** Render as a different element/tag */
  as?: ElementType;
  /** Re-trigger on re-entry */
  repeat?: boolean;
}

/**
 * Drop-in viewport-triggered fade/slide. Honors prefers-reduced-motion.
 */
export function FadeInOnView({
  children,
  className,
  delay = 0,
  variants = fadeUp,
  as,
  repeat = false,
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
      viewport={repeat ? { once: false, margin: "-10% 0px" } : viewportOnce}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
