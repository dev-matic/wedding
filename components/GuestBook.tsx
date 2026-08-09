"use client";

import { useState } from "react";
import { registry } from "@/lib/content";

type Note = { name: string; message: string };
type Status = "idle" | "submitting" | "error";

/**
 * The guest book: a wall of notes, and a form to add one. Seeded with a few
 * example notes; new notes append optimistically. Wire the form to a database
 * or form service (and load real notes) before launch — see app/api/guestbook.
 */
export default function GuestBook() {
  const [notes, setNotes] = useState<Note[]>(registry.guestBook.seed);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const form = e.currentTarget;
    const fd = new FormData(form);
    const note: Note = {
      name: String(fd.get("name") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
    };
    if (!note.name || !note.message) {
      setStatus("error");
      setError("Please add your name and a note.");
      return;
    }

    try {
      await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note),
      }).catch(() => {});
      // Optimistic: show the note immediately regardless of the stubbed API.
      setNotes((prev) => [note, ...prev]);
      form.reset();
      setStatus("idle");
    } catch {
      setStatus("error");
      setError("Couldn't post your note just now. Please try again.");
    }
  }

  const fieldClass =
    "mt-2 w-full border border-hairline bg-paper px-4 py-3 font-serif text-lg text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";
  const labelClass =
    "font-sans text-eyebrow uppercase tracking-eyebrow text-ink-soft";

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="rounded-sm border border-hairline bg-paper p-6 md:p-8"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="gb-name" className={labelClass}>
              Your name
            </label>
            <input id="gb-name" name="name" type="text" className={fieldClass} />
          </div>
        </div>
        <div className="mt-5">
          <label htmlFor="gb-message" className={labelClass}>
            Leave a note
          </label>
          <textarea
            id="gb-message"
            name="message"
            rows={3}
            className={fieldClass}
            placeholder="A wish, a blessing, a memory…"
          />
        </div>
        {error ? (
          <p className="mt-4 border border-ink-faint bg-paper-dim px-4 py-3 text-base text-ink-soft">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={status === "submitting"}
          className="mt-6 border border-ink bg-ink px-6 py-3 font-sans text-eyebrow uppercase tracking-eyebrow text-paper transition-colors hover:bg-accent hover:border-accent disabled:opacity-60"
        >
          {status === "submitting" ? "Signing…" : "Sign the guest book"}
        </button>
      </form>

      <ul className="mt-10 columns-1 gap-6 sm:columns-2 [&>li]:mb-6">
        {notes.map((note, i) => (
          <li
            key={`${note.name}-${i}`}
            className="break-inside-avoid rounded-sm border border-hairline bg-paper-dim/40 p-6"
          >
            <p className="font-serif text-lg italic leading-relaxed text-ink-soft">
              &ldquo;{note.message}&rdquo;
            </p>
            <p className="mt-4 font-sans text-eyebrow uppercase tracking-eyebrow text-accent">
              {note.name}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
