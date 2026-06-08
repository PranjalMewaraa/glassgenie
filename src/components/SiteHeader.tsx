"use client";

import { useState } from "react";
import Link from "next/link";
import { Container, Logo, ButtonLink } from "@/components/ui";
import {
  PhoneIcon,
  ChevronDownIcon,
  MenuIcon,
  CloseIcon,
} from "@/components/icons";
import { business, tel } from "@/content/business";
import { services } from "@/content/services";
import { locations } from "@/content/locations";

const servicesNav = services.map((s) => ({ href: `/services/${s.slug}`, label: s.name }));
const locationsNav = locations.map((l) => ({ href: `/locations/${l.slug}`, label: l.city }));

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <Container>
        <div className="flex h-[68px] items-center justify-between gap-4">
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about">About</NavLink>
            <Dropdown label="Our Services" items={servicesNav} viewAllHref="/services" />
            <Dropdown label="Location" items={locationsNav} viewAllHref="/locations" />
            <NavLink href="/insurance">Insurance</NavLink>
            <NavLink href="/contact">Contact Us</NavLink>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={tel}
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-accent"
            >
              <PhoneIcon className="h-4 w-4" />
              {business.phoneDisplay}
            </a>
            <ButtonLink href="/contact#quote">Get a Quote</ButtonLink>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-lg border border-line text-ink lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      {mobileOpen && (
        <div id="mobile-menu" className="border-t border-line bg-white lg:hidden">
          <Container className="py-4">
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              <MobileLink href="/" onClick={() => setMobileOpen(false)}>Home</MobileLink>
              <MobileLink href="/about" onClick={() => setMobileOpen(false)}>About</MobileLink>
              <MobileGroup label="Our Services" items={servicesNav} viewAllHref="/services" onNavigate={() => setMobileOpen(false)} />
              <MobileGroup label="Location" items={locationsNav} viewAllHref="/locations" onNavigate={() => setMobileOpen(false)} />
              <MobileLink href="/insurance" onClick={() => setMobileOpen(false)}>Insurance</MobileLink>
              <MobileLink href="/contact" onClick={() => setMobileOpen(false)}>Contact Us</MobileLink>
            </nav>
            <div className="mt-4 flex flex-col gap-2">
              <ButtonLink href="/contact#quote" size="lg" className="w-full" onClick={() => setMobileOpen(false)}>
                Get a Quote
              </ButtonLink>
              <ButtonLink href={tel} variant="outline" size="lg" className="w-full">
                <PhoneIcon className="h-4 w-4" /> {business.phoneDisplay}
              </ButtonLink>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-lg px-3 py-2 text-sm font-medium text-ink/80 transition-colors hover:bg-surface hover:text-ink"
    >
      {children}
    </Link>
  );
}

function Dropdown({
  label,
  items,
  viewAllHref,
}: {
  label: string;
  items: { href: string; label: string }[];
  viewAllHref: string;
}) {
  // CSS-driven hover/focus dropdown via group; keyboard-accessible through links.
  return (
    <div className="group relative">
      <button
        type="button"
        className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-ink/80 transition-colors hover:bg-surface hover:text-ink group-focus-within:bg-surface"
        aria-haspopup="true"
      >
        {label}
        <ChevronDownIcon className="h-3.5 w-3.5" />
      </button>
      <div className="invisible absolute left-0 top-full z-50 w-64 pt-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="rounded-xl border border-line bg-white p-2 shadow-lg">
          <Link
            href={viewAllHref}
            className="block rounded-lg px-3 py-2 text-sm font-semibold text-accent hover:bg-surface"
          >
            View all {label.toLowerCase()}
          </Link>
          <div className="my-1 h-px bg-line" />
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-lg px-3 py-2 text-sm text-ink/80 hover:bg-surface hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="rounded-lg px-3 py-2.5 text-base font-medium text-ink hover:bg-surface"
    >
      {children}
    </Link>
  );
}

function MobileGroup({
  label,
  items,
  viewAllHref,
  onNavigate,
}: {
  label: string;
  items: { href: string; label: string }[];
  viewAllHref: string;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-base font-medium text-ink hover:bg-surface"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {label}
        <ChevronDownIcon className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="ml-3 flex flex-col border-l border-line pl-3">
          <Link href={viewAllHref} onClick={onNavigate} className="rounded-lg px-3 py-2 text-sm font-semibold text-accent hover:bg-surface">
            View all {label.toLowerCase()}
          </Link>
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className="rounded-lg px-3 py-2 text-sm text-ink/75 hover:bg-surface hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
