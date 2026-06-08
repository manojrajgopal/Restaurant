import Link from "next/link";
import { CTAButton } from "@/components/ui/CTAButton";

export default function NotFound() {
  return (
    <section className="relative min-h-[100svh] grid place-items-center overflow-hidden pt-32 pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-[460px] w-[820px] rounded-full bg-gold-400/15 blur-[160px]"
      />
      <div
        aria-hidden
        className="absolute inset-0 dot-grid opacity-20"
      />
      <div className="container relative text-center max-w-2xl">
        <p className="eyebrow justify-center">Lost Course</p>
        <h1 className="mt-6 h-display text-balance">
          We can&rsquo;t find that <span className="italic text-gold-gradient">page</span>.
        </h1>
        <p className="mt-6 text-cream-100/70 text-lg leading-relaxed text-balance">
          The link may have moved or the evening it was tied to has passed. Let
          us walk you back to the dining room.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <CTAButton href="/" label="Back to Home" />
          <Link
            href="/reserve"
            className="px-6 py-3.5 rounded-full text-sm text-cream-50 border border-[color:var(--surface-border-strong)] hover:border-gold-300/50 transition-colors focus-ring"
          >
            Reserve a Table
          </Link>
        </div>
      </div>
    </section>
  );
}