"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useCallback, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface MotionCardProps {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees (desktop only). */
  tilt?: number;
  /** Lift distance on hover, px. */
  lift?: number;
  /** Show a soft cursor-following glare highlight. */
  glare?: boolean;
}

/**
 * Premium 3D card. On desktop the card tilts toward the cursor with a soft
 * parallax glare, giving real dimensional depth. On touch / reduced-motion it
 * gracefully falls back to a simple lift.
 */
export function MotionCard({
  children,
  className,
  tilt = 8,
  lift = 10,
  glare = true,
}: MotionCardProps) {
  const reduce = useReducedMotion();
  const isDesktop = useMediaQuery("(hover: hover) and (pointer: fine)");
  const enabled = !reduce && isDesktop;

  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(py, [0, 1], [tilt, -tilt]), {
    stiffness: 220,
    damping: 22,
    mass: 0.4,
  });
  const rotateY = useSpring(useTransform(px, [0, 1], [-tilt, tilt]), {
    stiffness: 220,
    damping: 22,
    mass: 0.4,
  });
  const glareX = useTransform(px, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(py, [0, 1], ["0%", "100%"]);
  const glareBg = useTransform(
    [glareX, glareY],
    ([x, y]) =>
      `radial-gradient(420px circle at ${x} ${y}, rgba(255,255,255,0.12), transparent 45%)`
  );

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!enabled) return;
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      px.set((e.clientX - rect.left) / rect.width);
      py.set((e.clientY - rect.top) / rect.height);
    },
    [enabled, px, py]
  );

  const onLeave = useCallback(() => {
    px.set(0.5);
    py.set(0.5);
  }, [px, py]);

  if (!enabled) {
    return (
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 240, damping: 22 }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ y: -lift }}
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
      className={cn("group/card relative [transform-style:preserve-3d]", className)}
    >
      {children}
      {glare && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
          style={{ background: glareBg }}
        />
      )}
    </motion.div>
  );
}
