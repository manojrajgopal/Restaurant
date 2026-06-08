"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * App Router template — re-mounts on every navigation, giving us
 * a clean page-transition entry. Keeps layout (Navbar/Footer) static.
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      key="page"
      initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
