import Link from "next/link";
import { ScoreBreakdown } from "@/components/debrief/ScoreBreakdown";
import { PASS_THRESHOLD } from "@/lib/constants";
import type { Scenario, SessionResult } from "@/lib/types";

interface DebriefReportProps {
  scenario: Scenario;
  result: SessionResult;
}

export function DebriefReport({ scenario, result }: DebriefReportProps) {
  const passed = result.passed;

  return (
    <div className="space-y-6 animate-fade-in-up">
      <section className={`lab-card p-6 ${passed ? "border-emerald-200 bg-emerald-50/50" : "border-amber-200 bg-amber-50/50"}`}>
        <p className="text-sm font-semibold text-navy-600">{scenario.code}</p>
        <h1 className="mt-1 font-display text-2xl font-bold text-navy-900">สรุปผลการฝึก</h1>
        <p className="mt-2 text-navy-700">
          {passed
            ? `ผ่านเกณฑ์ (≥ ${PASS_THRESHOLD}) — แนวทางสืบสวนของคุณสอดคล้องหลัก Verification First`
            : `ยังไม่ถึงเกณฑ์ ${PASS_THRESHOLD} — ลองทบทวนแต่ละมิติแล้วเล่นใหม่`}
        </p>
      </section>

      <ScoreBreakdown scores={result.scores} />

      <section className="lab-card p-5">
        <h2 className="font-display text-lg font-semibold text-navy-900">สิ่งที่ผู้ฝึกอบรมควรจด</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-navy-700">
          <li>เริ่มจากหลักฐานที่ตรวจสอบได้ ไม่ใช่ข่าวลือหรือข้อสรุป AI</li>
          <li>แยก Observable / Derived / Inferred ให้ชัดก่อนสรุป</li>
          <li>ตรวจ PII และข้อความที่ AI แต่งเพิ่มทุกครั้ง</li>
        </ul>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link href={`/play/${scenario.id}/`} className="lab-btn-primary">
          เล่นอีกครั้ง
        </Link>
        <Link href="/" className="lab-btn-secondary">
          กลับห้องทดลอง
        </Link>
        <Link href="/progress/" className="lab-btn-secondary">
          ดูความคืบหน้า
        </Link>
      </div>
    </div>
  );
}