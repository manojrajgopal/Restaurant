"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star } from "lucide-react";
import type { MenuData, MenuItem } from "@/types/brand";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealImage } from "@/components/motion/RevealImage";
import { MotionCard } from "@/components/motion/MotionCard";
import { Badge } from "@/components/ui/Badge";
import { easing, viewportReveal } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface MenuSectionProps {
  data: MenuData;
}

export function MenuSection({ data }: MenuSectionProps) {
  const [active, setActive] = useState<string>(data.categories[0]?.id ?? "all");

  const items: MenuItem[] = useMemo(() => {
    if (active === "all") return data.items;
    return data.items.filter((i) => i.category === active);
  }, [active, data.items]);

  const activeCategory = data.categories.find((c) => c.id === active);

  return (
    <section id="menu" className="section">
      {/* Subtle decorative */}
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 -translate-x-1/2 h-[480px] w-[820px] rounded-full bg-gold-400/10 blur-[140px]"
      />

      <div className="container relative">
        <SectionHeading
          eyebrow={data.eyebrow}
          title={data.title}
          subtitle={data.subtitle}
        />

        {/* Tabs */}
        <div className="mt-12 flex justify-center">
          <div
            role="tablist"
            aria-label="Menu categories"
            className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-full glass max-w-full overflow-x-auto"
          >
            {data.categories.map((c) => {
              const isActive = c.id === active;
              return (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(c.id)}
                  className={cn(
                    "relative px-5 py-2.5 rounded-full text-sm transition-colors focus-ring whitespace-nowrap",
                    isActive
                      ? "text-onaccent"
                      : "text-cream-100/75 hover:text-cream-50"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="menu-tab"
                      className="absolute inset-0 rounded-full bg-gradient-to-br from-gold-200 via-gold-400 to-gold-600 shadow-glow"
                      transition={{ type: "spring", stiffness: 300, damping: 28 }}
                    />
                  )}
                  <span className="relative">{c.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {activeCategory?.description && (
          <p className="mt-5 text-center text-sm text-cream-100/55 italic">
            {activeCategory.description}
          </p>
        )}

        {/* Grid */}
        <motion.div
          layout
          className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7"
        >
          <AnimatePresence mode="popLayout">
            {items.map((item, idx) => (
              <motion.article
                layout
                key={item.id}
                initial={{ opacity: 0, y: 44, scale: 0.96, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 12, scale: 0.97 }}
                viewport={viewportReveal}
                transition={{
                  duration: 0.7,
                  // Column-based stagger keeps every card lively without
                  // long delays when there are many items.
                  delay: (idx % 3) * 0.1,
                  ease: easing.out,
                }}
                className="group relative h-full"
              >
                <MotionCard className="h-full" tilt={6} lift={10}>
                <div className="relative isolate rounded-3xl overflow-hidden glass glow-ring shadow-lift h-full flex flex-col [transform-style:preserve-3d]">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <RevealImage
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      hoverZoom
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent pointer-events-none" />

                    {/* Top labels */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start gap-2">
                      <div className="flex flex-wrap gap-1.5">
                        {item.signature && (
                          <Badge variant="gold">
                            <Star className="h-2.5 w-2.5 fill-current" />
                            Signature
                          </Badge>
                        )}
                        {item.popular && !item.signature && (
                          <Badge variant="default">Popular</Badge>
                        )}
                      </div>
                      <span className="font-display text-xl text-cream-50 px-3 py-1 rounded-full bg-ink-950/70 backdrop-blur-md border border-[color:var(--surface-border)]">
                        {item.price}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative p-6 flex flex-col flex-1">
                    <h3 className="font-display text-xl text-cream-50">
                      {item.name}
                    </h3>
                    <p className="mt-2 text-sm text-cream-100/65 leading-relaxed flex-1">
                      {item.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {item.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] uppercase tracking-[0.22em] text-cream-100/55 px-2.5 py-1 rounded-full border border-[color:var(--surface-border)]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Hover sheen */}
                  <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none rounded-3xl ring-1 ring-inset ring-transparent group-hover:ring-gold-300/30 transition-colors"
                  />
                </div>
                </MotionCard>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Footnote */}
        <p className="mt-12 text-center text-xs text-cream-100/45 italic">
          The complete tasting menu and pairings are presented at the table.
          Allergens accommodated with 48h notice.
        </p>
      </div>
    </section>
  );
}
