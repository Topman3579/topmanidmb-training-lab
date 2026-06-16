import { lab2026001 } from "@/data/scenarios/lab-2026-001";
import { lab2026002 } from "@/data/scenarios/lab-2026-002";
import { lab2026003 } from "@/data/scenarios/lab-2026-003";
import type { Scenario, ScenarioSummary } from "@/lib/types";

export const scenarios: Scenario[] = [lab2026001, lab2026002, lab2026003];

export const scenarioSummaries: ScenarioSummary[] = scenarios.map((s) => ({
  id: s.id,
  code: s.code,
  title: s.title,
  titleEn: s.titleEn,
  difficulty: s.difficulty,
  estMinutes: s.estMinutes,
  tagline: s.briefing.slice(0, 120) + "…",
  taglineEn: s.briefingEn.slice(0, 120) + "…",
}));

export function getScenarioById(id: string): Scenario | undefined {
  return scenarios.find((s) => s.id === id);
}

export function getAllScenarioIds(): string[] {
  return scenarios.map((s) => s.id);
}