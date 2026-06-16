import Link from "next/link";
import { evidenceRoom3DItems, evidenceRoom3DMission } from "@/data/evidence-room-3d";

interface MissionBriefingProps {
  onStart: () => void;
}

export function MissionBriefing({ onStart }: MissionBriefingProps) {
  const mission = evidenceRoom3DMission;

  return (
    <div className="space-y-5 animate-fade-in-up">
      <section className="lab-card overflow-hidden border-navy-200">
        <div className="border-b border-navy-100 bg-gradient-to-r from-navy-900 to-navy-700 px-6 py-5 text-white sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-200">
            Mission Briefing · ข้อมูลจำลองเท่านั้น
          </p>
          <h1 className="mt-2 font-display text-2xl font-bold sm:text-3xl">{mission.title}</h1>
          <p className="mt-1 text-sm text-navy-200">{mission.titleEn}</p>
          <p className="mt-3 inline-block rounded-lg bg-white/10 px-3 py-1 font-mono text-sm">
            {mission.code}
          </p>
        </div>

        <div className="space-y-6 p-6 sm:p-8">
          <p className="leading-relaxed text-navy-700">{mission.briefing}</p>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-xl border border-brand-100 bg-brand-50/50 p-4">
              <h2 className="font-display text-sm font-bold uppercase tracking-wide text-brand-800">
                วัตถุประสงค์
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-navy-700">
                {mission.objectives.map((obj) => (
                  <li key={obj}>{obj}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-navy-100 bg-navy-50/50 p-4">
              <h2 className="font-display text-sm font-bold uppercase tracking-wide text-navy-800">
                วิธีปฏิบัติ
              </h2>
              <ul className="mt-3 list-decimal space-y-2 pl-5 text-sm text-navy-700">
                {mission.instructions.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            <strong>หลักฐานในภารกิจ:</strong> {evidenceRoom3DItems.length} ชิ้น · คะแนนเต็ม 100 ·
            ผ่านเกณฑ์ ≥ 70
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button type="button" onClick={onStart} className="lab-btn-primary px-8 py-3 text-base">
              เริ่มภารกิจ →
            </button>
            <Link href="/" className="lab-btn-secondary px-6 py-3">
              ← กลับหน้าหลัก
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}