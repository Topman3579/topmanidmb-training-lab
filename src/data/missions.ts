export const LAB_PHASES = [
  { key: "evidence", label: "จัดประเภทหลักฐาน", icon: "📋" },
  { key: "timeline", label: "เรียงเหตุการณ์", icon: "🕐" },
  { key: "redflag", label: "จับ Red Flag", icon: "🚩" },
  { key: "decision", label: "เลือกทางดำเนินการ", icon: "🧭" },
] as const;

export const DIFFICULTY_LABELS = {
  beginner: { th: "เริ่มต้น", en: "Beginner", color: "bg-emerald-100 text-emerald-800" },
  intermediate: { th: "ปานกลาง", en: "Intermediate", color: "bg-amber-100 text-amber-800" },
  advanced: { th: "ขั้นสูง", en: "Advanced", color: "bg-rose-100 text-rose-800" },
} as const;