"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Razor-thin gold progress bar at the very top of the viewport.
 * Reflects the document scroll position.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    mass: 0.4,
  });
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-gold-200 via-gold-400 to-gold-600 shadow-[0_0_18px_rgba(217,173,74,0.55)]"
    />
  );
}
