"use client";

import {
  Flame,
  Wheat,
  Wine,
  Sparkles,
  Star,
  Leaf,
  Utensils,
  Users,
  Gift,
  Instagram,
  Facebook,
  Youtube,
  Music2,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";

const REGISTRY: Record<string, LucideIcon> = {
  flame: Flame,
  wheat: Wheat,
  wine: Wine,
  sparkles: Sparkles,
  star: Star,
  leaf: Leaf,
  utensils: Utensils,
  users: Users,
  gift: Gift,
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  pinterest: Music2,
  arrow: ArrowUpRight,
};

export function DynamicIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = REGISTRY[name?.toLowerCase()] ?? Sparkles;
  return <Icon className={className} aria-hidden />;
}
