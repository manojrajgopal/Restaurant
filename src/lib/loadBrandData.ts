import type { Brand } from "@/types/brand";
import path from "path";
import fs from "fs";

/**
 * Dynamic brand loading — just drop a folder under `src/data/<slug>`
 * with the required JSON files, set NEXT_PUBLIC_BRAND_SLUG in .env.local,
 * and it works. No code changes needed.
 */

export type BrandSlug = string;

export const DEFAULT_BRAND = "royal-bistro";

export function resolveBrandSlug(): string {
  return process.env.NEXT_PUBLIC_BRAND_SLUG || DEFAULT_BRAND;
}

async function importJson(filePath: string) {
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

export async function loadBrandData(
  slug: string = resolveBrandSlug()
): Promise<Brand> {
  const dataDir = path.join(process.cwd(), "src", "data", slug);

  // Fallback to default if the folder doesn't exist
  const resolvedDir = fs.existsSync(dataDir)
    ? dataDir
    : path.join(process.cwd(), "src", "data", DEFAULT_BRAND);

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
  ] = await Promise.all([
    importJson(path.join(resolvedDir, "brand.json")),
    importJson(path.join(resolvedDir, "navigation.json")),
    importJson(path.join(resolvedDir, "hero.json")),
    importJson(path.join(resolvedDir, "highlights.json")),
    importJson(path.join(resolvedDir, "about.json")),
    importJson(path.join(resolvedDir, "menu.json")),
    importJson(path.join(resolvedDir, "services.json")),
    importJson(path.join(resolvedDir, "gallery.json")),
    importJson(path.join(resolvedDir, "testimonials.json")),
    importJson(path.join(resolvedDir, "faq.json")),
    importJson(path.join(resolvedDir, "contact.json")),
    importJson(path.join(resolvedDir, "footer.json")),
    importJson(path.join(resolvedDir, "home.json")),
    importJson(path.join(resolvedDir, "pages", "about.json")),
    importJson(path.join(resolvedDir, "pages", "menu.json")),
    importJson(path.join(resolvedDir, "pages", "gallery.json")),
    importJson(path.join(resolvedDir, "pages", "contact.json")),
    importJson(path.join(resolvedDir, "pages", "reserve.json")),
  ]);

  return {
    brand: brand as Brand["brand"],
    navigation: navigation as Brand["navigation"],
    hero: hero as Brand["hero"],
    highlights: highlights as Brand["highlights"],
    about: about as Brand["about"],
    menu: menu as Brand["menu"],
    services: services as Brand["services"],
    gallery: gallery as Brand["gallery"],
    testimonials: testimonials as Brand["testimonials"],
    faq: faq as Brand["faq"],
    contact: contact as Brand["contact"],
    footer: footer as Brand["footer"],
    home: home as Brand["home"],
    pages: {
      about: pageAbout as Brand["pages"]["about"],
      menu: pageMenu as Brand["pages"]["menu"],
      gallery: pageGallery as Brand["pages"]["gallery"],
      contact: pageContact as Brand["pages"]["contact"],
      reserve: pageReserve as Brand["pages"]["reserve"],
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
