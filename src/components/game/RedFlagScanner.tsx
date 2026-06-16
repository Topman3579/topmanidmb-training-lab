"use client";

import type { RedFlagSegment } from "@/lib/types";

interface RedFlagScannerProps {
  segments: RedFlagSegment[];
  selected: Set<string>;
  onToggle: (id: string) => void;
}

export function RedFlagScanner({ segments, selected, onToggle }: RedFlagScannerProps) {
  return (
    <div className="lab-card p-5">
      <p className="mb-4 text-sm text-navy-600">
        คลิกประโยคที่มีปัญหา (PII · ข้อสรุปไร้หลักฐาน · ขั้นตอนผิด · AI แต่งข้อมูล)
      </p>
      <div className="space-y-2">
        {segments.map((seg) => {
          const active = selected.has(seg.id);
          return (
            <button
              key={seg.id}
              type="button"
              onClick={() => onToggle(seg.id)}
              className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition ${
                active
                  ? "border-lab-danger bg-rose-50 text-rose-900"
                  : "border-navy-100 bg-white text-navy-800 hover:border-navy-200"
              }`}
            >
              {seg.text}
            </button>
          );
        })}
      </div>
    </div>
  );
}