"use client";

import { useId, useState } from "react";
import { SendIcon, CheckIcon } from "@/components/icons";

/** Contact message form. Submits to the stubbed /api/contact route handler. */
export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const id = useId();

  const canSubmit =
    data.firstName.trim() && data.email.trim() && data.message.trim();

  function update(field: keyof typeof data, value: string) {
    setData((d) => ({ ...d, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
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
      <div className="rounded-2xl bg-white p-8 text-center shadow-md ring-1 ring-line">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-genie-green/10 text-genie-green">
          <CheckIcon className="h-6 w-6" />
        </div>
        <h3 className="mt-4 text-lg font-bold text-ink">Message sent!</h3>
        <p className="mt-2 text-sm text-muted">
          Thanks for reaching out, {data.firstName}. Our team will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-line sm:p-8"
      aria-label="Contact form"
    >
      <h2 className="text-xl font-bold text-ink">Send us a Message</h2>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <Field label="First Name" htmlFor={`${id}-first`} required>
          <input
            id={`${id}-first`}
            value={data.firstName}
            onChange={(e) => update("firstName", e.target.value)}
            required
            className="input"
          />
        </Field>
        <Field label="Last Name" htmlFor={`${id}-last`}>
          <input
            id={`${id}-last`}
            value={data.lastName}
            onChange={(e) => update("lastName", e.target.value)}
            className="input"
          />
        </Field>
      </div>
      <div className="mt-5">
        <Field label="Email Address" htmlFor={`${id}-email`} required>
          <input
            id={`${id}-email`}
            type="email"
            value={data.email}
            onChange={(e) => update("email", e.target.value)}
            required
            className="input"
          />
        </Field>
      </div>
      <div className="mt-5">
        <Field label="Phone Number" htmlFor={`${id}-phone`}>
          <input
            id={`${id}-phone`}
            type="tel"
            value={data.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="input"
          />
        </Field>
      </div>
      <div className="mt-5">
        <Field label="How can we help you?" htmlFor={`${id}-message`} required>
          <textarea
            id={`${id}-message`}
            value={data.message}
            onChange={(e) => update("message", e.target.value)}
            required
            rows={5}
            className="input resize-y"
          />
        </Field>
      </div>

      {status === "error" && (
        <p className="mt-4 text-sm text-red-600" role="alert">
          Something went wrong. Please call us and we&apos;ll help right away.
        </p>
      )}

      <button
        type="submit"
        disabled={!canSubmit || status === "submitting"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-navy-900 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-navy-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "submitting" ? "Sending…" : "Send Message"}
        {status !== "submitting" && <SendIcon className="h-4 w-4" />}
      </button>

      <style>{`
        .input {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid var(--color-line);
          background: #fff;
          padding: 0.625rem 0.75rem;
          font-size: 0.875rem;
          color: var(--color-ink);
        }
        .input::placeholder { color: color-mix(in srgb, var(--color-muted) 60%, transparent); }
        .input:focus { border-color: var(--color-accent); }
      `}</style>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      {children}
    </div>
  );
}
