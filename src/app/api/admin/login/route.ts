import { cookies } from "next/headers";
import { adminConfigured, checkPassword, sessionCookie } from "@/lib/auth";

export async function POST(req: Request) {
  if (!adminConfigured()) {
    return Response.json(
      { ok: false, error: "Admin password is not configured on the server." },
      { status: 503 }
    );
  }

  let password = "";
  try {
    const body = await req.json();
    if (typeof body?.password === "string") password = body.password;
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (!checkPassword(password)) {
    return Response.json({ ok: false, error: "Incorrect password." }, { status: 401 });
  }

  const { name, value, options } = sessionCookie();
  (await cookies()).set(name, value, options);
  return Response.json({ ok: true });
}
