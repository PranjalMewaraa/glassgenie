import { Container, SectionHeading } from "@/components/ui";
import { CtaBand, FaqSection } from "@/components/sections";
import Image from "next/image";
import { ManagedHeading } from "@/components/ManagedHeading";
import type { FAQ } from "@/content/types";
import {
  ShieldIcon,
  CheckIcon,
  CarGlassIcon,
  ClockIcon,
  PinIcon,
} from "@/components/icons";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { resolveMetadata } from "@/lib/seo";
import { serviceCities } from "@/content/business";

export function generateMetadata() {
  return resolveMetadata({
    title: "About Glass Genie | Family-Owned Auto Glass in DFW",
    description:
      "Glass Genie is a second-generation, family-owned mobile auto glass company serving Dallas–Fort Worth since 1996 with certified, craftsmanship-first windshield service.",
    path: "/about",
  });
}

const aboutFaqs: FAQ[] = [
  {
    question: "How long has Glass Genie been in business?",
    answer:
      "We opened in 1996 and are now run by the second generation of the same family. Three decades in the Dallas–Fort Worth market means we've seen every vehicle, every insurer, and every weather extreme Texas can throw at a windshield.",
  },
  {
    question: "Are your technicians certified?",
    answer:
      "Yes. Every installer is trained to AGSC (Auto Glass Safety Council) standards and follows the manufacturer's published bonding and cure-time specifications on every job — the same standards a dealership body shop is held to.",
  },
  {
    question: "Do you only do mobile service, or do you have a shop?",
    answer:
      "We're mobile-first: we come to your home, office, or anywhere your vehicle is parked across DFW, at no extra charge. That keeps our overhead low and our pricing honest, without sacrificing the controlled conditions a quality install needs.",
  },
  {
    question: "What makes a family-owned shop different from a national chain?",
    answer:
      "There's no call center and no quota. When you book, you deal with the people who actually do the work and stand behind it with a lifetime workmanship warranty. Our name is on every windshield, so we'd rather lose a job than rush one.",
  },
];

const values = [
  {
    icon: <ShieldIcon className="h-6 w-6" />,
    title: "Safety Is Never Optional",
    body: "Your windshield carries up to 60% of your roof's strength in a rollover. We install every piece to factory safety specs — no shortcuts, no exceptions.",
  },
  {
    icon: <CheckIcon className="h-6 w-6" />,
    title: "Craftsmanship Over Volume",
    body: "We are not a high-turnover chain chasing daily quotas. Our technicians take the time to do each install right, because a rushed bond is a dangerous one.",
  },
  {
    icon: <CarGlassIcon className="h-6 w-6" />,
    title: "Materials That Match Your Car",
    body: "We use OEM and Original Equipment Equivalent glass and premium urethane — the same standards the automakers built your vehicle to, restored exactly.",
  },
];

const mobileCards = [
  {
    icon: <CarGlassIcon className="h-5 w-5" />,
    title: "We Come To You",
    body: "Our fully equipped mobile fleet handles repairs, replacements, and ADAS calibration in your driveway or office lot — across the entire metroplex.",
  },
  {
    icon: <ClockIcon className="h-5 w-5" />,
    title: "Same-Day When It Counts",
    body: "Most chip repairs and many replacements can be scheduled the same day you call, with a safe drive-away time confirmed before we hand back your keys.",
  },
  {
    icon: <ShieldIcon className="h-5 w-5" />,
    title: "Lifetime Workmanship Warranty",
    body: "Every installation is backed against leaks, wind noise, and defects for as long as you own the vehicle. If something is not right, we make it right.",
  },
  {
    icon: <PinIcon className="h-5 w-5" />,
    title: "Rooted in DFW",
    body: `We are your neighbors, serving ${serviceCities.length} cities across Dallas–Fort Worth — not a national call center routing your job to the lowest bidder.`,
  },
];

const stats = [
  { value: "Est. 1996", label: "Three decades of DFW service" },
  { value: "2nd Gen", label: "Family-owned and operated" },
  { value: `${serviceCities.length} Cities`, label: "Across the metroplex" },
  { value: "Lifetime", label: "Workmanship warranty" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(60%_60%_at_75%_15%,rgba(37,99,235,0.18),transparent)]"
        />
        <Container className="relative py-20 text-center sm:py-24">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white/80">
            <ShieldIcon className="h-3.5 w-3.5" />
            Established 1996
          </span>
          <ManagedHeading
            path="/about"
            className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl"
            fallback={
              <>
                A Legacy of Safety. A Promise of{" "}
                <span className="text-accent">Quality.</span>
              </>
            }
          />
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/70">
            For three decades, Glass Genie has been the Dallas–Fort Worth metroplex&apos;s most
            trusted name in auto glass. We&apos;re not just a company; we&apos;re a family
            tradition built on uncompromising integrity.
          </p>
        </Container>
      </section>

      {/* Stat strip */}
      <section className="border-b border-line bg-card">
        <Container className="py-10">
          <dl className="grid grid-cols-2 gap-8 text-center sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                  {s.value}
                </dt>
                <dd className="mt-1 text-sm leading-5 text-muted">{s.label}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Founder story */}
      <section className="bg-card">
        <Container className="py-16 sm:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-accent">
                Our Story
              </p>
              <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                A Family Business, Built One Windshield at a Time
              </h2>
              <div className="mt-5 space-y-4 text-[15px] leading-7 text-muted">
                <p>
                  Glass Genie began in 1996 with a single van, a box of tools, and a simple
                  conviction: that auto glass is a safety business first and a glass business
                  second. What started as one technician driving across Dallas–Fort Worth to help
                  neighbors has grown into a trusted, second-generation, family-owned company —
                  but our founding promise has never changed.
                </p>
                <p>
                  Today, the next generation of the family runs the business with the same values
                  it was built on. We&apos;ve added modern tools, ADAS calibration equipment, and a
                  fleet of mobile units, but we&apos;ve refused to add the thing that ruins most
                  glass shops: the pressure to push cars through faster than they can safely be
                  done.
                </p>
                <p>
                  When you call Glass Genie, you&apos;re not a ticket number. You&apos;re a
                  neighbor whose family rides behind the glass we install — and we treat every job
                  that way.
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "4/3" }}>
              <Image
                src="/img/man_repairing_autoglass.jpg"
                alt="Glass Genie second-generation auto glass technician performing a professional windshield installation in Dallas–Fort Worth"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Craftsmanship Over Corporate Volume */}
      <section className="bg-surface">
        <Container className="py-16 sm:py-20">
          <SectionHeading
            eyebrow="What We Stand For"
            title="Craftsmanship Over Corporate Volume"
            subtitle="The national chains are built to maximize the number of cars per day. We're built to maximize the safety of every single one."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-line bg-card p-7 shadow-sm"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-surface text-accent ring-1 ring-line">
                  {v.icon}
                </div>
                <h3 className="mt-5 text-lg font-bold text-ink">{v.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{v.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Mobile service cards */}
      <section className="bg-card">
        <Container className="py-16 sm:py-20">
          <SectionHeading
            eyebrow="The Glass Genie Difference"
            title="Elite Service That Comes to You"
            subtitle="Everything a corporate shop offers, delivered to your driveway by certified technicians who answer to your family, not a quota."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {mobileCards.map((c) => (
              <div
                key={c.title}
                className="flex gap-4 rounded-2xl border border-line bg-surface p-6"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-card text-accent ring-1 ring-line">
                  {c.icon}
                </span>
                <div>
                  <h3 className="text-base font-bold text-ink">{c.title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-muted">{c.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <FaqSection faqs={aboutFaqs} bg="bg-surface" />

      <CtaBand
        title="Experience the Glass Genie Difference."
        subtitle="Three decades of craftsmanship, brought directly to you. Get a fast, no-obligation quote today."
      />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />
    </>
  );
}
