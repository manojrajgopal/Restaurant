"use client";

import { useCallback, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useTheme } from "./ThemeProvider";

interface ThemeToggleProps {
  className?: string;
}

/**
 * Premium glassmorphism theme switch.
 * - Sliding orb with a morphing sun ⇆ moon icon.
 * - Magnetic cursor attraction + hover glow on desktop.
 * - Click seeds a cinematic expanding-circle reveal (handled in provider).
 * - Fully keyboard accessible & reduced-motion aware.
 */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const reduce = useReducedMotion();
  const isDesktop = useMediaQuery("(hover: hover) and (pointer: fine)");
  const magnetic = !reduce && isDesktop;

  const isLight = theme === "light";

  const ref = useRef<HTMLButtonElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 220, damping: 16, mass: 0.35 });
  const sy = useSpring(my, { stiffness: 220, damping: 16, mass: 0.35 });
  const [hover, setHover] = useState(false);
  const [ripple, setRipple] = useState(0);

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!magnetic) return;
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      mx.set((e.clientX - (rect.left + rect.width / 2)) * 0.3);
      my.set((e.clientY - (rect.top + rect.height / 2)) * 0.45);
    },
    [magnetic, mx, my]
  );

  const onLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
    setHover(false);
  }, [mx, my]);

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setRipple((r) => r + 1);
      toggleTheme({ x: e.clientX, y: e.clientY });
    },
    [toggleTheme]
  );

  return (
    <motion.button
      ref={ref}
      type="button"
      role="switch"
      aria-checked={isLight}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      title={isLight ? "Switch to dark mode" : "Switch to light mode"}
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={onLeave}
      onClick={onClick}
      whileTap={{ scale: 0.94 }}
      style={magnetic ? { x: sx, y: sy } : undefined}
      className={cn(
        "group relative inline-flex h-9 w-[68px] items-center rounded-full glass focus-ring overflow-hidden",
        "transition-shadow duration-500",
        className
      )}
    >
      {/* Ambient wash — warm gold for light, cool indigo for dark */}
      <motion.span
        aria-hidden
        className="absolute inset-0 rounded-full"
        animate={{
          background: isLight
            ? "radial-gradient(120% 120% at 78% 50%, rgba(217,173,74,0.30), transparent 65%)"
            : "radial-gradient(120% 120% at 22% 50%, rgba(120,140,220,0.22), transparent 65%)",
        }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Tiny stars (visible in dark mode) */}
      <motion.span
        aria-hidden
        className="absolute right-3 top-2 h-0.5 w-0.5 rounded-full bg-cream-50"
        animate={{ opacity: isLight ? 0 : 0.9, scale: isLight ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      />
      <motion.span
        aria-hidden
        className="absolute right-5 bottom-2.5 h-px w-px rounded-full bg-cream-50"
        animate={{ opacity: isLight ? 0 : 0.7, scale: isLight ? 0 : 1 }}
        transition={{ duration: 0.4, delay: 0.05 }}
      />

      {/* Hover glow ring */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full"
        animate={{
          boxShadow: hover
            ? "0 0 26px -4px rgba(217,173,74,0.55), inset 0 0 0 1px rgba(217,173,74,0.4)"
            : "0 0 0px 0px rgba(217,173,74,0), inset 0 0 0 1px rgba(217,173,74,0)",
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Sliding orb */}
      <motion.span
        layout
        className="relative z-10 grid h-7 w-7 place-items-center rounded-full shadow-glow"
        style={{
          background: isLight
            ? "linear-gradient(145deg, #ffe9a8, #d9ad4a 60%, #b07f22)"
            : "linear-gradient(145deg, #2a2f45, #11131f 70%)",
        }}
        animate={{ x: isLight ? 36 : 3 }}
        transition={
          reduce
            ? { duration: 0 }
            : { type: "spring", stiffness: 420, damping: 30, mass: 0.7 }
        }
      >
        {/* Click ripple pulse */}
        <AnimatePresence>
          <motion.span
            key={ripple}
            aria-hidden
            className="absolute inset-0 rounded-full"
            initial={{ opacity: 0.5, scale: 0.4 }}
            animate={{ opacity: 0, scale: 2.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              background: isLight
                ? "rgba(217,173,74,0.5)"
                : "rgba(150,170,230,0.5)",
            }}
          />
        </AnimatePresence>

        {/* Morphing icon — moon turns into sun (both always mounted so
            something is visible the whole time). */}
        <motion.span
          className="relative grid h-4 w-4 place-items-center"
          animate={{ rotate: isLight ? 0 : -360 }}
          transition={
            reduce
              ? { duration: 0 }
              : { type: "spring", stiffness: 140, damping: 18, mass: 0.8 }
          }
        >
          {/* Sun */}
          <motion.span
            aria-hidden
            className="absolute inset-0 grid place-items-center text-onaccent"
            animate={{
              opacity: isLight ? 1 : 0,
              scale: isLight ? 1 : 0.3,
              rotate: isLight ? 0 : -90,
            }}
            transition={
              reduce
                ? { duration: 0 }
                : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
            }
          >
            <Sun className="h-4 w-4" strokeWidth={2.4} />
          </motion.span>

          {/* Moon */}
          <motion.span
            aria-hidden
            className="absolute inset-0 grid place-items-center text-cream-100"
            animate={{
              opacity: isLight ? 0 : 1,
              scale: isLight ? 0.3 : 1,
              rotate: isLight ? 90 : 0,
            }}
            transition={
              reduce
                ? { duration: 0 }
                : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
            }
          >
            <Moon className="h-3.5 w-3.5 fill-current" strokeWidth={2} />
          </motion.span>
        </motion.span>
      </motion.span>
    </motion.button>
  );
}
