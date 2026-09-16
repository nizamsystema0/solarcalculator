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