import "server-only";
import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Minimal single-password admin auth.
 *
 * Set ADMIN_PASSWORD (and optionally AUTH_SECRET) in the environment. Logging
 * in sets an httpOnly cookie holding an HMAC token; every admin request
 * re-derives and compares it. No database, no user table — just a shared
 * password gate in front of /admin and the admin API.
 */

const COOKIE_NAME = "gg_admin";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

function secret(): string {
  // Prefer a dedicated secret; fall back to the password so a single env var works.
  return process.env.AUTH_SECRET || process.env.ADMIN_PASSWORD || "";
}

/** True once an ADMIN_PASSWORD is configured. */
export function adminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

function sessionToken(): string {
  return createHmac("sha256", secret()).update("gg-admin-session:v1").digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

/** Constant-time check of a submitted password against ADMIN_PASSWORD. */
export function checkPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD || "";
  if (!expected || !input) return false;
  return safeEqual(input, expected);
}

export const cookieName = COOKIE_NAME;

export function sessionCookie() {
  return {
    name: COOKIE_NAME,
    value: sessionToken(),
    options: {
      httpOnly: true,
      sameSite: "lax" as const,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: MAX_AGE_SECONDS,
    },
  };
}

export const clearedCookie = {
  name: COOKIE_NAME,
  value: "",
  options: { httpOnly: true, path: "/", maxAge: 0 },
};

/** Whether the current request carries a valid admin session cookie. */
export async function isAuthed(): Promise<boolean> {
  if (!adminConfigured()) return false;
  const store = await cookies();
  const value = store.get(COOKIE_NAME)?.value;
  if (!value) return false;
  return safeEqual(value, sessionToken());
}
