"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp } from "@/lib/motion";

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  as?: "div" | "li" | "article" | "section";
}

export function StaggerItem({
  children,
  className,
  variants = fadeUp,
  as = "div",
}: StaggerItemProps) {
  const MotionTag = motion(as);
  return (
    <MotionTag className={className} variants={variants}>
      {children}
    </MotionTag>
  );
}
