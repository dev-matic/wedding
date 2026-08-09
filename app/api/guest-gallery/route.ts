import { NextResponse } from "next/server";

/**
 * Guest photo upload endpoint (stub).
 *
 * It accepts a multipart form with an optional `uploader` name and one or
 * more `photos` files, and validates them. To actually store the images,
 * connect a provider in the marked section below — Vercel Blob is the
 * natural fit on Vercel:
 *
 *   import { put } from "@vercel/blob";
 *   const blob = await put(file.name, file, { access: "public" });
 *
 * (Add `@vercel/blob` and a BLOB_READ_WRITE_TOKEN env var first.)
 */

const MAX_BYTES = 15 * 1024 * 1024; // 15 MB per file

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json(
      { error: "Expected a multipart form upload." },
      { status: 400 },
    );
  }

  const files = form.getAll("photos").filter((f): f is File => f instanceof File);

  if (files.length === 0) {
    return NextResponse.json(
      { error: "Please choose at least one photo." },
      { status: 422 },
    );
  }

  for (const file of files) {
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image files can be uploaded." },
        { status: 422 },
      );
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: "Each photo must be 15 MB or smaller." },
        { status: 422 },
      );
    }
  }

  // --- Store the files ---------------------------------------------------
  // No storage is connected yet. Returning 501 keeps the UI honest until a
  // provider is wired up. Swap this for real upload logic before launch.
  return NextResponse.json(
    {
      error:
        "Uploads aren't connected yet. Add a storage provider in app/api/guest-gallery/route.ts.",
    },
    { status: 501 },
  );
  // -----------------------------------------------------------------------
}
