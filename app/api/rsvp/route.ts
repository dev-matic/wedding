import { NextResponse } from "next/server";

/**
 * RSVP submission endpoint.
 *
 * This validates the payload and, for now, logs it server-side so the form
 * works end to end during the build. Before launch, wire the marked section
 * below to wherever replies should land — a Google Sheet, Airtable, Notion,
 * a database, or an email via Resend/SendGrid.
 */

type RsvpPayload = {
  name?: string;
  email?: string;
  attending?: string;
  guests?: string;
  dietary?: string;
  song?: string;
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

  // --- Persist the reply -------------------------------------------------
  // Replace this log with real storage/notification before launch.
  console.log("New RSVP:", {
    name,
    email,
    attending,
    guests: data.guests ?? "",
    dietary: data.dietary ?? "",
    song: data.song ?? "",
    note: data.note ?? "",
    receivedAt: new Date().toISOString(),
  });
  // -----------------------------------------------------------------------

  const message =
    attending === "yes"
      ? "We can't wait to celebrate with you. See you there!"
      : "Thank you for letting us know — you'll be missed.";

  return NextResponse.json({ ok: true, message });
}
