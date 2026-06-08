import type { Service } from "@/content/types";
import { windshieldReplacement } from "./windshield-replacement";
import { windshieldRepair } from "./windshield-repair";
import { adasCalibration } from "./adas-calibration";
import { autoDoorGlass } from "./auto-door-glass";
import { windowRegulators } from "./window-regulators";
import { backWindowGlass } from "./back-window-glass";
import { quarterPanelGlass } from "./quarter-panel-glass";
import { ventGlassReplacement } from "./vent-glass-replacement";
import { sunroofGlass } from "./sunroof-glass";

/**
 * The 9 services. Slug → display name is the canonical mapping.
 * Each service lives in its own file with fully authored, unique content.
 *
 * To add a service: create a new file exporting a `Service`, import it here,
 * and add it to `services`. Everything else (nav, grid, sitemap, routes,
 * schema) updates automatically.
 */

export const services: Service[] = [
  windshieldReplacement,
  windshieldRepair,
  adasCalibration,
  autoDoorGlass,
  windowRegulators,
  backWindowGlass,
  quarterPanelGlass,
  ventGlassReplacement,
  sunroofGlass,
];

export const serviceMap: Record<string, Service> = Object.fromEntries(
  services.map((s) => [s.slug, s])
);

export function getService(slug: string): Service | undefined {
  return serviceMap[slug];
}
