import { revalidatePath } from "next/cache";
import { isAuthed } from "@/lib/auth";
import {
  getAllSeoOverrides,
  upsertSeoOverride,
  deleteSeoOverride,
  normalizePath,
  seoStoreBackend,
  type SeoOverrideInput,
} from "@/lib/seo-store";

function unauthorized() {
  return Response.json({ ok: false, error: "Unauthorized." }, { status: 401 });
}

export async function GET() {
  if (!(await isAuthed())) return unauthorized();
  const overrides = await getAllSeoOverrides();
  return Response.json({ ok: true, overrides, backend: seoStoreBackend });
}

export async function POST(req: Request) {
  if (!(await isAuthed())) return unauthorized();

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const rawPath = typeof body.path === "string" ? body.path : "";
  if (!rawPath.trim()) {
    return Response.json({ ok: false, error: "A page path is required." }, { status: 400 });
  }
  const path = normalizePath(rawPath);

  const input: SeoOverrideInput = {
    metaTitle: str(body.metaTitle),
    metaDescription: str(body.metaDescription),
    h1: str(body.h1),
    canonicalPath: str(body.canonicalPath),
    ogTitle: str(body.ogTitle),
    ogDescription: str(body.ogDescription),
    ogImage: str(body.ogImage),
    keywords: str(body.keywords),
    noindex: Boolean(body.noindex),
  };

  try {
    const override = await upsertSeoOverride(path, input);
    safeRevalidate(path);
    return Response.json({ ok: true, override });
  } catch (err) {
    console.error("[admin/seo] save failed:", err);
    return Response.json(
      { ok: false, error: "Could not save. Check the database connection." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  if (!(await isAuthed())) return unauthorized();

  const rawPath = new URL(req.url).searchParams.get("path") ?? "";
  if (!rawPath.trim()) {
    return Response.json({ ok: false, error: "A page path is required." }, { status: 400 });
  }
  const path = normalizePath(rawPath);

  try {
    await deleteSeoOverride(path);
    safeRevalidate(path);
    return Response.json({ ok: true });
  } catch (err) {
    console.error("[admin/seo] delete failed:", err);
    return Response.json({ ok: false, error: "Could not delete." }, { status: 500 });
  }
}

function str(v: unknown): string | undefined {
  return typeof v === "string" ? v : undefined;
}

/** Publish the change to the live page; never let a revalidate error 500 the save. */
function safeRevalidate(path: string) {
  try {
    revalidatePath(path);
  } catch (err) {
    console.error(`[admin/seo] revalidatePath(${path}) failed:`, err);
  }
}
