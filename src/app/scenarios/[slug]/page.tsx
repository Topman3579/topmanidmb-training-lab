import Link from "next/link";
import { notFound } from "next/navigation";
import { DIFFICULTY_LABELS } from "@/data/missions";
import { getAllScenarioIds, getScenarioById } from "@/data/scenarios";
import { Badge } from "@/components/ui/Badge";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllScenarioIds().map((slug) => ({ slug }));
}

export default function ScenarioBriefingPage({ params }: PageProps) {
  const scenario = getScenarioById(params.slug);
  if (!scenario) notFound();

  const diff = DIFFICULTY_LABELS[scenario.difficulty];

  return (
    <div className="mx-auto max-w-3xl space-y-6 animate-fade-in-up">
      <section className="lab-card p-6 sm:p-8">
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-navy-100 text-navy-800">{scenario.code}</Badge>
          <Badge className={diff.color}>{diff.th}</Badge>
          <Badge className="bg-brand-50 text-brand-800">~{scenario.estMinutes} นาที</Badge>
        </div>
        <h1 className="mt-4 font-display text-3xl font-bold text-navy-900">{scenario.title}</h1>
        <p className="mt-2 text-navy-500">{scenario.titleEn}</p>
        <p className="mt-4 leading-relaxed text-navy-700">{scenario.briefing}</p>
      </section>

      <section className="lab-card p-6">
        <h2 className="font-display text-lg font-semibold text-navy-900">วัตถุประสงค์</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-navy-700">
          {scenario.learningObjectives.map((obj) => (
            <li key={obj}>{obj}</li>
          ))}
        </ul>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link href={`/play/${scenario.id}/`} className="lab-btn-primary">
          เริ่มภารกิจ
        </Link>
        <Link href="/" className="lab-btn-secondary">
          กลับห้องทดลอง
        </Link>
      </div>
    </div>
  );
}