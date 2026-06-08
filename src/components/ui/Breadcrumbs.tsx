import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbsProps {
  current: string;
}

export function Breadcrumbs({ current }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-cream-100/60"
    >
      <Link
        href="/"
        className="hover:text-gold-300 transition-colors link-underline"
      >
        Home
      </Link>
      <ChevronRight className="h-3 w-3 text-cream-100/30" aria-hidden />
      <span className="text-cream-50">{current}</span>
    </nav>
  );
}