import { Container, ButtonLink, SectionHeading } from "@/components/ui";
import {
  PhoneIcon,
  ShieldIcon,
  CheckIcon,
  ArrowRightIcon,
  ClockIcon,
  CarGlassIcon,
} from "@/components/icons";
import { QuoteForm } from "@/components/QuoteForm";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { ServiceCard, TestimonialCard, ProcessStepCard } from "@/components/cards";
import { CtaBand, RatingsBar, LocationChips } from "@/components/sections";
import { FaqAccordion } from "@/components/FaqAccordion";
import { FaqJsonLd } from "@/components/seo/JsonLd";
import { ManagedHeading } from "@/components/ManagedHeading";
import { resolveMetadata } from "@/lib/seo";
import { business, tel } from "@/content/business";
import { services } from "@/content/services";
import {
  authorityGuide,
  processSteps,
  testimonials,
  homeFaqs,
} from "@/content/home";

export function generateMetadata() {
  return resolveMetadata({
    title: "Mobile Auto Glass Repair & Windshield Replacement in DFW",
    description:
      "Glass Genie brings same-day mobile windshield repair and replacement to the Dallas–Fort Worth metroplex. OEM/OEE glass, AGSC-certified techs, lifetime warranty.",
    path: "/",
  });
}

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(60%_60%_at_70%_10%,rgba(37,99,235,0.18),transparent)]"
        />
        <Container className="relative grid items-center gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80">
              <ShieldIcon className="h-3.5 w-3.5" />
              AGSC Certified · Lifetime Warranty
            </span>
            <ManagedHeading
              path="/"
              className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
              fallback={
                <>
                  Uncompromising Safety.
                  <br />
                  Flawless Auto Glass.
                </>
              }
            />
            <p className="mt-5 max-w-xl text-base leading-7 text-white/70">
              Elite mobile windshield repair and replacement, brought directly to your
              driveway anywhere in the Dallas–Fort Worth metroplex. Same-day service,
              OEM-quality glass, and a warranty that lasts as long as you own your vehicle.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact#quote" variant="secondary" size="lg">
                Get Your Instant Quote
                <ArrowRightIcon className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href={tel} variant="ghostLight" size="lg">
                <PhoneIcon className="h-4 w-4" />
                Call {business.phoneDisplay}
              </ButtonLink>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/65">
              <span className="inline-flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-genie-green" /> Same-Day Service
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-genie-green" /> Insurance Billing Handled
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-genie-green" /> OEM / OEE Glass
              </span>
            </div>
          </div>

          <div className="lg:justify-self-end lg:w-full lg:max-w-sm">
            <QuoteForm variant="hero" />
          </div>
        </Container>

        {/* 2. Ratings strip */}
        <RatingsBar />
      </section>

      {/* 3. Why Glass Genie — scannable value props */}
      <section className="bg-card">
        <Container className="py-16 sm:py-20">
          <SectionHeading
            eyebrow="Why Glass Genie"
            title="Certified Safety, Brought to Your Driveway"
            subtitle="Every job is done to your vehicle's original factory safety specification — by certified technicians, with the right glass, wherever you are in DFW."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: ShieldIcon,
                title: "AGSC-Certified Technicians",
                desc: "Vetted employees trained to the Auto Glass Safety Standard — never rushed subcontractors.",
              },
              {
                icon: CarGlassIcon,
                title: "OEM / OEE Glass Only",
                desc: "Made by the same suppliers as the automakers, so curvature, sensors, and optics match exactly.",
              },
              {
                icon: ClockIcon,
                title: "Same-Day Mobile Service",
                desc: "Our fully equipped fleet brings the complete shop to your home, office, or roadside.",
              },
              {
                icon: CheckIcon,
                title: "Insurance Billed Directly",
                desc: "We verify coverage and handle the entire claim — many drivers pay nothing out of pocket.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-line bg-surface p-6"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-accent ring-1 ring-line">
                  <f.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-base font-bold text-ink">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-muted">{f.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Services grid */}
      <section className="bg-surface">
        <Container className="py-16 sm:py-20">
          <SectionHeading
            eyebrow="What We Do"
            title="Our Comprehensive Auto Glass Services"
            subtitle="From a tiny chip to a full ADAS-calibrated windshield replacement, we handle every auto glass need with certified precision."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </Container>
      </section>

      {/* 5. Process + Lifetime Guarantee */}
      <section className="bg-card">
        <Container className="py-16 sm:py-20">
          <SectionHeading
            eyebrow="How It Works"
            title="The Glass Genie Process: Engineered for Excellence"
            subtitle="Four meticulous steps that restore your vehicle to its original factory safety specification."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <ProcessStepCard key={step.title} step={step} index={i} />
            ))}
          </div>

          <div className="mt-6 grid items-center gap-6 overflow-hidden rounded-2xl bg-navy-900 p-8 text-white sm:grid-cols-2 sm:p-10">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/80">
                <ShieldIcon className="h-3.5 w-3.5" /> Lifetime Guarantee
              </span>
              <h3 className="mt-4 text-2xl font-extrabold">
                Guaranteed for the life of your vehicle.
              </h3>
              <p className="mt-3 text-sm leading-7 text-white/70">
                Every installation is backed by our Lifetime Installation Warranty against
                leaks, wind noise, and workmanship defects. We don&apos;t just fix your
                glass — we restore your vehicle&apos;s structural integrity and stand behind it.
              </p>
            </div>
            <PlaceholderImage
              ratio="16/10"
              tone="dark"
              label="Glass Genie technician shaking hands with a satisfied customer"
            />
          </div>
        </Container>
      </section>

      {/* 6. Authority long-form guide */}
      <section className="bg-surface">
        <Container className="py-16 sm:py-20">
          <SectionHeading
            eyebrow="DFW Auto Glass Authority"
            title="The Definitive Guide to Auto Glass Safety & Replacement in Dallas"
            subtitle="Everything Dallas–Fort Worth drivers should know about windshield safety, ADAS, materials, and insurance — from the certified team at Glass Genie."
          />
          <div className="mx-auto mt-12 max-w-3xl space-y-12">
            {authorityGuide.map((section, i) => (
              <article key={section.heading}>
                <h3 className="text-xl font-bold text-ink sm:text-2xl">
                  <span className="text-accent">{i + 1}.</span> {section.heading}
                </h3>
                <div className="mt-4 space-y-4 text-[15px] leading-7 text-muted">
                  {section.body.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
                {(i === 0 || i === 4) && (
                  <div className="mt-6">
                    <PlaceholderImage
                      ratio="16/7"
                      label={
                        i === 0
                          ? "Technician inspecting a windshield for structural cracks"
                          : "Close-up of OEM glass being set with premium urethane adhesive"
                      }
                    />
                  </div>
                )}
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* 7. Testimonials */}
      <section className="bg-card">
        <Container className="py-16 sm:py-20">
          <SectionHeading
            eyebrow="Reviews"
            title="What Our Clients Say"
            subtitle="Thousands of DFW drivers trust Glass Genie with their vehicle's safety."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} testimonial={t} />
            ))}
          </div>
        </Container>
      </section>

      {/* 8. FAQ */}
      <section className="bg-surface">
        <Container className="py-16 sm:py-20">
          <SectionHeading title="Frequently Asked Questions" />
          <div className="mx-auto mt-10 max-w-3xl">
            <FaqAccordion faqs={homeFaqs} />
          </div>
        </Container>
        <FaqJsonLd faqs={homeFaqs} />
      </section>

      {/* 9. CTA band */}
      <CtaBand
        title="Don't Compromise On Your Family's Safety."
        subtitle="Get a fast, no-obligation quote or talk to a certified technician right now."
        note="Backed by our Lifetime Installation Warranty."
      />

      {/* 10. Proudly serving DFW */}
      <section className="bg-card">
        <Container className="py-16 text-center sm:py-20">
          <SectionHeading title="Proudly Serving the DFW Metroplex" />
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted">
            Mobile auto glass service across Dallas–Fort Worth. Select your city for
            local details, neighborhoods we cover, and answers to local questions.
          </p>
          <div className="mt-8">
            <LocationChips />
          </div>
        </Container>
      </section>
    </>
  );
}
