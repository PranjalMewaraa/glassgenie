import Link from "next/link";
import { Container, ButtonLink } from "@/components/ui";
import {
  ArrowRightIcon,
  CarGlassIcon,
  PhoneIcon,
  CheckIcon,
  ShieldIcon,
} from "@/components/icons";
import Image from "next/image";
import { BenefitChip } from "@/components/cards";
import { FaqAccordion } from "@/components/FaqAccordion";
import { LocationChips, CtaBand } from "@/components/sections";
import { ManagedHeading } from "@/components/ManagedHeading";
import { business, tel } from "@/content/business";
import type { Service } from "@/content/types";

const SERVICE_IMAGES: Record<string, string[]> = {
  "windshield-replacement": ["/img/carwindshield.avif", "/img/windshieldrepair.jpg", "/img/man_repairing_autoglass.jpg", "/img/fixing%20auto%20glass.webp"],
  "windshield-repair": ["/img/windshieldrepair.jpg", "/img/man_repairing_autoglass.jpg", "/img/carwindshield.avif", "/img/fixing%20auto%20glass.webp"],
  "adas-calibration": ["/img/car-glass-differenciation.webp", "/img/carwindshield.avif", "/img/man_repairing_autoglass.jpg", "/img/fixing%20auto%20glass.webp"],
  "auto-door-glass": ["/img/doorglas.avif", "/img/man_repairing_autoglass.jpg", "/img/fixing%20auto%20glass.webp", "/img/car-glass-differenciation.webp"],
  "window-regulators": ["/img/doorglas.avif", "/img/fixing%20auto%20glass.webp", "/img/man_repairing_autoglass.jpg", "/img/car-glass-differenciation.webp"],
  "back-window-glass": ["/img/backglass.avif", "/img/backglass2.avif", "/img/man_repairing_autoglass.jpg", "/img/fixing%20auto%20glass.webp"],
  "quarter-panel-glass": ["/img/backglass2.avif", "/img/backglass.avif", "/img/man_repairing_autoglass.jpg", "/img/car-glass-differenciation.webp"],
  "vent-glass-replacement": ["/img/vent%20glass.jpg", "/img/doorglas.avif", "/img/man_repairing_autoglass.jpg", "/img/fixing%20auto%20glass.webp"],
  "sunroof-glass": ["/img/sunroof.avif", "/img/man_repairing_autoglass.jpg", "/img/car-glass-differenciation.webp", "/img/fixing%20auto%20glass.webp"],
};

const FALLBACK_IMAGES = ["/img/man_repairing_autoglass.jpg", "/img/windshieldrepair.jpg", "/img/fixing%20auto%20glass.webp", "/img/car-glass-differenciation.webp"];

function pickServiceImage(slug: string, index: number): string {
  const pool = SERVICE_IMAGES[slug] ?? FALLBACK_IMAGES;
  return pool[index % pool.length];
}

interface LayoutProps {
  service: Service;
  /** Route path, e.g. "/services/windshield-replacement". */
  path: string;
}

/* ------------------------------------------------------------------ */
/* Shared pieces                                                       */
/* ------------------------------------------------------------------ */

function BackToHome({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-1.5 text-sm font-medium ${
        tone === "dark"
          ? "text-white/70 hover:text-white"
          : "text-muted hover:text-accent"
      }`}
    >
      <ArrowRightIcon className="h-4 w-4 rotate-180" />
      Back to Home
    </Link>
  );
}

function Stub({ service }: { service: Service }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-8">
      <h2 className="text-xl font-bold text-ink">
        {service.name} — Mobile Service Across DFW
      </h2>
      <p className="mt-3 text-[15px] leading-7 text-muted">
        {service.cardSummary} Our AGSC-certified technicians bring{" "}
        {service.name.toLowerCase()} directly to your home or office anywhere in the
        Dallas–Fort Worth metroplex, using OEM/OEE materials and backing every job with our
        lifetime workmanship warranty.
      </p>
    </div>
  );
}

function FaqBlock({ service }: { service: Service }) {
  if (service.faqs.length === 0) return null;
  return (
    <div>
      <h2 className="text-lg font-bold text-ink">Frequently Asked Questions</h2>
      <div className="mt-5">
        <FaqAccordion faqs={service.faqs} />
      </div>
    </div>
  );
}

function NearYou({ service }: { service: Service }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-6">
      <h2 className="text-base font-bold text-ink">{service.name} near you</h2>
      <p className="mt-1.5 text-sm text-muted">
        We provide mobile {service.name.toLowerCase()} across the DFW metroplex:
      </p>
      <div className="mt-4">
        <LocationChips />
      </div>
    </div>
  );
}

function CtaSidebar({ service }: { service: Service }) {
  return (
    <div className="rounded-2xl bg-navy-900 p-6 text-white shadow-xl">
      <span className="grid h-10 w-10 place-items-center rounded-lg bg-white/10">
        <CarGlassIcon className="h-6 w-6" />
      </span>
      <h2 className="mt-4 text-xl font-bold">
        Ready to schedule your {service.name.toLowerCase()}?
      </h2>
      <p className="mt-2 text-sm leading-6 text-white/65">
        Get an instant quote online or call us directly. Our mobile team is ready to come to
        your location anywhere in the DFW metroplex.
      </p>
      <div className="mt-5 flex flex-col gap-3">
        <Link
          href="/contact#quote"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-600"
        >
          Get an Instant Quote
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
        <a
          href={tel}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
        >
          <PhoneIcon className="h-4 w-4" />
          Call {business.phoneDisplay}
        </a>
      </div>
    </div>
  );
}

function sectionImageLabel(service: Service, i: number): string {
  const subjects = [
    `Glass Genie technician preparing a vehicle for ${service.name.toLowerCase()}`,
    `Close-up of ${service.name.toLowerCase()} in progress on a vehicle`,
    `Certified technician completing ${service.name.toLowerCase()}`,
    `Mobile service van equipped for ${service.name.toLowerCase()} in DFW`,
    `Finished ${service.name.toLowerCase()} with a clean, factory-quality result`,
  ];
  return subjects[i % subjects.length];
}

/* ================================================================== */
/* Variant 1 — Sidebar (default)                                       */
/* ================================================================== */

function SidebarLayout({ service, path }: LayoutProps) {
  return (
    <>
      <section className="border-b border-line bg-surface">
        <Container className="py-10 sm:py-12">
          <BackToHome />
          <div className="mt-5 flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white text-accent ring-1 ring-line">
              <CarGlassIcon className="h-7 w-7" />
            </span>
            <div>
              <ManagedHeading
                path={path}
                className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl"
                fallback={service.name}
              />
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
                {service.subtitle}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-card">
        <Container className="py-12 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
            <div className="max-w-none">
              {service.complete ? (
                <article className="space-y-10">
                  {service.sections.map((section, i) => (
                    <div key={section.heading}>
                      <h2 className="text-xl font-bold text-ink sm:text-2xl">
                        {section.heading}
                      </h2>
                      <div className="mt-3 space-y-4 text-[15px] leading-7 text-muted">
                        {section.body.map((p, j) => (
                          <p key={j}>{p}</p>
                        ))}
                      </div>
                      {i === 3 && (
                        <div className="mt-6 relative overflow-hidden rounded-2xl" style={{ aspectRatio: "16/8" }}>
                          <Image
                            src={pickServiceImage(service.slug, i)}
                            alt={sectionImageLabel(service, i)}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 66vw"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </article>
              ) : (
                <Stub service={service} />
              )}

              <div className="mt-12">
                <h2 className="text-lg font-bold text-ink">Key Benefits</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {service.keyBenefits.map((b) => (
                    <BenefitChip key={b.label} label={b.label} />
                  ))}
                </div>
              </div>

              <div className="mt-12">
                <FaqBlock service={service} />
              </div>

              <div className="mt-12">
                <NearYou service={service} />
              </div>
            </div>

            <aside className="lg:sticky lg:top-24 lg:h-fit">
              <CtaSidebar service={service} />
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}

/* ================================================================== */
/* Variant 2 — Centered editorial (dark hero + CTA band)               */
/* ================================================================== */

function CenteredLayout({ service, path }: LayoutProps) {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(37,99,235,0.18),transparent)]"
        />
        <Container className="relative py-16 text-center sm:py-20">
          <div className="mx-auto flex max-w-3xl flex-col items-center">
            <BackToHome tone="dark" />
            <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80">
              <ShieldIcon className="h-3.5 w-3.5" />
              Certified Mobile Auto Glass
            </span>
            <ManagedHeading
              path={path}
              className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl"
              fallback={service.name}
            />
            <p className="mt-5 max-w-xl text-base leading-7 text-white/70">
              {service.subtitle}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact#quote" variant="secondary" size="lg">
                Get an Instant Quote
                <ArrowRightIcon className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href={tel} variant="ghostLight" size="lg">
                <PhoneIcon className="h-4 w-4" />
                Call {business.phoneDisplay}
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {/* Benefits strip */}
      <section className="border-b border-line bg-surface">
        <Container className="py-10">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {service.keyBenefits.map((b) => (
              <div
                key={b.label}
                className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-4"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-surface text-genie-green ring-1 ring-line">
                  <CheckIcon className="h-5 w-5" />
                </span>
                <span className="text-sm font-semibold text-ink">{b.label}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Editorial column */}
      <section className="bg-card">
        <Container className="py-14 sm:py-20">
          {service.complete ? (
            <div className="mx-auto max-w-3xl space-y-12">
              {service.sections.map((section, i) => (
                <article key={section.heading}>
                  <h2 className="text-2xl font-bold text-ink sm:text-3xl">
                    <span className="text-accent">{String(i + 1).padStart(2, "0")}.</span>{" "}
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-4 text-[15px] leading-7 text-muted">
                    {section.body.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                  {i === 1 && (
                    <div className="mt-8 relative overflow-hidden rounded-2xl" style={{ aspectRatio: "16/7" }}>
                      <Image
                        src={pickServiceImage(service.slug, i)}
                        alt={sectionImageLabel(service, i)}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 768px"
                      />
                    </div>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-3xl">
              <Stub service={service} />
            </div>
          )}

          <div className="mx-auto mt-16 max-w-3xl">
            <FaqBlock service={service} />
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-base font-bold text-ink">
              {service.name} across the DFW metroplex
            </h2>
            <div className="mt-5">
              <LocationChips />
            </div>
          </div>
        </Container>
      </section>

      <CtaBand
        title={`Book your ${service.name.toLowerCase()} today.`}
        subtitle="Same-day mobile service, OEM-quality glass, and a lifetime workmanship warranty."
        note={`Call ${business.phoneDisplay} — we handle the insurance billing.`}
      />
    </>
  );
}

/* ================================================================== */
/* Variant 3 — Zigzag (split hero + alternating rows)                  */
/* ================================================================== */

function ZigzagLayout({ service, path }: LayoutProps) {
  return (
    <>
      <section className="border-b border-line bg-surface">
        <Container className="py-12 sm:py-16">
          <BackToHome />
          <div className="mt-6 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
                <CarGlassIcon className="h-3.5 w-3.5" />
                Mobile Auto Glass
              </span>
              <ManagedHeading
                path={path}
                className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl"
                fallback={service.name}
              />
              <p className="mt-4 max-w-xl text-base leading-7 text-muted">
                {service.subtitle}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/contact#quote" variant="secondary" size="lg">
                  Get an Instant Quote
                  <ArrowRightIcon className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink href={tel} variant="outline" size="lg">
                  <PhoneIcon className="h-4 w-4" />
                  Call {business.phoneDisplay}
                </ButtonLink>
              </div>
            </div>
            <div className="lg:justify-self-end lg:w-full">
              <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "4/3" }}>
                <Image
                  src={pickServiceImage(service.slug, 0)}
                  alt={sectionImageLabel(service, 0)}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Numbered benefits strip */}
      <section className="border-b border-line bg-card">
        <Container className="py-10">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {service.keyBenefits.map((b, i) => (
              <div key={b.label} className="flex items-start gap-3">
                <span className="text-2xl font-extrabold text-accent/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mt-1 text-sm font-semibold leading-snug text-ink">
                  {b.label}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Alternating image/text rows */}
      <section className="bg-card">
        <Container className="py-14 sm:py-20">
          {service.complete ? (
            <div className="space-y-16">
              {service.sections.map((section, i) => {
                const flip = i % 2 === 1;
                return (
                  <article
                    key={section.heading}
                    className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12"
                  >
                    <div className={flip ? "lg:order-2" : ""}>
                      <h2 className="text-xl font-bold text-ink sm:text-2xl">
                        {section.heading}
                      </h2>
                      <div className="mt-3 space-y-4 text-[15px] leading-7 text-muted">
                        {section.body.map((p, j) => (
                          <p key={j}>{p}</p>
                        ))}
                      </div>
                    </div>
                    <div className={flip ? "lg:order-1" : ""}>
                      <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "4/3" }}>
                        <Image
                          src={pickServiceImage(service.slug, i + 1)}
                          alt={sectionImageLabel(service, i + 1)}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <Stub service={service} />
          )}

          <div className="mx-auto mt-16 max-w-3xl">
            <FaqBlock service={service} />
          </div>

          <div className="mt-16">
            <NearYou service={service} />
          </div>
        </Container>
      </section>

      <CtaBand
        title={`Need ${service.name.toLowerCase()}? We come to you.`}
        subtitle="Certified technicians, OEM-quality glass, and a lifetime warranty — anywhere in DFW."
      />
    </>
  );
}

/* ------------------------------------------------------------------ */

/** Picks the layout variant for a service (defaults to "sidebar"). */
export function ServiceLayout({ service, path }: LayoutProps) {
  switch (service.layout) {
    case "centered":
      return <CenteredLayout service={service} path={path} />;
    case "zigzag":
      return <ZigzagLayout service={service} path={path} />;
    default:
      return <SidebarLayout service={service} path={path} />;
  }
}
