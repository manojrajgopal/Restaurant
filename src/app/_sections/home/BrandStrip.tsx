"use client";

import { Award, Sparkles, Flame, Leaf, Star, Wine } from "lucide-react";
import { Marquee } from "@/components/motion/Marquee";

const items = [
  { icon: <Award className="h-4 w-4" />, label: "Two Michelin Stars" },
  { icon: <Sparkles className="h-4 w-4" />, label: "World's 50 Best · No.27" },
  { icon: <Flame className="h-4 w-4" />, label: "Wood-Fired Tasting Menu" },
  { icon: <Leaf className="h-4 w-4" />, label: "Farm-to-Table · Daily Harvest" },
  { icon: <Star className="h-4 w-4" />, label: "Forbes Travel Guide · Five Star" },
  { icon: <Wine className="h-4 w-4" />, label: "Wine Spectator · Grand Award" },
];

/**
 * Subtle endless marquee of accolades, used as a thin transition strip
 * between Hero and the rest of the home page.
 */
export function BrandStrip() {
  return (
    <section
      aria-label="Accolades"
      className="relative border-y border-white/[0.06] bg-white/[0.015] py-5"
    >
      <Marquee
        speed={42}
        fade
        items={items.map((it) => (
          <span
            key={it.label}
            className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-cream-100/65"
          >
            <span className="text-gold-300">{it.icon}</span>
            {it.label}
          </span>
        ))}
        divider={
          <span className="h-1.5 w-1.5 rounded-full bg-gold-400/40" />
        }
      />
    </section>
  );
}
