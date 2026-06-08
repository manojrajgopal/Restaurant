"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { ServicesData } from "@/types/brand";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { RevealImage } from "@/components/motion/RevealImage";
import { Stagger, staggerItem } from "@/components/animations/Reveal";

interface ServicesProps {
  data: ServicesData;
}

export function Services({ data }: ServicesProps) {
  return (
    <section id="services" className="section bg-noise">
      {/* Subtle forest wash */}
      <div
        aria-hidden
        className="absolute -bottom-40 right-0 h-[520px] w-[520px] rounded-full bg-forest-500/25 blur-[160px]"
      />
      <div
        aria-hidden
        className="absolute -top-20 left-0 h-[420px] w-[420px] rounded-full bg-gold-400/10 blur-[140px]"
      />

      <div className="container relative">
        <SectionHeading
          eyebrow={data.eyebrow}
          title={data.title}
          subtitle={data.subtitle}
        />

        <Stagger className="mt-16 grid md:grid-cols-2 gap-6 lg:gap-7">
          {data.items.map((s, i) => (
            <motion.article
              key={s.title}
              variants={staggerItem}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
              className="group relative"
            >
              <div className="relative h-full rounded-3xl overflow-hidden glass shadow-lift">
                <div className="grid sm:grid-cols-5 h-full">
                  {/* Image */}
                  <div className="relative sm:col-span-2 aspect-[5/4] sm:aspect-auto sm:min-h-[320px] overflow-hidden">
                    <RevealImage
                      src={s.image}
                      alt={s.title}
                      fill
                      sizes="(max-width:768px) 100vw, 40vw"
                      hoverZoom
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-ink-950/40 to-transparent pointer-events-none" />
                    {/* Number */}
                    <span className="absolute top-5 left-5 font-display text-3xl text-cream-50/90">
                      0{i + 1}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="sm:col-span-3 p-7 lg:p-8 flex flex-col">
                    <div className="flex items-center gap-3">
                      <div className="grid place-items-center h-11 w-11 rounded-2xl bg-gold-400/10 border border-gold-400/25 text-gold-300">
                        <DynamicIcon name={s.icon} className="h-5 w-5" />
                      </div>
                      <h3 className="font-display text-2xl text-cream-50">
                        {s.title}
                      </h3>
                    </div>
                    <p className="mt-4 text-sm text-cream-100/70 leading-relaxed">
                      {s.description}
                    </p>
                    <ul className="mt-6 space-y-2.5">
                      {s.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-3 text-sm text-cream-100/80"
                        >
                          <span className="grid place-items-center h-5 w-5 rounded-full bg-gold-400/20 text-gold-300 shrink-0 mt-0.5">
                            <Check className="h-3 w-3" />
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>

                    <a
                      href="#contact"
                      className="mt-7 inline-flex items-center gap-2 text-sm text-gold-300 hover:text-gold-200 link-underline self-start"
                    >
                      Enquire about {s.title.toLowerCase()} →
                    </a>
                  </div>
                </div>

                {/* hover sheen */}
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
