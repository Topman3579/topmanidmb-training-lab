import { STORAGE_KEY } from "@/lib/constants";
import type { ProgressStore, SessionResult } from "@/lib/types";

const EMPTY: ProgressStore = { sessions: [], badges: [] };

function canUseStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function loadProgress(): ProgressStore {
  if (!canUseStorage()) return EMPTY;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as ProgressStore;
    if (!parsed.sessions || !Array.isArray(parsed.sessions)) return EMPTY;
    return {
      sessions: parsed.sessions,
      badges: Array.isArray(parsed.badges) ? parsed.badges : [],
    };
  } catch {
    return EMPTY;
  }
}

export function saveSession(result: SessionResult): ProgressStore {
  const current = loadProgress();
  const next: ProgressStore = {
    sessions: [result, ...current.sessions.filter((s) => s.scenarioId !== result.scenarioId || s.completedAt !== result.completedAt)].slice(0, 50),
    badges: Array.from(
      new Set([...current.badges, ...(result.passed ? [`passed:${result.scenarioId}`] : [])])
    ),
  };

  if (canUseStorage()) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }
  return next;
}

export function getBestScore(scenarioId: string): number | null {
  const store = loadProgress();
  const hits = store.sessions.filter((s) => s.scenarioId === scenarioId);
  if (!hits.length) return null;
  return Math.max(...hits.map((s) => s.scores.total));
}

export function clearProgress(): void {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(STORAGE_KEY);
}