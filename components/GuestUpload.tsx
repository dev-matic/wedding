"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Guest photo upload. Wired to POST /api/guest-gallery; that route is a stub
 * to connect to Vercel Blob (or similar) before launch. Previews selected
 * files locally in the meantime.
 */
export default function GuestUpload() {
  const [status, setStatus] = useState<Status>("idle");
  const [previews, setPreviews] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    setPreviews(files.map((f) => URL.createObjectURL(f)));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/guest-gallery", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Request failed");
      const json = await res.json();
      setStatus("success");
      setMessage(json.message ?? "Thank you — your photos are on their way.");
      form.reset();
      setPreviews([]);
    } catch {
      setStatus("error");
      setMessage(
        "Upload isn't wired up yet. Connect a storage provider in /app/api/guest-gallery before launch.",
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-reading px-5 pb-16 md:px-8"
    >
      <div className="space-y-6">
        <div>
          <label
            htmlFor="uploader"
            className="font-sans text-eyebrow uppercase tracking-eyebrow text-ink-soft"
          >
            Your name
          </label>
          <input
            id="uploader"
            name="uploader"
            type="text"
            className="mt-2 w-full border border-hairline bg-paper px-4 py-3 font-serif text-lg text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            placeholder="So we know who to thank"
          />
        </div>

        <div>
          <label
            htmlFor="photos"
            className="flex cursor-pointer flex-col items-center justify-center border border-dashed border-accent-soft bg-paper-dim/50 px-6 py-12 text-center transition-colors hover:border-accent hover:bg-paper-dim"
          >
            <span className="numeral select-none leading-none" aria-hidden>
              &#43;
            </span>
            <span className="mt-3 font-sans text-eyebrow uppercase tracking-eyebrow text-ink-soft">
              Choose photos
            </span>
            <span className="mt-2 font-serif text-base text-ink-faint">
              JPEG or PNG, as many as you like
            </span>
            <input
              id="photos"
              name="photos"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFiles}
              className="sr-only"
            />
          </label>
        </div>

        {previews.length > 0 && (
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {previews.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={src}
                alt={`Selected photo ${i + 1}`}
                className="aspect-square w-full rounded-sm object-cover"
              />
            ))}
          </div>
        )}

        {message ? (
          <p
            className={`border px-4 py-3 text-base ${
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
          disabled={status === "submitting" || previews.length === 0}
          className="w-full border border-ink bg-ink px-6 py-4 font-sans text-eyebrow uppercase tracking-eyebrow text-paper transition-colors hover:bg-accent hover:border-accent disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "submitting" ? "Uploading…" : "Add to the album"}
        </button>
      </div>
    </form>
  );
}
