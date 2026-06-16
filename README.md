# TOPMANIDMB Training Lab

Local prototype for an interactive AI training lab and mini-game for police investigation learning.

**Mock data only** — no real cases, names, IDs, or production connections.

## Safety rules

- Fictional scenarios only (`LAB-2026-00N`)
- No `.env`, secrets, tokens, or credentials
- No imports from TOPMANIDMB production projects or case databases
- Progress stored in browser `localStorage` only
- Future domain reserved: `lab.topmanidmb.studio` — **not deployed in this prototype**

## Tech stack

- Next.js 14 (App Router, static export)
- TypeScript
- Tailwind CSS
- Thai fonts: Sarabun + IBM Plex Sans Thai

## Quick start

```bash
cd /Users/mac/topmanidmb-training-lab
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
| `/about/` | Policies + future domain note |

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