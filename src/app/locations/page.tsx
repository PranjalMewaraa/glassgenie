import Link from "next/link";
import { Container, SectionHeading } from "@/components/ui";
import { ArrowRightIcon, PinIcon } from "@/components/icons";
import { CtaBand, FaqSection } from "@/components/sections";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { resolveMetadata } from "@/lib/seo";
import { locations } from "@/content/locations";
import type { FAQ } from "@/content/types";

const locationsFaqs: FAQ[] = [
  {
    question: "Do you charge extra for mobile service in my city?",
    answer:
      "No. Mobile service is included at no additional charge throughout our Dallas–Fort Worth coverage area. The price we quote is the price you pay, whether we come to your driveway in Plano or a parking lot in Fort Worth.",
  },
  {
    question: "My city isn't listed — can you still help me?",
    answer:
      "Very likely. The cities listed are where we work most often, but our technicians cover the wider DFW metroplex and surrounding suburbs. Give us a call with your ZIP code and we'll confirm we can reach you.",
  },
  {
    question: "How fast can a technician reach me?",
    answer:
      "For most DFW locations we offer same-day or next-day appointments. Because our vans are already on the road across the metroplex, we can usually route a technician to you within hours for urgent jobs.",
  },
  {
    question: "Can you meet me at work instead of home?",
    answer:
      "Absolutely. We'll come to your office, a job site, or anywhere your vehicle is safely parked. Many customers schedule us during the workday so the install is finished by the time they head home.",
  },
];

export function generateMetadata() {
  return resolveMetadata({
    title: "Auto Glass Service Areas Across DFW",
    description:
      "Glass Genie provides mobile auto glass repair and windshield replacement across the Dallas–Fort Worth metroplex. Find your city and local service details.",
    path: "/locations",
  });
}

export default function LocationsHubPage() {
  return (
    <>
      <section className="border-b border-line bg-surface">
        <Container className="py-14 sm:py-16">
          <SectionHeading
            eyebrow="Service Areas"
            title="Proudly Serving the DFW Metroplex"
            subtitle="Mobile auto glass service that comes to you. Select your city for local coverage details and answers to local questions."
          />
        </Container>
      </section>

      <section className="bg-card">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {locations.map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                className="group flex items-center justify-between rounded-2xl border border-line bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md"
              >
                <span className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-surface text-accent ring-1 ring-line">
                    <PinIcon className="h-5 w-5" />
                  </span>
                  <span className="font-bold text-ink">
                    {loc.city}, {loc.state}
                  </span>
                </span>
                <ArrowRightIcon className="h-4 w-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <FaqSection faqs={locationsFaqs} bg="bg-surface" />

      <CtaBand title="Mobile auto glass, wherever you are in DFW." />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations" },
        ]}
      />
    </>
  );
}
