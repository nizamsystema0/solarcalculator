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

## Phase 2 — Calculator UI
- Header, Footer, Disclaimer, BillInput, ApplianceCalculator, ResultsPanel components built
- Full single-page calculator wired up: bill/appliance input → consumption estimate → system recommendation → savings/ROI → comparison table
- /contact secondary page added, framed as "want something built for your business?"
- Brand integration: Nizam Systema logo (logo1.png) in header linking to /contact, "Developed and powered by" footer credit, disclaimer clarifying Nizam Systema is not a solar provider/installer
- Design palette locked in: sage green page background (#EAF2E8), green/gold/earth accent system, header pinned to white
- Fixed: logo/calculator title now links back to homepage from any page
- Not yet done: Vercel deployment, real content review, mobile responsiveness check