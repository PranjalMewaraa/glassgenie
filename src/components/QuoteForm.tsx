"use client";

import { useId, useState } from "react";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";

const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear + 1 - 1990 }, (_, i) =>
  String(currentYear + 1 - i)
);

type Step = 0 | 1 | 2 | 3;

const stepLabels = ["Year", "Make", "Model", "Contact"];

/**
 * Multi-step Instant Quote form. Reusable in two visual variants:
 *  - "hero": light card floated in a dark hero
 *  - "sidebar": compact card for service-page sidebars
 * Submits to the stubbed /api/quote route handler.
 */
export function QuoteForm({
  variant = "hero",
  title = "Get Your Instant Quote",
}: {
  variant?: "hero" | "sidebar";
  title?: string;
}) {
  const [step, setStep] = useState<Step>(0);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [data, setData] = useState({
    year: "",
    make: "",
    model: "",
    name: "",
    phone: "",
    email: "",
  });
  const baseId = useId();

  const canAdvance =
    (step === 0 && data.year) ||
    (step === 1 && data.make.trim()) ||
    (step === 2 && data.model.trim());

  const canSubmit = data.name.trim() && data.phone.trim();

  function update(field: keyof typeof data, value: string) {
    setData((d) => ({ ...d, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-white p-6 text-center shadow-xl ring-1 ring-line">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-genie-green/10 text-genie-green">
          <CheckIcon className="h-6 w-6" />
        </div>
        <h3 className="mt-4 text-lg font-bold text-ink">Quote request received!</h3>
        <p className="mt-2 text-sm text-muted">
          Thanks, {data.name.split(" ")[0] || "there"}. Our team will reach out shortly with your
          instant quote for your {data.year} {data.make} {data.model}.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-5 shadow-xl ring-1 ring-line sm:p-6"
      aria-label="Instant quote request"
    >
      <h3 className="text-center text-lg font-bold text-ink">{title}</h3>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-[11px] font-medium text-muted">
          {stepLabels.map((label, i) => (
            <span key={label} className={i <= step ? "text-accent" : ""}>
              {label}
            </span>
          ))}
        </div>
        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-surface">
          <div
            className="h-full rounded-full bg-accent transition-all duration-300"
            style={{ width: `${((step + 1) / 4) * 100}%` }}
          />
        </div>
      </div>

      <div className="mt-5 space-y-4">
        {step === 0 && (
          <Field label="Vehicle Year" htmlFor={`${baseId}-year`}>
            <select
              id={`${baseId}-year`}
              value={data.year}
              onChange={(e) => update("year", e.target.value)}
              className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink focus:border-accent"
            >
              <option value="">Select Year</option>
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </Field>
        )}

        {step === 1 && (
          <Field label="Vehicle Make" htmlFor={`${baseId}-make`}>
            <input
              id={`${baseId}-make`}
              value={data.make}
              onChange={(e) => update("make", e.target.value)}
              placeholder="e.g. Toyota, Ford, Honda"
              className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink placeholder:text-muted/60 focus:border-accent"
            />
          </Field>
        )}

        {step === 2 && (
          <Field label="Vehicle Model" htmlFor={`${baseId}-model`}>
            <input
              id={`${baseId}-model`}
              value={data.model}
              onChange={(e) => update("model", e.target.value)}
              placeholder="e.g. Camry, F-150, Civic"
              className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink placeholder:text-muted/60 focus:border-accent"
            />
          </Field>
        )}

        {step === 3 && (
          <>
            <Field label="Full Name" htmlFor={`${baseId}-name`}>
              <input
                id={`${baseId}-name`}
                value={data.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Jane Smith"
                className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink placeholder:text-muted/60 focus:border-accent"
              />
            </Field>
            <Field label="Phone Number" htmlFor={`${baseId}-phone`}>
              <input
                id={`${baseId}-phone`}
                type="tel"
                value={data.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="(469) 200-4801"
                className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink placeholder:text-muted/60 focus:border-accent"
              />
            </Field>
            <Field label="Email (optional)" htmlFor={`${baseId}-email`}>
              <input
                id={`${baseId}-email`}
                type="email"
                value={data.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink placeholder:text-muted/60 focus:border-accent"
              />
            </Field>
          </>
        )}
      </div>

      {status === "error" && (
        <p className="mt-3 text-sm text-red-600" role="alert">
          Something went wrong. Please call us at the number above and we&apos;ll help right away.
        </p>
      )}

      <div className="mt-5 flex items-center gap-3">
        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep((s) => (s - 1) as Step)}
            className="rounded-xl border border-line px-4 py-2.5 text-sm font-semibold text-ink hover:bg-surface"
          >
            Back
          </button>
        )}
        {step < 3 ? (
          <button
            type="button"
            disabled={!canAdvance}
            onClick={() => setStep((s) => (s + 1) as Step)}
            className="ml-auto inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next Step
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={!canSubmit || status === "submitting"}
            className="ml-auto inline-flex items-center gap-2 rounded-xl bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === "submitting" ? "Sending…" : "Get My Quote"}
          </button>
        )}
      </div>

      {variant === "hero" && (
        <p className="mt-3 text-center text-xs text-muted">
          No obligation · Fast response · Insurance billing handled for you
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      {children}
    </div>
  );
}
