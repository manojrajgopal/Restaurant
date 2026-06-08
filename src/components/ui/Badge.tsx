import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "gold" | "outline";
  className?: string;
}

const variants = {
  default: "bg-[color:var(--surface-bg-strong)] text-cream-100/90 border border-[color:var(--surface-border)]",
  gold: "bg-gradient-to-br from-gold-400/20 to-gold-600/10 text-gold-200 border border-gold-400/30",
  outline: "border border-[color:var(--surface-border-strong)] text-cream-100/80",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.22em] font-medium backdrop-blur-md",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
