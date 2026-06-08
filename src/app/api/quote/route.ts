import { NextResponse } from "next/server";

/**
 * Stubbed Instant Quote handler. Validates the payload and returns success.
 * TODO: connect to email/CRM (e.g. send to a CRM webhook or transactional email).
 * No backend is wired yet — this never blocks the form.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").trim();

  if (!name || !phone) {
    return NextResponse.json(
      { ok: false, error: "Name and phone are required." },
      { status: 422 }
    );
  }

  // TODO: connect to email/CRM. For now we just acknowledge receipt.
  return NextResponse.json({ ok: true });
}
