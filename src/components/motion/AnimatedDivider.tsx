"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { easing, viewportReveal } from "@/lib/motion";

interface AnimatedDividerProps {
  className?: string;
  /** Draw direction origin. */
  origin?: "center" | "left";
}

/**
 * A hairline divider that draws itself in (and out, on scroll up) with a
 * traveling gold glint. Useful between sections for premium separation.
 */
export function AnimatedDivider({
  className,
  origin = "center",
}: AnimatedDividerProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={cn("hairline", className)} aria-hidden />;
  }

  return (
    <div className={cn("relative h-px w-full overflow-hidden", className)} aria-hidden>
      <motion.div
        className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
        style={{ transformOrigin: origin === "center" ? "center" : "left" }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={viewportReveal}
        transition={{ duration: 0.9, ease: easing.inOut }}
      />
      <motion.span
        className="absolute top-1/2 h-px w-24 -translate-y-1/2 bg-gradient-to-r from-transparent via-gold-300/80 to-transparent blur-[1px]"
        initial={{ left: "-15%", opacity: 0 }}
        whileInView={{ left: "100%", opacity: [0, 1, 0] }}
        viewport={viewportReveal}
        transition={{ duration: 1.4, ease: easing.out, delay: 0.15 }}
      />
    </div>
  );
}
