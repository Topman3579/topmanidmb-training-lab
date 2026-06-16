import { LAB_PHASES } from "@/data/missions";

interface PhaseProgressProps {
  current: number;
  total: number;
  phaseType: string;
}

export function PhaseProgress({ current, total, phaseType }: PhaseProgressProps) {
  const phase = LAB_PHASES.find((p) => p.key === phaseType);

  return (
    <div className="lab-card p-4">
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="font-semibold text-navy-800">
          {phase?.icon} ขั้นที่ {current + 1}/{total}: {phase?.label}
        </span>
        <span className="text-navy-500">{Math.round(((current + 1) / total) * 100)}%</span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-navy-100">
        <div
          className="h-full rounded-full bg-brand-600 transition-all"
          style={{ width: `${((current + 1) / total) * 100}%` }}
        />
      </div>
    </div>
  );
}