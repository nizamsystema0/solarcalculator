# Session Log

## Session 1
- Discussed and locked blueprint decisions: simplified tiered electricity rate (not flat), researched PH solar cost/kW (~₱55k/kW default) and production factor (~3.8 kWh/kWp/day), appliance-load-based recommendation logic to maximize savings, comprehensive appliance preset list
- Built full project scaffold + calculation engine (Phase 1)

## Session 2
- Switched workflow: local build via VS Code, Claude provides commands + file contents phase-by-phase, user tests/commits/pushes each phase
- Created GitHub org "nizamsystema0" instead of personal account, so the repo/hosting shows under Nizam Systema branding
- Created private repo `solarcalculator` under the org
- Resolved push auth issue (org repo needed a personal access token scoped to this project, since default cached credentials weren't tied to the org account)
- Phase 1 committed and pushed successfully

## Session 3
- Designed visual identity: researched Nizam Systema's existing site (homewebpage-six.vercel.app) for brand voice; landed on green/gold/earth eco palette distinct from the company's purple main-site branding
- Explicitly addressed and resolved a positioning concern: calculator must not read as "Nizam Systema is a solar provider" — solved via header/footer attribution framing and disclaimer language
- Built and pasted full Phase 2 UI (all components + updated page.tsx + contact page)
- Iterated on visual fixes: bigger sun icon, logo integration and sizing (180x40, logo1.png), home-link fix on header, background color changes (flat off-white → sage green tint), diagnosed and fixed a Tailwind config caching issue (needed clean .next restart)
- Committed and pushed Phase 2

## Session 4
- Ran content/copy review pass, iterated on hero headline, ROI presentation, methodology transparency note, payback grammar
- Systematically edge-case tested the calculator (11 scenarios) — all passed
- Built the two blueprint completeness gaps flagged during testing: consumption-exceeds-max-system warning, appliance-vs-bill mismatch warning
- Committed and pushed

## Session 5
- Deployed to Vercel — resolved GitHub org access / multi-account complications by creating a separate Vercel account rather than fighting the permissions flow
- Site is now live

## Session 6
- Reviewed external SEO/product recommendations doc, triaged into locked/deferred items
- Built: meta/SEO tags, sitemap, robots.txt, structured data, sharing buttons, analytics + event tracking, header icon/title rework with image-fallback pattern
- Iterated extensively on background image placement — diagnosed and fixed a real structural bug (background was scoped to the narrow content column instead of full page width), then tuned single-image no-repeat/cover approach after tiling attempt looked too busy
- User regenerating background asset at 1920x1080 with transparency (hero-bg.png), original preserved as hero-bg2.png
- Stopping point for this session