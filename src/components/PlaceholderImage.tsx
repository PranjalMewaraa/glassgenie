import { CarGlassIcon } from "@/components/icons";

/**
 * Styled placeholder standing in for a real photo. Holds a fixed aspect ratio
 * (no layout shift) and carries the descriptive alt text the real image needs.
 *
 * ASSET SWAP: replace each usage with `next/image`, e.g.
 *   <Image src="/photos/<name>.jpg" alt={label} fill className="object-cover" sizes="..." />
 * Drop the real photo in /public/photos and keep the same `label` as alt text.
 * The README lists every photo slot and its recommended subject.
 */
export function PlaceholderImage({
  label,
  ratio = "4/3",
  rounded = "rounded-2xl",
  className = "",
  tone = "light",
}: {
  /** Descriptive alt / subject of the intended photo. */
  label: string;
  ratio?: string;
  rounded?: string;
  className?: string;
  tone?: "light" | "dark";
}) {
  const toneClasses =
    tone === "dark"
      ? "bg-navy-800 text-white/30 ring-white/10"
      : "bg-surface text-muted/50 ring-line";
  return (
    <div
      role="img"
      aria-label={`Placeholder image: ${label}`}
      style={{ aspectRatio: ratio }}
      className={`flex w-full flex-col items-center justify-center gap-2 ring-1 ${rounded} ${toneClasses} ${className}`}
    >
      <CarGlassIcon className="h-10 w-10" />
      <span className="px-4 text-center text-xs font-medium">{label}</span>
    </div>
  );
}
