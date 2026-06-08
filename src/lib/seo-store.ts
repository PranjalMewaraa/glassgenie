import "server-only";
import { cache } from "react";
import { promises as fs } from "node:fs";
import path from "node:path";

/**
 * Per-page SEO overrides — the data layer behind the /admin panel.
 *
 * Storage is chosen automatically:
 *   - If DATABASE_URL is set → Postgres (table `seo_overrides`, auto-created).
 *   - Otherwise → a local JSON file at `.data/seo-overrides.json` (dev only).
 *
 * Public pages read these at build / on-demand-revalidation time, so they stay
 * static and fast; the admin save calls revalidatePath() to publish edits live.
 */

export interface SeoOverride {
  /** Route path, normalized, beginning with "/", e.g. "/services/windshield-replacement". */
  path: string;
  /** Exact <title> tag (bypasses the "| Glass Genie" template). */
  metaTitle?: string;
  metaDescription?: string;
  /** Primary <h1> text for the page. */
  h1?: string;
  /** Canonical URL path override (defaults to the page's own path). */
  canonicalPath?: string;
  ogTitle?: string;
  ogDescription?: string;
  /** Absolute URL or site-relative path to the OG/social image. */
  ogImage?: string;
  /** When true, emits robots noindex,nofollow for this page. */
  noindex?: boolean;
  updatedAt?: string;
}

/** Editable fields (everything except the path key + server-managed timestamp). */
export type SeoOverrideInput = Omit<SeoOverride, "path" | "updatedAt">;

const FIELD_KEYS = [
  "metaTitle",
  "metaDescription",
  "h1",
  "canonicalPath",
  "ogTitle",
  "ogDescription",
  "ogImage",
] as const;

/** Normalize a route path: ensure leading slash, strip trailing slash (except root). */
export function normalizePath(input: string): string {
  let p = (input || "").trim();
  if (!p.startsWith("/")) p = `/${p}`;
  p = p.replace(/\/+$/, "");
  return p === "" ? "/" : p;
}

/** Trim strings; treat empty as "unset" so blank fields don't override defaults. */
function cleanInput(input: SeoOverrideInput): SeoOverrideInput {
  const out: SeoOverrideInput = {};
  for (const key of FIELD_KEYS) {
    const v = input[key];
    if (typeof v === "string" && v.trim() !== "") out[key] = v.trim();
  }
  out.noindex = Boolean(input.noindex);
  return out;
}

const usingPostgres = Boolean(process.env.DATABASE_URL);

/* ------------------------------------------------------------------ */
/* Postgres adapter                                                    */
/* ------------------------------------------------------------------ */

// Reuse a single Pool across hot-reloads / serverless invocations.
const globalForPg = globalThis as unknown as {
  __seoPool?: import("pg").Pool;
  __seoTableReady?: Promise<void>;
};

async function getPool(): Promise<import("pg").Pool> {
  if (!globalForPg.__seoPool) {
    const { Pool } = await import("pg");
    // pg has no channel-binding support; strip it so SCRAM auth succeeds.
    const connectionString = process.env.DATABASE_URL!.replace(
      /([?&])channel_binding=[^&]*/,
      "$1"
    ).replace(/[?&]$/, "");
    globalForPg.__seoPool = new Pool({
      connectionString,
      ssl: /sslmode=require|neon\.tech/.test(connectionString)
        ? { rejectUnauthorized: false }
        : undefined,
      max: 3,
    });
  }
  return globalForPg.__seoPool;
}

async function ensureTable(): Promise<void> {
  if (!globalForPg.__seoTableReady) {
    globalForPg.__seoTableReady = (async () => {
      const pool = await getPool();
      await pool.query(`
        create table if not exists seo_overrides (
          path             text primary key,
          meta_title       text,
          meta_description text,
          h1               text,
          canonical_path   text,
          og_title         text,
          og_description   text,
          og_image         text,
          noindex          boolean not null default false,
          updated_at       timestamptz not null default now()
        );
      `);
    })().catch((err) => {
      // Reset so a later call can retry instead of caching a rejected promise.
      globalForPg.__seoTableReady = undefined;
      throw err;
    });
  }
  return globalForPg.__seoTableReady;
}

interface Row {
  path: string;
  meta_title: string | null;
  meta_description: string | null;
  h1: string | null;
  canonical_path: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  noindex: boolean;
  updated_at: Date | string;
}

function rowToOverride(r: Row): SeoOverride {
  return {
    path: r.path,
    metaTitle: r.meta_title ?? undefined,
    metaDescription: r.meta_description ?? undefined,
    h1: r.h1 ?? undefined,
    canonicalPath: r.canonical_path ?? undefined,
    ogTitle: r.og_title ?? undefined,
    ogDescription: r.og_description ?? undefined,
    ogImage: r.og_image ?? undefined,
    noindex: r.noindex,
    updatedAt:
      r.updated_at instanceof Date ? r.updated_at.toISOString() : String(r.updated_at),
  };
}

async function pgGetAll(): Promise<SeoOverride[]> {
  await ensureTable();
  const pool = await getPool();
  const { rows } = await pool.query<Row>(
    "select * from seo_overrides order by path asc"
  );
  return rows.map(rowToOverride);
}

async function pgGet(p: string): Promise<SeoOverride | null> {
  await ensureTable();
  const pool = await getPool();
  const { rows } = await pool.query<Row>(
    "select * from seo_overrides where path = $1 limit 1",
    [p]
  );
  return rows[0] ? rowToOverride(rows[0]) : null;
}

async function pgUpsert(p: string, data: SeoOverrideInput): Promise<SeoOverride> {
  await ensureTable();
  const pool = await getPool();
  const { rows } = await pool.query<Row>(
    `insert into seo_overrides
       (path, meta_title, meta_description, h1, canonical_path, og_title, og_description, og_image, noindex, updated_at)
     values ($1,$2,$3,$4,$5,$6,$7,$8,$9, now())
     on conflict (path) do update set
       meta_title = excluded.meta_title,
       meta_description = excluded.meta_description,
       h1 = excluded.h1,
       canonical_path = excluded.canonical_path,
       og_title = excluded.og_title,
       og_description = excluded.og_description,
       og_image = excluded.og_image,
       noindex = excluded.noindex,
       updated_at = now()
     returning *`,
    [
      p,
      data.metaTitle ?? null,
      data.metaDescription ?? null,
      data.h1 ?? null,
      data.canonicalPath ?? null,
      data.ogTitle ?? null,
      data.ogDescription ?? null,
      data.ogImage ?? null,
      Boolean(data.noindex),
    ]
  );
  return rowToOverride(rows[0]);
}

async function pgDelete(p: string): Promise<void> {
  await ensureTable();
  const pool = await getPool();
  await pool.query("delete from seo_overrides where path = $1", [p]);
}

/* ------------------------------------------------------------------ */
/* Local JSON-file adapter (dev fallback when DATABASE_URL is unset)   */
/* ------------------------------------------------------------------ */

const FILE_PATH = path.join(process.cwd(), ".data", "seo-overrides.json");

async function fileReadMap(): Promise<Record<string, SeoOverride>> {
  try {
    const raw = await fs.readFile(FILE_PATH, "utf8");
    return JSON.parse(raw) as Record<string, SeoOverride>;
  } catch {
    return {};
  }
}

async function fileWriteMap(map: Record<string, SeoOverride>): Promise<void> {
  await fs.mkdir(path.dirname(FILE_PATH), { recursive: true });
  await fs.writeFile(FILE_PATH, JSON.stringify(map, null, 2), "utf8");
}

async function fileGetAll(): Promise<SeoOverride[]> {
  const map = await fileReadMap();
  return Object.values(map).sort((a, b) => a.path.localeCompare(b.path));
}

async function fileGet(p: string): Promise<SeoOverride | null> {
  const map = await fileReadMap();
  return map[p] ?? null;
}

async function fileUpsert(p: string, data: SeoOverrideInput): Promise<SeoOverride> {
  const map = await fileReadMap();
  const record: SeoOverride = { path: p, ...data, updatedAt: new Date().toISOString() };
  map[p] = record;
  await fileWriteMap(map);
  return record;
}

async function fileDelete(p: string): Promise<void> {
  const map = await fileReadMap();
  delete map[p];
  await fileWriteMap(map);
}

/* ------------------------------------------------------------------ */
/* Public API                                                          */
/* ------------------------------------------------------------------ */

/** All overrides (admin dashboard). Not cached — admin always wants fresh data. */
export async function getAllSeoOverrides(): Promise<SeoOverride[]> {
  try {
    return usingPostgres ? await pgGetAll() : await fileGetAll();
  } catch (err) {
    console.error("[seo-store] getAll failed:", err);
    return [];
  }
}

/**
 * One override by path. React-cached so generateMetadata and ManagedHeading
 * share a single read per render. Never throws — returns null on error so a
 * down database degrades to coded defaults instead of breaking the page.
 */
export const getSeoOverride = cache(
  async (rawPath: string): Promise<SeoOverride | null> => {
    const p = normalizePath(rawPath);
    try {
      return usingPostgres ? await pgGet(p) : await fileGet(p);
    } catch (err) {
      console.error(`[seo-store] get(${p}) failed:`, err);
      return null;
    }
  }
);

export async function upsertSeoOverride(
  rawPath: string,
  input: SeoOverrideInput
): Promise<SeoOverride> {
  const p = normalizePath(rawPath);
  const data = cleanInput(input);
  return usingPostgres ? pgUpsert(p, data) : fileUpsert(p, data);
}

export async function deleteSeoOverride(rawPath: string): Promise<void> {
  const p = normalizePath(rawPath);
  return usingPostgres ? pgDelete(p) : fileDelete(p);
}

/** Which backend is active — surfaced in the admin UI for clarity. */
export const seoStoreBackend = usingPostgres ? "postgres" : "file";
