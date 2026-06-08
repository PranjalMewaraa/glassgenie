import { Container, SectionHeading, ButtonLink } from "@/components/ui";
import { CtaBand } from "@/components/sections";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CheckIcon, ShieldIcon, PhoneIcon, ArrowRightIcon } from "@/components/icons";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { ManagedHeading } from "@/components/ManagedHeading";
import { resolveMetadata } from "@/lib/seo";
import { business, tel } from "@/content/business";
import type { FAQ } from "@/content/types";

export function generateMetadata() {
  return resolveMetadata({
    title: "Insurance Claims & Direct Billing | Glass Genie",
    description:
      "Glass Genie works with all major auto insurance carriers across Dallas–Fort Worth. We file your windshield claim and bill your insurer directly — often $0 out of pocket.",
    path: "/insurance",
  });
}

const steps = [
  {
    title: "Call Us With Your Info",
    body: "Give us your vehicle details and your insurance information. That's all we need to get started — we take it from there.",
  },
  {
    title: "We File & Verify the Claim",
    body: "Our billing specialists contact your carrier, confirm your glass coverage, and verify your deductible before any work begins.",
  },
  {
    title: "We Bill Your Insurer Directly",
    body: "We invoice your insurance company for the covered amount. In most cases you never touch a claim form or front the cost.",
  },
];

const carriers = [
  "State Farm",
  "GEICO",
  "Progressive",
  "Allstate",
  "USAA",
  "Farmers",
  "Liberty Mutual",
  "Nationwide",
  "Travelers",
  "American Family",
  "Texas Farm Bureau",
  "Safeco",
];

const faqs: FAQ[] = [
  {
    question: "Will filing a glass claim raise my insurance rates?",
    answer:
      "In Texas, comprehensive glass claims are typically treated as no-fault and, in most cases, do not raise your premium the way an at-fault accident would. Every policy is different, so we always recommend confirming the specifics with your agent — but glass claims are among the most routine an insurer handles.",
  },
  {
    question: "Do I really pay nothing out of pocket?",
    answer:
      "It depends on your coverage. Many Texas drivers carry comprehensive insurance with a separate glass provision that waives the deductible for repairs and, on some policies, for replacements. If you have that coverage, your windshield service can cost you $0. We verify exactly what you owe before we start so there are no surprises.",
  },
  {
    question: "Why is a chip repair often free through insurance?",
    answer:
      "A repair costs an insurer far less than a full replacement, so most comprehensive policies waive the deductible entirely on chip repairs to encourage drivers to fix damage early. Catching a chip before it spreads can mean a no-cost repair instead of a deductible toward a full windshield.",
  },
  {
    question: "Can I choose Glass Genie even if my insurer suggests another shop?",
    answer:
      "Yes. Under Texas law you have the right to choose your own auto glass provider. An insurer may recommend a network shop, but the decision is yours, and we'll handle the claim exactly the same way regardless of who they suggest.",
  },
  {
    question: "What if I don't have glass coverage or prefer not to use insurance?",
    answer:
      "No problem at all. We offer fair, upfront cash pricing and can give you a no-obligation quote before any work begins. Plenty of our customers pay out of pocket — especially when a deductible would cost more than the repair itself.",
  },
  {
    question: "Do you handle the paperwork, or do I?",
    answer:
      "We handle it. Our billing team files the claim, communicates with your carrier, and bills them directly for the covered amount. Your only job is to provide your policy information and let us get to work.",
  },
];

export default function InsurancePage() {
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
            All Major Carriers Accepted
          </span>
          <ManagedHeading
            path="/insurance"
            className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl"
            fallback={
              <>
                We Handle Your <span className="text-accent">Insurance Claim.</span>
              </>
            }
          />
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/70">
            A cracked windshield is stressful enough. Glass Genie files your claim, verifies your
            coverage, and bills your insurer directly — so your only job is getting back on the
            road safely.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/contact#quote" variant="secondary" size="lg">
              Start My Claim
              <ArrowRightIcon className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href={tel} variant="ghostLight" size="lg">
              <PhoneIcon className="h-4 w-4" />
              Call {business.phoneDisplay}
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* How direct billing works */}
      <section className="bg-card">
        <Container className="py-16 sm:py-20">
          <SectionHeading
            eyebrow="How It Works"
            title="Direct Billing in Three Simple Steps"
            subtitle="We deal with the insurance company so you don't have to. Most claims are handled start to finish without you ever filling out a form."
          />
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="rounded-2xl border border-line bg-surface p-7"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-base font-extrabold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-lg font-bold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Zero-deductible explainer */}
      <section className="bg-surface">
        <Container className="py-16 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-accent">
                Often $0 Out of Pocket
              </p>
              <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                You May Pay Nothing at All
              </h2>
              <div className="mt-5 space-y-4 text-[15px] leading-7 text-muted">
                <p>
                  Many Texas drivers carry comprehensive coverage with a dedicated glass
                  provision. On those policies, insurers frequently waive the deductible on chip
                  repairs entirely — and on some policies, on full replacements too — because
                  fixing damage early is far cheaper than letting it spread.
                </p>
                <p>
                  Before we lift a tool, our billing team confirms exactly what your policy covers
                  and what, if anything, you&apos;ll owe. No guesswork, no surprise invoices — just
                  a clear answer up front.
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-line bg-card p-8 shadow-sm">
              <h3 className="text-base font-bold text-ink">What we confirm before we start</h3>
              <ul className="mt-5 space-y-4">
                {[
                  "Whether your policy includes comprehensive glass coverage",
                  "Whether your deductible is waived for repair or replacement",
                  "Your exact out-of-pocket cost, if any, in writing",
                  "That you can choose Glass Genie under Texas law",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-muted">
                    <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-genie-green" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Carriers */}
      <section className="bg-card">
        <Container className="py-16 sm:py-20">
          <SectionHeading
            eyebrow="Approved With All Major Insurers"
            title="We Work With Your Carrier"
            subtitle="Glass Genie is an approved auto glass provider for every major insurance company serving Dallas–Fort Worth. Don't see yours? Just ask — we almost certainly work with them."
          />
          <ul className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-3">
            {carriers.map((c) => (
              <li
                key={c}
                className="rounded-full border border-line bg-surface px-4 py-2 text-sm font-semibold text-ink"
              >
                {c}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center text-sm text-muted">
            …and more. Your insurer not listed? Call us and we&apos;ll confirm your coverage in
            minutes.
          </p>
        </Container>
      </section>

      {/* Claim FAQ */}
      <section className="bg-surface">
        <Container className="py-16 sm:py-20">
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Insurance Claim Questions
          </h2>
          <p className="mt-2 text-center text-sm text-muted">
            Straight answers about coverage, deductibles, and your rights as a Texas driver.
          </p>
          <div className="mx-auto mt-10 max-w-3xl">
            <FaqAccordion faqs={faqs} />
          </div>
        </Container>
      </section>

      <CtaBand
        title="File your claim with one phone call."
        subtitle="Tell us about your vehicle and insurance, and we'll handle the rest — often the same day."
      />

      <FaqJsonLd faqs={faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Insurance", path: "/insurance" },
        ]}
      />
    </>
  );
}
