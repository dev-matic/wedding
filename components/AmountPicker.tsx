"use client";

import { useState } from "react";
import { registry } from "@/lib/content";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Cash-gift picker: preset tiers plus a custom field, name, email, message and
 * a checkbox to display the note publicly in the guest book. Posts to
 * /api/gift, which is stubbed for a payments provider (Paystack in Ghana,
 * Stripe elsewhere) — see app/api/gift/route.ts.
 */
export default function AmountPicker() {
  const { currency, tiers } = registry.cashGift;
  const [selected, setSelected] = useState<number | null>(tiers[1] ?? null);
  const [custom, setCustom] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const amount = custom ? Number(custom) : selected;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!amount || amount <= 0) {
      setStatus("error");
      setMessage("Please choose or enter an amount.");
      return;
    }
    setStatus("submitting");
    setMessage("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/gift", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, amount, currency }),
      });
      if (!res.ok) throw new Error();
      const json = await res.json();
      setStatus("success");
      setMessage(json.message ?? "Thank you for your generosity.");
    } catch {
      setStatus("error");
      setMessage(
        "Payments aren't connected yet. Add a provider in app/api/gift before launch.",
      );
    }
  }

  const fieldClass =
    "mt-2 w-full border border-hairline bg-paper px-4 py-3 font-serif text-lg text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";
  const labelClass =
    "font-sans text-eyebrow uppercase tracking-eyebrow text-ink-soft";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-sm border border-hairline bg-paper p-6 md:p-8"
    >
      {/* Preset tiers */}
      <p className={labelClass}>Choose an amount</p>
      <div className="mt-3 grid grid-cols-3 gap-2.5">
        {tiers.map((tier) => {
          const active = !custom && selected === tier;
          return (
            <button
              key={tier}
              type="button"
              onClick={() => {
                setSelected(tier);
                setCustom("");
              }}
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

      <div className="mt-4">
        <label htmlFor="custom" className={labelClass}>
          Or a custom amount ({currency})
        </label>
        <input
          id="custom"
          name="customAmount"
          type="number"
          min="1"
          inputMode="numeric"
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          className={fieldClass}
          placeholder="Enter an amount"
        />
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="gift-name" className={labelClass}>
            Your name
          </label>
          <input id="gift-name" name="name" type="text" required className={fieldClass} />
        </div>
        <div>
          <label htmlFor="gift-email" className={labelClass}>
            Email
          </label>
          <input id="gift-email" name="email" type="email" required className={fieldClass} />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="gift-message" className={labelClass}>
          A message for the couple
        </label>
        <textarea id="gift-message" name="message" rows={3} className={fieldClass} />
      </div>

      <label className="mt-4 flex items-start gap-3 text-base text-ink-soft">
        <input
          type="checkbox"
          name="public"
          value="yes"
          className="mt-1.5 h-4 w-4 shrink-0 accent-accent"
        />
        Show my note in the guest book
      </label>

      {message ? (
        <p
          className={`mt-5 border px-4 py-3 text-base ${
            status === "success"
              ? "border-accent bg-accent/5 text-ink-soft"
              : "border-ink-faint bg-paper-dim text-ink-soft"
          }`}
        >
          {message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 w-full border border-ink bg-ink px-6 py-4 font-sans text-eyebrow uppercase tracking-eyebrow text-paper transition-colors hover:bg-accent hover:border-accent disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting"
          ? "Processing…"
          : amount
            ? `Gift ${currency}${amount.toLocaleString()}`
            : "Choose an amount"}
      </button>
    </form>
  );
}
