import Link from "next/link";
import { PhoneIcon, ArrowRightIcon } from "@/components/icons";
import { business, tel } from "@/content/business";

/**
 * Sticky bottom click-to-call bar, shown only on small screens.
 * Provides a persistent conversion path on mobile.
 */
export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-navy-900 lg:hidden">
      <div className="grid grid-cols-2">
        <a
          href={tel}
          className="flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-white"
        >
          <PhoneIcon className="h-4 w-4" />
          {business.phoneDisplay}
        </a>
        <Link
          href="/contact#quote"
          className="flex items-center justify-center gap-2 bg-accent py-3.5 text-sm font-semibold text-white"
        >
          Get a Quote
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
