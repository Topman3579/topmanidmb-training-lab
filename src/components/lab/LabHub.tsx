"use client";

import Link from "next/link";
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

      <section className="lab-card overflow-hidden border-brand-200 bg-gradient-to-r from-brand-50 to-white p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">โหมดใหม่</p>
            <h2 className="mt-1 font-display text-xl font-bold text-navy-900">3D Evidence Room</h2>
            <p className="mt-2 max-w-2xl text-sm text-navy-700">
              สำรวจห้องเก็บหลักฐานจำลองแบบ 3D คลิกวัตถุ 5 ชิ้น แล้วจำแนกเป็น ข้อเท็จจริง · ข้อสงสัย · ต้องตรวจสอบ · ขั้นตอนถัดไป
            </p>
          </div>
          <Link href="/3d-evidence-room/" className="lab-btn-primary shrink-0 text-center">
            เข้าห้อง 3D →
          </Link>
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-display text-xl font-semibold text-navy-900">สถานการณ์จำลอง (โหมด 2D)</h2>
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