"use client";

import { useEffect, useState } from "react";

type Parts = { days: number; hours: number; mins: number; secs: number };

function split(target: number): Parts {
  let s = Math.max(0, Math.floor((target - Date.now()) / 1000));
  const days = Math.floor(s / 86400);
  s -= days * 86400;
  const hours = Math.floor(s / 3600);
  s -= hours * 3600;
  const mins = Math.floor(s / 60);
  s -= mins * 60;
  return { days, hours, mins, secs: s };
}

/**
 * A live countdown to `target` (ISO 8601). Renders four gold units and ticks
 * every second on the client; before mount it shows placeholders so the server
 * and client markup match.
 */
export default function Countdown({
  target,
  className = "",
  compact = false,
}: {
  target: string;
  className?: string;
  compact?: boolean;
}) {
  const targetMs = new Date(target).getTime();
  const [t, setT] = useState<Parts | null>(null);

  useEffect(() => {
    const update = () => setT(split(targetMs));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  const done =
    t && t.days === 0 && t.hours === 0 && t.mins === 0 && t.secs === 0;

  if (done) {
    return (
      <p
        className={`font-serif text-xl italic text-[#e7c766] ${className}`}
      >
        Today is the day.
      </p>
    );
  }

  const units: { value: number | null; label: string }[] = [
    { value: t?.days ?? null, label: "Days" },
    { value: t?.hours ?? null, label: "Hours" },
    { value: t?.mins ?? null, label: "Minutes" },
    { value: t?.secs ?? null, label: "Seconds" },
  ];

  const num = compact ? "text-2xl md:text-3xl" : "text-4xl md:text-5xl";
  const gap = compact ? "gap-4 md:gap-6" : "gap-6 md:gap-10";

  return (
    <div
      className={`flex items-start ${gap} ${className}`}
      suppressHydrationWarning
    >
      {units.map((u) => (
        <div key={u.label} className="text-center">
          <span
            className={`block font-display tabular-nums text-[#e7c766] ${num}`}
          >
            {u.value === null ? "––" : String(u.value).padStart(2, "0")}
          </span>
          <span className="mt-2 block font-sans text-[0.6rem] uppercase tracking-eyebrow text-paper/50">
            {u.label}
          </span>
        </div>
      ))}
    </div>
  );
}
