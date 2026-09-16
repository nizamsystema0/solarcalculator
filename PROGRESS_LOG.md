# Progress Log

## Phase 1 — Project scaffold + calculation engine
- Next.js 14 (App Router) + TypeScript + Tailwind project scaffolded
- Design tokens set (colors, fonts: Space Grotesk + IBM Plex Sans)
- lib/types.ts — shared TypeScript types
- lib/solarConfig.ts — tiered electricity rate table, production factor, system cost presets (3-12kW)
- lib/calculations.ts — consumption estimation, tiered billing, savings/ROI, system recommendation logic
- lib/applianceDefaults.ts — 27 common PH household appliance presets with typical wattages
- Placeholder homepage confirming scaffold renders correctly
- Not yet wired to UI — calculation engine is standalone, ready for Phase 2