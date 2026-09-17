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

## Content/copy pass + edge case testing
- Copy pass: reworded headline, added "How we calculate this" methodology note before Step 1, reworked ROI section to show the payback computation explicitly in a highlighted box, fixed payback pluralization (mo/mos, yr/yrs)
- Built two blueprint gaps identified during edge case testing: (1) shortfall warning when even the 12kW preset doesn't cover estimated consumption, (2) mismatch warning when appliance-based and bill-based consumption estimates diverge significantly (>25%)
- Full edge case pass completed (11 tests): empty input, tiny bill, high bill, decimal input, zero qty, negative input (correctly blocked), removing all appliances, custom appliance at defaults, kWh-only input, quick narrow-screen glance — all passed

## Live deployment
- Deployed to Vercel under a separate account (tied to the GitHub identity with nizamsystema0 org access, due to Vercel's 1:1 GitHub-login restriction)
- Calculator is live at a public URL
- Deferred DevTools-based responsive testing in favor of testing directly on the live site

## SEO pass + UX refinements
- Technical SEO: page title, meta description, sitemap.xml, robots.txt, WebApplication structured data (all live)
- Sharing: Copy Link / Facebook / X buttons added after results, with Vercel Analytics event tracking
- Vercel Analytics enabled with custom events (calculator_started, calculator_completed, share_clicked)
- Header reworked: two-line stacked title ("Solar Savings Calculator" / "Philippines"), icon enlarged to 60x60 with image-fallback pattern (public/images/icon.png, falls back to inline SVG sun if missing), logo placeholder pattern established (public/images/logo.png)
- Full-width background image layer added behind main content (outside the narrow content column), single image, no-repeat, cover, 90% opacity
- Skipped per discussion: FAQ, custom domain, OG image creation (prompt documented), accessibility pass
- Portfolio/company-site implementation guide delivered as a separate downloadable doc