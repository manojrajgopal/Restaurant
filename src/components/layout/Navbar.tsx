"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import type { BrandData, NavigationData } from "@/types/brand";
import { CTAButton } from "@/components/ui/CTAButton";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { isActiveRoute } from "@/lib/routes";
import { cn } from "@/lib/utils";

interface NavbarProps {
  brand: BrandData;
  navigation: NavigationData;
}

export function Navbar({ brand, navigation }: NavbarProps) {
  const pathname = usePathname() ?? "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "py-3" : "py-5"
        )}
      >
        <div className="container">
          <div
            className={cn(
              "flex items-center justify-between rounded-full pl-5 pr-3 py-3 transition-all duration-500",
              scrolled
                ? "glass shadow-lift"
                : "bg-transparent border border-transparent"
            )}
          >
            {/* Logo */}
            <Link
              href="/"
              className="group flex items-center gap-3 focus-ring"
              aria-label={brand.brandName}
            >
              <span className="relative grid place-items-center h-10 w-10 rounded-2xl bg-gradient-to-br from-gold-300 via-gold-500 to-gold-600 text-onaccent font-display text-base shadow-glow">
                {brand.logoMark}
                <span className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/30" />
              </span>
              <span className="hidden sm:flex flex-col leading-none">
                <span className="font-display text-base text-cream-50 tracking-wide">
                  {brand.brandName}
                </span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-cream-100/50 mt-1">
                  {brand.established}
                </span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigation.items.map((item) => {
                const active = isActiveRoute(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative px-4 py-2 text-sm transition-colors focus-ring rounded-full",
                      active
                        ? "text-cream-50"
                        : "text-cream-100/70 hover:text-cream-50"
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full bg-[color:var(--surface-bg-strong)] border border-[color:var(--surface-border)]"
                        transition={{
                          type: "spring",
                          stiffness: 320,
                          damping: 28,
                        }}
                      />
                    )}
                    <span className="relative">
                      <span className="link-underline">{item.label}</span>
                      {active && (
                        <span
                          aria-hidden
                          className="ml-2 inline-block h-1 w-1 rounded-full bg-gold-300 align-middle"
                        />
                      )}
                    </span>
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <div className="hidden sm:block">
                <CTAButton
                  href={navigation.cta.href}
                  label={navigation.cta.label}
                />
              </div>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label="Open menu"
                aria-expanded={open}
                className="lg:hidden grid place-items-center h-11 w-11 rounded-full glass text-cream-50 focus-ring"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 lg:hidden bg-ink-950/85 backdrop-blur-xl"
          >
            <div className="absolute inset-0 dot-grid opacity-30" />
            <motion.nav
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative pt-28 px-6"
              aria-label="Mobile"
            >
              <ul className="flex flex-col gap-1">
                {navigation.items.map((item, i) => {
                  const active = isActiveRoute(pathname, item.href);
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ y: 12, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.05 * i + 0.1, duration: 0.4 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-baseline justify-between gap-4 py-4 font-display text-3xl border-b border-[color:var(--surface-border-soft)] transition-colors",
                          active
                            ? "text-gold-200"
                            : "text-cream-50 hover:text-gold-200"
                        )}
                      >
                        <span>{item.label}</span>
                        <span className="text-xs uppercase tracking-[0.3em] text-cream-100/30">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
              <div className="mt-10 flex items-center gap-4">
                <CTAButton
                  href={navigation.cta.href}
                  label={navigation.cta.label}
                  className="flex-1 justify-center"
                />
                <ThemeToggle />
              </div>
              <div className="mt-10 text-sm text-cream-100/60 leading-relaxed">
                <p className="font-display text-cream-100 text-base mb-2">
                  {brand.shortName}
                </p>
                <p>{brand.contact.address}</p>
                <p className="mt-2">{brand.contact.phone}</p>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
