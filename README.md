# TOPMANIDMB Training Lab

Public training prototype for an interactive AI training lab and mini-game for police investigation learning.

Live: https://lab.topmanidmb.studio

**Mock data only** — no real cases, names, IDs, or production connections.

## Safety rules

- Fictional scenarios only (`LAB-2026-00N`)
- No `.env`, secrets, tokens, or credentials
- No imports from TOPMANIDMB production projects or case databases
- Progress stored in browser `localStorage` only
- Public training deployment at `lab.topmanidmb.studio` (mock data only)

## Tech stack

- Next.js 14 (App Router, static export)
- TypeScript
- Tailwind CSS
- Thai fonts: Sarabun + IBM Plex Sans Thai

## Quick start

```bash
cd /Users/topmanidmb/projects/topmanidmb-training-lab
npm install
npm run dev      # http://localhost:3000
npm run build    # static site → out/
npm run serve    # preview static build
npm run lint
```

## Routes

| Path | Purpose |
|------|---------|
| `/` | Lab hub — scenario picker |
| `/scenarios/[slug]/` | Briefing |
| `/play/[slug]/` | 4-phase game session |
| `/debrief/[slug]/` | Score + feedback |
| `/progress/` | Local progress dashboard |
| `/3d-evidence-room/` | Interactive mock evidence room |
| `/about/` | Policies + deployment note |
| `/report/` | Sanitized lab reports by date |
| `/report/25690830/fleet-llm/` | Fleet LLM fitness report (public-safe) |

## Scenarios (mock)

1. `lab-2026-001` — Missing file in mock evidence room (beginner)
2. `lab-2026-002` — Simulated transfers at Demo Logistics Co. (intermediate)
3. `lab-2026-003` — Missing shipment at Central Mock Warehouse (advanced)

## Repository

Intended GitHub repo: `topmanidmb-training-lab` (standalone).

```bash
git remote add origin git@github.com:<org>/topmanidmb-training-lab.git
git push -u origin main
```
