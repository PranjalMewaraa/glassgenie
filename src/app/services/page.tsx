import { Container, SectionHeading } from "@/components/ui";
import { ServiceCard } from "@/components/cards";
import { CtaBand } from "@/components/sections";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { resolveMetadata } from "@/lib/seo";
import { services } from "@/content/services";

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
