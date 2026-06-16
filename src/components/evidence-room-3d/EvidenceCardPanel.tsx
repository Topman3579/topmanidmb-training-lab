"use client";

import { CLASSIFICATION_OPTIONS, getClassLabel } from "@/data/evidence-room-3d";
import type { EvidenceRoom3DClass, EvidenceRoom3DItem } from "@/lib/types";

interface EvidenceCardPanelProps {
  item: EvidenceRoom3DItem | null;
  selectedClass: EvidenceRoom3DClass | null;
  isCorrect: boolean | null;
  isDone: boolean;
  remainingCount: number;
  onClassify: (cls: EvidenceRoom3DClass) => void;
}

export function EvidenceCardPanel({
  item,
  selectedClass,
  isCorrect,
  isDone,
  remainingCount,
  onClassify,
}: EvidenceCardPanelProps) {
  if (!item) {
    return (
      <aside className="lab-card flex h-full min-h-[360px] flex-col items-center justify-center border-dashed border-navy-200 p-6 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-navy-100 text-2xl">
          🔍
        </div>
        <p className="mt-4 font-display text-lg font-semibold text-navy-900">เลือกหลักฐานในห้อง 3D</p>
        <p className="mt-2 text-sm text-navy-600">
          คลิกวัตถุบนโต๊ะเพื่อเปิดการ์ดหลักฐาน
        </p>
        <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-xs font-medium text-amber-800">
          เหลืออีก {remainingCount} ชิ้นที่ยังไม่จำแนน
        </p>
      </aside>
    );
  }

  const correctOpt = CLASSIFICATION_OPTIONS.find((o) => o.key === item.correctClass);

  return (
    <aside className="lab-card flex h-full flex-col border-navy-200 p-5 sm:p-6">
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">การ์ดหลักฐานจำลอง</p>
        {isDone && (
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
              isCorrect ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
            }`}
          >
            {isCorrect ? "ถูกต้อง" : "ผิด"}
          </span>
        )}
      </div>

      <h2 className="mt-2 font-display text-xl font-bold text-navy-900">{item.title}</h2>
      <p className="mt-1 text-sm text-navy-500">{item.titleEn}</p>

      <div className="mt-4 space-y-2 rounded-xl bg-navy-50/60 p-3 text-sm text-navy-700">
        <p>{item.description}</p>
        <p className="text-xs text-navy-500">
          <span className="font-semibold">แหล่ง:</span> {item.source}
        </p>
      </div>

      {!isDone && (
        <div className="mt-5">
          <p className="mb-2 text-sm font-semibold text-navy-800">จำแนกหลักฐาน</p>
          <div className="grid gap-2">
            {CLASSIFICATION_OPTIONS.map((opt) => {
              const active = selectedClass === opt.key;
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => onClassify(opt.key)}
                  className={`rounded-xl border px-3 py-2.5 text-left text-xs font-semibold transition ${opt.color} ${
                    active ? "ring-2 ring-navy-400" : "hover:opacity-100"
                  }`}
                >
                  {opt.label}
                  <span className="mt-0.5 block text-[10px] font-normal opacity-80">{opt.labelEn}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {isDone && (
        <div className="mt-5 space-y-3">
          <div
            className={`rounded-xl border p-3 text-sm ${
              isCorrect
                ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                : "border-amber-200 bg-amber-50 text-amber-900"
            }`}
          >
            <p className="font-semibold">{isCorrect ? "✓ จำแนนถูกต้อง" : "✗ จำแนนยังไม่ถูก"}</p>
            <p className="mt-1 text-xs">
              คำตอบที่ถูก:{" "}
              <span className={`inline-block rounded px-1.5 py-0.5 font-bold ${correctOpt?.color ?? ""}`}>
                {getClassLabel(item.correctClass)}
              </span>
            </p>
          </div>

          <div className="rounded-xl border border-sky-200 bg-sky-50 p-3">
            <p className="text-xs font-bold uppercase tracking-wide text-sky-800">คำอธิบาย</p>
            <p className="mt-2 text-sm leading-relaxed text-sky-900">{item.explanation}</p>
          </div>

          <p className="text-xs font-medium text-navy-500">
            จำแนนแล้ว — เลือกหลักฐานชิ้นอื่นได้ (เหลือ {remainingCount} ชิ้น)
          </p>
        </div>
      )}
    </aside>
  );
}