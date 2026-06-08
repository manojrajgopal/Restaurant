"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { CtaLink } from "@/types/brand";
import { CTAButton } from "@/components/ui/CTAButton";

interface CTASectionProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  primary: CtaLink;
  secondary?: CtaLink;
  image?: string;
}

export function CTASection({
  eyebrow,
  title,
  subtitle,
  primary,
  secondary,
  image,
}: CTASectionProps) {
  return (
    <section className="section-tight">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-12% 0px -12% 0px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2rem] glass-strong shadow-lift"
        >
          {image && (
            <div className="absolute inset-0 -z-10">
              <Image
                src={image}
                alt=""
                aria-hidden
                fill
                sizes="100vw"
                className="object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-ink-950/95 via-ink-950/80 to-ink-950/70" />
            </div>
          )}

          {/* Decorative */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 -right-32 h-[420px] w-[420px] rounded-full bg-gold-400/25 blur-[140px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-40 -left-40 h-[420px] w-[420px] rounded-full bg-forest-500/30 blur-[140px]"
          />

          <div className="relative grid lg:grid-cols-12 gap-10 p-8 sm:p-12 lg:p-16 items-center">
            <div className="lg:col-span-8">
              {eyebrow && <span className="eyebrow">{eyebrow}</span>}
              <h2 className="mt-5 h-section text-balance">{title}</h2>
              {subtitle && (
                <p className="mt-5 text-cream-100/75 max-w-2xl leading-relaxed text-balance">
                  {subtitle}
                </p>
              )}
            </div>

            <div className="lg:col-span-4 flex flex-wrap items-center gap-3 lg:justify-end">
              <CTAButton href={primary.href} label={primary.label} />
              {secondary && (
                <CTAButton
                  href={secondary.href}
                  label={secondary.label}
                  variant="secondary"
                  icon={false}
                />
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}