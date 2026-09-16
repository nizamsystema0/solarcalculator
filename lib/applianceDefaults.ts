export interface AppliancePreset {
  name: string;
  watts: number;
  defaultHoursPerDay: number;
}

/**
 * Typical wattage ratings for common Philippine household appliances.
 * These are general reference figures (not brand-specific) meant to give
 * users a reasonable starting point they can adjust to match their own
 * appliances' nameplate ratings.
 */
export const APPLIANCE_PRESETS: AppliancePreset[] = [
  { name: "Aircon - window type", watts: 1000, defaultHoursPerDay: 6 },
  { name: "Aircon - split type, 1.0 HP", watts: 750, defaultHoursPerDay: 6 },
  { name: "Aircon - split type, 1.5 HP", watts: 1100, defaultHoursPerDay: 6 },
  { name: "Aircon - split type, 2.0 HP", watts: 1500, defaultHoursPerDay: 6 },
  { name: "Electric fan (stand/desk)", watts: 55, defaultHoursPerDay: 8 },
  { name: "Refrigerator - single door", watts: 90, defaultHoursPerDay: 24 },
  { name: "Refrigerator - 2-door / no-frost", watts: 150, defaultHoursPerDay: 24 },
  { name: "Chest freezer", watts: 200, defaultHoursPerDay: 24 },
  { name: "Washing machine", watts: 500, defaultHoursPerDay: 1 },
  { name: "Electric iron", watts: 1000, defaultHoursPerDay: 0.5 },
  { name: "Rice cooker", watts: 700, defaultHoursPerDay: 1 },
  { name: "Microwave oven", watts: 1000, defaultHoursPerDay: 0.5 },
  { name: "Electric kettle", watts: 1200, defaultHoursPerDay: 0.3 },
  { name: "Water dispenser (hot/cold)", watts: 500, defaultHoursPerDay: 24 },
  { name: "Water pump (1/2 HP)", watts: 370, defaultHoursPerDay: 1 },
  { name: "Instant shower heater", watts: 3500, defaultHoursPerDay: 0.5 },
  { name: "LED TV (32-55\")", watts: 80, defaultHoursPerDay: 5 },
  { name: "Desktop computer", watts: 200, defaultHoursPerDay: 4 },
  { name: "Laptop", watts: 65, defaultHoursPerDay: 6 },
  { name: "WiFi router / modem", watts: 10, defaultHoursPerDay: 24 },
  { name: "LED bulb", watts: 10, defaultHoursPerDay: 6 },
  { name: "CFL bulb", watts: 15, defaultHoursPerDay: 6 },
  { name: "Incandescent bulb", watts: 60, defaultHoursPerDay: 6 },
  { name: "Hair dryer", watts: 1200, defaultHoursPerDay: 0.2 },
  { name: "Induction cooktop", watts: 1800, defaultHoursPerDay: 0.5 },
  { name: "Gaming console", watts: 150, defaultHoursPerDay: 2 },
  { name: "Electric griddle / grill", watts: 1500, defaultHoursPerDay: 0.5 },
];