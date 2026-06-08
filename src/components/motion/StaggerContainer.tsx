"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { staggerContainer, viewportOnce } from "@/lib/motion";

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  step?: number;
  delay?: number;
  as?: "div" | "ul" | "ol" | "section";
}

export function StaggerContainer({
  children,
  className,
  step = 0.08,
  delay = 0,
  as = "div",
}: StaggerContainerProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion(as);
  return (
    <MotionTag
      className={className}
      variants={staggerContainer(reduce ? 0 : step, reduce ? 0 : delay)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {children}
    </MotionTag>
  );
}
