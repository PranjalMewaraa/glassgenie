import type { Metadata } from "next";
import { business } from "@/content/business";
import { getSeoOverride, normalizePath } from "@/lib/seo-store";

interface MetadataArgs {
  /** Full <title> (already keyword-led, ~50–60 chars). The layout appends "| Glass Genie". */
  title: string;
  description: string;
  /** Route path beginning with "/", e.g. "/services/windshield-replacement". */
  path: string;
}

function absoluteUrl(p: string): string {
  return `${business.baseUrl}${p === "/" ? "" : p}`;
}

/**
 * Build per-route metadata with a canonical URL and Open Graph / Twitter tags.
 * This is the coded default; `resolveMetadata` layers CMS overrides on top.
 */
export function buildMetadata({ title, description, path }: MetadataArgs): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: business.name,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/**
 * Coded defaults merged with any per-page override saved in the /admin panel.
 * Pages call this from an async `generateMetadata`. Reads are React-cached and
 * never throw, so a missing/unreachable store simply falls back to defaults.
 */
export async function resolveMetadata(args: MetadataArgs): Promise<Metadata> {
  const base = buildMetadata(args);
  const override = await getSeoOverride(args.path);
  if (!override) return base;

  const title = override.metaTitle ?? args.title;
  const description = override.metaDescription ?? args.description;
  const canonical = absoluteUrl(
    override.canonicalPath ? normalizePath(override.canonicalPath) : args.path
  );
  const ogTitle = override.ogTitle ?? title;
  const ogDescription = override.ogDescription ?? description;
  const images = override.ogImage ? [{ url: override.ogImage }] : undefined;
  const keywords = override.keywords
    ? override.keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean)
    : base.keywords;

  return {
    ...base,
    keywords,
    // `absolute` bypasses the "%s | Glass Genie" template so the admin gets the
    // exact <title> they typed.
    title: override.metaTitle ? { absolute: override.metaTitle } : args.title,
    description,
    alternates: { canonical },
    robots: override.noindex ? { index: false, follow: false } : base.robots,
    openGraph: {
      ...base.openGraph,
      title: ogTitle,
      description: ogDescription,
      url: canonical,
      ...(images ? { images } : {}),
    },
    twitter: {
      ...base.twitter,
      title: ogTitle,
      description: ogDescription,
      ...(override.ogImage ? { images: [override.ogImage] } : {}),
    },
  };
}
