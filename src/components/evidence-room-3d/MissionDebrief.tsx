import Link from "next/link";
import {
  CLASSIFICATION_OPTIONS,
  evidenceRoom3DItems,
  evidenceRoom3DMission,
  getClassLabel,
} from "@/data/evidence-room-3d";
import { PASS_THRESHOLD_3D } from "@/lib/evidence-room-scoring";
import type { EvidenceRoom3DAnswer } from "@/lib/types";

interface MissionDebriefProps {
  score: number;
  answers: Record<string, EvidenceRoom3DAnswer>;
  onReplay: () => void;
}

export function MissionDebrief({ score, answers, onReplay }: MissionDebriefProps) {
  const passed = score >= PASS_THRESHOLD_3D;
  const correctCount = Object.values(answers).filter((a) => a.correct).length;

  return (
    <div className="space-y-5 animate-fade-in-up">
      <section
        className={`lab-card overflow-hidden border-2 p-6 sm:p-8 ${
          passed ? "border-emerald-300 bg-emerald-50/40" : "border-amber-300 bg-amber-50/40"
        }`}
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-navy-600">
          Mission Debrief · {evidenceRoom3DMission.code}
        </p>
        <h1 className="mt-2 font-display text-2xl font-bold text-navy-900 sm:text-3xl">
          สรุปผลภารกิจ
        </h1>
        <p className="mt-3 text-lg font-semibold text-navy-800">
          คะแนนรวม: <span className="text-brand-700">{score}/100</span> · ถูกต้อง{" "}
          {correctCount}/{evidenceRoom3DItems.length} ชิ้น
        </p>
        <p className="mt-2 text-sm text-navy-700">
          {passed
            ? `ผ่านเกณฑ์ (≥ ${PASS_THRESHOLD_3D}) — การจำแนกหลักฐานสอดคล้องหลัก Verification First`
            : `ยังไม่ถึงเกณฑ์ ${PASS_THRESHOLD_3D} — ทบทวนคำอธิบายแต่ละชิ้นแล้วลองใหม่`}
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <button type="button" onClick={onReplay} className="lab-btn-primary">
            เล่นภารกิจอีกครั้ง
          </button>
          <Link href="/" className="lab-btn-secondary">
            ← กลับหน้าหลัก
          </Link>
        </div>
      </section>

      <section className="lab-card p-5 sm:p-6">
        <h2 className="font-display text-lg font-bold text-navy-900">รายละเอียดแต่ละหลักฐาน</h2>
        <div className="mt-4 space-y-4">
          {evidenceRoom3DItems.map((item) => {
            const answer = answers[item.id];
            const opt = CLASSIFICATION_OPTIONS.find((o) => o.key === item.correctClass);
            return (
              <div
                key={item.id}
                className={`rounded-xl border p-4 ${
                  answer?.correct
                    ? "border-emerald-200 bg-emerald-50/50"
                    : "border-amber-200 bg-amber-50/50"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h3 className="font-semibold text-navy-900">{item.title}</h3>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                      answer?.correct ? "bg-emerald-200 text-emerald-900" : "bg-amber-200 text-amber-900"
                    }`}
                  >
                    {answer?.correct ? "ถูกต้อง" : "ผิด"}
                  </span>
                </div>
                <p className="mt-2 text-xs text-navy-500">
                  คำตอบที่ถูก: <strong className={opt?.color}>{getClassLabel(item.correctClass)}</strong>
                  {answer && !answer.correct && (
                    <>
                      {" "}
                      · คุณเลือก: <strong>{getClassLabel(answer.selected)}</strong>
                    </>
                  )}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-navy-700">{item.explanation}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}