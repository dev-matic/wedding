"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "mt-2 w-full border border-hairline bg-paper px-4 py-3 font-serif text-lg text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";

const labelClass =
  "font-sans text-eyebrow uppercase tracking-eyebrow text-ink-soft";

/** Attendance form. Posts to /api/rsvp and reports the outcome inline. */
export default function RsvpForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [attending, setAttending] = useState<"yes" | "no" | "">("");
  const [message, setMessage] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      const json = await res.json();
      setStatus("success");
      setMessage(json.message ?? "Thank you — your reply is in.");
      form.reset();
      setAttending("");
    } catch {
      setStatus("error");
      setMessage(
        "Something went wrong sending your reply. Please try again, or email us directly.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="mx-auto max-w-reading px-5 py-16 text-center md:px-8">
        <p className="numeral select-none" aria-hidden>
          &#10003;
        </p>
        <h2 className="mt-4 font-display text-display-sm font-medium text-ink">
          Received with joy
        </h2>
        <p className="mt-4">{message}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="link-underline mt-8 font-sans text-eyebrow uppercase tracking-eyebrow"
        >
          Submit another reply
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-reading px-5 pb-16 md:px-8"
    >
      <div className="space-y-7">
        <div>
          <label htmlFor="name" className={labelClass}>
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={fieldClass}
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClass}
            placeholder="you@example.com"
          />
        </div>

        <fieldset>
          <legend className={labelClass}>Will you be joining us?</legend>
          <div className="mt-3 flex gap-3">
            {(
              [
                ["yes", "Joyfully accepts"],
                ["no", "Regretfully declines"],
              ] as const
            ).map(([value, text]) => (
              <label
                key={value}
                className={`flex-1 cursor-pointer border px-4 py-3 text-center font-serif text-lg transition-colors ${
                  attending === value
                    ? "border-accent bg-accent/10 text-ink"
                    : "border-hairline text-ink-soft hover:border-accent-soft"
                }`}
              >
                <input
                  type="radio"
                  name="attending"
                  value={value}
                  required
                  checked={attending === value}
                  onChange={() => setAttending(value)}
                  className="sr-only"
                />
                {text}
              </label>
            ))}
          </div>
        </fieldset>

        {attending === "yes" && (
          <>
            <div>
              <label htmlFor="guests" className={labelClass}>
                Number in your party
              </label>
              <select
                id="guests"
                name="guests"
                defaultValue="1"
                className={fieldClass}
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="dietary" className={labelClass}>
                Dietary requirements
              </label>
              <input
                id="dietary"
                name="dietary"
                type="text"
                className={fieldClass}
                placeholder="Allergies, preferences, anything we should know"
              />
            </div>

            <div>
              <label htmlFor="song" className={labelClass}>
                A song to get you dancing
              </label>
              <input
                id="song"
                name="song"
                type="text"
                className={fieldClass}
                placeholder="Artist — Title"
              />
            </div>
          </>
        )}

        <div>
          <label htmlFor="note" className={labelClass}>
            A note for the couple
          </label>
          <textarea
            id="note"
            name="note"
            rows={3}
            className={fieldClass}
            placeholder="Optional — say hello"
          />
        </div>

        {status === "error" && message ? (
          <p className="border border-accent bg-accent/5 px-4 py-3 text-base text-ink-soft">
            {message}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full border border-ink bg-ink px-6 py-4 font-sans text-eyebrow uppercase tracking-eyebrow text-paper transition-colors hover:bg-accent hover:border-accent disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Send reply"}
        </button>
      </div>
    </form>
  );
}
