import type { EvidenceRoom3DClass, EvidenceRoom3DItem } from "@/lib/types";

export const EVIDENCE_ROOM_3D_CODE = "LAB-3D-2026-ROOM";

export const CLASSIFICATION_OPTIONS: {
  key: EvidenceRoom3DClass;
  label: string;
  labelEn: string;
  color: string;
}[] = [
  { key: "fact", label: "ข้อเท็จจริง", labelEn: "Fact", color: "bg-emerald-100 text-emerald-800 border-emerald-300" },
  { key: "suspicion", label: "ข้อสงสัย", labelEn: "Suspicion", color: "bg-amber-100 text-amber-800 border-amber-300" },
  {
    key: "requires_verification",
    label: "ต้องตรวจสอบเพิ่ม",
    labelEn: "Requires Verification",
    color: "bg-sky-100 text-sky-800 border-sky-300",
  },
  {
    key: "recommended_next_step",
    label: "ขั้นตอนถัดไปที่แนะนำ",
    labelEn: "Recommended Next Step",
    color: "bg-violet-100 text-violet-800 border-violet-300",
  },
];

export const evidenceRoom3DItems: EvidenceRoom3DItem[] = [
  {
    id: "er3d-doc-box",
    objectType: "document_box",
    title: "กล่องเอกสารจำลอง DMK-BOX-01",
    titleEn: "Mock Document Box DMK-BOX-01",
    description:
      "กล่องเอกสารจำลองพบบนโต๊ะ มีป้ายระบุรหัส DMK-BOX-01 และรายการเอกสารภายใน 12 แฟ้ม (ข้อมูลฝึกอบรม)",
    source: "ห้องเก็บหลักฐานจำลอง — บันทึกรับเข้า",
    correctClass: "fact",
    hint: "เป็นสิ่งที่บันทึกและตรวจสอบได้จากเอกสาร/ป้ายกำกับ",
    position: [-1.4, 0.55, 0.1],
    color: "#8B5E3C",
  },
  {
    id: "er3d-laptop",
    objectType: "laptop",
    title: "คอมพิวเตอร์พกพา — บันทึกล็อกอินระบบคลังจำลอง",
    titleEn: "Laptop — Mock Warehouse Login Log",
    description:
      "เครื่องคอมพิวเตอร์จำลองเปิดอยู่ แสดงบันทึกล็อกอินระบบคลัง DMK-WH-07 เวลา 07:48 (ยังไม่ยืนยันผู้ใช้จริง)",
    source: "ระบบคลังจำลอง — หน้าจอเทรนนิ่ง",
    correctClass: "requires_verification",
    hint: "มีข้อมูล แต่ยังต้องตรวจสอบความถูกต้องและเจ้าของบัญชีก่อนใช้สรุป",
    position: [-0.5, 0.52, -0.15],
    color: "#4B5563",
  },
  {
    id: "er3d-phone",
    objectType: "phone",
    title: "โทรศัพท์จำลอง — ข้อความ 'นัดส่งของวันศุกร์'",
    titleEn: "Mock Phone — Message: 'Delivery Friday'",
    description:
      "โทรศัพท์จำลองมีข้อความ: 'นัดส่งของวันศุกร์' จากผู้ติดต่อที่บันทึกว่า 'คุณซี เทรนนิ่ง' (ยังไม่ยืนยันความเกี่ยวข้องกับเหตุ)",
    source: "อุปกรณ์จำลอง — ข้อความภายในเครื่อง",
    correctClass: "suspicion",
    hint: "เป็นข้อมูลที่น่าสนใจ แต่ยังไม่ถึงขั้นข้อเท็จจริง",
    position: [0.2, 0.5, 0.2],
    color: "#1F2937",
  },
  {
    id: "er3d-receipts",
    objectType: "receipt_stack",
    title: "ใบเสร็จจำลอง 4 ใบ — ยอดรวม 1,200 บาท",
    titleEn: "Mock Receipt Stack — 1,200 THB Total",
    description:
      "ใบเสร็จจำลอง 4 ใบจากร้าน DMK Supply ยอดรวม 1,200 บาท วันที่ตรงกับบันทึกรับของจำลอง",
    source: "เอกสารจำลอง — ร้าน DMK Supply",
    correctClass: "fact",
    hint: "เอกสารที่อ่านและตรวจสอบได้โดยตรง",
    position: [0.9, 0.52, -0.05],
    color: "#F3F4F6",
  },
  {
    id: "er3d-folder",
    objectType: "case_folder",
    title: "แฟ้ม LAB-3D-2026-001 — แผนตรวจสอบถัดไป",
    titleEn: "Folder LAB-3D-2026-001 — Next Check Plan",
    description:
      "แฟ้มจำลองระบุแผนตรวจสอบ: เปรียบเทียบบันทึก RFID กับใบขนจำลองก่อนสรุป (ขั้นตอนฝึกอบรม)",
    source: "แฟ้มแผนปฏิบัติการจำลอง",
    correctClass: "recommended_next_step",
    hint: "เป็นแนวทางปฏิบัติ ไม่ใช่ข้อเท็จจริงหรือข้อสงสัยโดยตรง",
    position: [1.5, 0.5, 0.15],
    color: "#1e3a8a",
  },
];

export function getEvidenceRoom3DItem(id: string) {
  return evidenceRoom3DItems.find((item) => item.id === id);
}