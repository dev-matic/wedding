import { NextResponse } from "next/server";

/**
 * Invitation lookup — gates the RSVP form so only invited guests can reply,
 * and tells the form how many seats a party has.
 *
 * For the build this uses a small in-file guest list. Before launch, move the
 * list to a database or form service and look codes up there. Codes are
 * matched case-insensitively.
 */

type Party = { code: string; name: string; seats: number };

const GUEST_LIST: Party[] = [
  { code: "LISBON26", name: "The Demo Family", seats: 2 },
  { code: "AE-001", name: "Tomás & Inês", seats: 2 },
  { code: "AE-002", name: "Auntie Rose", seats: 1 },
  { code: "AE-003", name: "The Okoye Family", seats: 4 },
];

export async function POST(request: Request) {
  let code = "";
  try {
    const body = await request.json();
    code = String(body.code ?? "").trim().toUpperCase();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!code) {
    return NextResponse.json({ error: "Missing code." }, { status: 422 });
  }

  const party = GUEST_LIST.find((p) => p.code.toUpperCase() === code);
  if (!party) {
    return NextResponse.json({ error: "Invitation not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true, party });
}
