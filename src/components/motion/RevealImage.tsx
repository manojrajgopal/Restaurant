"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SHARED_BLUR_DATA_URL } from "@/lib/motion";

type RevealImageProps = Omit<ImageProps, "placeholder" | "blurDataURL"> & {
  /** Apply a soft cinematic scale-up on first load */
  cinematic?: boolean;
  /** Apply a slow hover zoom (group-hover) */
  hoverZoom?: boolean;
  wrapperClassName?: string;
};

/**
 * Premium image wrapper:
 * - blurred placeholder while the bytes arrive
 * - fades + scales softly into view once decoded
 * - optional cinematic 102%→100% settle
 * - optional 110% group-hover zoom
 *
 * Use inside an element that controls the box (aspect/fill container).
 */
export function RevealImage({
  className,
  wrapperClassName,
  cinematic = false,
  hoverZoom = false,
  alt,
  ...props
}: RevealImageProps) {
  const reduce = useReducedMotion();
  const [loaded, setLoaded] = useState(false);

  return (
    <span
      className={cn(
        "block relative w-full h-full overflow-hidden",
        wrapperClassName
      )}
    >
      {/* Shimmer-glow placeholder while loading */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 transition-opacity duration-700",
          loaded ? "opacity-0" : "opacity-100"
        )}
        style={{
          background:
            "linear-gradient(110deg, rgba(217,173,74,0.06) 8%, rgba(255,255,255,0.06) 18%, rgba(217,173,74,0.04) 33%) #14110c",
          backgroundSize: "200% 100%",
          animation: "shimmer 2.2s linear infinite",
        }}
      />
      <motion.span
        className="absolute inset-0"
        initial={reduce ? false : { opacity: 0, scale: cinematic ? 1.04 : 1.02 }}
        animate={
          loaded
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: cinematic ? 1.04 : 1.02 }
        }
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          {...props}
          alt={alt}
          placeholder="blur"
          blurDataURL={SHARED_BLUR_DATA_URL}
          onLoad={() => setLoaded(true)}
          className={cn(
            "object-cover transition-transform ease-out duration-[1400ms]",
            hoverZoom && "group-hover:scale-110",
            className
          )}
        />
      </motion.span>
    </span>
  );
}
