"use client";

import { useId, useState } from "react";
import type { FAQ } from "@/content/types";
import { ChevronDownIcon } from "@/components/icons";

/**
 * Accessible FAQ accordion. Keyboard-navigable native <button> disclosures.
 * Emit the matching FAQPage JSON-LD separately via <FaqJsonLd> wherever this
 * renders (schema must mirror the visible content).
 */
export function FaqAccordion({ faqs }: { faqs: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const btnId = `${baseId}-btn-${i}`;
        return (
          <div key={faq.question} className="overflow-hidden rounded-xl border border-line bg-white">
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-ink hover:bg-surface"
              >
                {faq.question}
                <ChevronDownIcon
                  className={`h-4 w-4 shrink-0 text-muted transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
            </h3>
            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={btnId}
                className="px-5 pb-5 text-sm leading-7 text-muted"
              >
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
