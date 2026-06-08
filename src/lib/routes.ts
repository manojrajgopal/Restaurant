/**
 * Centralized route map. Page-level metadata, breadcrumb labels and
 * navigation order all flow from this single source of truth.
 */
export const ROUTES = {
  home: { path: "/", label: "Home" },
  about: { path: "/about", label: "Our Story" },
  menu: { path: "/menu", label: "Menu" },
  gallery: { path: "/gallery", label: "Gallery" },
  contact: { path: "/contact", label: "Contact" },
  reserve: { path: "/reserve", label: "Reserve" },
} as const;

export type RouteKey = keyof typeof ROUTES;

export function isActiveRoute(pathname: string, target: string): boolean {
  if (target === "/") return pathname === "/";
  return pathname === target || pathname.startsWith(`${target}/`);
}
