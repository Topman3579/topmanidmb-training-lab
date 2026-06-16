"use client";

import { useMemo, useState } from "react";
import { evidenceRoom3DItems } from "@/data/evidence-room-3d";
import { EvidenceCardPanel } from "@/components/evidence-room-3d/EvidenceCardPanel";
import { Scene3D } from "@/components/evidence-room-3d/Scene3D";
import { ScoreHUD } from "@/components/evidence-room-3d/ScoreHUD";
import {
  isClassificationCorrect,
  scoreEvidenceRoom3D,
} from "@/lib/evidence-room-scoring";
import type { EvidenceRoom3DClass, EvidenceRoom3DAnswer } from "@/lib/types";

export function EvidenceRoom3D() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, EvidenceRoom3DAnswer>>({});

  const completedIds = useMemo(
    () => new Set(Object.keys(answers)),
    [answers]
  );

  const selectedItem = evidenceRoom3DItems.find((i) => i.id === selectedId) ?? null;
  const currentAnswer = selectedId ? answers[selectedId] : undefined;

  const score = scoreEvidenceRoom3D(Object.values(answers));
  const classifiedCount = Object.keys(answers).length;
  const allDone = classifiedCount === evidenceRoom3DItems.length;

  const handleSelect = (id: string) => {
    setSelectedId(id);
  };

  const handleClassify = (cls: EvidenceRoom3DClass) => {
    if (!selectedItem || answers[selectedItem.id]) return;

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

  return (
    <div className="space-y-4 animate-fade-in-up">
      <section className="lab-card p-5 sm:p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">3D Prototype Mode</p>
        <h1 className="mt-1 font-display text-2xl font-bold text-navy-900 sm:text-3xl">
          3D Evidence Room
        </h1>
        <p className="mt-2 text-sm text-navy-600">
          ห้องเก็บหลักฐานจำลองสำหรับฝึกจำแนกข้อมูล — คลิกวัตถุบนโต๊ะ · หมุนมุมมองด้วยเมาส์ · ข้อมูลจำลองเท่านั้น
        </p>
      </section>

      <ScoreHUD
        score={score}
        classifiedCount={classifiedCount}
        selectedTitle={selectedItem?.title ?? null}
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,1fr)]">
        <Scene3D
          selectedId={selectedId}
          completedIds={completedIds}
          onSelect={handleSelect}
        />
        <EvidenceCardPanel
          item={selectedItem}
          selectedClass={currentAnswer?.selected ?? null}
          feedback={
            currentAnswer
              ? currentAnswer.correct
                ? "ถูกต้อง — " + (selectedItem?.hint ?? "")
                : "ยังไม่ถูก — " + (selectedItem?.hint ?? "")
              : null
          }
          isCorrect={currentAnswer ? currentAnswer.correct : null}
          isDone={Boolean(currentAnswer)}
          onClassify={handleClassify}
        />
      </div>

      {allDone && (
        <section className="lab-card border-emerald-200 bg-emerald-50/60 p-5 text-center">
          <p className="font-display text-lg font-bold text-emerald-900">
            ภารกิจครบ {evidenceRoom3DItems.length} ชิ้น — คะแนนรวม {score}/100
          </p>
          <p className="mt-1 text-sm text-emerald-800">
            ฝึกเสร็จแล้ว ลองเล่นอีกครั้งหรือกลับไปโหมด 2D ได้
          </p>
        </section>
      )}
    </div>
  );
}