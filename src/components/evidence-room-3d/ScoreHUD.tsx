import Link from "next/link";
import { evidenceRoom3DItems } from "@/data/evidence-room-3d";

interface ScoreHUDProps {
  score: number;
  classifiedCount: number;
  selectedTitle: string | null;
}

export function ScoreHUD({ score, classifiedCount, selectedTitle }: ScoreHUDProps) {
  const total = evidenceRoom3DItems.length;

  return (
    <div className="lab-card flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <span className="rounded-lg bg-brand-50 px-3 py-1.5 font-semibold text-brand-800">
          คะแนน {score}/100
        </span>
        <span className="rounded-lg bg-navy-50 px-3 py-1.5 font-semibold text-navy-800">
          จำแนนแล้ว {classifiedCount}/{total}
        </span>
        {selectedTitle && (
          <span className="text-navy-600">
            กำลังดู: <strong className="text-navy-900">{selectedTitle}</strong>
          </span>
        )}
      </div>
      <Link href="/" className="lab-btn-secondary shrink-0 text-center">
        ← กลับห้องทดลอง
      </Link>
    </div>
  );
}