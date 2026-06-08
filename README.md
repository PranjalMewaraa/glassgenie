# Glass Genie — Mobile Auto Glass (DFW)

Marketing + lead-generation website for **Glass Genie**, a mobile auto glass repair and
replacement company serving the Dallas–Fort Worth metroplex. Built for local SEO ("auto glass",
"windshield replacement near me") and conversion (quote requests + click-to-call).

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4.

> ⚠️ This repo uses **Next.js 16** and **Tailwind v4**, which differ from older conventions.
> See [Deviations](#deviations-from-the-brief) before assuming anything from older docs.

---

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build (also the typecheck/SSG gate)
npm run start    # serve the production build
npm run lint     # eslint
```

### Environment variables

Copy these into `.env` (gitignored). Only `ADMIN_PASSWORD` is required to use the SEO admin;
without `DATABASE_URL` the admin still works locally against a JSON file.

| Variable | Required | Purpose |
| --- | --- | --- |
| `ADMIN_PASSWORD` | for `/admin` | Password gating the SEO admin panel. |
| `AUTH_SECRET` | optional | Signs the admin session cookie. Falls back to `ADMIN_PASSWORD` if unset; set it so rotating the password doesn't have to invalidate sessions. |
| `DATABASE_URL` | for production | Postgres connection string. When set, SEO overrides persist in Postgres (table auto-created). When unset, they're written to `.data/seo-overrides.json` (dev only). |

---

## Where the content lives

All copy is **decoupled from components** and lives in typed data files under `src/content/`.
Components receive typed props and never hardcode marketing copy. This keeps the site editable
and prevents thin/duplicate location pages. (SEO fields are additionally editable at runtime via
the [admin panel](#seo-admin-panel-admin); body-copy editing still happens in `src/content/`.)

| File | What it holds |
| --- | --- |
| `src/content/business.ts` | Single source of truth for locked facts: name, phone, email, hours, the 8 service cities, copyright, social links. **Change a fact once here.** |
| `src/content/types.ts` | TypeScript interfaces for every content shape (`Service`, `Location`, `FAQ`, etc.). |
| `src/content/services/` | One file per service + an `index.ts` registry. |
| `src/content/locations/` | One file per location + an `index.ts` registry. |
| `src/content/home.ts` | Home-page sections: authority guide, process steps, testimonials, FAQs. |

### Add a new service

1. Create `src/content/services/<slug>.ts` exporting a `Service` (set `complete: true` and author
   unique `sections`, `keyBenefits`, and `faqs` — see `windshield-replacement.ts` as the model).
2. Register it in `src/content/services/index.ts`.

That's it — the route (`/services/<slug>`), sitemap entry, metadata, and JSON-LD are all generated
from the registry. Services left as `complete: false` render a graceful "coming soon" stub.

### Add a new location

1. Create `src/content/locations/<slug>.ts` exporting a `Location` with **uniquely written**
   content — distinct neighborhoods, highways, weather, and FAQs (see `dallas.ts`).
   **Do not clone Dallas and swap the city name** — near-duplicate local pages get SEO-penalized.
2. Register it in `src/content/locations/index.ts`.

---

## Project structure

```
src/
  app/                    # routes (App Router)
    page.tsx              # Home
    services/[slug]/      # service detail template
    locations/[slug]/     # location detail template
    about, contact,
    insurance, privacy,
    terms/                # standalone pages
    api/quote, api/contact  # stubbed form handlers (see below)
    admin/                # SEO admin panel (password-gated) + /admin/login
    api/admin/            # login, logout, and SEO override CRUD routes
    sitemap.ts, robots.ts # generated from the content registries
    opengraph-image.tsx, icon.tsx  # branded OG image + favicon
  components/             # UI, sections, cards, forms, SEO/JsonLd
    ManagedHeading.tsx    # H1 whose text can be overridden from /admin
  content/                # all copy + typed data (see above)
  lib/
    seo.ts                # buildMetadata() + resolveMetadata() (merges overrides)
    seo-store.ts          # override storage (Postgres or local JSON file)
    auth.ts               # admin password check + signed session cookie
    site-routes.ts        # route list for the admin page picker
```

---

## Forms

The quote and contact forms post to stubbed Route Handlers:

- `src/app/api/quote/route.ts`
- `src/app/api/contact/route.ts`

They validate the payload and return `{ ok: true }`. Each contains a
`// TODO: connect to email/CRM` marker — wire these to your email provider / CRM. The frontend
never blocks on a backend.

---

## Swap points (placeholders to replace before launch)

- **Logo:** `src/components/ui.tsx` (`Logo`) renders `/public/logo.png` with a shield-icon
  fallback. Drop the real logo PNG at `public/logo.png`.
- **Images:** `src/components/PlaceholderImage.tsx` renders styled aspect-ratio placeholders with
  descriptive alt text. Replace usages with `next/image` + real photography.
- **OG image / favicon:** `src/app/opengraph-image.tsx` and `src/app/icon.tsx` generate branded
  defaults via `next/og`. Swap for final brand assets when ready.
- **Analytics:** no tracking scripts are included. Add GA4/GTM in `src/app/layout.tsx`
  (`<head>`/`<body>`) when you have the IDs.

---

## SEO

- Per-page metadata via `resolveMetadata()` (`src/lib/seo.ts`) — starts from the coded
  defaults (canonical URL, Open Graph, Twitter) and merges any admin override on top.
- Structured data in `src/components/seo/JsonLd.tsx`: sitewide `AutoRepair` LocalBusiness,
  plus `Service`, `FAQPage`, and `BreadcrumbList` on the relevant pages.
- `sitemap.ts` and `robots.ts` are generated automatically from the content registries.

### SEO admin panel (`/admin`)

A minimal CMS for SEO. Sign in at **`/admin/login`** with `ADMIN_PASSWORD`, then pick any
page (or type a custom path) and override:

- **Meta title** — becomes the exact `<title>` (bypasses the `| Glass Genie` template).
- **Meta description**, **canonical path**, **OG title/description/image**.
- **H1 heading** — applies wherever the page renders `<ManagedHeading>`.
- **noindex** — emits `robots: noindex, nofollow` for the page.

How it stays fast: public pages are **static**. They read overrides at build /
revalidation time only, and saving an override calls `revalidatePath()` so the edit goes
live without a redeploy. A missing/unreachable store degrades gracefully to the coded
defaults — it never breaks a page.

Overrides persist in **Postgres** when `DATABASE_URL` is set (table `seo_overrides`,
auto-created), otherwise in a local **`.data/seo-overrides.json`** file for zero-setup dev.

To give a page an admin-editable H1, render `<ManagedHeading path="/the/path" fallback={…} />`
in place of a raw `<h1>` (the `fallback` is the coded heading shown when no override exists).

---

## Deviations from the brief

- **Tailwind config:** The brief referenced a `tailwind.config.ts`. Tailwind **v4** is CSS-first —
  design tokens (colors, fonts) are declared in an `@theme` block in `src/app/globals.css`, and
  there is no JS config file. This is the correct v4 approach.

---

## Deployment

Standard Next.js. Deploy to any Node host or to Vercel:

1. Set the production domain so canonical URLs and the sitemap resolve correctly
   (`baseUrl` in `src/content/business.ts` is `https://glassgenie.co`).
2. Set environment variables on the host: a strong `ADMIN_PASSWORD`, an `AUTH_SECRET`, and a
   `DATABASE_URL` (Postgres) so SEO overrides persist across deploys. See
   [Environment variables](#environment-variables).
3. `npm run build` → `npm run start`, or push to Vercel.
4. Submit `https://glassgenie.co/sitemap.xml` in Google Search Console.
