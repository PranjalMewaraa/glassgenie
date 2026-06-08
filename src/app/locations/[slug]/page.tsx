import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui";
import { CheckIcon, PinIcon } from "@/components/icons";
import { QuoteForm } from "@/components/QuoteForm";
import { LocationBody } from "@/components/location/LocationBody";
import { FaqAccordion } from "@/components/FaqAccordion";
import { TrustBar, ServiceAreaLinks } from "@/components/sections";
import { ServiceCard } from "@/components/cards";
import {
  FaqJsonLd,
  BreadcrumbJsonLd,
} from "@/components/seo/JsonLd";
import { ManagedHeading } from "@/components/ManagedHeading";
import { resolveMetadata } from "@/lib/seo";
import { locations, getLocation } from "@/content/locations";
import { services } from "@/content/services";

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/locations/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const loc = getLocation(slug);
  if (!loc) return {};
  return resolveMetadata({
    title: `Auto Glass Repair in ${loc.city}, TX | Mobile Service`,
    description: loc.metaDescription,
    path: `/locations/${loc.slug}`,
  });
}

export default async function LocationDetailPage({
  params,
}: PageProps<"/locations/[slug]">) {
  const { slug } = await params;
  const loc = getLocation(slug);
  if (!loc) notFound();

  const path = `/locations/${loc.slug}`;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(60%_60%_at_75%_15%,rgba(37,99,235,0.18),transparent)]"
        />
        <Container className="relative grid items-center gap-10 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80">
              <PinIcon className="h-3.5 w-3.5" />
              Serving {loc.city}, {loc.state}
            </span>
            <ManagedHeading
              path={path}
              className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl"
              fallback={`Auto Glass Repair in ${loc.city}`}
            />
            <p className="mt-4 max-w-xl text-base leading-7 text-white/70">
              {loc.heroSubcopy}
            </p>
            <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
              {loc.heroChips.map((chip) => (
                <li key={chip} className="inline-flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-genie-green" />
                  {chip}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:justify-self-end lg:w-full lg:max-w-sm">
            <QuoteForm variant="hero" title={`Get a Free Quote in ${loc.city}`} />
          </div>
        </Container>
      </section>

      <LocationBody loc={loc} />

      {loc.complete && (
        /* Local FAQ on a tinted band */
        <section className="bg-surface">
          <Container className="py-16 sm:py-20">
            <h2 className="text-center text-3xl font-extrabold tracking-tight text-ink">
              Frequently Asked Questions in {loc.city}
            </h2>
            <p className="mt-2 text-center text-sm text-muted">
              Common questions from our {loc.city} customers.
            </p>
            <div className="mx-auto mt-10 max-w-3xl">
              <FaqAccordion faqs={loc.faqs} />
            </div>
          </Container>
        </section>
      )}

      {/* Services available locally */}
      <section className="bg-card">
        <Container className="pb-16">
          <h2 className="text-xl font-bold text-ink">
            Auto glass services we offer in {loc.city}
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 3).map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
          <div className="mt-5">
            <Link href="/services" className="text-sm font-semibold text-accent hover:underline">
              View all services →
            </Link>
          </div>
        </Container>
      </section>

      {/* Trust bar */}
      <section className="border-t border-line bg-surface">
        <Container className="py-12">
          <TrustBar
            items={[
              { title: "Fast Mobile Service", description: `We bring the shop to your home or office in ${loc.city}.` },
              { title: "Lifetime Warranty", description: "Guaranteed against leaks and defects for as long as you own the vehicle." },
              { title: "Top Rated", description: `Trusted by hundreds of drivers across the ${loc.city} area.` },
            ]}
          />
        </Container>
      </section>

      {/* Nearby service areas — interlink to sibling city pages */}
      <ServiceAreaLinks
        currentSlug={loc.slug}
        bg="bg-card"
        title={`Auto Glass Service Near ${loc.city}`}
        intro={`We also bring mobile windshield and auto glass service to neighboring cities across the DFW metroplex:`}
      />

      <FaqJsonLd faqs={loc.faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations" },
          { name: loc.city, path },
        ]}
      />
    </>
  );
}
