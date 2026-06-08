import Link from "next/link";
import { Container, Logo } from "@/components/ui";
import {
  PhoneIcon,
  MailIcon,
  ClockIcon,
  FacebookIcon,
  XIcon,
  InstagramIcon,
  ShieldIcon,
  CheckIcon,
} from "@/components/icons";
import { business, tel } from "@/content/business";

const quickLinks = [
  { href: "/about", label: "About Us" },
  { href: "/insurance", label: "Insurance Partners" },
  { href: "/contact", label: "Contact Support" },
  { href: "/contact#quote", label: "Get an Instant Quote" },
  { href: "/privacy", label: "Privacy Policy" },
];

const popularServices = [
  { href: "/services/windshield-replacement", label: "Windshield Replacement" },
  { href: "/services/windshield-repair", label: "Mobile Windshield Repair" },
  { href: "/services/adas-calibration", label: "ADAS Camera Calibration" },
  { href: "/services/auto-door-glass", label: "Door Glass Replacement" },
  { href: "/services/window-regulators", label: "Window Regulator Repair" },
];

export function SiteFooter() {
  return (
    <footer className="bg-navy-900 text-white/70">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Logo className="h-16 w-auto" />
            <p className="mt-4 max-w-xs text-sm leading-6 text-white/55">
              {business.blurb}
            </p>
            <div className="mt-5 flex items-center gap-3">
              <SocialLink href={business.social.facebook} label="Facebook">
                <FacebookIcon className="h-4 w-4" />
              </SocialLink>
              <SocialLink href={business.social.twitter} label="X (Twitter)">
                <XIcon className="h-4 w-4" />
              </SocialLink>
              <SocialLink href={business.social.instagram} label="Instagram">
                <InstagramIcon className="h-4 w-4" />
              </SocialLink>
            </div>
          </div>

          {/* Quick links */}
          <FooterCol title="Quick Links">
            {quickLinks.map((l) => (
              <FooterLink key={l.href} href={l.href}>{l.label}</FooterLink>
            ))}
          </FooterCol>

          {/* Popular services */}
          <FooterCol title="Popular Services">
            {popularServices.map((l) => (
              <FooterLink key={l.href} href={l.href}>{l.label}</FooterLink>
            ))}
          </FooterCol>

          {/* Contact & hours */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-white/40">
              Contact &amp; Hours
            </h3>
            <ul className="mt-4 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-white/40" />
                <span>
                  <span className="block text-xs uppercase tracking-wide text-white/40">Call Us 24/7</span>
                  <a href={tel} className="font-semibold text-white hover:text-accent">{business.phoneDisplay}</a>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-white/40" />
                <span>
                  <span className="block text-xs uppercase tracking-wide text-white/40">Email Support</span>
                  <a href={`mailto:${business.email}`} className="font-semibold text-white hover:text-accent">{business.email}</a>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-white/40" />
                <span>
                  <span className="block text-xs uppercase tracking-wide text-white/40">Business Hours</span>
                  <span className="font-semibold text-white">{business.hours.label}</span>
                  <span className="block text-white/50">{business.hours.sunday}</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-5 pb-20 text-xs text-white/45 sm:flex-row lg:pb-5">
          <p>{business.copyright}</p>
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-1.5"><ShieldIcon className="h-3.5 w-3.5" /> Fully Insured</span>
            <span className="inline-flex items-center gap-1.5"><CheckIcon className="h-3.5 w-3.5" /> AGSC Certified</span>
          </div>
        </Container>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-white/40">{title}</h3>
      <ul className="mt-4 space-y-2.5 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-white/65 hover:text-white">{children}</Link>
    </li>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
    >
      {children}
    </a>
  );
}
