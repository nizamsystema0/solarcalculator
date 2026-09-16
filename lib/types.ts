export interface Appliance {
  id: string;
  name: string;
  watts: number;
  qty: number;
  hoursPerDay: number;
  /** true for items the user added themselves rather than picked from presets */
  custom?: boolean;
}

export interface RateBracket {
  /** upper bound of this bracket in kWh/month; null = no upper bound */
  maxKwh: number | null;
  /** blended, all-in rate in PHP per kWh applied to every kWh once total consumption falls in this bracket */
  ratePhpPerKwh: number;
}

export interface SystemPreset {
  sizeKw: number;
  costPhp: number;
}

export interface SystemResult {
  sizeKw: number;
  costPhp: number;
  monthlyProductionKwh: number;
  offsetKwh: number;
  remainingGridKwh: number;
  newMonthlyBillPhp: number;
  monthlySavingsPhp: number;
  annualSavingsPhp: number;
  paybackMonths: number | null;
}

export interface CalculatorState {
  monthlyBillPhp: number | null;
  monthlyKwhOverride: number | null;
  appliances: Appliance[];
}