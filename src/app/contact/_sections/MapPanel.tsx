"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation, Train, Footprints } from "lucide-react";
import type { BrandData, ContactPageData } from "@/types/brand";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface MapPanelProps {
  data: ContactPageData["map"];
  brand: BrandData;
}

const ICONS = [Navigation, Train, Footprints];

export function MapPanel({ data, brand }: MapPanelProps) {
  return (
    <section className="section-tight">
      <div className="container">
        <SectionHeading
          eyebrow={data.eyebrow}
          title={data.title}
          subtitle={data.subtitle}
        />

        <div className="mt-14 grid lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Stylized map placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 relative rounded-3xl overflow-hidden glass shadow-lift min-h-[420px]"
          >
            {/* Topographic-style decorative SVG map */}
            <svg
              aria-hidden
              className="absolute inset-0 w-full h-full opacity-40"
              viewBox="0 0 800 600"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="mapBg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#1f4233" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#080806" stopOpacity="0.9" />
                </linearGradient>
                <pattern
                  id="grid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="800" height="600" fill="url(#mapBg)" />
              <rect width="800" height="600" fill="url(#grid)" />
              {/* Roads */}
              <path
                d="M 0 380 Q 200 360 400 400 T 800 380"
                fill="none"
                stroke="rgba(217,173,74,0.35)"
                strokeWidth="2"
              />
              <path
                d="M 420 0 Q 380 200 460 400 T 380 600"
                fill="none"
                stroke="rgba(217,173,74,0.25)"
                strokeWidth="1.5"
              />
              <path
                d="M 0 200 Q 300 240 800 200"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
              />
              {/* Topo contours */}
              <ellipse
                cx="430"
                cy="350"
                rx="220"
                ry="120"
                fill="none"
                stroke="rgba(217,173,74,0.08)"
                strokeWidth="1"
              />
              <ellipse
                cx="430"
                cy="350"
                rx="160"
                ry="90"
                fill="none"
                stroke="rgba(217,173,74,0.12)"
                strokeWidth="1"
              />
              <ellipse
                cx="430"
                cy="350"
                rx="100"
                ry="60"
                fill="none"
                stroke="rgba(217,173,74,0.18)"
                strokeWidth="1"
              />
              {/* Pin */}
              <g transform="translate(430 350)">
                <circle r="40" fill="rgba(217,173,74,0.15)">
                  <animate
                    attributeName="r"
                    values="40;55;40"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.4;0;0.4"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle r="14" fill="#d9ad4a" />
                <circle r="6" fill="#080806" />
              </g>
            </svg>

            {/* Address card overlay */}
            <div className="absolute bottom-5 left-5 right-5 sm:left-8 sm:right-auto sm:max-w-sm">
              <div className="glass-strong rounded-2xl p-5 shadow-lift">
                <p className="text-[10px] uppercase tracking-[0.28em] text-gold-300 flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5" />
                  {brand.shortName}
                </p>
                <p className="mt-2 font-display text-lg text-cream-50 leading-snug">
                  {brand.contact.address}
                </p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(brand.contact.address)}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold-300 hover:text-gold-200 link-underline"
                >
                  Open in maps →
                </a>
              </div>
            </div>
          </motion.div>

          {/* Directions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-5 rounded-3xl glass p-7 sm:p-8 shadow-lift"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-gold-300">
              Getting Here
            </p>
            <ul className="mt-6 space-y-5">
              {data.directions.map((d, i) => {
                const Icon = ICONS[i % ICONS.length];
                return (
                  <li key={d.label} className="flex items-start gap-4">
                    <span className="grid place-items-center h-10 w-10 rounded-xl bg-gold-400/10 border border-gold-400/25 text-gold-300 shrink-0">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-display text-base text-cream-50">
                        {d.label}
                      </p>
                      <p className="mt-1 text-sm text-cream-100/70 leading-relaxed">
                        {d.value}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}