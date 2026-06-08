import Link from "next/link";
import { Container, ButtonLink, SectionHeading } from "@/components/ui";
import { PhoneIcon, ArrowRightIcon, StarIcon, PinIcon } from "@/components/icons";
import { business, tel } from "@/content/business";
import { locations } from "@/content/locations";
import { services } from "@/content/services";
import { ServiceCard } from "@/components/cards";
import { FaqAccordion } from "@/components/FaqAccordion";
import { FaqJsonLd } from "@/components/seo/JsonLd";
import type { FAQ } from "@/content/types";

/**
 * Reusable FAQ section: heading + accordion + matching FAQPage JSON-LD.
 * Renders nothing when `faqs` is empty so callers can drop it in safely.
 */
export function FaqSection({
  faqs,
  title = "Frequently Asked Questions",
  eyebrow,
  bg = "bg-surface",
}: {
  faqs: FAQ[];
  title?: string;
  eyebrow?: string;
  bg?: string;
}) {
  if (faqs.length === 0) return null;
  return (
    <section className={bg}>
      <Container className="py-16 sm:py-20">
        <SectionHeading eyebrow={eyebrow} title={title} />
        <div className="mx-auto mt-10 max-w-3xl">
          <FaqAccordion faqs={faqs} />
        </div>
      </Container>
      <FaqJsonLd faqs={faqs} />
    </section>
  );
}

/**
 * Internal-linking block: cards for sibling services. On a service detail page
 * pass `currentSlug` to exclude it; the list rotates so each page surfaces a
 * different set of siblings (spreads link equity instead of all pages pointing
 * at the same top three).
 */
export function RelatedServices({
  currentSlug,
  title = "Explore Our Other Services",
  bg = "bg-surface",
  limit = 3,
}: {
  currentSlug?: string;
  title?: string;
  bg?: string;
  limit?: number;
}) {
  const idx = currentSlug ? services.findIndex((s) => s.slug === currentSlug) : -1;
  const ordered =
    idx >= 0 ? [...services.slice(idx + 1), ...services.slice(0, idx)] : services;
  const picks = ordered.slice(0, limit);
  if (picks.length === 0) return null;

  return (
    <section className={bg}>
      <Container className="py-16 sm:py-20">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
            {title}
          </h2>
          <Link
            href="/services"
            className="hidden shrink-0 text-sm font-semibold text-accent hover:underline sm:inline"
          >
            View all services →
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {picks.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
        <div className="mt-6 sm:hidden">
          <Link href="/services" className="text-sm font-semibold text-accent hover:underline">
            View all services →
          </Link>
        </div>
      </Container>
    </section>
  );
}

/**
 * Internal-linking block: chip links to every service-area city. Pass
 * `currentSlug` on a location page to exclude the current city (so it reads as
 * "nearby cities"). Builds a dense location↔location / service↔location mesh.
 */
export function ServiceAreaLinks({
  currentSlug,
  title = "Mobile Auto Glass Across Dallas–Fort Worth",
  intro,
  bg = "bg-card",
}: {
  currentSlug?: string;
  title?: string;
  intro?: string;
  bg?: string;
}) {
  const cities = locations.filter((l) => l.slug !== currentSlug);
  if (cities.length === 0) return null;

  return (
    <section className={bg}>
      <Container className="py-14">
        <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
          {title}
        </h2>
        {intro && <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">{intro}</p>}
        <ul className="mt-6 flex flex-wrap gap-3">
          {cities.map((l) => (
            <li key={l.slug}>
              <Link
                href={`/locations/${l.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-accent/40 hover:text-accent"
              >
                <PinIcon className="h-4 w-4 text-accent" />
                {l.city}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/** Dark conversion band: headline + dual CTA + reassurance line. */
export function CtaBand({
  title,
  subtitle,
  note,
}: {
  title: string;
  subtitle?: string;
  note?: string;
}) {
  return (
    <section className="bg-navy-900">
      <Container className="py-16 text-center sm:py-20">
        <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-white/70">{subtitle}</p>
        )}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="/contact#quote" variant="outline" size="lg">
            Get an Instant Quote
            <ArrowRightIcon className="h-4 w-4" />
          </ButtonLink>
          <ButtonLink href={tel} variant="ghostLight" size="lg">
            <PhoneIcon className="h-4 w-4" />
            Call {business.phoneDisplay}
          </ButtonLink>
        </div>
        {note && <p className="mt-5 text-sm text-white/50">{note}</p>}
      </Container>
    </section>
  );
}

/** Three-up trust bar used on inner pages. */
export function TrustBar({
  items,
}: {
  items: { title: string; description: string }[];
}) {
  return (
    <div className="grid gap-8 sm:grid-cols-3">
      {items.map((item) => (
        <div key={item.title} className="text-center">
          <h3 className="text-base font-bold text-ink">{item.title}</h3>
          <p className="mt-1.5 text-sm leading-6 text-muted">{item.description}</p>
        </div>
      ))}
    </div>
  );
}

/** "Recognized for Excellence" ratings strip (review platforms). */
export function RatingsBar() {
  const platforms = [
    { name: "Yelp", rating: "4.9" },
    { name: "Trustpilot", rating: "4.8" },
    { name: "Nextdoor", rating: "Top Rated" },
  ];
  return (
    <div className="border-y border-white/10 bg-navy-800">
      <Container className="flex flex-col items-center gap-6 py-6 sm:flex-row sm:justify-center sm:gap-12">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
          Recognized for Excellence
        </span>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {platforms.map((p) => (
            <div key={p.name} className="flex items-center gap-2 text-white">
              <span className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className="h-3.5 w-3.5" />
                ))}
              </span>
              <span className="text-sm font-semibold">{p.name}</span>
              <span className="text-sm text-white/55">{p.rating}</span>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

/** Clickable city chips linking to each location page. */
export function LocationChips() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {locations.map((loc) => (
        <Link
          key={loc.slug}
          href={`/locations/${loc.slug}`}
          className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
        >
          {loc.city}
        </Link>
      ))}
    </div>
  );
}
