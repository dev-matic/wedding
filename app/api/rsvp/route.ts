import { NextResponse } from "next/server";

/**
 * RSVP submission endpoint.
 *
 * Each valid reply is forwarded to a Google Sheet via a Google Apps Script
 * web-app URL, set in the RSVP_SHEET_WEBHOOK_URL environment variable (see the
 * setup steps in the repo/handover notes). If that variable isn't set, the
 * reply is logged server-side instead, so the form still works end to end.
 */

type RsvpPayload = {
  name?: string;
  email?: string;
  attending?: string;
  guests?: string;
  note?: string;
};

export async function POST(request: Request) {
  let data: RsvpPayload;

  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = data.name?.trim();
  const email = data.email?.trim();
  const attending = data.attending;

  if (!name || !email || (attending !== "yes" && attending !== "no")) {
    return NextResponse.json(
      { error: "Please include your name, email and whether you can attend." },
      { status: 422 },
    );
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return NextResponse.json(
      { error: "That email doesn't look right." },
      { status: 422 },
    );
  }

  const record = {
    name,
    email,
    attending,
    guests: attending === "yes" ? data.guests ?? "" : "",
    note: data.note?.trim() ?? "",
    receivedAt: new Date().toISOString(),
  };

  // Forward to the Google Sheet, if configured. A sheet failure must not lose
  // the guest's reply, so we still return success and log the problem.
  const webhook = process.env.RSVP_SHEET_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      });
      if (!res.ok) {
        console.error("RSVP sheet webhook returned status", res.status);
      }
    } catch (err) {
      console.error("RSVP sheet webhook failed:", err);
    }
  } else {
    console.log("New RSVP (no sheet configured):", record);
  }

  const message =
    attending === "yes"
      ? "We can't wait to celebrate with you. See you there!"
      : "Thank you for letting us know — you'll be missed.";

  return NextResponse.json({ ok: true, message });
}
