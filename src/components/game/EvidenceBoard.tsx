"use client";

import type { EvidenceClass, EvidenceItem } from "@/lib/types";

const CLASSES: { key: EvidenceClass; label: string; help: string }[] = [
  { key: "observable", label: "สังเกตได้", help: "เห็น/ตรวจได้โดยตรง เช่น ภาพกล้อง บันทึกระบบ" },
  { key: "derived", label: "สรุปจากหลักฐาน", help: "อ่านจากหลักฐานแล้วสรุป ยังตรวจย้อนได้" },
  { key: "inferred", label: "อนุมาน", help: "คาดเดาจากประสบการณ์ ยังไม่มีหลักฐานรองรับ" },
  { key: "noise", label: "สัญญาณรบกวน", help: "ข่าวลือ ความเห็น โพสต์ที่ตรวจที่มาไม่ได้" },
];

interface EvidenceBoardProps {
  items: EvidenceItem[];
  answers: Record<string, EvidenceClass | null>;
  onAnswer: (id: string, value: EvidenceClass) => void;
}

export function EvidenceBoard({ items, answers, onAnswer }: EvidenceBoardProps) {
  return (
    <div className="space-y-4">
      <div className="lab-card grid gap-2 p-4 text-xs text-navy-700 sm:grid-cols-2">
        {CLASSES.map((c) => (
          <p key={c.key}>
            <strong className="text-navy-900">{c.label}</strong> — {c.help}
          </p>
        ))}
      </div>
      {items.map((item) => (
        <div key={item.id} className="lab-card p-4">
          <p className="font-medium text-navy-900">{item.label}</p>
          <p className="mt-1 text-xs text-navy-500">แหล่ง: {item.source}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {CLASSES.map((c) => {
              const active = answers[item.id] === c.key;
              return (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => onAnswer(item.id, c.key)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    active
                      ? "bg-navy-800 text-white"
                      : "border border-navy-200 bg-white text-navy-700 hover:border-navy-300"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}