import { Container, SectionHeading } from "@/components/ui";
import { ServiceCard } from "@/components/cards";
import { CtaBand, FaqSection } from "@/components/sections";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { resolveMetadata } from "@/lib/seo";
import { services } from "@/content/services";
import type { FAQ } from "@/content/types";

const servicesFaqs: FAQ[] = [
  {
    question: "Should my windshield be repaired or replaced?",
    answer:
      "As a rule of thumb, chips smaller than a quarter and cracks shorter than about three inches that aren't in the driver's line of sight can usually be repaired. Larger damage, anything spreading to the edge, or damage over an embedded camera typically calls for a full replacement. We'll assess it and tell you honestly which is safe.",
  },
  {
    question: "Do all your services include a warranty?",
    answer:
      "Yes. Every installation is backed by our lifetime workmanship warranty against leaks, wind noise, and bonding defects for as long as you own the vehicle. Repairs are guaranteed not to spread.",
  },
  {
    question: "Will I need an ADAS calibration?",
    answer:
      "If your vehicle has a forward-facing camera mounted on the windshield — common on most cars built in the last several years — it needs ADAS calibration after a windshield replacement so features like lane-keep assist and automatic braking aim correctly. We perform calibration in-house as part of the job.",
  },
  {
    question: "Can you do all of these services mobile?",
    answer:
      "Nearly all of them. Windshield repair and replacement, door and quarter glass, regulators, and most calibrations are done right at your home or office. A small number of dynamic calibrations require a short road test, which our technician handles on site.",
  },
];

export function generateMetadata() {
  return resolveMetadata({
    title: "Auto Glass Services in Dallas–Fort Worth",
    description:
      "Explore Glass Genie's full range of mobile auto glass services across DFW — windshield replacement and repair, ADAS calibration, door glass, regulators, and more.",
    path: "/services",
  });
}

export default function ServicesHubPage() {
  return (
    <>
      <section className="border-b border-line bg-surface">
        <Container className="py-14 sm:py-16">
          <SectionHeading
            eyebrow="Our Services"
            title="Comprehensive Auto Glass Services"
            subtitle="Certified, mobile, and guaranteed for life. Choose a service to learn more and request your instant quote."
          />
        </Container>
      </section>

      <section className="bg-card">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </Container>
      </section>

      <FaqSection faqs={servicesFaqs} bg="bg-surface" />

      <CtaBand
        title="Not sure which service you need?"
        subtitle="Send us your vehicle details and we'll recommend the right fix — fast."
      />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]}
      />
    </>
  );
}
