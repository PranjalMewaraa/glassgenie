"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { SiteRoute } from "@/lib/site-routes";
import type { RouteDefaults } from "@/lib/route-defaults";

interface Override {
  path: string;
  metaTitle?: string;
  metaDescription?: string;
  h1?: string;
  canonicalPath?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  keywords?: string;
  noindex?: boolean;
  updatedAt?: string;
}

type Fields = {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  canonicalPath: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  keywords: string;
  noindex: boolean;
};

const EMPTY: Fields = {
  metaTitle: "",
  metaDescription: "",
  h1: "",
  canonicalPath: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  keywords: "",
  noindex: false,
};

function toFields(o: Override | undefined): Fields {
  return {
    metaTitle: o?.metaTitle ?? "",
    metaDescription: o?.metaDescription ?? "",
    h1: o?.h1 ?? "",
    canonicalPath: o?.canonicalPath ?? "",
    ogTitle: o?.ogTitle ?? "",
    ogDescription: o?.ogDescription ?? "",
    ogImage: o?.ogImage ?? "",
    keywords: o?.keywords ?? "",
    noindex: Boolean(o?.noindex),
  };
}

function normalizePath(input: string): string {
  let p = (input || "").trim();
  if (!p.startsWith("/")) p = `/${p}`;
  p = p.replace(/\/+$/, "");
  return p === "" ? "/" : p;
}

export function SeoManager({
  routes,
  backend,
  initialOverrides,
  defaults,
}: {
  routes: SiteRoute[];
  backend: string;
  initialOverrides: Override[];
  defaults: Record<string, RouteDefaults>;
}) {
  const router = useRouter();
  const [overrides, setOverrides] = useState<Override[]>(initialOverrides);
  const [selectedPath, setSelectedPath] = useState<string>(routes[0]?.path ?? "/");
  const [customPath, setCustomPath] = useState("");
  const [useCustom, setUseCustom] = useState(false);

  const activePath = useMemo(
    () => normalizePath(useCustom ? customPath : selectedPath),
    [useCustom, customPath, selectedPath]
  );

  const overrideMap = useMemo(() => {
    const m = new Map<string, Override>();
    for (const o of overrides) m.set(o.path, o);
    return m;
  }, [overrides]);

  const grouped = useMemo(() => {
    const g = new Map<string, SiteRoute[]>();
    for (const r of routes) {
      const list = g.get(r.group) ?? [];
      list.push(r);
      g.set(r.group, list);
    }
    return [...g.entries()];
  }, [routes]);

  // Re-fetch the list after a save/delete. Called from event handlers only.
  async function refreshOverrides() {
    try {
      const res = await fetch("/api/admin/seo", { cache: "no-store" });
      if (res.status === 401) {
        router.replace("/admin/login");
        return;
      }
      const data = await res.json();
      if (data.ok) setOverrides(data.overrides as Override[]);
    } catch {
      // Leave the list as-is; the form still works against the server.
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  const activeOverride = overrideMap.get(activePath);
  const activeDefaults = defaults[activePath] ?? {};

  return (
    <div className="mx-auto w-full max-w-3xl">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-ink">SEO Admin</h1>
          <p className="mt-1 text-sm text-muted">
            Override meta tags and the H1 for any page. Storage:{" "}
            <span className="font-medium text-ink">{backend}</span>.
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="shrink-0 rounded-lg border border-line bg-white px-3.5 py-2 text-sm font-medium text-ink transition-colors hover:bg-surface"
        >
          Log out
        </button>
      </header>

      <section className="mt-6 rounded-2xl border border-line bg-card p-5 shadow-sm sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="route" className="block text-sm font-medium text-ink">
              Page
            </label>
            <select
              id="route"
              value={useCustom ? "__custom__" : selectedPath}
              onChange={(e) => {
                if (e.target.value === "__custom__") {
                  setUseCustom(true);
                } else {
                  setUseCustom(false);
                  setSelectedPath(e.target.value);
                }
              }}
              className="mt-1.5 w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
            >
              {grouped.map(([group, list]) => (
                <optgroup key={group} label={group}>
                  {list.map((r) => (
                    <option key={r.path} value={r.path}>
                      {r.label} — {r.path}
                      {overrideMap.has(normalizePath(r.path)) ? "  ●" : ""}
                    </option>
                  ))}
                </optgroup>
              ))}
              <optgroup label="Other">
                <option value="__custom__">Custom path…</option>
              </optgroup>
            </select>
          </div>

          <div>
            <label htmlFor="custom" className="block text-sm font-medium text-ink">
              Custom path
            </label>
            <input
              id="custom"
              type="text"
              placeholder="/some/page"
              value={customPath}
              disabled={!useCustom}
              onChange={(e) => setCustomPath(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-accent disabled:opacity-50"
            />
          </div>
        </div>

        <p className="mt-3 text-xs text-muted">
          Editing{" "}
          <code className="rounded bg-surface px-1.5 py-0.5 text-ink">{activePath}</code>
          {activeOverride
            ? " — an override exists for this page."
            : " — no override yet. Greyed text below is the page's current live value; type to override it."}
        </p>
      </section>

      {/* Keyed by path so the form re-initializes from the saved values whenever
          the selected page changes — no syncing effect required. */}
      <SeoForm
        key={activePath}
        path={activePath}
        initial={toFields(activeOverride)}
        defaults={activeDefaults}
        hasOverride={Boolean(activeOverride)}
        onChanged={refreshOverrides}
        onUnauthorized={() => router.replace("/admin/login")}
      />
    </div>
  );
}

const inputCls =
  "mt-1.5 w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-accent";

function SeoForm({
  path,
  initial,
  defaults,
  hasOverride,
  onChanged,
  onUnauthorized,
}: {
  path: string;
  initial: Fields;
  defaults: RouteDefaults;
  hasOverride: boolean;
  onChanged: () => Promise<void> | void;
  onUnauthorized: () => void;
}) {
  const [fields, setFields] = useState<Fields>(initial);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<{ kind: "ok" | "err"; text: string } | null>(
    null
  );

  function setField<K extends keyof Fields>(key: K, value: Fields[K]) {
    setFields((f) => ({ ...f, [key]: value }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setNotice(null);
    try {
      const res = await fetch("/api/admin/seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path, ...fields }),
      });
      if (res.status === 401) return onUnauthorized();
      const data = await res.json();
      if (res.ok && data.ok) {
        setNotice({ kind: "ok", text: `Saved. ${path} is now live.` });
        await onChanged();
      } else {
        setNotice({ kind: "err", text: data.error ?? "Save failed." });
      }
    } catch {
      setNotice({ kind: "err", text: "Network error. Please try again." });
    } finally {
      setBusy(false);
    }
  }

  async function handleClear() {
    if (!hasOverride) {
      setFields(EMPTY);
      return;
    }
    setBusy(true);
    setNotice(null);
    try {
      const res = await fetch(`/api/admin/seo?path=${encodeURIComponent(path)}`, {
        method: "DELETE",
      });
      if (res.status === 401) return onUnauthorized();
      const data = await res.json();
      if (res.ok && data.ok) {
        setFields(EMPTY);
        setNotice({ kind: "ok", text: `Cleared override for ${path}.` });
        await onChanged();
      } else {
        setNotice({ kind: "err", text: data.error ?? "Delete failed." });
      }
    } catch {
      setNotice({ kind: "err", text: "Network error. Please try again." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={handleSave}
      className="mt-5 rounded-2xl border border-line bg-card p-5 shadow-sm sm:p-6"
    >
      <Field
        label="Meta title"
        hint="Becomes the exact <title> tag (no &quot;| Glass Genie&quot; suffix). ~50–60 chars."
      >
        <input
          type="text"
          value={fields.metaTitle}
          placeholder={defaults.metaTitle}
          onChange={(e) => setField("metaTitle", e.target.value)}
          className={inputCls}
        />
      </Field>

      <Field label="Meta description" hint="~150–160 chars.">
        <textarea
          rows={2}
          value={fields.metaDescription}
          placeholder={defaults.metaDescription}
          onChange={(e) => setField("metaDescription", e.target.value)}
          className={inputCls}
        />
      </Field>

      <Field
        label="H1 heading"
        hint="Replaces the page's main heading text (where the page uses ManagedHeading)."
      >
        <input
          type="text"
          value={fields.h1}
          placeholder={defaults.h1}
          onChange={(e) => setField("h1", e.target.value)}
          className={inputCls}
        />
      </Field>

      <Field
        label="Canonical path"
        hint="Override the canonical URL path. Leave blank to canonicalize to this page."
      >
        <input
          type="text"
          placeholder={path}
          value={fields.canonicalPath}
          onChange={(e) => setField("canonicalPath", e.target.value)}
          className={inputCls}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="OG title" hint="Defaults to meta title.">
          <input
            type="text"
            value={fields.ogTitle}
            placeholder={fields.metaTitle || defaults.metaTitle}
            onChange={(e) => setField("ogTitle", e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="OG image" hint="Absolute URL or site-relative path.">
          <input
            type="text"
            value={fields.ogImage}
            onChange={(e) => setField("ogImage", e.target.value)}
            className={inputCls}
          />
        </Field>
      </div>

      <Field label="OG description" hint="Defaults to meta description.">
        <textarea
          rows={2}
          value={fields.ogDescription}
          placeholder={fields.metaDescription || defaults.metaDescription}
          onChange={(e) => setField("ogDescription", e.target.value)}
          className={inputCls}
        />
      </Field>

      <Field label="Meta keywords" hint="Comma-separated. Minor signal for some engines; Google ignores it.">
        <input
          type="text"
          value={fields.keywords}
          onChange={(e) => setField("keywords", e.target.value)}
          className={inputCls}
        />
      </Field>

      <label className="mt-2 flex items-center gap-2.5 text-sm text-ink">
        <input
          type="checkbox"
          checked={fields.noindex}
          onChange={(e) => setField("noindex", e.target.checked)}
          className="h-4 w-4 rounded border-line text-accent focus:ring-accent"
        />
        Hide from search engines (<code>noindex, nofollow</code>)
      </label>

      {notice && (
        <p
          role="status"
          className={`mt-4 rounded-lg px-3 py-2 text-sm ${
            notice.kind === "ok"
              ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200"
              : "bg-red-50 text-red-700 ring-1 ring-red-200"
          }`}
        >
          {notice.text}
        </p>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={busy}
          className="rounded-xl bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {busy ? "Saving…" : "Save & publish"}
        </button>
        <button
          type="button"
          onClick={handleClear}
          disabled={busy || !hasOverride}
          className="rounded-xl border border-line bg-white px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:opacity-50"
        >
          Clear override
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-ink">{label}</label>
      {children}
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
}
