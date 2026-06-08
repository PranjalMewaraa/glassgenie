import type { Location } from "@/content/types";
import { dallas } from "./dallas";
import { arlington } from "./arlington";
import { fortWorth } from "./fort-worth";
import { garland } from "./garland";
import { plano } from "./plano";
import { frisco } from "./frisco";
import { mckinney } from "./mckinney";
import { mansfield } from "./mansfield";

/**
 * The 8 service-area cities. Each city has fully authored, original local
 * content — distinct neighborhoods, highways, weather notes, and FAQs.
 *
 * CRITICAL: every location page must stay uniquely written. Do NOT clone an
 * existing city with the name swapped; thin/duplicate local pages get penalized.
 *
 * To add a city: create a file exporting a `Location`, import it here, and add
 * it to `locations`. Nav, grid, sitemap, routes, and schema update automatically.
 */

export const locations: Location[] = [
  dallas,
  arlington,
  fortWorth,
  garland,
  plano,
  frisco,
  mckinney,
  mansfield,
];

export const locationMap: Record<string, Location> = Object.fromEntries(
  locations.map((l) => [l.slug, l])
);

export function getLocation(slug: string): Location | undefined {
  return locationMap[slug];
}
