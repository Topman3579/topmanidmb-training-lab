import dynamic from "next/dynamic";

const EvidenceRoom3D = dynamic(
  () =>
    import("@/components/evidence-room-3d/EvidenceRoom3D").then((m) => m.EvidenceRoom3D),
  {
    ssr: false,
    loading: () => (
      <div className="lab-card flex min-h-[400px] items-center justify-center p-8 text-navy-600">
        กำลังโหลดห้อง 3D…
      </div>
    ),
  }
);

export const metadata = {
  title: "3D Evidence Room",
};

export default function EvidenceRoom3DPage() {
  return <EvidenceRoom3D />;
}