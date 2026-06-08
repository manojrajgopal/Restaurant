"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { AboutData } from "@/types/brand";
import { Reveal } from "@/components/animations/Reveal";

interface AboutProps {
  data: AboutData;
}

export function About({ data }: AboutProps) {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Visual column */}
          <div className="lg:col-span-6 relative">
            <Reveal>
              <div className="relative perspective-1200">
                <motion.div
                  whileHover={{ rotateX: -3, rotateY: 3 }}
                  transition={{ type: "spring", stiffness: 180, damping: 20 }}
                  className="preserve-3d relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-lift"
                >
                  <Image
                    src={data.image}
                    alt={`${data.signature.name} at work`}
                    fill
                    sizes="(max-width: 1024px) 90vw, 45vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
                  <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/15" />

                  {/* Signature plate */}
                  <div className="absolute left-6 bottom-6 right-6 flex items-end justify-between gap-4">
                    <div>
                      <p className="font-display italic text-2xl text-cream-50">
                        {data.signature.name}
                      </p>
                      <p className="text-xs uppercase tracking-[0.3em] text-cream-100/65 mt-1">
                        {data.signature.role}
                      </p>
                    </div>
                    <span className="font-display text-5xl text-gold-gradient leading-none">
                      ✺
                    </span>
                  </div>
                </motion.div>

                {/* Secondary floating image */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.9, delay: 0.2 }}
                  className="absolute -right-4 sm:-right-10 -bottom-10 w-44 sm:w-56 aspect-square rounded-2xl overflow-hidden shadow-lift ring-1 ring-white/15"
                >
                  <Image
                    src={data.secondaryImage}
                    alt=""
                    aria-hidden
                    fill
                    sizes="220px"
                    className="object-cover"
                  />
                </motion.div>

                {/* Floating stat pill */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.35 }}
                  className="absolute -left-4 sm:-left-10 top-12 glass rounded-2xl px-5 py-4 shadow-lift"
                >
                  <p className="text-[10px] uppercase tracking-[0.28em] text-gold-300">
                    Returning
                  </p>
                  <p className="font-display text-3xl text-cream-50 leading-none mt-1">
                    92<span className="text-gold-400">%</span>
                  </p>
                  <p className="text-[11px] text-cream-100/60 mt-1">
                    of guests come back
                  </p>
                </motion.div>
              </div>
            </Reveal>
          </div>

          {/* Copy column */}
          <div className="lg:col-span-6 lg:pl-6">
            <Reveal delay={0.05}>
              <p className="eyebrow">{data.eyebrow}</p>
              <h2 className="mt-5 h-section text-balance">{data.title}</h2>
            </Reveal>

            <div className="mt-7 space-y-5">
              {data.paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.1 + i * 0.08}>
                  <p className="text-[15.5px] text-cream-100/75 leading-relaxed">
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>

            {/* Pillars */}
            <div className="mt-10 grid sm:grid-cols-1 gap-3">
              {data.pillars.map((p, i) => (
                <Reveal key={p.title} delay={0.25 + i * 0.07}>
                  <div className="group flex gap-5 p-5 rounded-2xl border border-white/[0.06] hover:border-gold-300/30 hover:bg-white/[0.02] transition-colors">
                    <div className="shrink-0 grid place-items-center h-10 w-10 rounded-xl bg-gold-400/10 border border-gold-400/20 text-gold-300 font-display">
                      0{i + 1}
                    </div>
                    <div>
                      <h4 className="font-display text-lg text-cream-50">
                        {p.title}
                      </h4>
                      <p className="text-sm text-cream-100/65 mt-1 leading-relaxed">
                        {p.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Stats row */}
            <Reveal delay={0.4}>
              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/5">
                {data.stats.map((s) => (
                  <div key={s.label}>
                    <p className="font-display text-3xl text-cream-50">
                      {s.value}
                    </p>
                    <p className="text-[11px] uppercase tracking-[0.25em] text-cream-100/55 mt-1.5">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
