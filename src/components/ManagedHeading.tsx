import type { ReactNode } from "react";
import { getSeoOverride } from "@/lib/seo-store";

/**
 * Renders a page heading whose text can be overridden from the /admin panel.
 * If an `h1` override exists for `path`, its text is used; otherwise the coded
 * `fallback` (which may include styled spans) renders unchanged.
 *
 * Server component — the override read is React-cached and shared with
 * generateMetadata, so it adds no extra database round-trip per render.
 */
export async function ManagedHeading({
  path,
  as = "h1",
  className,
  fallback,
}: {
  path: string;
  as?: "h1" | "h2";
  className?: string;
  fallback: ReactNode;
}) {
  const override = await getSeoOverride(path);
  const Tag = as;
  return <Tag className={className}>{override?.h1 ? override.h1 : fallback}</Tag>;
}
