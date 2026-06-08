import type { Brand } from "@/types/brand";

/**
 * Available brand slugs. To register a new brand, drop a folder under
 * `src/data/<slug>` with the same JSON file names, then add its slug here.
 */
const REGISTRY = {
  "royal-bistro": () =>
    Promise.all([
      import("@/data/royal-bistro/brand.json"),
      import("@/data/royal-bistro/navigation.json"),
      import("@/data/royal-bistro/hero.json"),
      import("@/data/royal-bistro/highlights.json"),
      import("@/data/royal-bistro/about.json"),
      import("@/data/royal-bistro/menu.json"),
      import("@/data/royal-bistro/services.json"),
      import("@/data/royal-bistro/gallery.json"),
      import("@/data/royal-bistro/testimonials.json"),
      import("@/data/royal-bistro/faq.json"),
      import("@/data/royal-bistro/contact.json"),
      import("@/data/royal-bistro/footer.json"),
      import("@/data/royal-bistro/home.json"),
      import("@/data/royal-bistro/pages/about.json"),
      import("@/data/royal-bistro/pages/menu.json"),
      import("@/data/royal-bistro/pages/gallery.json"),
      import("@/data/royal-bistro/pages/contact.json"),
      import("@/data/royal-bistro/pages/reserve.json"),
    ]),
} as const;

export type BrandSlug = keyof typeof REGISTRY;

export const DEFAULT_BRAND: BrandSlug = "royal-bistro";

export function resolveBrandSlug(): BrandSlug {
  const envSlug = process.env.NEXT_PUBLIC_BRAND_SLUG as BrandSlug | undefined;
  if (envSlug && envSlug in REGISTRY) return envSlug;
  return DEFAULT_BRAND;
}

export async function loadBrandData(
  slug: BrandSlug = resolveBrandSlug()
): Promise<Brand> {
  const loader = REGISTRY[slug] ?? REGISTRY[DEFAULT_BRAND];
  const [
    brand,
    navigation,
    hero,
    highlights,
    about,
    menu,
    services,
    gallery,
    testimonials,
    faq,
    contact,
    footer,
    home,
    pageAbout,
    pageMenu,
    pageGallery,
    pageContact,
    pageReserve,
  ] = await loader();

  return {
    brand: brand.default as Brand["brand"],
    navigation: navigation.default as Brand["navigation"],
    hero: hero.default as Brand["hero"],
    highlights: highlights.default as Brand["highlights"],
    about: about.default as Brand["about"],
    menu: menu.default as Brand["menu"],
    services: services.default as Brand["services"],
    gallery: gallery.default as Brand["gallery"],
    testimonials: testimonials.default as Brand["testimonials"],
    faq: faq.default as Brand["faq"],
    contact: contact.default as Brand["contact"],
    footer: footer.default as Brand["footer"],
    home: home.default as Brand["home"],
    pages: {
      about: pageAbout.default as Brand["pages"]["about"],
      menu: pageMenu.default as Brand["pages"]["menu"],
      gallery: pageGallery.default as Brand["pages"]["gallery"],
      contact: pageContact.default as Brand["pages"]["contact"],
      reserve: pageReserve.default as Brand["pages"]["reserve"],
    },
  };
}

/* ----------------------------- Convenience ----------------------------- */

export type PageKey = keyof Brand["pages"];

/** Returns just the data block for a single page route. */
export async function getPageData<K extends PageKey>(
  key: K
): Promise<Brand["pages"][K]> {
  const data = await loadBrandData();
  return data.pages[key];
}
