import { cookies } from "next/headers";
import { clearedCookie } from "@/lib/auth";

export async function POST() {
  const { name, value, options } = clearedCookie;
  (await cookies()).set(name, value, options);
  return Response.json({ ok: true });
}
