import { RateBracket, SystemPreset } from "./types";

/**
 * ─────────────────────────────────────────────────────────────────────────
 * SOLAR SAVINGS CALCULATOR — CONFIGURATION
 * ─────────────────────────────────────────────────────────────────────────
 * This is the ONLY file that should need updating as electricity rates and
 * solar market prices change over time. Calculation logic lives in
 * calculations.ts and should not need to change when these numbers change.
 *
 * All figures are rough, rounded, "market average" estimates for the
 * Philippines — not a quotation. Last reviewed: September 2026.
 * ─────────────────────────────────────────────────────────────────────────
 */

/**
 * Blended (all-in) electricity rate per kWh, by monthly consumption bracket.
 *
 * Real Philippine utility billing (e.g. Meralco) is NOT a flat rate — it is
 * a stack of generation, transmission, system loss, distribution and tax
 * charges, several of which are themselves tiered by total consumption.
 * The distribution charge in particular is tiered on *whole* consumption:
 * once your usage crosses into a higher bracket, the higher rate applies to
 * ALL of your kWh that month, not just the amount over the threshold.
 *
 * Rather than reproduce the full ~24-line-item bill breakdown (system loss,
 * ancillary charges, VAT-per-component, etc.), this calculator uses a
 * simplified blended rate per bracket, calibrated against real September
 * 2026 Meralco residential billing data:
 *   100 kWh ≈ ₱14.86/kWh · 200 kWh ≈ ₱14.74/kWh · 300 kWh ≈ ₱15.05/kWh
 *   400 kWh ≈ ₱15.36/kWh · 500 kWh ≈ ₱15.92/kWh
 *
 * Brackets are evaluated on TOTAL monthly consumption (the same "whole
 * consumption re-rates everything" behavior as the real tariff).
 */
export const RATE_BRACKETS: RateBracket[] = [
  { maxKwh: 200, ratePhpPerKwh: 14.75 },
  { maxKwh: 300, ratePhpPerKwh: 15.05 },
  { maxKwh: 400, ratePhpPerKwh: 15.35 },
  { maxKwh: 600, ratePhpPerKwh: 15.9 },
  { maxKwh: null, ratePhpPerKwh: 16.5 },
];

/**
 * Average usable solar production, in kWh per day, per 1 kWp of installed
 * system size.
 *
 * Raw Philippine solar irradiance implies ~4.5-5.5 "peak sun hours" a day,
 * but real measured output after inverter losses, wiring, soiling and
 * imperfect orientation runs meaningfully lower — commonly cited around
 * 3.6-4.0 effective hours in field data. This calculator uses a single
 * simplified factor rather than modeling losses individually.
 */
export const DAILY_PRODUCTION_KWH_PER_KW = 3.8;

export const DAYS_PER_MONTH = 30;

/**
 * Estimated fully-installed cost per kWp (panels, inverter, mounting,
 * wiring, permit assistance), grid-tied, no battery. Philippine market
 * quotes in 2026 commonly range ₱45,000-₱75,000/kW; this uses the
 * approximate midpoint.
 */
export const COST_PHP_PER_KW = 55000;

export const SYSTEM_SIZES_KW = [3, 4, 5, 6, 8, 10, 12] as const;

export const SYSTEM_PRESETS: SystemPreset[] = SYSTEM_SIZES_KW.map((sizeKw) => ({
  sizeKw,
  costPhp: sizeKw * COST_PHP_PER_KW,
}));