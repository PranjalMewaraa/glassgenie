import { Container } from "@/components/ui";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { ManagedHeading } from "@/components/ManagedHeading";
import { resolveMetadata } from "@/lib/seo";
import { business } from "@/content/business";

export function generateMetadata() {
  return resolveMetadata({
    title: "Privacy Policy | Glass Genie",
    description:
      "How Glass Genie collects, uses, and protects the information you share when you request a quote or contact our auto glass team.",
    path: "/privacy",
  });
}

const updated = "June 1, 2026";

export default function PrivacyPage() {
  return (
    <>
      <section className="border-b border-line bg-surface">
        <Container className="py-14 sm:py-16">
          <ManagedHeading
            path="/privacy"
            className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl"
            fallback="Privacy Policy"
          />
          <p className="mt-3 text-sm text-muted">Last updated: {updated}</p>
        </Container>
      </section>

      <section className="bg-card">
        <Container className="py-14 sm:py-16">
          <div className="prose-legal mx-auto max-w-3xl space-y-8 text-[15px] leading-7 text-muted">
            <p>
              {business.legalName} (&ldquo;{business.name},&rdquo; &ldquo;we,&rdquo;
              &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your privacy. This policy explains
              what information we collect when you use {business.baseUrl}, request a quote, or
              contact us, and how we use and protect it.
            </p>

            <Section title="Information We Collect">
              <p>
                When you submit a quote request or contact form, we collect the details you
                provide — such as your name, phone number, email address, vehicle information,
                and any message you send. We may also collect basic, non-identifying usage data
                (such as pages visited) to improve our website.
              </p>
            </Section>

            <Section title="How We Use Your Information">
              <p>
                We use your information solely to respond to your request, prepare a quote,
                schedule service, process insurance billing on your behalf, and communicate with
                you about your appointment. We do not sell your personal information.
              </p>
            </Section>

            <Section title="Sharing">
              <p>
                We share information only as needed to deliver service — for example, with your
                insurance carrier when you ask us to handle a claim, or with service providers
                who help us operate our business. We may disclose information when required by
                law.
              </p>
            </Section>

            <Section title="Data Retention &amp; Security">
              <p>
                We retain quote and service records for as long as needed to provide service and
                meet legal obligations, and we use reasonable safeguards to protect your
                information. No method of transmission over the internet is completely secure.
              </p>
            </Section>

            <Section title="Your Choices">
              <p>
                You may request access to, correction of, or deletion of the personal
                information you have shared with us by contacting us at{" "}
                <a href={`mailto:${business.email}`} className="text-accent hover:underline">
                  {business.email}
                </a>
                .
              </p>
            </Section>

            <Section title="Contact Us">
              <p>
                Questions about this policy? Call us at{" "}
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
          { name: "Privacy Policy", path: "/privacy" },
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
