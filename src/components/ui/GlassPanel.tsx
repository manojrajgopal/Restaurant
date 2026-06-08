import { createElement } from "react";
import { cn } from "@/lib/utils";

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  glow?: boolean;
}

export function GlassPanel({
  children,
  className,
  as = "div",
  glow = false,
}: GlassPanelProps) {
  return createElement(
    as,
    {
      className: cn(
        "relative rounded-3xl glass overflow-hidden",
        glow &&
          "before:absolute before:inset-0 before:-z-10 before:rounded-3xl before:bg-radial-gold before:opacity-60",
        className
      ),
    },
    children
  );
}
