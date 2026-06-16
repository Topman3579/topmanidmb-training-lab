import { RUBRIC } from "@/data/rubric";
import type { PhaseScores } from "@/lib/types";

interface ScoreBreakdownProps {
  scores: PhaseScores;
}

const ROWS = [
  { key: "evidence" as const, phase: "evidence" as const },
  { key: "timeline" as const, phase: "timeline" as const },
  { key: "redflag" as const, phase: "redflag" as const },
  { key: "decision" as const, phase: "decision" as const },
];

export function ScoreBreakdown({ scores }: ScoreBreakdownProps) {
  return (
    <div className="lab-card overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-navy-50 text-left text-navy-700">
          <tr>
            <th className="px-4 py-3">มิติ</th>
            <th className="px-4 py-3">คะแนน</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.key} className="border-t border-navy-100">
              <td className="px-4 py-3">
                <p className="font-medium text-navy-900">{RUBRIC[row.phase].title}</p>
                <p className="text-xs text-navy-500">{RUBRIC[row.phase].description}</p>
              </td>
              <td className="px-4 py-3 font-semibold text-navy-900">{scores[row.key]}</td>
            </tr>
          ))}
          <tr className="border-t border-navy-200 bg-brand-50">
            <td className="px-4 py-3 font-bold text-navy-900">รวม</td>
            <td className="px-4 py-3 text-lg font-bold text-brand-800">{scores.total}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}