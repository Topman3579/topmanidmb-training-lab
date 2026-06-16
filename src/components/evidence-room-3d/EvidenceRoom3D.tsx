"use client";

import { useEffect, useMemo, useState } from "react";
import { evidenceRoom3DItems } from "@/data/evidence-room-3d";
import { EvidenceCardPanel } from "@/components/evidence-room-3d/EvidenceCardPanel";
import { MissionBriefing } from "@/components/evidence-room-3d/MissionBriefing";
import { MissionDebrief } from "@/components/evidence-room-3d/MissionDebrief";
import { Scene3D } from "@/components/evidence-room-3d/Scene3D";
import { ScoreHUD } from "@/components/evidence-room-3d/ScoreHUD";
import {
  isClassificationCorrect,
  scoreEvidenceRoom3D,
} from "@/lib/evidence-room-scoring";
import type {
  EvidenceRoom3DAnswer,
  EvidenceRoom3DClass,
  EvidenceRoom3DPhase,
} from "@/lib/types";

const INITIAL_ANSWERS: Record<string, EvidenceRoom3DAnswer> = {};

export function EvidenceRoom3D() {
  const [phase, setPhase] = useState<EvidenceRoom3DPhase>("briefing");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, EvidenceRoom3DAnswer>>(INITIAL_ANSWERS);

  const total = evidenceRoom3DItems.length;
  const completedIds = useMemo(() => new Set(Object.keys(answers)), [answers]);
  const classifiedCount = completedIds.size;
  const remainingCount = total - classifiedCount;

  const selectedItem = evidenceRoom3DItems.find((i) => i.id === selectedId) ?? null;
  const currentAnswer = selectedId ? answers[selectedId] : undefined;
  const score = scoreEvidenceRoom3D(Object.values(answers));

  useEffect(() => {
    if (phase === "playing" && classifiedCount === total) {
      setPhase("debrief");
    }
  }, [phase, classifiedCount, total]);

  const handleStart = () => {
    setPhase("playing");
    setSelectedId(null);
    setAnswers(INITIAL_ANSWERS);
  };

  const handleReplay = () => {
    setPhase("briefing");
    setSelectedId(null);
    setAnswers(INITIAL_ANSWERS);
  };

  const handleSelect = (id: string) => {
    if (phase !== "playing") return;
    setSelectedId(id);
  };

  const handleClassify = (cls: EvidenceRoom3DClass) => {
    if (phase !== "playing" || !selectedItem || answers[selectedItem.id]) return;

    const correct = isClassificationCorrect(cls, selectedItem.correctClass);
    setAnswers((prev) => ({
      ...prev,
      [selectedItem.id]: {
        itemId: selectedItem.id,
        selected: cls,
        correct,
      },
    }));
  };

  if (phase === "briefing") {
    return <MissionBriefing onStart={handleStart} />;
  }

  if (phase === "debrief") {
    return <MissionDebrief score={score} answers={answers} onReplay={handleReplay} />;
  }

  return (
    <div className="space-y-4 animate-fade-in-up">
      <section className="lab-card border-l-4 border-l-brand-600 p-4 sm:p-5">
        <h1 className="font-display text-xl font-bold text-navy-900 sm:text-2xl">3D Evidence Room</h1>
        <p className="mt-1 text-sm text-navy-600">
          สำรวจห้อง · คลิกหลักฐาน · จำแนนให้ครบ {total} ชิ้น
        </p>
      </section>

      <ScoreHUD
        score={score}
        classifiedCount={classifiedCount}
        selectedTitle={selectedItem?.title ?? null}
        remainingCount={remainingCount}
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.45fr)_minmax(300px,1fr)]">
        <Scene3D
          selectedId={selectedId}
          completedIds={completedIds}
          onSelect={handleSelect}
        />
        <EvidenceCardPanel
          item={selectedItem}
          selectedClass={currentAnswer?.selected ?? null}
          isCorrect={currentAnswer ? currentAnswer.correct : null}
          isDone={Boolean(currentAnswer)}
          remainingCount={remainingCount}
          onClassify={handleClassify}
        />
      </div>

      {remainingCount === 0 && (
        <section className="lab-card border-emerald-300 bg-emerald-50 p-4 text-center text-sm font-semibold text-emerald-900">
          จำแนนครบทุกชิ้นแล้ว — กำลังแสดงสรุปผลภารกิจ…
        </section>
      )}
    </div>
  );
}