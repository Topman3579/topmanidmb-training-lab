"use client";

import type { TimelineEvent } from "@/lib/types";

interface TimelineLaneProps {
  order: string[];
  events: TimelineEvent[];
  onMove: (id: string, direction: -1 | 1) => void;
}

export function TimelineLane({ order, events, onMove }: TimelineLaneProps) {
  const byId = Object.fromEntries(events.map((e) => [e.id, e]));

  return (
    <div className="space-y-3">
      {order.map((id, index) => {
        const event = byId[id];
        if (!event) return null;
        return (
          <div key={id} className="lab-card flex items-center gap-3 p-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-100 text-sm font-bold text-navy-800">
              {index + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-brand-700">{event.displayDate}</p>
              <p className="text-sm text-navy-900">{event.label}</p>
            </div>
            <div className="flex shrink-0 flex-col gap-1">
              <button
                type="button"
                disabled={index === 0}
                onClick={() => onMove(id, -1)}
                className="rounded border border-navy-200 px-2 py-0.5 text-xs disabled:opacity-30"
              >
                ↑
              </button>
              <button
                type="button"
                disabled={index === order.length - 1}
                onClick={() => onMove(id, 1)}
                className="rounded border border-navy-200 px-2 py-0.5 text-xs disabled:opacity-30"
              >
                ↓
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}