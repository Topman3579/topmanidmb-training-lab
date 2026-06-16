"use client";

import { useEffect, useState } from "react";
import { scenarioSummaries } from "@/data/scenarios";
import { ScenarioCard } from "@/components/lab/ScenarioCard";
import { getBestScore, loadProgress } from "@/lib/storage";

export function LabHub() {
  const [scores, setScores] = useState<Record<string, number | null>>({});

  useEffect(() => {
    loadProgress();
    const next: Record<string, number | null> = {};
    for (const s of scenarioSummaries) {
      next[s.id] = getBestScore(s.id);
    }
    setScores(next);
  }, []);

  return (
    <div className="space-y-8 animate-fade-in-up">
      <section className="lab-card p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">Training Lab</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-navy-900 sm:text-4xl">
          ห้องทดลองฝึกสืบสวน
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-navy-700">
          เลือกสถานการณ์จำลอง ฝึก 4 ขั้น: จัดหลักฐาน · เรียงเหตุการณ์ · จับ Red Flag ใน AI · เลือกทางดำเนินการ
          ทุกอย่างเป็นข้อมูลจำลอง — ไม่มีคดีจริง
        </p>
      </section>

      <section>
        <h2 className="mb-4 font-display text-xl font-semibold text-navy-900">สถานการณ์จำลอง</h2>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {scenarioSummaries.map((scenario) => (
            <ScenarioCard
              key={scenario.id}
              scenario={scenario}
              bestScore={scores[scenario.id] ?? null}
            />
          ))}
        </div>
      </section>
    </div>
  );
}