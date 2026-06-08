import { NextResponse } from "next/server";

/**
 * Stubbed Contact form handler. Validates the payload and returns success.
 * TODO: connect to email/CRM (e.g. forward to info@glassgenie.co or a helpdesk).
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const firstName = String(body.firstName ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!firstName || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Name, email, and message are required." },
      { status: 422 }
    );
  }

  // TODO: connect to email/CRM. For now we just acknowledge receipt.
  return NextResponse.json({ ok: true });
}
