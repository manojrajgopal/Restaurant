"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Clock, ShieldCheck } from "lucide-react";
import type { BrandData, ContactData } from "@/types/brand";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTAButton } from "@/components/ui/CTAButton";

interface ContactProps {
  data: ContactData;
  brand: BrandData;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  date: string;
  guests: string;
  message: string;
}

const initial: FormState = {
  name: "",
  email: "",
  phone: "",
  date: "",
  guests: "2",
  message: "",
};

export function Contact({ data, brand }: ContactProps) {
  const [form, setForm] = useState<FormState>(initial);
  const [sent, setSent] = useState(false);

  const update =
    (key: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
    // No backend in this phase — front-end success state only.
  };

  return (
    <section id="contact" className="section">
      <div
        aria-hidden
        className="absolute -top-32 -right-20 h-[460px] w-[460px] rounded-full bg-gold-400/10 blur-[160px]"
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -left-20 h-[460px] w-[460px] rounded-full bg-forest-500/25 blur-[160px]"
      />

      <div className="container relative">
        <SectionHeading
          eyebrow={data.eyebrow}
          title={data.title}
          subtitle={data.subtitle}
        />

        <div className="mt-16 grid lg:grid-cols-12 gap-8">
          {/* LEFT: Contact card */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-12% 0px -12% 0px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <div className="relative glass rounded-3xl p-8 shadow-lift overflow-hidden h-full">
              <div
                aria-hidden
                className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-gold-400/20 blur-3xl"
              />
              <div className="relative">
                <p className="eyebrow">{brand.shortName} · Concierge</p>
                <h3 className="mt-5 font-display text-2xl sm:text-3xl text-cream-50">
                  We respond in person — typically within the hour.
                </h3>

                <ul className="mt-8 space-y-5">
                  <ContactRow
                    icon={<MapPin className="h-4 w-4" />}
                    label="Address"
                    value={brand.contact.address}
                  />
                  <ContactRow
                    icon={<Phone className="h-4 w-4" />}
                    label="Phone"
                    value={brand.contact.phone}
                    href={`tel:${brand.contact.phone}`}
                  />
                  <ContactRow
                    icon={<Mail className="h-4 w-4" />}
                    label="Email"
                    value={brand.contact.email}
                    href={`mailto:${brand.contact.email}`}
                  />
                </ul>

                <div className="hairline my-7" />

                <div>
                  <p className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-gold-300">
                    <Clock className="h-4 w-4" />
                    Hours of service
                  </p>
                  <ul className="mt-4 space-y-2">
                    {brand.workingHours.map((h) => (
                      <li
                        key={h.day}
                        className="flex items-baseline justify-between gap-4 text-sm"
                      >
                        <span className="text-cream-100/80">{h.day}</span>
                        <span className="text-cream-100/55 tabular-nums">
                          {h.hours}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 flex items-start gap-3 text-xs text-cream-100/60">
                  <ShieldCheck className="h-4 w-4 text-gold-300 mt-0.5 shrink-0" />
                  <span>{data.promise}</span>
                </div>
              </div>
            </div>
          </motion.aside>

          {/* RIGHT: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-12% 0px -12% 0px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit}
              className="relative glass rounded-3xl p-7 sm:p-10 shadow-lift"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <Field
                  label={data.formLabels.name}
                  name="name"
                  value={form.name}
                  onChange={update("name")}
                  required
                />
                <Field
                  label={data.formLabels.email}
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  required
                />
                <Field
                  label={data.formLabels.phone}
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={update("phone")}
                />
                <Field
                  label={data.formLabels.date}
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={update("date")}
                  required
                />

                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label className="text-[10px] uppercase tracking-[0.28em] text-cream-100/55">
                    {data.formLabels.guests}
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {["2", "3", "4", "6", "8", "10+"].map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, guests: g }))}
                        className={`px-4 py-2.5 rounded-full text-sm transition-all focus-ring ${
                          form.guests === g
                            ? "bg-gold-400 text-ink-950 border border-gold-400"
                            : "border border-white/10 text-cream-100/75 hover:border-gold-300/50"
                        }`}
                      >
                        {g} guests
                      </button>
                    ))}
                  </div>
                </div>

                <div className="sm:col-span-2 flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-[0.28em] text-cream-100/55">
                    {data.formLabels.message}
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={update("message")}
                    className="rounded-2xl bg-white/[0.04] border border-white/10 px-5 py-4 text-sm text-cream-50 placeholder:text-cream-100/35 focus:outline-none focus:border-gold-300/40 focus:bg-white/[0.06] transition-colors resize-none"
                    placeholder="Anniversary, allergies, special requests…"
                  />
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                <p className="text-xs text-cream-100/55">
                  By submitting, you agree to receive a personal follow-up from our team.
                </p>
                <CTAButton
                  label={sent ? "Reservation Sent ✓" : data.formLabels.submit}
                />
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* — helpers — */

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const Inner = (
    <div className="flex items-start gap-4">
      <span className="grid place-items-center h-10 w-10 rounded-xl bg-white/[0.04] border border-white/10 text-gold-300 shrink-0">
        {icon}
      </span>
      <div>
        <p className="text-[10px] uppercase tracking-[0.28em] text-cream-100/55">
          {label}
        </p>
        <p className="mt-1 text-sm text-cream-50 leading-relaxed">{value}</p>
      </div>
    </div>
  );
  return href ? (
    <li>
      <a href={href} className="block group focus-ring rounded-xl">
        {Inner}
      </a>
    </li>
  ) : (
    <li>{Inner}</li>
  );
}

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
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="text-[10px] uppercase tracking-[0.28em] text-cream-100/55"
      >
        {label}
      </label>
      <motion.input
        id={name}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        whileFocus={{ scale: 1.015 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="rounded-2xl bg-white/[0.04] border border-white/10 px-5 py-3.5 text-sm text-cream-50 placeholder:text-cream-100/35 focus:outline-none focus:border-gold-300/40 focus:bg-white/[0.06] transition-colors"
      />
    </div>
  );
}
