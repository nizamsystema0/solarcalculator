import { Appliance, SystemPreset, SystemResult } from "./types";
import {
  RATE_BRACKETS,
  DAILY_PRODUCTION_KWH_PER_KW,
  DAYS_PER_MONTH,
  SYSTEM_PRESETS,
} from "./solarConfig";

/**
 * Returns the blended ₱/kWh rate that applies once total monthly
 * consumption reaches `kwh` — mirrors how Philippine utility billing
 * re-rates the whole bill once you cross into a higher bracket.
 */
export function getBlendedRate(kwh: number): number {
  for (const bracket of RATE_BRACKETS) {
    if (bracket.maxKwh === null || kwh <= bracket.maxKwh) {
      return bracket.ratePhpPerKwh;
    }
  }
  return RATE_BRACKETS[RATE_BRACKETS.length - 1].ratePhpPerKwh;
}

/** Estimated total monthly bill for a given monthly consumption in kWh. */
export function calculateMonthlyBill(kwh: number): number {
  if (kwh <= 0) return 0;
  return kwh * getBlendedRate(kwh);
}

/**
 * Reverse-estimates monthly kWh consumption from a monthly bill amount.
 * Used as a fallback when the user hasn't built an appliance list.
 *
 * Because the rate is a step function of consumption, we find the bracket
 * whose rate, applied to the bill, yields a kWh figure that actually falls
 * within that bracket's range.
 */
export function estimateKwhFromBill(billPhp: number): number {
  if (billPhp <= 0) return 0;

  let lowerBound = 0;
  for (const bracket of RATE_BRACKETS) {
    const impliedKwh = billPhp / bracket.ratePhpPerKwh;
    const withinUpper = bracket.maxKwh === null || impliedKwh <= bracket.maxKwh;
    const withinLower = impliedKwh >= lowerBound;
    if (withinUpper && withinLower) {
      return impliedKwh;
    }
    if (bracket.maxKwh !== null) lowerBound = bracket.maxKwh;
  }

  const topRate = RATE_BRACKETS[RATE_BRACKETS.length - 1].ratePhpPerKwh;
  return billPhp / topRate;
}

/** Estimated monthly consumption, in kWh, implied by an appliance list. */
export function calculateApplianceMonthlyKwh(appliances: Appliance[]): number {
  const dailyWh = appliances.reduce(
    (sum, a) => sum + a.qty * a.watts * a.hoursPerDay,
    0
  );
  return (dailyWh / 1000) * DAYS_PER_MONTH;
}

/** Estimated monthly solar production, in kWh, for a given system size. */
export function getMonthlyProductionKwh(sizeKw: number): number {
  return sizeKw * DAILY_PRODUCTION_KWH_PER_KW * DAYS_PER_MONTH;
}

/**
 * Full savings/ROI breakdown for one system size against a given monthly
 * consumption estimate. No net metering / export credit is modeled —
 * production beyond what's consumed is treated as unused, which keeps the
 * estimate conservative and simple.
 */
export function computeSystemResult(
  preset: SystemPreset,
  consumptionKwh: number
): SystemResult {
  const monthlyProductionKwh = getMonthlyProductionKwh(preset.sizeKw);
  const offsetKwh = Math.min(consumptionKwh, monthlyProductionKwh);
  const remainingGridKwh = Math.max(0, consumptionKwh - offsetKwh);

  const originalBillPhp = calculateMonthlyBill(consumptionKwh);
  const newMonthlyBillPhp = calculateMonthlyBill(remainingGridKwh);
  const monthlySavingsPhp = originalBillPhp - newMonthlyBillPhp;
  const annualSavingsPhp = monthlySavingsPhp * 12;
  const paybackMonths =
    monthlySavingsPhp > 0 ? preset.costPhp / monthlySavingsPhp : null;

  return {
    sizeKw: preset.sizeKw,
    costPhp: preset.costPhp,
    monthlyProductionKwh,
    offsetKwh,
    remainingGridKwh,
    newMonthlyBillPhp,
    monthlySavingsPhp,
    annualSavingsPhp,
    paybackMonths,
  };
}

export interface RecommendationResult {
  all: SystemResult[];
  recommendedIndex: number;
  recommended: SystemResult;
  lowerAlternative: SystemResult | null;
  higherAlternative: SystemResult | null;
  coversFully: boolean;
  coveragePercent: number;
}

/**
 * Recommends the smallest system whose monthly production reasonably
 * covers estimated monthly consumption (>= 90%), so the household isn't
 * paying for capacity that mostly goes unused. If no preset reaches that
 * threshold, the largest available preset is recommended instead.
 */
export function recommendSystem(
  consumptionKwh: number,
  presets: SystemPreset[] = SYSTEM_PRESETS
): RecommendationResult {
  const all = presets.map((p) => computeSystemResult(p, consumptionKwh));

  let recommendedIndex = all.findIndex(
    (r) => r.monthlyProductionKwh >= consumptionKwh * 0.9
  );
  const coversFully = recommendedIndex !== -1;
  if (recommendedIndex === -1) recommendedIndex = all.length - 1;

  const recommended = all[recommendedIndex];
  const coveragePercent =
    consumptionKwh > 0
      ? Math.min(100, (recommended.monthlyProductionKwh / consumptionKwh) * 100)
      : 100;

  return {
    all,
    recommendedIndex,
    recommended,
    lowerAlternative: recommendedIndex > 0 ? all[recommendedIndex - 1] : null,
    higherAlternative:
      recommendedIndex < all.length - 1 ? all[recommendedIndex + 1] : null,
    coversFully,
    coveragePercent,
  };
}

export function formatPhp(amount: number): string {
  return `₱${Math.round(amount).toLocaleString("en-PH")}`;
}

export function formatKwh(amount: number): string {
  return `${Math.round(amount).toLocaleString("en-PH")} kWh`;
}

export function formatPayback(months: number | null): string {
  if (months === null || !isFinite(months)) return "N/A";
  const years = Math.floor(months / 12);
  const remMonths = Math.round(months % 12);
  const yrLabel = years === 1 ? "yr" : "yrs";
  const moLabel = remMonths === 1 ? "mo" : "mos";
  if (years === 0) return `${remMonths} ${moLabel}`;
  if (remMonths === 0) return `${years} ${yrLabel}`;
  return `${years} ${yrLabel} ${remMonths} ${moLabel}`;
}