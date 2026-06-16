import { PASS_THRESHOLD } from "@/lib/constants";
import type {
  DecisionOption,
  EvidenceClass,
  EvidenceItem,
  PhaseScores,
  RedFlagSegment,
  TimelineEvent,
} from "@/lib/types";

export function scoreEvidence(
  items: EvidenceItem[],
  answers: Record<string, EvidenceClass | null>
): number {
  if (items.length === 0) return 0;
  let correct = 0;
  for (const item of items) {
    if (answers[item.id] === item.correctClass) correct += 1;
  }
  return Math.round((correct / items.length) * 100);
}

export function scoreTimeline(
  events: TimelineEvent[],
  order: string[]
): number {
  if (events.length === 0) return 0;
  const target = [...events]
    .sort((a, b) => a.correctOrder - b.correctOrder)
    .map((e) => e.id);
  let correct = 0;
  for (let i = 0; i < target.length; i += 1) {
    if (order[i] === target[i]) correct += 1;
  }
  return Math.round((correct / target.length) * 100);
}

export function scoreRedFlags(
  segments: RedFlagSegment[],
  selected: Set<string>
): number {
  const flagged = segments.filter((s) => s.hasFlag);
  if (flagged.length === 0) return 100;

  let hits = 0;
  for (const segment of flagged) {
    if (selected.has(segment.id)) hits += 1;
  }

  const falsePositives = Array.from(selected).filter((id) => {
    const seg = segments.find((s) => s.id === id);
    return seg && !seg.hasFlag;
  }).length;

  const raw = hits / flagged.length;
  const penalty = falsePositives * 0.15;
  return Math.max(0, Math.round((raw - penalty) * 100));
}

export function scoreDecision(options: DecisionOption[], selectedId: string | null): number {
  if (!selectedId) return 0;
  const picked = options.find((o) => o.id === selectedId);
  if (!picked) return 0;
  if (picked.isBest) return 100;
  return Math.max(0, 50 + picked.scoreDelta);
}

export function buildPhaseScores(parts: Partial<PhaseScores>): PhaseScores {
  const evidence = parts.evidence ?? 0;
  const timeline = parts.timeline ?? 0;
  const redflag = parts.redflag ?? 0;
  const decision = parts.decision ?? 0;
  const values = [evidence, timeline, redflag, decision].filter((v) => v > 0);
  const total = values.length
    ? Math.round(values.reduce((sum, v) => sum + v, 0) / values.length)
    : 0;

  return { evidence, timeline, redflag, decision, total };
}

export function isPassed(total: number): boolean {
  return total >= PASS_THRESHOLD;
}