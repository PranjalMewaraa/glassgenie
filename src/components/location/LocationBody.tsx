import Link from "next/link";
import { Container } from "@/components/ui";
import { CheckIcon, PhoneIcon, PinIcon, ArrowRightIcon } from "@/components/icons";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { business, tel } from "@/content/business";
import type { Location } from "@/content/types";

interface BodyProps {
  loc: Location;
}

function sectionImage(loc: Location, i: number): string {
  const subjects = [
    `Mobile service van and technician repairing a windshield in ${loc.city}`,
    `Close-up of a chip repair tool on a cracked windshield`,
    `ADAS calibration equipment aimed at a vehicle windshield`,
    `Technician handing keys back to a customer in ${loc.city}`,
    `Glass Genie technician completing a windshield job in ${loc.city}`,
  ];
  return subjects[i % subjects.length];
}

function Stub({ loc }: BodyProps) {
  return (
    <section className="bg-card">
      <Container className="py-16">
        <div className="mx-auto max-w-3xl rounded-2xl border border-line bg-surface p-8">
          <h2 className="text-2xl font-extrabold text-ink">
            Mobile Auto Glass Service in {loc.city}, {loc.state}
          </h2>
          <p className="mt-3 text-[15px] leading-7 text-muted">
            Glass Genie brings same-day mobile windshield repair and replacement directly to
            drivers in {loc.city}. Our AGSC-certified technicians use OEM/OEE glass, perform
            on-site ADAS calibration, and bill your insurance directly — all backed by our
            lifetime workmanship warranty.
          </p>
          <p className="mt-4 text-sm font-medium text-accent">
            Full, locally-written {loc.city} content arrives in Phase 2. Call us now for an
            instant quote.
          </p>
        </div>
      </Container>
    </section>
  );
}

/* ================================================================== */
/* Variant 1 — Alternating (default)                                   */
/* ================================================================== */

function AlternatingBody({ loc }: BodyProps) {
  return (
    <section className="bg-card">
      <Container className="py-14 sm:py-16">
        <div className="space-y-14">
          {loc.sections.map((section, i) => {
            // Lead section: heading left, body right so it fills the row.
            if (i === 0) {
              return (
                <article
                  key={section.heading}
                  className="grid gap-x-10 gap-y-4 lg:grid-cols-[0.85fr_1.15fr]"
                >
                  <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                    {section.heading}
                  </h2>
                  <div className="space-y-4 text-[15px] leading-7 text-muted">
                    {section.body.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                </article>
              );
            }
            const imageLeft = i % 2 === 0;
            return (
              <article
                key={section.heading}
                className="grid items-center gap-8 lg:grid-cols-2"
              >
                <div className={imageLeft ? "lg:order-2" : ""}>
                  <h2 className="text-2xl font-extrabold tracking-tight text-ink">
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-4 text-[15px] leading-7 text-muted">
                    {section.body.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                  {i === 1 && loc.neighborhoods.length > 0 && (
                    <ul className="mt-5 space-y-2.5">
                      {loc.neighborhoods.map((n) => (
                        <li
                          key={n.name}
                          className="flex gap-2.5 text-sm leading-6 text-muted"
                        >
                          <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                          <span>
                            <strong className="text-ink">{n.name}:</strong> {n.note}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className={imageLeft ? "lg:order-1" : ""}>
                  <PlaceholderImage ratio="4/3" label={sectionImage(loc, i)} />
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/* ================================================================== */
/* Variant 2 — Stacked editorial + neighborhood card grid              */
/* ================================================================== */

function StackedBody({ loc }: BodyProps) {
  return (
    <section className="bg-card">
      <Container className="py-14 sm:py-16">
        <div className="mx-auto max-w-3xl space-y-12">
          {loc.sections.map((section, i) => (
            <article key={section.heading}>
              <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                <span className="text-accent">{String(i + 1).padStart(2, "0")}.</span>{" "}
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-7 text-muted">
                {section.body.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
              {i === 1 && (
                <div className="mt-8">
                  <PlaceholderImage ratio="16/7" label={sectionImage(loc, i)} />
                </div>
              )}
            </article>
          ))}
        </div>

        {loc.neighborhoods.length > 0 && (
          <div className="mx-auto mt-16 max-w-3xl">
            <h2 className="text-xl font-bold text-ink">
              Neighborhoods we serve in {loc.city}
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {loc.neighborhoods.map((n) => (
                <div
                  key={n.name}
                  className="rounded-2xl border border-line bg-surface p-5"
                >
                  <div className="flex items-center gap-2 font-bold text-ink">
                    <PinIcon className="h-4 w-4 text-accent" />
                    {n.name}
                  </div>
                  <p className="mt-1.5 text-sm leading-6 text-muted">{n.note}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}

/* ================================================================== */
/* Variant 3 — Sidebar column with sticky neighborhoods + quote aside  */
/* ================================================================== */

function SidebarBody({ loc }: BodyProps) {
  return (
    <section className="bg-card">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="space-y-10">
            {loc.sections.map((section, i) => (
              <article key={section.heading}>
                <h2 className="text-2xl font-extrabold tracking-tight text-ink">
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4 text-[15px] leading-7 text-muted">
                  {section.body.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
                {i === 2 && (
                  <div className="mt-6">
                    <PlaceholderImage ratio="16/8" label={sectionImage(loc, i)} />
                  </div>
                )}
              </article>
            ))}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
            {loc.neighborhoods.length > 0 && (
              <div className="rounded-2xl border border-line bg-surface p-6">
                <h2 className="flex items-center gap-2 text-base font-bold text-ink">
                  <PinIcon className="h-4 w-4 text-accent" />
                  {loc.city} neighborhoods we serve
                </h2>
                <ul className="mt-4 space-y-3">
                  {loc.neighborhoods.map((n) => (
                    <li key={n.name} className="text-sm leading-6 text-muted">
                      <strong className="text-ink">{n.name}:</strong> {n.note}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="rounded-2xl bg-navy-900 p-6 text-white shadow-xl">
              <h2 className="text-lg font-bold">Get a quote in {loc.city}</h2>
              <p className="mt-2 text-sm leading-6 text-white/65">
                Same-day mobile service to your home or office. We bill your insurance
                directly.
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
          </aside>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */

/** Renders the location body in its assigned variant (default "alternating"). */
export function LocationBody({ loc }: BodyProps) {
  if (!loc.complete) return <Stub loc={loc} />;
  switch (loc.layout) {
    case "stacked":
      return <StackedBody loc={loc} />;
    case "sidebar":
      return <SidebarBody loc={loc} />;
    default:
      return <AlternatingBody loc={loc} />;
  }
}
