"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { DecisionBranch } from "@/components/game/DecisionBranch";
import { EvidenceBoard } from "@/components/game/EvidenceBoard";
import { PhaseProgress } from "@/components/game/PhaseProgress";
import { RedFlagScanner } from "@/components/game/RedFlagScanner";
import { TimelineLane } from "@/components/game/TimelineLane";
import {
  buildPhaseScores,
  isPassed,
  scoreDecision,
  scoreEvidence,
  scoreRedFlags,
  scoreTimeline,
} from "@/lib/scoring";
import { saveSession } from "@/lib/storage";
import type {
  DecisionOption,
  EvidenceClass,
  EvidenceItem,
  GamePhase,
  RedFlagSegment,
  Scenario,
  TimelineEvent,
} from "@/lib/types";

interface GameSessionProps {
  scenario: Scenario;
}

function shuffleTimeline(phase: GamePhase): string[] {
  const events = phase.payload as TimelineEvent[];
  return [...events].sort(() => Math.random() - 0.5).map((e) => e.id);
}

export function GameSession({ scenario }: GameSessionProps) {
  const router = useRouter();
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [evidenceAnswers, setEvidenceAnswers] = useState<Record<string, EvidenceClass | null>>({});
  const [timelineOrder, setTimelineOrder] = useState<string[]>(() => {
    const tl = scenario.phases.find((p) => p.type === "timeline");
    return tl ? shuffleTimeline(tl) : [];
  });
  const [redFlagSelected, setRedFlagSelected] = useState<Set<string>>(new Set());
  const [decisionId, setDecisionId] = useState<string | null>(null);
  const [phaseScores, setPhaseScores] = useState<Record<string, number>>({});

  const phase = scenario.phases[phaseIndex];

  const canContinue = useMemo(() => {
    if (!phase) return false;
    if (phase.type === "evidence") {
      const items = phase.payload as EvidenceItem[];
      return items.every((item) => evidenceAnswers[item.id]);
    }
    if (phase.type === "redflag") return redFlagSelected.size > 0;
    if (phase.type === "decision") return Boolean(decisionId);
    return true;
  }, [phase, evidenceAnswers, redFlagSelected, decisionId]);

  const handleNext = () => {
    if (!phase) return;

    let score = 0;
    if (phase.type === "evidence") {
      score = scoreEvidence(phase.payload as EvidenceItem[], evidenceAnswers);
      setPhaseScores((prev) => ({ ...prev, evidence: score }));
    }
    if (phase.type === "timeline") {
      score = scoreTimeline(phase.payload as TimelineEvent[], timelineOrder);
      setPhaseScores((prev) => ({ ...prev, timeline: score }));
    }
    if (phase.type === "redflag") {
      score = scoreRedFlags(phase.payload as RedFlagSegment[], redFlagSelected);
      setPhaseScores((prev) => ({ ...prev, redflag: score }));
    }
    if (phase.type === "decision") {
      score = scoreDecision(phase.payload as DecisionOption[], decisionId);
      const nextScores = { ...phaseScores, decision: score };
      const built = buildPhaseScores(nextScores);
      const result = {
        scenarioId: scenario.id,
        completedAt: new Date().toISOString(),
        scores: built,
        passed: isPassed(built.total),
      };
      saveSession(result);
      router.push(`/debrief/${scenario.id}/?score=${built.total}`);
      return;
    }

    if (phaseIndex < scenario.phases.length - 1) {
      setPhaseIndex((v) => v + 1);
    }
  };

  const moveTimeline = (id: string, direction: -1 | 1) => {
    setTimelineOrder((prev) => {
      const idx = prev.indexOf(id);
      if (idx < 0) return prev;
      const next = [...prev];
      const swap = idx + direction;
      if (swap < 0 || swap >= next.length) return prev;
      [next[idx], next[swap]] = [next[swap], next[idx]];
      return next;
    });
  };

  if (!phase) return null;

  return (
    <div className="space-y-6">
      <PhaseProgress
        current={phaseIndex}
        total={scenario.phases.length}
        phaseType={phase.type}
      />

      <section className="lab-card p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">{scenario.code}</p>
        <h1 className="mt-1 font-display text-2xl font-bold text-navy-900">{phase.title}</h1>
        <p className="mt-1 text-sm text-navy-500">{phase.titleEn}</p>
      </section>

      {phase.type === "evidence" && (
        <EvidenceBoard
          items={phase.payload as EvidenceItem[]}
          answers={evidenceAnswers}
          onAnswer={(id, value) =>
            setEvidenceAnswers((prev) => ({ ...prev, [id]: value }))
          }
        />
      )}

      {phase.type === "timeline" && (
        <TimelineLane
          order={timelineOrder}
          events={phase.payload as TimelineEvent[]}
          onMove={moveTimeline}
        />
      )}

      {phase.type === "redflag" && (
        <RedFlagScanner
          segments={phase.payload as RedFlagSegment[]}
          selected={redFlagSelected}
          onToggle={(id) =>
            setRedFlagSelected((prev) => {
              const next = new Set(prev);
              if (next.has(id)) next.delete(id);
              else next.add(id);
              return next;
            })
          }
        />
      )}

      {phase.type === "decision" && (
        <DecisionBranch
          options={phase.payload as DecisionOption[]}
          selectedId={decisionId}
          onSelect={setDecisionId}
        />
      )}

      <div className="flex justify-end">
        <button
          type="button"
          disabled={!canContinue}
          onClick={handleNext}
          className="lab-btn-primary"
        >
          {phase.type === "decision" ? "ส่งผลและดู Debrief" : "ขั้นถัดไป"}
        </button>
      </div>
    </div>
  );
}