"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import {
  fadeUp,
  fadeDown,
  fadeLeft,
  fadeRight,
  fadeInScale,
  scaleIn,
  blurUp,
  depthRise,
  viewportReveal,
  viewportOnce,
} from "@/lib/motion";

export type RevealVariant =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "fade-scale"
  | "scale"
  | "blur-up"
  | "depth";

const VARIANT_MAP: Record<RevealVariant, Variants> = {
  "fade-up": fadeUp,
  "fade-down": fadeDown,
  "fade-left": fadeLeft,
  "fade-right": fadeRight,
  "fade-scale": fadeInScale,
  scale: scaleIn,
  "blur-up": blurUp,
  depth: depthRise,
};

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** Animation style. Defaults to "fade-up". */
  variant?: RevealVariant;
  /** Stagger delay (seconds) before this element animates. */
  delay?: number;
  /** Render as a different element/tag. */
  as?: ElementType;
  /** Play once instead of replaying on scroll up & down (default: replay). */
  once?: boolean;
}

/**
 * Unified, reusable scroll-reveal wrapper.
 *
 * - Replays elegantly on scroll down AND scroll up (bi-directional).
 * - Variant-driven so the same primitive covers every section.
 * - Honors `prefers-reduced-motion`.
 *
 * The `depth` variant pairs nicely inside a `perspective-1200` ancestor.
 */
export function ScrollReveal({
  children,
  className,
  variant = "fade-up",
  delay = 0,
  as,
  once = false,
}: ScrollRevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion(as ?? "div");

  if (reduce) {
    const Tag = (as ?? "div") as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      variants={VARIANT_MAP[variant]}
      initial="hidden"
      whileInView="show"
      viewport={once ? viewportOnce : viewportReveal}
      transition={{ delay }}
      style={variant === "depth" ? { transformPerspective: 1200 } : undefined}
    >
      {children}
    </MotionTag>
  );
}
