"use client";

import { useEffect, useState } from "react";

type CountdownProps = {
  /** Target date as an ISO 8601 string with timezone. */
  target: string;
  label?: string;
};

type Parts = { days: string; hours: string; mins: string; secs: string };

const PLACEHOLDER: Parts = { days: "--", hours: "--", mins: "--", secs: "--" };

function diffToParts(target: number, now: number): Parts {
  const ms = Math.max(0, target - now);
  const s = Math.floor(ms / 1000);
  const pad = (n: number) => String(n).padStart(2, "0");
  return {
    days: String(Math.floor(s / 86400)),
    hours: pad(Math.floor((s % 86400) / 3600)),
    mins: pad(Math.floor((s % 3600) / 60)),
    secs: pad(s % 60),
  };
}

/**
 * Days/hrs/min/sec to the target. Renders "--" placeholders until mounted
 * so the server and first client paint match — no hydration layout shift.
 */
export default function Countdown({ target, label }: CountdownProps) {
  const [parts, setParts] = useState<Parts>(PLACEHOLDER);

  useEffect(() => {
    const targetMs = new Date(target).getTime();
    const tick = () => setParts(diffToParts(targetMs, Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  const units: { value: string; label: string }[] = [
    { value: parts.days, label: "Days" },
    { value: parts.hours, label: "Hours" },
    { value: parts.mins, label: "Minutes" },
    { value: parts.secs, label: "Seconds" },
  ];

  return (
    <section className="mx-auto max-w-issue px-5 py-8 md:px-8">
      {label ? (
        <p className="eyebrow mb-6 text-center">{label}</p>
      ) : null}
      <div className="grid grid-cols-4 gap-3 md:gap-8">
        {units.map((u) => (
          <div key={u.label} className="text-center">
            <span
              className="block font-display text-5xl font-normal tabular-nums text-ink md:text-7xl"
              suppressHydrationWarning
            >
              {u.value}
            </span>
            <span className="mt-2 block font-sans text-eyebrow uppercase tracking-eyebrow text-ink-faint">
              {u.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
