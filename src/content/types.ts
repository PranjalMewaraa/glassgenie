/**
 * Shared content-layer types. Presentation components receive these as typed
 * props — copy never lives inside JSX. This keeps a future CMS migration a
 * clean swap rather than a rewrite.
 */

export interface FAQ {
  question: string;
  answer: string;
}

export interface ContentSection {
  heading: string;
  /** One or more paragraphs of body copy. */
  body: string[];
}

export interface Testimonial {
  name: string;
  location: string;
  quote: string;
  rating: number; // 1–5
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface KeyBenefit {
  label: string;
}

/**
 * Visual template for a service detail page. Lets otherwise-similar service
 * pages read differently so they don't all look like the same boilerplate.
 *   - "sidebar":  light header + long-form column with a sticky CTA aside.
 *   - "centered": dark hero + centered, numbered editorial column + CTA band.
 *   - "zigzag":   split hero + alternating image/text rows down the page.
 */
export type ServiceLayout = "sidebar" | "centered" | "zigzag";

/** A service offering (e.g. Windshield Replacement). */
export interface Service {
  slug: string;
  /** Display name, e.g. "Windshield Replacement". */
  name: string;
  /** Short one-line subtitle shown under the H1. */
  subtitle: string;
  /** ~150–160 char meta description. */
  metaDescription: string;
  /** Card blurb on the services grid / home page. */
  cardSummary: string;
  /** Long-form, unique sections (core SEO content). */
  sections: ContentSection[];
  keyBenefits: KeyBenefit[];
  faqs: FAQ[];
  /** Visual template for the detail page. Defaults to "sidebar" if unset. */
  layout?: ServiceLayout;
  /** Whether full Phase-1 content is authored (vs. a Phase-2 stub). */
  complete: boolean;
}

/**
 * Visual template for a location detail page's body (the long-form sections +
 * neighborhoods). Keeps otherwise-similar city pages from reading identically.
 *   - "alternating": lead section full-width, then alternating image/text rows.
 *   - "stacked":     centered, numbered editorial column + neighborhood card grid.
 *   - "sidebar":     long-form column with a sticky neighborhoods + quote aside.
 */
export type LocationLayout = "alternating" | "stacked" | "sidebar";

/** A service-area city (e.g. Dallas). */
export interface Location {
  slug: string;
  /** City name, e.g. "Dallas". */
  city: string;
  state: string; // "TX"
  /** ~150–160 char meta description. */
  metaDescription: string;
  /** Hero subcopy. */
  heroSubcopy: string;
  /** Feature chips in the hero, e.g. "Same-Day Service Available". */
  heroChips: string[];
  /** Long-form, unique local sections (core local SEO content). */
  sections: ContentSection[];
  /** Bulleted neighborhood list with short descriptions. */
  neighborhoods: { name: string; note: string }[];
  faqs: FAQ[];
  /** Visual template for the body. Defaults to "alternating" if unset. */
  layout?: LocationLayout;
  complete: boolean;
}

export interface Provider {
  name: string;
}
