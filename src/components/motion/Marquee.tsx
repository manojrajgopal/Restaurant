"use client";

import { Fragment, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: ReactNode[];
  /** Seconds per loop */
  speed?: number;
  className?: string;
  itemClassName?: string;
  /** Show a fading mask on both edges */
  fade?: boolean;
  /** Decorative divider between items */
  divider?: ReactNode;
}

/**
 * Pure CSS marquee, runs an animation duration based on `speed`.
 * The content list is duplicated so the loop seam is invisible.
 */
export function Marquee({
  items,
  speed = 38,
  className,
  itemClassName,
  fade = true,
  divider,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        fade && "mask-fade-x",
        className
      )}
    >
      <div
        className="flex w-max gap-12 animate-marquee will-change-transform"
        style={{ animationDuration: `${speed}s` }}
      >
        {[0, 1].map((dup) => (
          <ul
            key={dup}
            aria-hidden={dup === 1}
            className="flex items-center gap-12 shrink-0"
          >
            {items.map((it, i) => (
              <Fragment key={`${dup}-${i}`}>
                <li className={cn("shrink-0", itemClassName)}>{it}</li>
                {divider && i < items.length - 1 && (
                  <li aria-hidden className="shrink-0 opacity-50">
                    {divider}
                  </li>
                )}
              </Fragment>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
