"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import type { HomeData, MenuData } from "@/types/brand";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { MotionCard } from "@/components/motion/MotionCard";
import { Stagger, staggerItem } from "@/components/animations/Reveal";

interface MenuPreviewProps {
  data: HomeData["menuPreview"];
  menu: MenuData;
}

export function MenuPreview({ data, menu }: MenuPreviewProps) {
  const items = data.highlightIds
    .map((id) => menu.items.find((i) => i.id === id))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  return (
    <section className="section">
      <div
        aria-hidden
        className="absolute right-0 -top-20 h-[420px] w-[420px] rounded-full bg-gold-400/12 blur-[160px]"
      />
      <div className="container relative">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <SectionHeading
            eyebrow={data.eyebrow}
            title={data.title}
            subtitle={data.subtitle}
            align="left"
          />
          <Link
            href={data.cta.href}
            className="group inline-flex items-center gap-2.5 text-sm uppercase tracking-[0.28em] text-gold-300 hover:text-gold-200 transition-colors focus-ring rounded-md py-2 shrink-0 self-start lg:self-end"
          >
            <span className="link-underline">{data.cta.label}</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {items.map((item) => (
            <motion.article
              key={item.id}
              variants={staggerItem}
              className="group relative"
            >
              <MotionCard className="h-full" tilt={6} lift={9}>
              <div className="relative h-full rounded-3xl overflow-hidden glass shadow-lift flex flex-col">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/30 to-transparent" />

                  {item.signature && (
                    <div className="absolute top-4 left-4">
                      <Badge variant="gold">
                        <Star className="h-2.5 w-2.5 fill-current" />
                        Signature
                      </Badge>
                    </div>
                  )}

                  <div className="absolute inset-x-5 bottom-5">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-lg text-cream-50 leading-tight">
                        {item.name}
                      </h3>
                      <span className="font-display text-gold-300 text-base shrink-0">
                        {item.price}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-cream-100/65 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
              </MotionCard>
            </motion.article>
          ))}
        </Stagger>
      </div>
    </section>
  );
}