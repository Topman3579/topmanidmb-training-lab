import type { Scenario } from "@/lib/types";

export const lab2026001: Scenario = {
  id: "lab-2026-001",
  code: "LAB-2026-001",
  title: "เอกสารหายในห้องเก็บหลักฐานจำลอง",
  titleEn: "Missing File in the Mock Evidence Room",
  difficulty: "beginner",
  estMinutes: 8,
  learningObjectives: [
    "แยกข้อมูลที่สังเกตได้จากสิ่งที่ยังเป็นการอนุมาน",
    "เรียงลำดับเหตุการณ์จากหลักฐาน ไม่ใช่จากข่าวลือ",
    "ตรวจผลสรุป AI ก่อนนำไปใช้",
  ],
  briefing:
    "หน่วยฝึก LAB แจ้งว่าแฟ้มจำลองหมายเลข DMK-001 หายจากตู้เก็บในห้องซ้อม A ภายใน 24 ชั่วโมง มีกล้องจำลอง 3 จุด และบันทึกการเซ็นรับ-ส่งจำลอง 2 รายการ ภารกิจของคุณคือจัดประเภทหลักฐาน เรียงเหตุการณ์ ตรวจสรุป AI และเลือกขั้นตอนถัดไป",
  briefingEn:
    "The LAB training unit reports mock folder DMK-001 missing from simulator room A within 24 hours. Three simulated cameras and two mock sign-in logs exist. Classify evidence, order events, review an AI summary, and pick the next step.",
  phases: [
    {
      type: "evidence",
      title: "จัดประเภทหลักฐาน",
      titleEn: "Classify Evidence",
      payload: [
        {
          id: "e1",
          label: "บันทึกกล้องจำลอง: นายเอ ตัวอย่าง เข้าห้อง 08:12",
          source: "ระบบ CCTV จำลอง",
          correctClass: "observable",
          hint: "เป็นภาพ/บันทึกที่ตรวจสอบได้โดยตรง",
          isTrap: false,
        },
        {
          id: "e2",
          label: "เพื่อนร่วมฝึกบอกว่า 'น่าจะเป็นคนเดียวกับเมื่อวาน'",
          source: "คำพูดภายในห้องซ้อม",
          correctClass: "inferred",
          hint: "ยังไม่มีหลักฐานรองรับโดยตรง",
          isTrap: false,
        },
        {
          id: "e3",
          label: "สรุปว่าแฟ้มถูกขายต่อแล้ว เพราะเห็นโพสต์ในห้องแชทจำลอง",
          source: "ข่าวลือในกลุ่มฝึก",
          correctClass: "noise",
          hint: "ข่าวลือไม่ใช่หลักฐาน",
          isTrap: true,
        },
        {
          id: "e4",
          label: "เวลาเซ็นรับล่าสุดตรงกับช่วงที่แฟ้มยังอยู่ในตู้",
          source: "สรุปจากบันทึกเซ็นรับจำลอง",
          correctClass: "derived",
          hint: "มาจากการอ่านบันทึก ไม่ใช่เห็นด้วยตา",
          isTrap: false,
        },
      ],
    },
    {
      type: "timeline",
      title: "เรียงลำดับเหตุการณ์",
      titleEn: "Order Events",
      payload: [
        {
          id: "t1",
          label: "แฟ้ม DMK-001 อยู่ในตู้ตามบันทึกเช็คสต็อกจำลอง",
          displayDate: "วันจันทร์ 07:30",
          correctOrder: 1,
        },
        {
          id: "t2",
          label: "นายเอ ตัวอย่าง เซ็นรับเข้าห้องเก็บหลักฐานจำลอง",
          displayDate: "วันอังคาร 08:12",
          correctOrder: 2,
        },
        {
          id: "t3",
          label: "พบว่าแฟ้มไม่อยู่ในตู้ระหว่างเช็คสต็อกรอบเย็น",
          displayDate: "วันอังคาร 17:45",
          correctOrder: 3,
        },
        {
          id: "t4",
          label: "หน่วยฝึกเปิดรายงานเหตุการณ์ในระบบ LAB",
          displayDate: "วันอังคาร 18:10",
          correctOrder: 4,
        },
      ],
    },
    {
      type: "redflag",
      title: "ตรวจสรุป AI จำลอง",
      titleEn: "Review Simulated AI Output",
      payload: [
        {
          id: "r1",
          text: "สรุป: นายเอ ตัวอย่าง น่าจะเป็นผู้นำแฟ้มออกไป",
          hasFlag: true,
          flagType: "unsupported",
          explanation: "ข้อสรุป 'น่าจะเป็น' ยังไม่มีหลักฐานเพียงพอ",
        },
        {
          id: "r2",
          text: "ระบุเลขบัตร X-0000-0000 ของผู้เกี่ยวข้องในบันทึกนี้",
          hasFlag: true,
          flagType: "pii",
          explanation: "ไม่ควรใส่ตัวระบุส่วนบุคคลในสรุปที่แชร์กว้าง",
        },
        {
          id: "r3",
          text: "แนะนำให้ตรวจบันทึกกล้องจำลองช่วง 08:00–18:00 ก่อน",
          hasFlag: false,
          explanation: "เป็นขั้นตอนที่ตรวจสอบได้และเหมาะสม",
        },
        {
          id: "r4",
          text: "ยืนยันแล้วว่าแฟ้มถูกทำลายเมื่อวาน",
          hasFlag: true,
          flagType: "hallucination",
          explanation: "AI อ้างข้อเท็จที่ไม่มีในหลักฐาน",
        },
      ],
    },
    {
      type: "decision",
      title: "เลือกขั้นตอนถัดไป",
      titleEn: "Choose Next Step",
      payload: [
        {
          id: "d1",
          label: "รวบรวมบันทึกกล้องจำลอง + เซ็นรับ แล้วทำตารางเวลา",
          isBest: true,
          feedback: "ถูกต้อง — เริ่มจากหลักฐานที่ตรวจสอบได้ก่อน",
          scoreDelta: 0,
        },
        {
          id: "d2",
          label: "สั่งควบคุมตัวนายเอ ตัวอย่างทันที",
          isBest: false,
          feedback: "เร็วเกินไป — ยังไม่มีหลักฐานเพียงพอสำหรับขั้นตอนนี้ในบทฝึก",
          scoreDelta: -30,
        },
        {
          id: "d3",
          label: "เผยแพร่สรุป AI ให้กลุ่มฝึกทั้งหมด",
          isBest: false,
          feedback: "เสี่ยงรั่วข้อมูลและสรุปที่ยังไม่ยืนยัน",
          scoreDelta: -40,
        },
      ],
    },
  ],
};