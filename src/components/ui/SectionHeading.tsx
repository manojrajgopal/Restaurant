import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "eyebrow",
            align === "center" ? "justify-center" : "justify-start"
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2 className="h-section text-balance mt-5">{title}</h2>
      {subtitle && (
        <p className="mt-5 text-base sm:text-lg text-cream-100/70 text-balance leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
