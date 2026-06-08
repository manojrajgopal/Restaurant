"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import type { BrandData, FooterData } from "@/types/brand";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

interface FooterProps {
  brand: BrandData;
  footer: FooterData;
}

export function Footer({ brand, footer }: FooterProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <footer className="relative overflow-hidden border-t border-[color:var(--surface-border-soft)] bg-ink-950">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[420px] w-[820px] rounded-full bg-gold-400/10 blur-[160px]" />
        <div className="absolute inset-0 dot-grid opacity-20" />
      </div>

      <div className="relative container py-20 lg:py-28">
        {/* Top: Newsletter band */}
        <ScrollReveal variant="fade-up" className="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-16">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <span className="grid place-items-center h-11 w-11 rounded-2xl bg-gradient-to-br from-gold-300 via-gold-500 to-gold-600 text-onaccent font-display shadow-glow">
                {brand.logoMark}
              </span>
              <div>
                <p className="font-display text-xl text-cream-50">
                  {brand.brandName}
                </p>
                <p className="text-[11px] uppercase tracking-[0.3em] text-cream-100/50 mt-0.5">
                  {brand.tagline}
                </p>
              </div>
            </div>
            <p className="text-cream-100/70 leading-relaxed max-w-md">
              {footer.message}
            </p>
            <div className="mt-8 space-y-3 text-sm text-cream-100/80">
              <p className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-gold-300 mt-0.5 shrink-0" />
                {brand.contact.address}
              </p>
              <p className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gold-300" />
                <a href={`tel:${brand.contact.phone}`} className="link-underline">
                  {brand.contact.phone}
                </a>
              </p>
              <p className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gold-300" />
                <a
                  href={`mailto:${brand.contact.email}`}
                  className="link-underline"
                >
                  {brand.contact.email}
                </a>
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-3 gap-10">
            {footer.columns.map((col) => (
              <div key={col.title}>
                <h4 className="text-xs uppercase tracking-[0.3em] text-gold-300 mb-5">
                  {col.title}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-sm text-cream-100/75 hover:text-gold-200 transition-colors link-underline"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Newsletter */}
        <ScrollReveal variant="fade-scale" className="relative glass rounded-3xl p-8 sm:p-10 grid lg:grid-cols-12 gap-8 items-center overflow-hidden">
          <div
            aria-hidden
            className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold-400/20 blur-3xl"
          />
          <div className="lg:col-span-6 relative">
            <p className="eyebrow">Stay close</p>
            <h3 className="mt-4 font-display text-2xl sm:text-3xl text-cream-50">
              {footer.newsletter.title}
            </h3>
            <p className="mt-3 text-cream-100/70 max-w-md">
              {footer.newsletter.subtitle}
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email) setSubmitted(true);
            }}
            className="lg:col-span-6 relative"
          >
            <div className="flex flex-col sm:flex-row gap-3 p-2 rounded-2xl bg-[color:var(--surface-bg)] border border-[color:var(--surface-border)]">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={footer.newsletter.placeholder}
                aria-label="Email address"
                className="flex-1 bg-transparent px-4 py-3 text-sm text-cream-50 placeholder:text-cream-100/40 focus:outline-none focus-ring rounded-xl"
              />
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-br from-gold-300 via-gold-400 to-gold-600 text-onaccent text-sm font-medium focus-ring"
              >
                {submitted ? "Subscribed ✓" : footer.newsletter.cta}
              </motion.button>
            </div>
          </form>
        </ScrollReveal>

        {/* Bottom row */}
        <div className="mt-14 pt-8 border-t border-[color:var(--surface-border-soft)] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <p className="text-xs text-cream-100/50 tracking-wide">
            {footer.copyright}
          </p>
          <div className="flex items-center gap-2">
            {brand.socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={s.label}
                className="grid place-items-center h-10 w-10 rounded-full border border-[color:var(--surface-border)] text-cream-100/70 hover:text-gold-200 hover:border-gold-300/40 transition-colors focus-ring"
              >
                <DynamicIcon name={s.icon} className="h-4 w-4" />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-5">
            {footer.legal.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-xs text-cream-100/50 hover:text-gold-200 link-underline"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
