"use client";

import dynamic from "next/dynamic";

export const EvidenceRoom3DClient = dynamic(
  () =>
    import("@/components/evidence-room-3d/EvidenceRoom3D").then((module) => module.EvidenceRoom3D),
  {
    ssr: false,
    loading: () => (
      <div className="lab-card flex min-h-[400px] items-center justify-center p-8 text-navy-600">
        กำลังโหลดห้อง 3D…
      </div>
    ),
  }
);
