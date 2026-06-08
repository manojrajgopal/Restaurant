"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { AboutPageData } from "@/types/brand";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, staggerItem } from "@/components/animations/Reveal";

interface TeamProps {
  data: AboutPageData["team"];
}

export function Team({ data }: TeamProps) {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          eyebrow={data.eyebrow}
          title={data.title}
          subtitle={data.subtitle}
        />

        <Stagger className="mt-14 grid md:grid-cols-3 gap-6 lg:gap-8">
          {data.members.map((m) => (
            <motion.article
              key={m.name}
              variants={staggerItem}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="group relative"
            >
              <div className="relative rounded-3xl overflow-hidden glass shadow-lift">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={m.image}
                    alt={m.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/30 to-transparent" />

                  <div className="absolute inset-x-6 bottom-6">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-gold-300">
                      {m.role}
                    </p>
                    <h3 className="mt-2 font-display text-2xl text-cream-50 leading-tight">
                      {m.name}
                    </h3>
                  </div>
                </div>
                <div className="p-6 sm:p-7">
                  <p className="text-sm text-cream-100/70 leading-relaxed">
                    {m.bio}
                  </p>
                </div>
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-transparent group-hover:ring-gold-300/30 transition-colors"
                />
              </div>
            </motion.article>
          ))}
        </Stagger>
      </div>
    </section>
  );
}