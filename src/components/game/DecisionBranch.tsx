"use client";

import type { DecisionOption } from "@/lib/types";

interface DecisionBranchProps {
  options: DecisionOption[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function DecisionBranch({ options, selectedId, onSelect }: DecisionBranchProps) {
  return (
    <div className="space-y-3">
      {options.map((opt) => {
        const active = selectedId === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onSelect(opt.id)}
            className={`lab-card w-full p-4 text-left transition ${
              active ? "border-brand-400 ring-2 ring-brand-200" : "hover:shadow-card-hover"
            }`}
          >
            <p className="text-sm font-medium text-navy-900">{opt.label}</p>
          </button>
        );
      })}
    </div>
  );
}