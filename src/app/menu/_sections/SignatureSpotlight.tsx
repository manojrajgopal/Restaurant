"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import type { MenuData, MenuPageData } from "@/types/brand";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface SignatureSpotlightProps {
  data: MenuPageData["signatureSpotlight"];
  menu: MenuData;
}

export function SignatureSpotlight({ data, menu }: SignatureSpotlightProps) {
  const items = data.ids
    .map((id) => menu.items.find((i) => i.id === id))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  return (
    <section className="section">
      <div
        aria-hidden
        className="absolute right-0 top-20 h-[420px] w-[420px] rounded-full bg-gold-400/10 blur-[160px]"
      />
      <div className="container relative">
        <SectionHeading
          eyebrow={data.eyebrow}
          title={data.title}
          subtitle={data.subtitle}
        />

        <div className="mt-14 grid lg:grid-cols-3 gap-6 lg:gap-8">
          {items.map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-12% 0px -12% 0px" }}
              transition={{
                duration: 0.8,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -8 }}
              className={`group relative ${
                i === 1 ? "lg:-translate-y-8" : ""
              }`}
            >
              <div className="relative rounded-[2rem] overflow-hidden glass-strong shadow-lift">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/40 to-transparent" />

                  <div className="absolute top-5 left-5 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-br from-gold-400/30 to-gold-600/10 border border-gold-400/40 backdrop-blur-md">
                    <Star className="h-3 w-3 fill-gold-300 text-gold-300" />
                    <span className="text-[10px] uppercase tracking-[0.22em] text-gold-200">
                      Signature
                    </span>
                  </div>

                  <span className="absolute top-5 right-5 font-display text-3xl text-cream-50/90">
                    0{i + 1}
                  </span>
                </div>

                <div className="p-7 sm:p-8">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-2xl text-cream-50">
                      {item.name}
                    </h3>
                    <span className="font-display text-xl text-gold-300 shrink-0">
                      {item.price}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-cream-100/70 leading-relaxed">
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
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}