"use client";

import { useState } from "react";
import { registry } from "@/lib/content";

/**
 * Cash gift by bank transfer — no payment account needed, so it works the
 * moment you drop in real account details (lib/content.ts → cashGift.bankDetails).
 *
 * Prefer a different method? This component is the only thing to swap:
 *  - Honeymoon fund (Prezola / Patchwork / Monzo pot): replace the details
 *    grid with a single "Open our honeymoon fund →" link.
 *  - Stripe: restore an amount picker that POSTs to a /api/gift route which
 *    creates a Stripe Checkout session, then redirect to its URL.
 */
export default function BankGift() {
  const { currency, tiers, bankDetails } = registry.cashGift;
  const [suggested, setSuggested] = useState<number | null>(tiers[1] ?? null);
  const [copied, setCopied] = useState(false);

  const detailRows: [string, string][] = [
    ["Account name", bankDetails.accountName],
    ["Sort code", bankDetails.sortCode],
    ["Account number", bankDetails.accountNumber],
    ["Reference", bankDetails.reference],
  ];

  async function copyDetails() {
    const text = detailRows.map(([k, v]) => `${k}: ${v}`).join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="rounded-sm border border-hairline bg-paper p-6 md:p-8">
      {/* Suggested amounts — a gentle steer, not a checkout */}
      <p className="font-sans text-eyebrow uppercase tracking-eyebrow text-ink-soft">
        A suggested amount
      </p>
      <div className="mt-3 grid grid-cols-3 gap-2.5">
        {tiers.map((tier) => {
          const active = suggested === tier;
          return (
            <button
              key={tier}
              type="button"
              onClick={() => setSuggested(active ? null : tier)}
              aria-pressed={active}
              className={`border px-3 py-3 font-display text-xl transition-colors ${
                active
                  ? "border-accent bg-accent/10 text-ink"
                  : "border-hairline text-ink-soft hover:border-accent-soft"
              }`}
            >
              {currency}
              {tier.toLocaleString()}
            </button>
          );
        })}
      </div>

      {/* Bank details */}
      <dl className="mt-6 divide-y divide-hairline border-y border-hairline">
        {detailRows.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-4 py-3">
            <dt className="font-sans text-eyebrow uppercase tracking-eyebrow text-ink-faint">
              {label}
            </dt>
            <dd className="font-serif text-lg text-ink">{value}</dd>
          </div>
        ))}
      </dl>

      <button
        type="button"
        onClick={copyDetails}
        className="mt-6 w-full border border-ink bg-ink px-6 py-4 font-sans text-eyebrow uppercase tracking-eyebrow text-paper transition-colors hover:bg-accent hover:border-accent"
      >
        {copied ? "Copied ✓" : "Copy bank details"}
      </button>

      <p className="mt-4 text-center font-serif text-base italic text-ink-faint">
        Please add your name as the reference so we know who to thank.
      </p>
    </div>
  );
}
