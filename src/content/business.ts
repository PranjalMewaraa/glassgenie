/**
 * Locked business facts — single source of truth.
 * These values are used in metadata, JSON-LD, header, footer, and CTAs.
 * Do not hardcode any of these elsewhere; import from here.
 */

export const business = {
  name: "Glass Genie",
  legalName: "Glass Genie Auto Glass",
  tagline: "AUTO GLASS REPAIR",
  // E.164 for tel: links, and a display form for humans.
  phone: "+14692004801",
  phoneDisplay: "(469) 200-4801",
  email: "info@glassgenie.co",
  baseUrl: "https://glassgenie.co",
  priceRange: "$$",
  copyright: "© 2026 Glass Genie Auto Glass. All rights reserved.",
  blurb:
    "Dallas's premier auto glass replacement and repair service. We bring elite, certified mobile service directly to your driveway. Uncompromising safety, guaranteed for life.",
  hours: {
    label: "Mon – Sat: 8:00 AM – 6:00 PM",
    sunday: "Sunday: Closed (Emergency Only)",
    // schema.org openingHoursSpecification
    opens: "08:00",
    closes: "18:00",
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ] as const,
  },
  social: {
    facebook: "https://www.facebook.com/",
    twitter: "https://x.com/",
    instagram: "https://www.instagram.com/",
  },
  trust: ["Fully Insured", "AGSC Certified"] as const,
} as const;

export const serviceCities = [
  "Dallas",
  "Arlington",
  "Fort Worth",
  "Garland",
  "Plano",
  "Frisco",
  "McKinney",
  "Mansfield",
] as const;

export const tel = `tel:${business.phone}`;
