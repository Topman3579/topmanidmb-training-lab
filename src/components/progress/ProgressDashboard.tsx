"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { scenarioSummaries } from "@/data/scenarios";
import { clearProgress, getBestScore, loadProgress } from "@/lib/storage";
import type { ProgressStore } from "@/lib/types";

export function ProgressDashboard() {
  const [store, setStore] = useState<ProgressStore>({ sessions: [], badges: [] });

  useEffect(() => {
    setStore(loadProgress());
  }, []);

  const handleClear = () => {
    clearProgress();
    setStore({ sessions: [], badges: [] });
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <section className="lab-card p-6">
        <h1 className="font-display text-2xl font-bold text-navy-900">ความคืบหน้า (เครื่องนี้)</h1>
        <p className="mt-2 text-sm text-navy-600">
          เก็บใน localStorage เท่านั้น — ไม่ส่งออกนอกเครื่อง
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {scenarioSummaries.map((s) => {
          const best = getBestScore(s.id);
          return (
            <div key={s.id} className="lab-card p-4">
              <p className="text-xs font-semibold text-navy-500">{s.code}</p>
              <p className="mt-1 font-medium text-navy-900">{s.title}</p>
              <p className="mt-2 text-2xl font-bold text-brand-700">
                {best !== null ? best : "—"}
              </p>
              <Link href={`/play/${s.id}/`} className="mt-3 inline-block text-sm font-semibold text-brand-700 hover:underline">
                เล่นต่อ
              </Link>
            </div>
          );
        })}
      </section>

      {store.sessions.length > 0 && (
        <section className="lab-card p-5">
          <h2 className="font-display text-lg font-semibold text-navy-900">ประวัติล่าสุด</h2>
          <ul className="mt-3 space-y-2 text-sm text-navy-700">
            {store.sessions.slice(0, 10).map((s) => (
              <li key={`${s.scenarioId}-${s.completedAt}`} className="flex justify-between border-b border-navy-50 py-2">
                <span>{s.scenarioId}</span>
                <span className="font-semibold">{s.scores.total} {s.passed ? "✅" : "📝"}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <button type="button" onClick={handleClear} className="lab-btn-secondary">
        ล้างความคืบหน้าในเครื่องนี้
      </button>
    </div>
  );
}