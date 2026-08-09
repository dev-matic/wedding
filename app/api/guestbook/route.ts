import { NextResponse } from "next/server";

/**
 * Guest book endpoint.
 *
 * Validates a note and logs it server-side so the guest book works end to end
 * during the build (the client also appends optimistically). Before launch,
 * persist notes to a database or form service here, and load them on the
 * registry page so they survive a refresh.
 */

export async function POST(request: Request) {
  let data: { name?: string; message?: string };

  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = data.name?.trim();
  const message = data.message?.trim();

  if (!name || !message) {
    return NextResponse.json(
      { error: "Please include your name and a note." },
      { status: 422 },
    );
  }

  // --- Persist the note --------------------------------------------------
  // Replace this log with real storage before launch.
  console.log("New guest book note:", {
    name,
    message,
    receivedAt: new Date().toISOString(),
  });
  // -----------------------------------------------------------------------

  return NextResponse.json({ ok: true });
}
