"use client";

import { useState } from "react";
import { Pinyon_Script } from "next/font/google";
import { couple, invitation } from "@/lib/content";

const script = Pinyon_Script({ subsets: ["latin"], weight: "400" });

/* ------------------------------------------------------------------ */
/* Motifs                                                              */
/* ------------------------------------------------------------------ */

function Sprig({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      <path
        d="M12 112 C44 92 66 58 74 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {[
        [30, 92, -35],
        [42, 76, -20],
        [52, 60, -8],
        [60, 44, 6],
        [68, 30, 20],
      ].map(([cx, cy, rot], i) => (
        <ellipse
          key={i}
          cx={cx}
          cy={cy}
          rx="12"
          ry="5.5"
          fill="currentColor"
          opacity={0.85}
          transform={`rotate(${rot} ${cx} ${cy})`}
        />
      ))}
      <circle cx="74" cy="16" r="4.5" fill="currentColor" />
    </svg>
  );
}

function FloralCorner({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <Sprig className="absolute h-16 w-16 text-terracotta/70 md:h-20 md:w-20" />
      <Sprig className="absolute left-6 top-2 h-12 w-12 rotate-[35deg] text-accent-soft/70 md:h-16 md:w-16" />
      <Sprig className="absolute left-2 top-6 h-10 w-10 -rotate-[20deg] text-terracotta/50 md:h-12 md:w-12" />
    </div>
  );
}

function Heart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 21s-7.5-4.9-10-9.2C.6 9.1 1.6 5.7 4.6 5c1.9-.4 3.7.5 4.6 2 .9-1.5 2.7-2.4 4.6-2 3 .7 4 4.1 2.6 6.8C19.5 16.1 12 21 12 21z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

const [yr, mo, dy] = couple.weddingDate.slice(0, 10).split("-");
const dateDotted = `${dy} . ${mo} . ${yr}`;

export default function Invitation() {
  const [stage, setStage] = useState<"card" | "form">("card");
  const [open, setOpen] = useState(false);

  return (
    <section className="mx-auto w-full max-w-xl px-5 pb-16 md:px-8">
      {stage === "card" ? (
        <CardStage
          open={open}
          setOpen={setOpen}
          onContinue={() => setStage("form")}
        />
      ) : (
        <FormStage />
      )}
    </section>
  );
}

/* ---------- The invitation card ---------- */

function CardStage({
  open,
  setOpen,
  onContinue,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  onContinue: () => void;
}) {
  return (
    <>
      <p className="mb-8 text-center font-sans text-eyebrow uppercase tracking-[0.3em] text-ink-faint">
        The Invitation
      </p>

      {/* The book — the cover swings open on its left spine to reveal the page.
          Both faces share one box, so the cover and invitation are the same size. */}
      <div className="relative overflow-hidden rounded-sm shadow-[0_30px_60px_-30px_rgba(28,26,23,0.35)] [perspective:2200px]">
        {/* The page — the opened invitation. Tapping anywhere on it closes it. */}
        <div
          aria-hidden={!open}
          className={`relative transition-all duration-700 ease-out ${
            open ? "opacity-100 delay-300" : "pointer-events-none opacity-0"
          }`}
        >
          <div
            role="button"
            aria-label="Close the invitation"
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setOpen(false);
              }
            }}
            className="relative cursor-pointer overflow-hidden rounded-sm border border-hairline bg-paper px-7 py-12 text-center md:px-10"
          >
            {/* spine shadow */}
            <span className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-ink/10 to-transparent" />
            <FloralCorner className="pointer-events-none absolute -left-2 -top-2 h-28 w-28" />
            <FloralCorner className="pointer-events-none absolute -bottom-2 -right-2 h-28 w-28 rotate-180" />

            <span className="absolute right-4 top-4 z-10 flex items-center gap-1.5 font-sans text-[0.58rem] uppercase tracking-[0.2em] text-ink-faint">
              Tap to close
              <span className="grid h-4 w-4 place-items-center rounded-full border border-ink/40 text-[0.55rem]">
                &times;
              </span>
            </span>

            <p
              className={`${script.className} bg-gradient-to-r from-accent via-terracotta to-accent-soft bg-clip-text pt-6 text-6xl text-transparent`}
            >
              {couple.monogram}
            </p>

            <p className="mx-auto mt-5 max-w-xs font-serif text-lg italic leading-relaxed text-ink-soft">
              {invitation.familiesLine}
            </p>

            <p className={`${script.className} mt-8 text-6xl text-accent`}>
              {couple.partnerA}
            </p>
            <p className="mt-1 font-sans text-eyebrow uppercase tracking-[0.28em] text-accent/70">
              {invitation.partnerAFull}
            </p>

            <p className={`${script.className} mt-4 text-5xl text-accent-soft`}>
              &amp;
            </p>

            <p className={`${script.className} mt-2 text-6xl text-accent`}>
              {couple.partnerB}
            </p>
            <p className="mt-1 font-sans text-eyebrow uppercase tracking-[0.28em] text-accent/70">
              {invitation.partnerBFull}
            </p>

            <p className="mt-8 font-display text-xl tracking-wide text-ink">
              {couple.weddingDay.date.replace(/^(\d+)\s/, "$1 ").toUpperCase()}{" "}
              {couple.weddingDay.year}
            </p>

            <span className="mx-auto mt-6 block h-px w-16 bg-hairline" />

            <p className="mt-6 font-sans text-eyebrow uppercase tracking-[0.28em] text-ink">
              Venue | Time
            </p>
            <p className="mt-3 font-serif text-lg leading-relaxed text-ink">
              {invitation.venue.name} &middot; {invitation.venue.time}
              <br />
              {invitation.venue.detail}
            </p>

            <p className="mt-8 font-sans text-eyebrow uppercase tracking-[0.28em] text-accent-soft">
              {invitation.scriptureRef}
            </p>
            <p className="mt-2 font-serif text-lg italic leading-relaxed text-accent-soft">
              &ldquo;{invitation.scripture}&rdquo;
            </p>
          </div>
        </div>

        {/* The cover — fills the same box as the page (same size), and swings
            open on the left spine. */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-hidden={open}
          tabIndex={open ? -1 : 0}
          className={`absolute inset-0 flex origin-left flex-col items-center justify-between rounded-sm border border-hairline bg-paper px-8 py-16 text-center [backface-visibility:hidden] transition-all duration-[900ms] ease-in-out ${
            open
              ? "pointer-events-none opacity-0 [transform:rotateY(-155deg)]"
              : "opacity-100 [transform:rotateY(0deg)]"
          }`}
        >
          <span className="pointer-events-none absolute left-5 top-5 h-6 w-6 border-l border-t border-accent/40" />
          <span className="pointer-events-none absolute right-5 top-5 h-6 w-6 border-r border-t border-accent/40" />
          <span className="pointer-events-none absolute bottom-5 left-5 h-6 w-6 border-b border-l border-accent/40" />
          <span className="pointer-events-none absolute bottom-5 right-5 h-6 w-6 border-b border-r border-accent/40" />
          {/* spine shading on the cover's binding edge */}
          <span className="pointer-events-none absolute inset-y-0 left-0 w-5 bg-gradient-to-r from-ink/10 to-transparent" />

          <span className="font-sans text-eyebrow uppercase tracking-[0.3em] text-ink-faint">
            Tap to open
          </span>

          <span className="flex flex-col items-center">
            <Heart className="h-6 w-6 text-terracotta" />
            <span className={`${script.className} mt-2 text-6xl text-terracotta`}>
              {invitation.tagline}
            </span>
            <span className="mt-6 font-display text-3xl font-semibold leading-tight text-ink">
              {couple.partnerA}
            </span>
            <span className={`${script.className} my-1 text-2xl text-accent`}>
              weds
            </span>
            <span className="font-display text-3xl font-semibold leading-tight text-ink">
              {couple.partnerB}
            </span>
          </span>

          <span className="flex flex-col items-center">
            <span className="block h-px w-16 bg-hairline" />
            <span className="mt-5 block font-sans text-eyebrow uppercase tracking-[0.3em] text-accent">
              {dateDotted}
            </span>
            <span className="mt-3 block font-sans text-eyebrow uppercase tracking-[0.3em] text-accent-soft">
              {couple.hashtag}
            </span>
          </span>
        </button>
      </div>

      <button
        type="button"
        onClick={onContinue}
        aria-hidden={!open}
        tabIndex={open ? 0 : -1}
        className={`mt-8 flex w-full items-center justify-center gap-3 bg-ink px-8 py-4 font-sans text-eyebrow uppercase tracking-eyebrow text-paper transition-all duration-500 hover:bg-accent ${
          open ? "opacity-100 delay-500" : "pointer-events-none opacity-0"
        }`}
      >
        Continue to RSVP <span aria-hidden>&rarr;</span>
      </button>
    </>
  );
}

/* ---------- The RSVP form ---------- */

function FormStage() {
  const [attending, setAttending] = useState<"yes" | "no" | null>(null);
  const [guests, setGuests] = useState("1");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      attending,
      guests: attending === "yes" ? guests : "",
      note: String(data.get("note") ?? "").trim(),
    };

    if (!payload.name || !payload.email || !payload.attending) {
      setStatus("error");
      setMessage("Please add your name, email and whether you can attend.");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error ?? "Something went wrong.");
      setStatus("done");
      setMessage(body.message ?? "Thank you — your reply is in.");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "done") {
    return (
      <div className="py-16 text-center">
        <p className="font-sans text-eyebrow uppercase tracking-[0.3em] text-ink-faint">
          Your Response
        </p>
        <p className="mt-8 font-display text-4xl text-ink md:text-5xl">
          Thank you
        </p>
        <p className="mt-5 font-serif text-xl italic text-ink-soft">{message}</p>
      </div>
    );
  }

  return (
    <>
      <p className="text-center font-sans text-eyebrow uppercase tracking-[0.3em] text-ink-faint">
        Your Response
      </p>
      <h2 className="mt-6 text-center font-sans text-6xl font-semibold tracking-tight text-ink md:text-7xl">
        RSVP
      </h2>
      <span className="mx-auto mt-6 block h-px w-16 bg-accent/50" />
      <p className="mt-6 text-center font-serif text-xl italic text-ink-soft">
        We would be honoured by your presence
      </p>

      <form onSubmit={onSubmit} className="mt-12 space-y-8">
        <label className="block">
          <span className="font-sans text-eyebrow uppercase tracking-eyebrow text-ink-soft">
            Your Name *
          </span>
          <input
            name="name"
            required
            className="mt-3 w-full border border-hairline bg-paper px-4 py-3.5 font-serif text-lg text-ink outline-none placeholder:text-ink-faint focus:border-accent"
            placeholder="Enter your full name"
          />
        </label>

        <label className="block">
          <span className="font-sans text-eyebrow uppercase tracking-eyebrow text-ink-soft">
            Email Address *
          </span>
          <input
            name="email"
            type="email"
            required
            className="mt-3 w-full border border-hairline bg-paper px-4 py-3.5 font-serif text-lg text-ink outline-none placeholder:text-ink-faint focus:border-accent"
            placeholder="your.email@example.com"
          />
        </label>

        <div>
          <span className="font-sans text-eyebrow uppercase tracking-eyebrow text-ink-soft">
            Will you be attending? *
          </span>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {(
              [
                ["yes", "Joyfully Accept"],
                ["no", "Regretfully Decline"],
              ] as const
            ).map(([val, label]) => {
              const active = attending === val;
              return (
                <button
                  key={val}
                  type="button"
                  onClick={() => setAttending(val)}
                  aria-pressed={active}
                  className={`border px-4 py-3 font-serif text-base transition-colors ${
                    active
                      ? "border-accent bg-accent/10 text-ink"
                      : "border-hairline text-ink-soft hover:border-accent-soft"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {attending === "yes" ? (
          <label className="block">
            <span className="font-sans text-eyebrow uppercase tracking-eyebrow text-ink-soft">
              Number of Guests
            </span>
            <select
              name="guests"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="mt-3 w-full appearance-none border border-hairline bg-paper px-4 py-3.5 font-serif text-lg text-ink outline-none focus:border-accent"
            >
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={String(n)}>
                  {n} {n === 1 ? "Guest" : "Guests"}
                </option>
              ))}
            </select>
          </label>
        ) : null}

        <label className="block">
          <span className="font-sans text-eyebrow uppercase tracking-eyebrow text-ink-soft">
            A Message for the Couple (Optional)
          </span>
          <textarea
            name="note"
            rows={4}
            className="mt-3 w-full resize-none border border-hairline bg-paper px-4 py-3.5 font-serif text-lg text-ink outline-none placeholder:text-ink-faint focus:border-accent"
            placeholder="Share your wishes or a note..."
          />
        </label>

        {status === "error" ? (
          <p className="font-serif text-base italic text-terracotta">{message}</p>
        ) : null}

        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full bg-ink px-8 py-4 font-sans text-eyebrow uppercase tracking-eyebrow text-paper transition-colors hover:bg-accent disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send RSVP"}
        </button>
      </form>
    </>
  );
}
