import { cn } from "@/lib/utils";

interface GradientOrbProps {
  className?: string;
  color?: "gold" | "forest" | "rose" | "violet";
  size?: number;
}

const colors: Record<NonNullable<GradientOrbProps["color"]>, string> = {
  gold: "from-gold-400/40 via-gold-500/10 to-transparent",
  forest: "from-forest-500/60 via-forest-700/10 to-transparent",
  rose: "from-rose-400/40 via-rose-500/10 to-transparent",
  violet: "from-violet-500/40 via-fuchsia-500/10 to-transparent",
};

export function GradientOrb({
  className,
  color = "gold",
  size = 520,
}: GradientOrbProps) {
  return (
    <div
      aria-hidden
      style={{ width: size, height: size }}
      className={cn(
        "pointer-events-none absolute rounded-full blur-[120px] opacity-70 bg-gradient-radial",
        `bg-gradient-to-br ${colors[color]}`,
        className
      )}
    />
  );
}
