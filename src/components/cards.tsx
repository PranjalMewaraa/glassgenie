import Link from "next/link";
import type { Service, Testimonial, ProcessStep } from "@/content/types";
import { Stars } from "@/components/ui";
import { ArrowRightIcon, CarGlassIcon, CheckIcon } from "@/components/icons";

/** Service card used on the home grid and the services hub. */
export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-line bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md"
    >
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-surface text-accent ring-1 ring-line">
        <CarGlassIcon className="h-6 w-6" />
      </span>
      <h3 className="mt-4 text-lg font-bold text-ink">{service.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-muted">{service.cardSummary}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
        Request Service
        <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

/** Client testimonial card. */
export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-line bg-card p-6 shadow-sm">
      <Stars rating={testimonial.rating} />
      <blockquote className="mt-3 flex-1 text-sm leading-7 text-ink/80">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="mt-4 border-t border-line pt-4">
        <span className="block text-sm font-bold text-ink">{testimonial.name}</span>
        <span className="block text-xs text-muted">{testimonial.location}</span>
      </figcaption>
    </figure>
  );
}

/** Numbered process step. */
export function ProcessStepCard({ step, index }: { step: ProcessStep; index: number }) {
  return (
    <div className="relative rounded-2xl border border-line bg-card p-6 shadow-sm">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-navy-900 text-sm font-bold text-white">
        {index + 1}
      </span>
      <h3 className="mt-4 text-base font-bold text-ink">{step.title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{step.description}</p>
    </div>
  );
}

/** Small benefit chip with a check icon. */
export function BenefitChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-lg border border-line bg-white px-3.5 py-3 text-sm font-medium text-ink">
      <CheckIcon className="h-4 w-4 shrink-0 text-genie-green" />
      {label}
    </span>
  );
}
