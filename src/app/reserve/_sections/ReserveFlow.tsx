"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Users, Clock, Wallet, ShieldCheck } from "lucide-react";
import type { BrandData, ReservePageData } from "@/types/brand";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTAButton } from "@/components/ui/CTAButton";
import { cn } from "@/lib/utils";

interface ReserveFlowProps {
  experiences: ReservePageData["experiences"];
  form: ReservePageData["form"];
  brand: BrandData;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  message: string;
}

const initial: FormState = {
  name: "",
  email: "",
  phone: "",
  date: "",
  time: "19:30",
  guests: "2",
  message: "",
};

export function ReserveFlow({ experiences, form, brand }: ReserveFlowProps) {
  const [selectedId, setSelectedId] = useState(experiences.items[0]?.id);
  const [state, setState] = useState<FormState>(initial);
  const [sent, setSent] = useState(false);

  const selected = experiences.items.find((e) => e.id === selectedId);

  const update =
    (key: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setState((s) => ({ ...s, [key]: e.target.value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      {/* === Experience picker === */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow={experiences.eyebrow}
            title={experiences.title}
            subtitle={experiences.subtitle}
          />

          <div className="mt-14 grid lg:grid-cols-3 gap-5 lg:gap-6">
            {experiences.items.map((exp, i) => {
              const active = exp.id === selectedId;
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 48 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-12% 0px -12% 0px" }}
                  transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                    delay: i * 0.12,
                  }}
                  className="h-full"
                >
                  <motion.button
                    type="button"
                    onClick={() => setSelectedId(exp.id)}
                    whileHover={{ y: -6 }}
                    whileTap={{ scale: 0.985 }}
                    transition={{ type: "spring", stiffness: 220, damping: 22 }}
                    aria-pressed={active}
                    className={cn(
                      "group relative isolate flex h-full w-full flex-col text-left rounded-3xl overflow-hidden glass shadow-lift focus-ring transition-shadow duration-500",
                      active
                        ? "ring-2 ring-gold-400 shadow-glow"
                        : "ring-1 ring-inset ring-white/0 hover:ring-[color:var(--ring-media)]"
                    )}
                  >
                    <div className="relative aspect-[5/4] overflow-hidden">
                      <Image
                        src={exp.image}
                        alt={exp.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/30 to-transparent" />

                      <div className="absolute top-5 right-5">
                        <span
                          className={cn(
                            "grid place-items-center h-9 w-9 rounded-full transition-all",
                            active
                              ? "bg-gold-400 text-onaccent"
                              : "bg-[color:var(--surface-bg-strong)] border border-[color:var(--surface-border-strong)] text-cream-100/60"
                          )}
                        >
                          {active ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <span className="block h-2 w-2 rounded-full bg-current" />
                          )}
                        </span>
                      </div>

                      <div className="absolute inset-x-5 bottom-5">
                        <p className="text-[10px] uppercase tracking-[0.28em] text-gold-300">
                          {exp.price}
                        </p>
                        <h3 className="mt-2 font-display text-2xl text-cream-50 leading-tight">
                          {exp.name}
                        </h3>
                      </div>
                    </div>

                    <div className="p-6 sm:p-7">
                      <p className="text-sm text-cream-100/70 leading-relaxed">
                        {exp.summary}
                      </p>
                      <div className="mt-5 grid grid-cols-2 gap-3 text-xs text-cream-100/75">
                        <span className="inline-flex items-center gap-2">
                          <Clock className="h-3.5 w-3.5 text-gold-300" />
                          {exp.duration}
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <Users className="h-3.5 w-3.5 text-gold-300" />
                          {exp.guests}
                        </span>
                      </div>
                      <ul className="mt-5 space-y-2 text-sm text-cream-100/75">
                        {exp.features.map((f) => (
                          <li key={f} className="flex items-start gap-2.5">
                            <Check className="h-4 w-4 text-gold-300 mt-0.5 shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* === Reservation form === */}
      <section className="section-tight">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Summary panel */}
            <aside className="lg:col-span-5">
              <div className="sticky top-28 rounded-3xl glass-strong p-7 sm:p-8 shadow-lift overflow-hidden">
                <div
                  aria-hidden
                  className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-gold-400/20 blur-3xl"
                />
                <p className="eyebrow relative">Your Selection</p>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selected?.id ?? "none"}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="relative"
                  >
                    <h3 className="mt-5 font-display text-3xl text-cream-50">
                      {selected?.name ?? "Choose an experience above"}
                    </h3>
                    <p className="mt-3 text-sm text-cream-100/70 leading-relaxed">
                      {selected?.summary}
                    </p>
                    <dl className="mt-7 space-y-4 text-sm">
                      <Row icon={<Wallet className="h-4 w-4" />} label="From" value={selected?.price ?? "—"} />
                      <Row icon={<Clock className="h-4 w-4" />} label="Duration" value={selected?.duration ?? "—"} />
                      <Row icon={<Users className="h-4 w-4" />} label="Party" value={selected?.guests ?? "—"} />
                    </dl>
                  </motion.div>
                </AnimatePresence>
                <div className="hairline my-6" />
                <p className="flex items-start gap-3 text-xs text-cream-100/60">
                  <ShieldCheck className="h-4 w-4 text-gold-300 mt-0.5 shrink-0" />
                  {form.promise}
                </p>
              </div>
            </aside>

            {/* Form */}
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow={form.eyebrow}
                title={form.title}
                subtitle={form.subtitle}
                align="left"
              />
              <form
                onSubmit={handleSubmit}
                className="mt-10 relative glass rounded-3xl p-7 sm:p-10 shadow-lift"
              >
                <input type="hidden" name="experience" value={selectedId} />
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Your Name" name="name" value={state.name} onChange={update("name")} required />
                  <Field label="Email" type="email" name="email" value={state.email} onChange={update("email")} required />
                  <Field label="Phone" type="tel" name="phone" value={state.phone} onChange={update("phone")} />
                  <Field label="Preferred Date" type="date" name="date" value={state.date} onChange={update("date")} required />
                  <Field label="Preferred Time" type="time" name="time" value={state.time} onChange={update("time")} />
                  <div className="flex min-w-0 flex-col gap-2">
                    <label className="field-label">Number of Guests</label>
                    <div className="flex flex-wrap gap-2">
                      {["2", "3", "4", "6", "8", "10+"].map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setState((s) => ({ ...s, guests: g }))}
                          className={cn(
                            "px-4 py-2.5 rounded-full text-sm transition-all focus-ring",
                            state.guests === g
                              ? "bg-gold-400 text-onaccent border border-gold-400"
                              : "border border-[color:var(--surface-border)] text-cream-100/75 hover:border-gold-300/50"
                          )}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="sm:col-span-2 flex min-w-0 flex-col gap-2">
                    <label htmlFor="message" className="field-label">
                      Anything we should know?
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={state.message}
                      onChange={update("message")}
                      className="field-lg"
                      placeholder={`Allergies, anniversaries, special requests for a ${selected?.name.toLowerCase() ?? "table"}…`}
                    />
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                  <p className="text-xs text-cream-100/55">
                    We hold a small list of weekday seats for last-minute guests.
                  </p>
                  <CTAButton label={sent ? "Request Sent ✓" : form.submit} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* — helpers — */

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <label htmlFor={name} className="field-label">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        className="field"
      />
    </div>
  );
}

function Row({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="flex items-center gap-3 text-cream-100/65">
        <span className="grid place-items-center h-8 w-8 rounded-lg bg-[color:var(--surface-bg)] border border-[color:var(--surface-border)] text-gold-300">
          {icon}
        </span>
        {label}
      </dt>
      <dd className="text-cream-50 text-right">{value}</dd>
    </div>
  );
}