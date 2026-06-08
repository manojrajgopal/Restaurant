"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedNoiseSectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
  /**
   * Tint of the two ambient orbs. Defaults match the brand palette.
   */
  orbAccent?: "gold" | "forest" | "both";
  /**
   * Show the noise grain overlay (animated drift).
   */
  noise?: boolean;
}

/**
 * Reusable "section bg-noise" shell with:
 *   • slowly drifting noise grain
 *   • two ambient orbs that float on independent paths
 *   • subtle y-parallax as the section scrolls through the viewport
 *
 * Honors prefers-reduced-motion (renders static).
 */
export function AnimatedNoiseSection({
  id,
  className,
  children,
  orbAccent = "both",
  noise = true,
}: AnimatedNoiseSectionProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Subtle parallax on the inner content + opposite shift on the noise layer
  const contentY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const noiseY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const noiseX = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  const showGold = orbAccent === "gold" || orbAccent === "both";
  const showForest = orbAccent === "forest" || orbAccent === "both";

  return (
    <section
      ref={ref}
      id={id}
      className={cn("section relative overflow-hidden", className)}
    >
      {/* Animated noise grain — drifts diagonally + breathes */}
      {noise && (
        <motion.div
          aria-hidden
          className="absolute inset-0 pointer-events-none mix-blend-overlay"
          style={
            reduce
              ? { opacity: 0.045 }
              : {
                  opacity: 0.06,
                  x: noiseX,
                  y: noiseY,
                  backgroundImage:
                    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
                }
          }
          animate={
            reduce
              ? undefined
              : {
                  backgroundPosition: ["0px 0px", "160px 160px"],
                }
          }
          transition={
            reduce
              ? undefined
              : { duration: 14, repeat: Infinity, ease: "linear" }
          }
        />
      )}

      {/* Ambient orbs — float on independent loops */}
      {showForest && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 right-0 h-[520px] w-[520px] rounded-full bg-forest-500/25 blur-[160px]"
          animate={
            reduce
              ? undefined
              : {
                  x: [0, 40, -30, 0],
                  y: [0, -30, 20, 0],
                  scale: [1, 1.08, 0.95, 1],
                }
          }
          transition={
            reduce
              ? undefined
              : {
                  duration: 18,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
        />
      )}

      {showGold && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -top-20 left-0 h-[420px] w-[420px] rounded-full bg-gold-400/10 blur-[140px]"
          animate={
            reduce
              ? undefined
              : {
                  x: [0, -30, 40, 0],
                  y: [0, 25, -20, 0],
                  scale: [1, 1.06, 0.97, 1],
                }
          }
          transition={
            reduce
              ? undefined
              : {
                  duration: 22,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }
          }
        />
      )}

      {/* Hairline top accent that softly glows */}
      <motion.span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent"
        initial={reduce ? false : { opacity: 0.2, scaleX: 0.6 }}
        whileInView={reduce ? undefined : { opacity: 0.8, scaleX: 1 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "50% 50%" }}
      />

      {/* Inner content with gentle parallax */}
      <motion.div
        className="relative"
        style={reduce ? undefined : { y: contentY }}
      >
        {children}
      </motion.div>
    </section>
  );
}
