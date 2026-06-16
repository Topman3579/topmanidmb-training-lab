import Link from "next/link";
import { evidenceRoom3DItems, evidenceRoom3DMission } from "@/data/evidence-room-3d";

interface ScoreHUDProps {
  score: number;
  classifiedCount: number;
  selectedTitle: string | null;
  remainingCount: number;
}

export function ScoreHUD({
  score,
  classifiedCount,
  selectedTitle,
  remainingCount,
}: ScoreHUDProps) {
  const total = evidenceRoom3DItems.length;
  const pct = Math.round((classifiedCount / total) * 100);

  return (
    <div className="lab-card overflow-hidden">
      <div className="border-b border-navy-100 bg-navy-50/80 px-4 py-2 text-xs font-semibold text-navy-600">
        {evidenceRoom3DMission.code} · ภารกิจกำลังดำเนินการ
      </div>
      <div className="flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
          <div className="rounded-xl border border-brand-200 bg-brand-50 px-3 py-2 text-center">
            <p className="text-[10px] font-semibold uppercase text-brand-600">คะแนน</p>
            <p className="text-lg font-bold text-brand-900">{score}/100</p>
          </div>
          <div className="rounded-xl border border-navy-200 bg-navy-50 px-3 py-2 text-center">
            <p className="text-[10px] font-semibold uppercase text-navy-600">ความคืบหน้า</p>
            <p className="text-lg font-bold text-navy-900">
              {classifiedCount}/{total}
            </p>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-center">
            <p className="text-[10px] font-semibold uppercase text-amber-700">เหลือ</p>
            <p className="text-lg font-bold text-amber-900">{remainingCount}</p>
          </div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-center">
            <p className="text-[10px] font-semibold uppercase text-emerald-700">เปอร์เซ็นต์</p>
            <p className="text-lg font-bold text-emerald-900">{pct}%</p>
          </div>
        </div>

        {selectedTitle && (
          <p className="text-sm text-navy-600 lg:max-w-xs">
            <span className="font-semibold text-navy-800">หลักฐานที่เลือก:</span> {selectedTitle}
          </p>
        )}

        <Link href="/" className="lab-btn-secondary shrink-0 text-center text-sm">
          ← กลับหน้าหลัก
        </Link>
      </div>
      <div className="h-1.5 bg-navy-100">
        <div
          className="h-full bg-brand-600 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}