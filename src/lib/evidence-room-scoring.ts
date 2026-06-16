import type { EvidenceRoom3DClass, EvidenceRoom3DAnswer } from "@/lib/types";

export const POINTS_PER_ITEM = 20;
export const PASS_THRESHOLD_3D = 70;

export function scoreEvidenceRoom3D(answers: EvidenceRoom3DAnswer[]): number {
  const correct = answers.filter((a) => a.correct).length;
  return correct * POINTS_PER_ITEM;
}

export function isClassificationCorrect(
  selected: EvidenceRoom3DClass,
  correct: EvidenceRoom3DClass
): boolean {
  return selected === correct;
}

export function isPassed3D(score: number): boolean {
  return score >= PASS_THRESHOLD_3D;
}