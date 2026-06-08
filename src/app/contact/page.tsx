import { Container } from "@/components/ui";
import { PhoneIcon, MailIcon, PinIcon, ClockIcon } from "@/components/icons";
import { ContactForm } from "@/components/ContactForm";
import { QuoteForm } from "@/components/QuoteForm";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { ManagedHeading } from "@/components/ManagedHeading";
import { resolveMetadata } from "@/lib/seo";
import { business, tel, serviceCities } from "@/content/business";

export function generateMetadata() {
  return resolveMetadata({
    title: "Contact Glass Genie | Mobile Auto Glass in DFW",
    description:
      "Get in touch with Glass Genie for mobile auto glass repair and windshield replacement across Dallas–Fort Worth. Call, email, or request an instant quote online.",
    path: "/contact",
  });
}

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-line bg-surface">
        <Container className="py-14 text-center sm:py-16">
          <ManagedHeading
            path="/contact"
            className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl"
            fallback="Contact Us"
          />
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted">
            Have a question or need to schedule an appointment? Reach out to our friendly
            team today. We&apos;re here to help you get back on the road safely.
          </p>
        </Container>
      </section>

      {/* Get in touch + message form */}
      <section className="bg-card">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-ink">Get in Touch</h2>
              <p className="mt-3 max-w-md text-sm leading-7 text-muted">
                Fill out the form to send us a message, or use the contact information below to
                reach us directly. For immediate assistance or to get an instant quote, please
                call us.
              </p>

              <ul className="mt-8 space-y-6">
                <InfoRow icon={<PhoneIcon className="h-5 w-5" />} label="Phone">
                  <a href={tel} className="text-muted hover:text-accent">{business.phoneDisplay}</a>
                </InfoRow>
                <InfoRow icon={<MailIcon className="h-5 w-5" />} label="Email">
                  <a href={`mailto:${business.email}`} className="text-muted hover:text-accent">
                    {business.email}
                  </a>
                </InfoRow>
                <InfoRow icon={<PinIcon className="h-5 w-5" />} label="Service Area">
                  <span className="text-muted">{serviceCities.join(", ")}</span>
                </InfoRow>
                <InfoRow icon={<ClockIcon className="h-5 w-5" />} label="Business Hours">
                  <span className="block text-muted">{business.hours.label}</span>
                  <span className="block text-muted">{business.hours.sunday}</span>
                </InfoRow>
              </ul>
            </div>

            <ContactForm />
          </div>
        </Container>
      </section>

      {/* Instant quote anchor — target of "Get a Quote" CTAs sitewide */}
      <section id="quote" className="scroll-mt-24 bg-surface">
        <Container className="py-16 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-ink">
                Get Your Instant Quote
              </h2>
              <p className="mt-3 max-w-md text-sm leading-7 text-muted">
                Tell us about your vehicle and we&apos;ll get you a fast, no-obligation quote.
                Most jobs can be scheduled same-day, and we handle your insurance billing for you.
              </p>
            </div>
            <div className="lg:max-w-md lg:justify-self-end">
              <QuoteForm variant="hero" />
            </div>
          </div>
        </Container>
      </section>

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />
    </>
  );
}

function InfoRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-4">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-surface text-ink ring-1 ring-line">
        {icon}
      </span>
      <span>
        <span className="block text-sm font-bold text-ink">{label}</span>
        <span className="mt-0.5 block text-sm">{children}</span>
      </span>
    </li>
  );
}
