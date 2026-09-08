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

  // hits ลบ false positive เต็มน้ำหนัก — กัน "คลิกทุกประโยค" แล้วยังได้คะแนนสูง
  // (เดิมหักแค่ 15% ต่อครั้ง: คลิกหมด 4 ข้อยังได้ 85)
  const raw = (hits - falsePositives) / flagged.length;
  return Math.max(0, Math.round(raw * 100));
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
  // เฉลี่ยครบ 4 มิติเสมอ (น้ำหนัก 25% ตาม rubric) — เดิมตัดมิติที่ได้ 0 ทิ้ง
  // ทำให้เรียง timeline ผิดหมด (0) แล้วคะแนนรวมกลับสูงขึ้น
  const total = Math.round((evidence + timeline + redflag + decision) / 4);

  return { evidence, timeline, redflag, decision, total };
}

export function isPassed(total: number): boolean {
  return total >= PASS_THRESHOLD;
}