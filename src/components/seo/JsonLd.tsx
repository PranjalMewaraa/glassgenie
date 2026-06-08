import { business, serviceCities } from "@/content/business";
import type { FAQ } from "@/content/types";

/**
 * Renders a JSON-LD <script>. Per the Next.js json-ld guide, we use a native
 * <script> tag and scrub "<" to its unicode escape to prevent XSS injection
 * through any string in the payload.
 */
function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

const ORG_ID = `${business.baseUrl}/#business`;

/** Sitewide AutoRepair / LocalBusiness. Rendered once in the root layout. */
export function LocalBusinessJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "AutoRepair",
        "@id": ORG_ID,
        name: business.legalName,
        alternateName: business.name,
        description: business.blurb,
        url: business.baseUrl,
        telephone: business.phone,
        email: business.email,
        image: `${business.baseUrl}/opengraph-image`,
        logo: `${business.baseUrl}/logo.png`,
        priceRange: business.priceRange,
        areaServed: serviceCities.map((city) => ({
          "@type": "City",
          name: `${city}, TX`,
        })),
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [...business.hours.days],
            opens: business.hours.opens,
            closes: business.hours.closes,
          },
        ],
        sameAs: [
          business.social.facebook,
          business.social.twitter,
          business.social.instagram,
        ],
      }}
    />
  );
}

/** Service schema for a service detail page. */
export function ServiceJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        url: `${business.baseUrl}${path}`,
        serviceType: name,
        provider: { "@id": ORG_ID },
        areaServed: serviceCities.map((city) => ({
          "@type": "City",
          name: `${city}, TX`,
        })),
      }}
    />
  );
}

/** FAQPage schema. Must mirror the visible accordion content. */
export function FaqJsonLd({ faqs }: { faqs: FAQ[] }) {
  if (faqs.length === 0) return null;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }}
    />
  );
}

/** BreadcrumbList for inner pages. `items` are ordered crumbs. */
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: `${business.baseUrl}${item.path}`,
        })),
      }}
    />
  );
}
