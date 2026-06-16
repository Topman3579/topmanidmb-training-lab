import type { PhaseType } from "@/lib/types";

export const RUBRIC: Record<
  PhaseType,
  { title: string; description: string; weight: string }
> = {
  evidence: {
    title: "จัดประเภทหลักฐาน",
    description: "แยกข้อมูลที่สังเกตได้จริง สิ่งที่สรุปจากหลักฐาน สิ่งที่ยังเป็นการอนุมาน และสัญญาณรบกวน",
    weight: "25%",
  },
  timeline: {
    title: "เรียงลำดับเหตุการณ์",
    description: "จัดลำดับเหตุการณ์ให้สอดคล้องกับหลักฐาน ไม่ใช่ตามความรู้สึกหรือข่าวลือ",
    weight: "25%",
  },
  redflag: {
    title: "จับ Red Flag ในผลลัพธ์ AI",
    description: "ระบุ PII ที่รั่ว ข้อสรุปไร้หลักฐาน หรือขั้นตอนที่ข้ามกระบวนการ",
    weight: "25%",
  },
  decision: {
    title: "เลือกทางดำเนินการ",
    description: "เลือกขั้นตอนถัดไปที่ปลอดภัย ตรวจสอบได้ และสอดคล้องหลักฝึกอบรม",
    weight: "25%",
  },
};