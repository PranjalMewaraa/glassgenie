import { Container } from "@/components/ui";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { ManagedHeading } from "@/components/ManagedHeading";
import { resolveMetadata } from "@/lib/seo";
import { business } from "@/content/business";

export function generateMetadata() {
  return resolveMetadata({
    title: "Terms of Service | Glass Genie",
    description:
      "The terms that govern your use of the Glass Genie website and the auto glass services we provide across the Dallas–Fort Worth metroplex.",
    path: "/terms",
  });
}

const updated = "June 1, 2026";

export default function TermsPage() {
  return (
    <>
      <section className="border-b border-line bg-surface">
        <Container className="py-14 sm:py-16">
          <ManagedHeading
            path="/terms"
            className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl"
            fallback="Terms of Service"
          />
          <p className="mt-3 text-sm text-muted">Last updated: {updated}</p>
        </Container>
      </section>

      <section className="bg-card">
        <Container className="py-14 sm:py-16">
          <div className="mx-auto max-w-3xl space-y-8 text-[15px] leading-7 text-muted">
            <p>
              These Terms of Service (&ldquo;Terms&rdquo;) govern your use of {business.baseUrl}{" "}
              and the auto glass services provided by {business.legalName} (&ldquo;
              {business.name}&rdquo;). By using our website or requesting service, you agree to
              these Terms.
            </p>

            <Section title="Quotes &amp; Estimates">
              <p>
                Quotes provided online or by phone are estimates based on the vehicle and damage
                details you supply. Final pricing is confirmed before any work begins and may
                vary if actual conditions differ from what was described.
              </p>
            </Section>

            <Section title="Scheduling &amp; Mobile Service">
              <p>
                We offer mobile service throughout the Dallas–Fort Worth area. You are
                responsible for providing a safe, accessible location for our technician.
                Appointment windows are estimates and may shift due to weather, traffic, or
                conditions beyond our control.
              </p>
            </Section>

            <Section title="Workmanship Warranty">
              <p>
                Our installations are backed by a lifetime workmanship warranty against leaks and
                defects in installation for as long as you own the vehicle. The warranty does not
                cover new damage, road debris, accidents, or improper care after installation.
              </p>
            </Section>

            <Section title="Insurance">
              <p>
                When you ask us to bill your insurance, you authorize us to file the claim and
                communicate with your carrier on your behalf. You remain responsible for any
                deductible or amounts not covered by your policy.
              </p>
            </Section>

            <Section title="Limitation of Liability">
              <p>
                To the fullest extent permitted by law, {business.name} is not liable for
                indirect or consequential damages arising from the use of our website or
                services. Nothing in these Terms limits liability that cannot be limited under
                applicable law.
              </p>
            </Section>

            <Section title="Contact Us">
              <p>
                Questions about these Terms? Call{" "}
                <a href={`tel:${business.phone}`} className="text-accent hover:underline">
                  {business.phoneDisplay}
                </a>{" "}
                or email{" "}
                <a href={`mailto:${business.email}`} className="text-accent hover:underline">
                  {business.email}
                </a>
                .
              </p>
            </Section>
          </div>
        </Container>
      </section>

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Terms of Service", path: "/terms" },
        ]}
      />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-ink">{title}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </div>
  );
}
