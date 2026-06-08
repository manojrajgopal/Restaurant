"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

interface CTAButtonProps {
  href?: string;
  label: string;
  variant?: Variant;
  className?: string;
  icon?: boolean;
  onClick?: () => void;
}

const styles: Record<Variant, string> = {
  primary:
    "bg-gradient-to-br from-gold-300 via-gold-400 to-gold-600 text-ink-950 shadow-glow hover:shadow-[0_30px_80px_-30px_rgba(217,173,74,0.85)]",
  secondary:
    "bg-white/[0.04] text-cream-50 border border-white/15 backdrop-blur-md hover:border-gold-300/50 hover:bg-white/[0.07]",
  ghost: "text-cream-50/90 hover:text-gold-300",
};

export function CTAButton({
  href,
  label,
  variant = "primary",
  className,
  icon = true,
  onClick,
}: CTAButtonProps) {
  const inner = (
    <motion.span
      whileHover={{ y: -2 }}
      whileTap={{ y: 0, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className={cn(
        "group relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-sm font-medium tracking-wide transition-shadow focus-ring",
        styles[variant],
        className
      )}
    >
      <span>{label}</span>
      {icon && (
        <ArrowUpRight
          className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden
        />
      )}
      {variant === "primary" && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full overflow-hidden"
        >
          <span className="absolute inset-y-0 -left-1/3 w-1/3 bg-white/40 blur-md skew-x-12 animate-shimmer" />
        </span>
      )}
    </motion.span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block focus-ring rounded-full">
        {inner}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className="focus-ring rounded-full">
      {inner}
    </button>
  );
}
