"use client";

import { useRef, useState, useCallback, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type Variant = "primary" | "secondary" | "ghost";

interface MagneticButtonProps {
  href?: string;
  label: string;
  variant?: Variant;
  className?: string;
  icon?: boolean;
  onClick?: () => void;
  children?: ReactNode;
}

const styles: Record<Variant, string> = {
  primary:
    "bg-gradient-to-br from-gold-300 via-gold-400 to-gold-600 text-ink-950 shadow-glow hover:shadow-[0_30px_80px_-30px_rgba(217,173,74,0.85)]",
  secondary:
    "bg-white/[0.04] text-cream-50 border border-white/15 backdrop-blur-md hover:border-gold-300/50 hover:bg-white/[0.07]",
  ghost: "text-cream-50/90 hover:text-gold-300",
};

/**
 * CTA-style button that gently follows the cursor (desktop only).
 * Falls back to a normal lift on touch / reduced motion.
 */
export function MagneticButton({
  href,
  label,
  variant = "primary",
  className,
  icon = true,
  onClick,
  children,
}: MagneticButtonProps) {
  const reduce = useReducedMotion();
  const isDesktop = useMediaQuery("(hover: hover) and (pointer: fine)");
  const enabled = !reduce && isDesktop;

  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.35 });
  const [hover, setHover] = useState(false);

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLSpanElement>) => {
      if (!enabled) return;
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      // Limit pull strength
      x.set(dx * 0.25);
      y.set(dy * 0.35);
    },
    [enabled, x, y]
  );

  const onLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setHover(false);
  }, [x, y]);

  const inner = (
    <motion.span
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={onLeave}
      whileTap={{ scale: 0.97 }}
      style={enabled ? { x: sx, y: sy } : undefined}
      className={cn(
        "group relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-sm font-medium tracking-wide transition-shadow focus-ring will-change-transform",
        styles[variant],
        className
      )}
    >
      <span className="relative z-10">{children ?? label}</span>
      {icon && (
        <ArrowUpRight
          className={cn(
            "relative z-10 h-4 w-4 transition-transform duration-500",
            hover ? "translate-x-0.5 -translate-y-0.5" : ""
          )}
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
