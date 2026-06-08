"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { TargetAndTransition, Transition } from "framer-motion";
import type { ElementType, ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  /** Animate only once. Defaults to false → replays on scroll up & down. */
  once?: boolean;
}

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  once = false,
}: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  delayStep?: number;
  /** Animate only once. Defaults to false → replays on scroll up & down. */
  once?: boolean;
}

export function Stagger({
  children,
  className,
  delayStep = 0.09,
  once = false,
}: StaggerProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: reduce ? 0 : delayStep } },
      }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem = {
  hidden: { opacity: 0, y: 32, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      // Cascade inner content (icon → heading → text → cta) after the
      // card itself settles, creating a layered motion hierarchy.
      staggerChildren: 0.07,
      delayChildren: 0.12,
    },
  },
};

/**
 * Inner-content variant. Apply to elements inside a `staggerItem` card
 * (icons, headings, paragraphs, badges, CTAs) so they reveal in a
 * premium top-down cascade once the card enters the viewport.
 */
export const cardItem = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

type CardEffect = "fade-up" | "fade-down" | "fade-left" | "fade-right" | "scale" | "blur";

function cardHidden(effect: CardEffect) {
  switch (effect) {
    case "fade-down":
      return { opacity: 0, y: -36, scale: 0.97 };
    case "fade-left":
      return { opacity: 0, x: 40, scale: 0.97 };
    case "fade-right":
      return { opacity: 0, x: -40, scale: 0.97 };
    case "scale":
      return { opacity: 0, scale: 0.9 };
    case "blur":
      return { opacity: 0, y: 28, scale: 0.97, filter: "blur(10px)" };
    case "fade-up":
    default:
      return { opacity: 0, y: 40, scale: 0.97, filter: "blur(6px)" };
  }
}

interface RevealCardProps {
  children: ReactNode;
  className?: string;
  /** Position in its row/grid — adds a subtle cascade offset. */
  index?: number;
  /** Entrance effect. Defaults to "fade-up". */
  effect?: CardEffect;
  /** Render as a different element (default: article). */
  as?: ElementType;
  /** Animate only once. Defaults to false → replays on scroll up & down. */
  once?: boolean;
  style?: React.CSSProperties;
  /** Optional hover state (e.g. lift) forwarded to the motion element. */
  whileHover?: TargetAndTransition;
  /** Default transition (used by whileHover); variant transitions override per state. */
  transition?: Transition;
}

/**
 * Self-contained scroll-reveal card.
 *
 * Unlike a parent `Stagger` container (which fires all of its children the
 * moment the container edge crosses the viewport), every `RevealCard` owns
 * its OWN viewport trigger — so each card animates exactly when IT enters the
 * screen and replays on scroll up AND down.
 *
 * Its `show` state also cascades inner `cardItem` children (icon → heading →
 * text → cta) for a layered motion hierarchy.
 */
export function RevealCard({
  children,
  className,
  index = 0,
  effect = "fade-up",
  as = "article",
  once = false,
  style,
  whileHover,
  transition,
}: RevealCardProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion(as);

  return (
    <MotionTag
      className={className}
      style={style}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      whileHover={reduce ? undefined : whileHover}
      transition={transition}
      viewport={{ once, margin: "-12% 0px -12% 0px" }}
      variants={{
        hidden: cardHidden(effect),
        show: {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
            delay: reduce ? 0 : (index % 4) * 0.08,
            staggerChildren: reduce ? 0 : 0.07,
            delayChildren: reduce ? 0 : 0.15,
          },
        },
      }}
    >
      {children}
    </MotionTag>
  );
}
