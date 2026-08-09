"use client";

import { useState } from "react";
import RsvpForm from "./RsvpForm";

export type Party = {
  code: string;
  name: string;
  seats: number;
};

type Status = "idle" | "checking" | "error";

/**
 * Gates the RSVP form behind an invitation lookup, so only invited guests can
 * reply — and so the form knows how many seats the party has. Looks the code
 * up via /api/invitation. Try the demo code shown below during the build.
 */
export default function InvitationGate({ demoCode }: { demoCode?: string }) {
  const [party, setParty] = useState<Party | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleLookup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("checking");
    setError("");

    const code = String(
      new FormData(e.currentTarget).get("code") ?? "",
    ).trim();
    if (!code) {
      setStatus("error");
      setError("Please enter the code from your invitation.");
      return;
    }

    try {
      const res = await fetch("/api/invitation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      if (res.status === 404) {
        setStatus("error");
        setError("We couldn't find that code. Check your invitation and try again.");
        return;
      }
      if (!res.ok) throw new Error();
      const json = (await res.json()) as { party: Party };
      setParty(json.party);
      setStatus("idle");
    } catch {
      setStatus("error");
      setError("Something went wrong looking that up. Please try again.");
    }
  }

  if (party) {
    return (
      <div className="mx-auto max-w-reading px-5 md:px-8">
        <p className="mb-8 border-y border-hairline py-4 text-center font-serif text-lg italic text-ink-soft">
          Welcome, {party.name}. We&rsquo;ve saved{" "}
          {party.seats === 1 ? "a seat" : `${party.seats} seats`} for you.
        </p>
        <RsvpForm invitation={party} />
      </div>
    );
  }

  const fieldClass =
    "mt-2 w-full border border-hairline bg-paper px-4 py-3 text-center font-serif text-2xl uppercase tracking-widest text-ink placeholder:text-ink-faint placeholder:tracking-normal placeholder:normal-case focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";

  return (
    <form onSubmit={handleLookup} className="mx-auto max-w-md px-5 pb-16 md:px-8">
      <label
        htmlFor="code"
        className="block text-center font-sans text-eyebrow uppercase tracking-eyebrow text-ink-soft"
      >
        Your invitation code
      </label>
      <input
        id="code"
        name="code"
        type="text"
        autoComplete="off"
        className={fieldClass}
        placeholder="e.g. LISBON26"
      />
      {demoCode ? (
        <p className="mt-3 text-center font-sans text-xs tracking-wide text-ink-faint">
          Building the site? Try the demo code{" "}
          <span className="text-accent">{demoCode}</span>.
        </p>
      ) : null}

      {error ? (
        <p className="mt-5 border border-ink-faint bg-paper-dim px-4 py-3 text-center text-base text-ink-soft">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "checking"}
        className="mt-6 w-full border border-ink bg-ink px-6 py-4 font-sans text-eyebrow uppercase tracking-eyebrow text-paper transition-colors hover:bg-accent hover:border-accent disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "checking" ? "Looking up…" : "Find my invitation"}
      </button>
    </form>
  );
}
