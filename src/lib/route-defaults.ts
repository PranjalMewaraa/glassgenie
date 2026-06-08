import { services } from "@/content/services";
import { locations } from "@/content/locations";
import { normalizePath } from "@/lib/seo-store";

/**
 * The coded title / description / H1 a page renders when no override is saved.
 * The /admin panel shows these as greyed placeholders so an un-overridden page
 * reads as "inheriting the current value" rather than looking falsely empty.
 *
 * These mirror the defaults in each page's `generateMetadata` and the
 * `ManagedHeading` fallback. They're advisory hints only — the live page is the
 * source of truth, so a drift here never affects what's actually served.
 */
export interface RouteDefaults {
  metaTitle?: string;
  metaDescription?: string;
  h1?: string;
}

const STATIC_DEFAULTS: Record<string, RouteDefaults> = {
  "/": {
    metaTitle: "Mobile Auto Glass Repair & Windshield Replacement in DFW",
    metaDescription:
      "Glass Genie brings same-day mobile windshield repair and replacement to the Dallas–Fort Worth metroplex. OEM/OEE glass, AGSC-certified techs, lifetime warranty.",
    h1: "Uncompromising Safety. Flawless Auto Glass.",
  },
  "/about": {
    metaTitle: "About Glass Genie | Family-Owned Auto Glass in DFW",
    metaDescription:
      "Glass Genie is a second-generation, family-owned mobile auto glass company serving Dallas–Fort Worth since 1996 with certified, craftsmanship-first windshield service.",
    h1: "A Legacy of Safety. A Promise of Quality.",
  },
  "/services": {
    metaTitle: "Auto Glass Services in Dallas–Fort Worth",
    metaDescription:
      "Explore Glass Genie's full range of mobile auto glass services across DFW — windshield replacement and repair, ADAS calibration, door glass, regulators, and more.",
  },
  "/locations": {
    metaTitle: "Auto Glass Service Areas Across DFW",
    metaDescription:
      "Glass Genie provides mobile auto glass repair and windshield replacement across the Dallas–Fort Worth metroplex. Find your city and local service details.",
  },
  "/insurance": {
    metaTitle: "Insurance Claims & Direct Billing | Glass Genie",
    metaDescription:
      "Glass Genie works with all major auto insurance carriers across Dallas–Fort Worth. We file your windshield claim and bill your insurer directly — often $0 out of pocket.",
    h1: "We Handle Your Insurance Claim.",
  },
  "/contact": {
    metaTitle: "Contact Glass Genie | Mobile Auto Glass in DFW",
    metaDescription:
      "Get in touch with Glass Genie for mobile auto glass repair and windshield replacement across Dallas–Fort Worth. Call, email, or request an instant quote online.",
    h1: "Contact Us",
  },
  "/privacy": {
    metaTitle: "Privacy Policy | Glass Genie",
    metaDescription:
      "How Glass Genie collects, uses, and protects the information you share when you request a quote or contact our auto glass team.",
    h1: "Privacy Policy",
  },
  "/terms": {
    metaTitle: "Terms of Service | Glass Genie",
    metaDescription:
      "The terms that govern your use of the Glass Genie website and the auto glass services we provide across the Dallas–Fort Worth metroplex.",
    h1: "Terms of Service",
  },
};

/** The coded defaults for a single route, or an empty object if unknown. */
export function getRouteDefaults(path: string): RouteDefaults {
  const p = normalizePath(path);
  if (STATIC_DEFAULTS[p]) return STATIC_DEFAULTS[p];

  const serviceSlug = p.startsWith("/services/") ? p.slice("/services/".length) : null;
  if (serviceSlug) {
    const s = services.find((x) => x.slug === serviceSlug);
    if (s) {
      return {
        metaTitle: `${s.name} in Dallas–Fort Worth`,
        metaDescription: s.metaDescription,
        h1: s.name,
      };
    }
  }

  const locSlug = p.startsWith("/locations/") ? p.slice("/locations/".length) : null;
  if (locSlug) {
    const l = locations.find((x) => x.slug === locSlug);
    if (l) {
      return {
        metaTitle: `Auto Glass Repair in ${l.city}, TX | Mobile Service`,
        metaDescription: l.metaDescription,
        h1: `Auto Glass Repair in ${l.city}`,
      };
    }
  }

  return {};
}

/** Defaults for every known site route, keyed by path — for the admin picker. */
export function getAllRouteDefaults(paths: string[]): Record<string, RouteDefaults> {
  const map: Record<string, RouteDefaults> = {};
  for (const path of paths) {
    const d = getRouteDefaults(path);
    if (d.metaTitle || d.metaDescription || d.h1) map[normalizePath(path)] = d;
  }
  return map;
}
