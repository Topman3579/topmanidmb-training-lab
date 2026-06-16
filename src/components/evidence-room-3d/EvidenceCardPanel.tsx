"use client";

import { CLASSIFICATION_OPTIONS } from "@/data/evidence-room-3d";
import type { EvidenceRoom3DClass, EvidenceRoom3DItem } from "@/lib/types";

interface EvidenceCardPanelProps {
  item: EvidenceRoom3DItem | null;
  selectedClass: EvidenceRoom3DClass | null;
  feedback: string | null;
  isCorrect: boolean | null;
  isDone: boolean;
  onClassify: (cls: EvidenceRoom3DClass) => void;
}

export function EvidenceCardPanel({
  item,
  selectedClass,
  feedback,
  isCorrect,
  isDone,
  onClassify,
}: EvidenceCardPanelProps) {
  if (!item) {
    return (
      <aside className="lab-card flex h-full min-h-[320px] flex-col items-center justify-center p-6 text-center">
        <p className="text-4xl">🔍</p>
        <p className="mt-3 font-display text-lg font-semibold text-navy-900">เลือกหลักฐานในห้อง 3D</p>
        <p className="mt-2 text-sm text-navy-600">
          คลิกวัตถุบนโต๊ะเพื่อเปิดการ์ดหลักฐาน แล้วจำแนกประเภท
        </p>
      </aside>
    );
  }

  return (
    <aside className="lab-card flex h-full flex-col p-5 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">การ์ดหลักฐานจำลอง</p>
      <h2 className="mt-2 font-display text-xl font-bold text-navy-900">{item.title}</h2>
      <p className="mt-1 text-sm text-navy-500">{item.titleEn}</p>

      <div className="mt-4 space-y-2 text-sm text-navy-700">
        <p>{item.description}</p>
        <p className="text-xs text-navy-500">
          <span className="font-semibold">แหล่ง:</span> {item.source}
        </p>
      </div>

      <div className="mt-5">
        <p className="mb-2 text-sm font-semibold text-navy-800">จำแนกหลักฐาน</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {CLASSIFICATION_OPTIONS.map((opt) => {
            const active = selectedClass === opt.key;
            return (
              <button
                key={opt.key}
                type="button"
                disabled={isDone}
                onClick={() => onClassify(opt.key)}
                className={`rounded-xl border px-3 py-2.5 text-left text-xs font-semibold transition disabled:cursor-default ${opt.color} ${
                  active ? "ring-2 ring-navy-400" : "opacity-90 hover:opacity-100"
                }`}
              >
                {opt.label}
                <span className="mt-0.5 block text-[10px] font-normal opacity-80">{opt.labelEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {feedback && (
        <div
          className={`mt-4 rounded-xl border p-3 text-sm ${
            isCorrect
              ? "border-emerald-200 bg-emerald-50 text-emerald-900"
              : "border-amber-200 bg-amber-50 text-amber-900"
          }`}
        >
          {isCorrect ? "✓ " : "✗ "}
          {feedback}
        </div>
      )}

      {isDone && (
        <p className="mt-3 text-xs font-medium text-navy-500">จำแนนแล้ว — เลือกหลักฐานชิ้นอื่นได้</p>
      )}
    </aside>
  );
}