import { resolveBrandSlug } from "./loadBrandData";

/**
 * Resolves an asset path. If the value already looks like a URL it is
 * returned untouched; otherwise it is resolved relative to the current
 * brand's `assets/` directory under `/public`.
 */
export function resolveAssetPath(input: string): string {
  if (!input) return "";
  if (/^(https?:)?\/\//i.test(input)) return input;
  if (input.startsWith("/")) return input;
  const slug = resolveBrandSlug();
  return `/brands/${slug}/${input.replace(/^\.?\//, "")}`;
}
