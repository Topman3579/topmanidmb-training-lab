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
      <section className="lab-card p-7 sm:p-10">
        <div className="flex items-start gap-5 sm:gap-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/logo-icon.svg"
            alt=""
            className="hidden h-16 w-16 shrink-0 rounded-xl shadow-card sm:block"
          />
          <div>
            <p className="lab-kicker">Training Lab</p>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-navy-900 sm:text-5xl">
              ห้องทดลองฝึกสืบสวน
            </h1>
            <div className="mt-4 h-px w-14 bg-gold" />
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-navy-700 sm:text-lg">
              เลือกสถานการณ์จำลอง ฝึก 4 ขั้น: จัดหลักฐาน · เรียงเหตุการณ์ · จับ Red Flag ใน AI · เลือกทางดำเนินการ
              ทุกอย่างเป็นข้อมูลจำลอง — ไม่มีคดีจริง
            </p>
          </div>
        </div>
      </section>

      <section className="lab-card overflow-hidden border-gold-400/30 bg-gradient-to-r from-brand-50 to-paper p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="lab-kicker">TOPMAN AI Academy</p>
            <h2 className="mt-1 font-display text-2xl font-semibold text-navy-900">AI Video Guide 2026</h2>
            <p className="mt-2 max-w-2xl text-sm text-navy-700">
              คู่มือเริ่มต้นทำ Image-to-Video จากภาพนิ่งด้วย Seedance / Grok Imagine Video พร้อม Workflow, Prompt Template และ Guardrails สำหรับงานจริง
            </p>
          </div>
          <Link href="/ai-video/" className="lab-btn-primary shrink-0 text-center">
            เปิดคู่มือ AI Video →
          </Link>
        </div>
      </section>

      <section className="lab-card overflow-hidden border-gold-400/30 bg-gradient-to-r from-ivory-50 to-paper p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="lab-kicker">โหมดใหม่</p>
            <h2 className="mt-1 font-display text-2xl font-semibold text-navy-900">3D Evidence Room</h2>
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
