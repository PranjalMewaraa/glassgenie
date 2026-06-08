import Link from "next/link";
import Image from "next/image";
import type { ComponentProps, ReactNode } from "react";
import { business } from "@/content/business";
import { StarIcon } from "@/components/icons";

/** Max-width content container. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

/**
 * Brand logo. The badge artwork at /public/logo.webp already includes the
 * "Glass Genie / Auto Glass Repair" wordmark, so it renders on its own — no
 * separate text lockup. Transparent PNG/WebP, so it sits on light or dark
 * backgrounds. Pass `className` to size it per placement (header vs. footer).
 */
export function Logo({
  className = "h-14 w-auto",
}: {
  className?: string;
}) {
  return (
    <Link
      href="/"
      className="inline-flex items-center"
      aria-label={`${business.name} — ${business.tagline}`}
    >
      <Image
        src="/logo.webp"
        alt={`${business.name} — ${business.tagline}`}
        width={300}
        height={300}
        priority
        className={className}
      />
    </Link>
  );
}

type ButtonVariant = "primary" | "secondary" | "outline" | "ghostLight";

const buttonStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-navy-900 text-white hover:bg-navy-700 border border-navy-900",
  secondary:
    "bg-accent text-white hover:bg-accent-600 border border-accent",
  outline:
    "bg-white text-ink hover:bg-surface border border-line",
  ghostLight:
    "bg-white/10 text-white hover:bg-white/15 border border-white/15",
};

const sizeStyles = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-base",
};

type ButtonProps = {
  variant?: ButtonVariant;
  size?: keyof typeof sizeStyles;
  className?: string;
} & ComponentProps<typeof Link>;

/** Link styled as a button. */
export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <Link
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors ${buttonStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}

/** A row of filled stars for a given rating (out of 5). */
export function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <div
      className={`flex items-center gap-0.5 text-amber-400 ${className}`}
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon
          key={i}
          className={`h-4 w-4 ${i < rating ? "" : "text-line"}`}
        />
      ))}
    </div>
  );
}

/** Centered section eyebrow + heading + optional subcopy. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  invert = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  invert?: boolean;
}) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`${alignment} max-w-2xl`}>
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-accent">
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-3xl font-extrabold tracking-tight sm:text-4xl ${
          invert ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base leading-7 ${invert ? "text-white/70" : "text-muted"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
