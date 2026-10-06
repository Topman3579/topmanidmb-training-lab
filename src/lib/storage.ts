import { STORAGE_KEY } from "@/lib/constants";
import type { ProgressStore, SessionResult } from "@/lib/types";

// คืน object ใหม่ทุกครั้ง — ถ้าใช้ constant ร่วมกัน caller mutate ได้ แล้วเพี้ยนทั้ง module
function emptyStore(): ProgressStore {
  return { sessions: [], badges: [] };
}

function canUseStorage(): boolean {
  try {
    return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
  } catch {
    // Safari private mode / การบล็อก storage อาจโยนตอนแตะ localStorage — ถือว่าใช้ไม่ได้
    return false;
  }
}

// กรอง session ที่เสียหาย (JSON ถูกแก้ / โครงสร้างเก่า) ไม่ให้ getBestScore พังทีหลัง
function isValidSession(value: unknown): value is SessionResult {
  if (typeof value !== "object" || value === null) return false;
  const s = value as { scenarioId?: unknown; completedAt?: unknown; scores?: { total?: unknown } };
  const total = s.scores?.total;
  return (
    typeof s.scenarioId === "string" &&
    typeof s.completedAt === "string" &&
    typeof total === "number" &&
    Number.isFinite(total)
  );
}

export function loadProgress(): ProgressStore {
  if (!canUseStorage()) return emptyStore();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyStore();
    const parsed = JSON.parse(raw) as ProgressStore;
    if (!parsed.sessions || !Array.isArray(parsed.sessions)) return emptyStore();
    return {
      sessions: parsed.sessions.filter(isValidSession),
      badges: Array.isArray(parsed.badges) ? parsed.badges : [],
    };
  } catch {
    return emptyStore();
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
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Quota เต็ม / SecurityError — ยังคืน next เพื่อให้เกมเล่นต่อได้ (fail เฉพาะการ persist)
    }
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