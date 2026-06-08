import { services } from "@/content/services";
import { locations } from "@/content/locations";

export interface SiteRoute {
  path: string;
  label: string;
  group: string;
}

/**
 * Every page on the site, for the /admin SEO picker. The admin can also type a
 * custom path, but this list covers the known routes so the common case is a
 * dropdown, not guesswork.
 */
export function getSiteRoutes(): SiteRoute[] {
  const main: SiteRoute[] = [
    { path: "/", label: "Home", group: "Main" },
    { path: "/about", label: "About", group: "Main" },
    { path: "/services", label: "Services Hub", group: "Main" },
    { path: "/locations", label: "Locations Hub", group: "Main" },
    { path: "/insurance", label: "Insurance", group: "Main" },
    { path: "/contact", label: "Contact", group: "Main" },
    { path: "/privacy", label: "Privacy Policy", group: "Legal" },
    { path: "/terms", label: "Terms of Service", group: "Legal" },
  ];
  const serviceRoutes: SiteRoute[] = services.map((s) => ({
    path: `/services/${s.slug}`,
    label: s.name,
    group: "Services",
  }));
  const locationRoutes: SiteRoute[] = locations.map((l) => ({
    path: `/locations/${l.slug}`,
    label: `${l.city}, ${l.state}`,
    group: "Locations",
  }));
  return [...main, ...serviceRoutes, ...locationRoutes];
}
