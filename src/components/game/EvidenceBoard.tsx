"use client";

import type { EvidenceClass, EvidenceItem } from "@/lib/types";

const CLASSES: { key: EvidenceClass; label: string }[] = [
  { key: "observable", label: "สังเกตได้" },
  { key: "derived", label: "สรุปจากหลักฐาน" },
  { key: "inferred", label: "อนุมาน" },
  { key: "noise", label: "สัญญาณรบกวน" },
];

interface EvidenceBoardProps {
  items: EvidenceItem[];
  answers: Record<string, EvidenceClass | null>;
  onAnswer: (id: string, value: EvidenceClass) => void;
}

export function EvidenceBoard({ items, answers, onAnswer }: EvidenceBoardProps) {
  return (
    <div className="space-y-4">
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