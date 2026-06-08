import type { Variants, Transition } from "framer-motion";

/* =========================================================================
   Shared timing / easings
   ========================================================================= */
export const easing = {
  out: [0.22, 1, 0.36, 1] as [number, number, number, number],
  inOut: [0.65, 0, 0.35, 1] as [number, number, number, number],
  soft: [0.4, 0, 0.2, 1] as [number, number, number, number],
};

export const duration = {
  fast: 0.35,
  base: 0.6,
  slow: 0.9,
  cinematic: 1.2,
};

export const viewportOnce = { once: true, margin: "-15% 0px -10% 0px" };
export const viewportRepeat = { once: false, margin: "-10% 0px" };

/* =========================================================================
   Reusable variants
   ========================================================================= */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease: easing.out },
  },
};

export const fadeUpLg: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: easing.out },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: duration.base, ease: easing.out } },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -36 },
  show: { opacity: 1, x: 0, transition: { duration: duration.base, ease: easing.out } },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 36 },
  show: { opacity: 1, x: 0, transition: { duration: duration.base, ease: easing.out } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.base, ease: easing.out },
  },
};

export const blurUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(12px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: duration.slow, ease: easing.out },
  },
};

export const clipReveal: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  show: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: duration.cinematic, ease: easing.inOut },
  },
};

/* =========================================================================
   Stagger containers
   ========================================================================= */
export const staggerContainer = (
  step = 0.08,
  delay = 0
): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: step,
      delayChildren: delay,
    },
  },
});

/* =========================================================================
   Word reveal (used by TextReveal)
   ========================================================================= */
export const wordReveal: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.7, ease: easing.out },
  },
};

/* =========================================================================
   Page transition
   ========================================================================= */
export const pageTransition = {
  initial: { opacity: 0, y: 12, filter: "blur(8px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: easing.out } as Transition,
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.3, ease: easing.inOut } as Transition,
  },
};

/* =========================================================================
   Hover presets
   ========================================================================= */
export const hoverLift = {
  whileHover: { y: -6 },
  whileTap: { y: -2, scale: 0.99 },
  transition: { type: "spring", stiffness: 240, damping: 22 } as Transition,
};

export const hoverTilt = {
  whileHover: { rotateX: -3, rotateY: 3, y: -4 },
  transition: { type: "spring", stiffness: 200, damping: 20 } as Transition,
};

/* =========================================================================
   Shared blur-data URL for next/image placeholder (10x14 dark tone)
   ========================================================================= */
export const SHARED_BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxNCI+PGZpbHRlciBpZD0iYiI+PGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMSIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNiKSIgZmlsbD0iIzFhMTYxMCIvPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZykiIG9wYWNpdHk9IjAuNiIvPjxkZWZzPjxyYWRpYWxHcmFkaWVudCBpZD0iZyI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZDlhZDRhIiBzdG9wLW9wYWNpdHk9IjAuMyIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzA4MDgwNiIgc3RvcC1vcGFjaXR5PSIwIi8+PC9yYWRpYWxHcmFkaWVudD48L2RlZnM+PC9zdmc+";
