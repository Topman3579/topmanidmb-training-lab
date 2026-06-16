"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DebriefReport } from "@/components/debrief/DebriefReport";
import { getScenarioById } from "@/data/scenarios";
import { loadProgress } from "@/lib/storage";
import type { SessionResult } from "@/lib/types";

interface DebriefViewProps {
  scenarioId: string;
}

export function DebriefView({ scenarioId }: DebriefViewProps) {
  const [result, setResult] = useState<SessionResult | null>(null);
  const scenario = getScenarioById(scenarioId);

  useEffect(() => {
    const store = loadProgress();
    const latest = store.sessions.find((s) => s.scenarioId === scenarioId);
    setResult(latest ?? null);
  }, [scenarioId]);

  if (!scenario) {
    return <p className="text-navy-700">ไม่พบสถานการณ์จำลอง</p>;
  }

  if (!result) {
    return (
      <div className="lab-card space-y-4 p-6">
        <p className="text-navy-700">ยังไม่มีผลล่าสุดสำหรับสถานการณ์นี้</p>
        <Link href={`/play/${scenarioId}/`} className="lab-btn-primary inline-flex">
          เริ่มภารกิจ
        </Link>
      </div>
    );
  }

  return <DebriefReport scenario={scenario} result={result} />;
}