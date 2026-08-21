"use client";

import { useState } from "react";
import { registry } from "@/lib/content";

/**
 * Cash gift — two simple ways to give: PayPal, or a UK bank transfer. No
 * suggested amounts and no on-site payment; the couple receive gifts on their
 * own platforms. To change the details, edit lib/content.ts → cashGift.
 */
export default function BankGift() {
  const { paypal, bankDetails } = registry.cashGift;
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
      {/* PayPal */}
      <p className="font-sans text-eyebrow uppercase tracking-eyebrow text-[#a8842c]">
        By PayPal
      </p>
      <a
        href={paypal}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 flex w-full items-center justify-center gap-2 bg-ink px-6 py-4 font-sans text-eyebrow uppercase tracking-eyebrow text-paper transition-colors hover:bg-accent"
      >
        Give with PayPal <span aria-hidden>&rarr;</span>
      </a>

      {/* divider */}
      <div className="my-8 flex items-center gap-4">
        <span aria-hidden className="h-px flex-1 bg-hairline" />
        <span className="font-sans text-eyebrow uppercase tracking-eyebrow text-ink-faint">
          or
        </span>
        <span aria-hidden className="h-px flex-1 bg-hairline" />
      </div>

      {/* Bank transfer */}
      <p className="font-sans text-eyebrow uppercase tracking-eyebrow text-[#a8842c]">
        By bank transfer
      </p>
      <dl className="mt-3 divide-y divide-hairline border-y border-hairline">
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
        className="mt-5 w-full border border-ink px-6 py-3.5 font-sans text-eyebrow uppercase tracking-eyebrow text-ink transition-colors hover:bg-ink hover:text-paper"
      >
        {copied ? "Copied ✓" : "Copy bank details"}
      </button>

      <p className="mt-4 text-center font-serif text-base italic text-ink-faint">
        Please add your name as the reference so we know who to thank.
      </p>
    </div>
  );
}
