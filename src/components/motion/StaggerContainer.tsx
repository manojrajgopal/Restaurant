"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { staggerContainer, viewportReveal, viewportOnce } from "@/lib/motion";

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  step?: number;
  delay?: number;
  as?: "div" | "ul" | "ol" | "section";
  /** Play once instead of replaying on scroll up & down (default: replay). */
  once?: boolean;
}

export function StaggerContainer({
  children,
  className,
  step = 0.08,
  delay = 0,
  as = "div",
  once = false,
}: StaggerContainerProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion(as);
  return (
    <MotionTag
      className={className}
      variants={staggerContainer(reduce ? 0 : step, reduce ? 0 : delay)}
      initial="hidden"
      whileInView="show"
      viewport={once ? viewportOnce : viewportReveal}
    >
      {children}
    </MotionTag>
  );
}
