import { NextResponse } from "next/server";

/**
 * Cash-gift endpoint (stub).
 *
 * Validates the contribution, then returns 501 until a payments provider is
 * connected — Paystack handles cards and mobile money in Ghana; Stripe works
 * elsewhere. Wire the marked section to create a checkout session / payment
 * intent and return its URL, then redirect the client to it.
 */

export async function POST(request: Request) {
  let data: {
    amount?: number;
    currency?: string;
    name?: string;
    email?: string;
    message?: string;
    public?: string;
  };

  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const amount = Number(data.amount);
  if (!amount || amount <= 0) {
    return NextResponse.json({ error: "Please choose an amount." }, { status: 422 });
  }
  if (!data.name?.trim() || !data.email?.trim()) {
    return NextResponse.json(
      { error: "Please include your name and email." },
      { status: 422 },
    );
  }

  // --- Create a payment ---------------------------------------------------
  // e.g. with Paystack:
  //   const res = await fetch("https://api.paystack.co/transaction/initialize", {
  //     method: "POST",
  //     headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
  //     ...
  //   });
  // Return the authorization_url and redirect the client to it.
  return NextResponse.json(
    {
      error:
        "Payments aren't connected yet. Add Paystack or Stripe in app/api/gift/route.ts.",
    },
    { status: 501 },
  );
  // -----------------------------------------------------------------------
}
