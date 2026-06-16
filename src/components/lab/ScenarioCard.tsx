import Link from "next/link";
import { DIFFICULTY_LABELS } from "@/data/missions";
import { Badge } from "@/components/ui/Badge";
import type { ScenarioSummary } from "@/lib/types";

interface ScenarioCardProps {
  scenario: ScenarioSummary;
  bestScore: number | null;
}

export function ScenarioCard({ scenario, bestScore }: ScenarioCardProps) {
  const diff = DIFFICULTY_LABELS[scenario.difficulty];

  return (
    <article className="lab-card flex h-full flex-col p-5 transition hover:shadow-card-hover">
      <div className="mb-3 flex items-start justify-between gap-2">
        <Badge className="bg-navy-100 text-navy-800">{scenario.code}</Badge>
        <Badge className={diff.color}>{diff.th}</Badge>
      </div>
      <h3 className="font-display text-lg font-semibold text-navy-900">{scenario.title}</h3>
      <p className="mt-1 text-sm text-navy-500">{scenario.titleEn}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-navy-700">{scenario.tagline}</p>
      <div className="mt-4 flex items-center justify-between gap-3 text-xs text-navy-500">
        <span>⏱ ~{scenario.estMinutes} นาที</span>
        {bestScore !== null ? (
          <span className="font-semibold text-brand-700">คะแนนดีที่สุด: {bestScore}</span>
        ) : (
          <span>ยังไม่เคยเล่น</span>
        )}
      </div>
      <div className="mt-4 flex gap-2">
        <Link href={`/scenarios/${scenario.id}/`} className="lab-btn-secondary flex-1 text-center">
          อ่านบรีฟ
        </Link>
        <Link href={`/play/${scenario.id}/`} className="lab-btn-primary flex-1 text-center">
          เริ่มภารกิจ
        </Link>
      </div>
    </article>
  );
}