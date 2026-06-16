import type { Scenario } from "@/lib/types";

export const lab2026002: Scenario = {
  id: "lab-2026-002",
  code: "LAB-2026-002",
  title: "รูปแบบการโอนจำลองในบริษัท ดีมอค โลจิสติกส์",
  titleEn: "Simulated Transfer Pattern at Demo Logistics Co.",
  difficulty: "intermediate",
  estMinutes: 10,
  learningObjectives: [
    "แยกสิ่งที่สรุปจากบัญชีจำลองออกจากสิ่งที่เห็นจริง",
    "เรียงเหตุการณ์ทางการเงินจำลองให้ถูกลำดับ",
    "จับข้อสรุป AI ที่อ้างตัวเลขเกินหลักฐาน",
  ],
  briefing:
    "บริษัท ดีมอค โลจิสติกส์ จำกัด (ข้อมูลจำลอง) แจ้งพบการโอนเงินรูปแบบเดียวกัน 4 ครั้งในบัญชีจำลอง DMK-FIN-09 ภายใน 7 วัน คุณได้รับสำเนาบันทึกธนาคารจำลอง รายงานสต็อกจำลอง และสรุป AI จากระบบฝึก",
  briefingEn:
    "Demo Logistics Co. (fictional) reports four similar transfers in mock account DMK-FIN-09 within seven days. Review mock bank logs, inventory notes, and a training AI summary.",
  phases: [
    {
      type: "evidence",
      title: "จัดประเภทหลักฐาน",
      titleEn: "Classify Evidence",
      payload: [
        {
          id: "e1",
          label: "สำเนาบันทึกโอน 12,000 บาท × 4 ครั้ง ไปบัญชี DMK-999",
          source: "ธนาคารจำลอง",
          correctClass: "observable",
          hint: "เป็นข้อมูลจากเอกสาร/ระบบจำลองโดยตรง",
          isTrap: false,
        },
        {
          id: "e2",
          label: "ยอดสต็อกลดลงหลังวันที่โอนครั้งที่ 2",
          source: "สรุปจากรายงานสต็อกจำลอง",
          correctClass: "derived",
          hint: "สรุปจากการเปรียบเทียบรายงาน",
          isTrap: false,
        },
        {
          id: "e3",
          label: "ผู้บริหารจำลอง 'น่าจะรู้เรื่อง' เพราะเป็นคนอนุมัติ",
          source: "ความเห็นทีมฝึก",
          correctClass: "inferred",
          hint: "ยังเป็นการอนุมาน ต้องมีหลักฐานรองรับ",
          isTrap: false,
        },
        {
          id: "e4",
          label: "โพสต์โซเชียลจำลองบอกว่า 'โกงแน่นอน' โดยไม่มีเอกสาร",
          source: "โซเชียลจำลอง",
          correctClass: "noise",
          hint: "ความเห็นออนไลน์ไม่ใช่หลักฐาน",
          isTrap: true,
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
          label: "โอนครั้งที่ 1: 12,000 บาท ไป DMK-999",
          displayDate: "วันที่ 1",
          correctOrder: 1,
        },
        {
          id: "t2",
          label: "สต็อกสินค้าจำลองลดผิดปกติในรายงานรอบเย็น",
          displayDate: "วันที่ 2",
          correctOrder: 2,
        },
        {
          id: "t3",
          label: "โอนครั้งที่ 3–4 ในรูปแบบเดียวกัน",
          displayDate: "วันที่ 5–6",
          correctOrder: 3,
        },
        {
          id: "t4",
          label: "ฝ่ายบัญชีจำลองแจ้งเตือนรูปแบบซ้ำ",
          displayDate: "วันที่ 7",
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
          text: "ยืนยันแล้วว่า นางบี จำลอง เป็นผู้บงการทั้งหมด",
          hasFlag: true,
          flagType: "unsupported",
          explanation: "ยังไม่มีหลักฐานเชื่อมโยงถึงระดับ 'ยืนยัน'",
        },
        {
          id: "r2",
          text: "แนะนำขอสำเนาบันทึกธนาคารจำลองเพิ่มเติมก่อนสรุป",
          hasFlag: false,
          explanation: "ขั้นตอนที่เหมาะสมในบทฝึก",
        },
        {
          id: "r3",
          text: "ระบุยอดรวม 480,000 บาท ทั้งที่บันทึกจำลองรวม 48,000 บาท",
          hasFlag: true,
          flagType: "hallucination",
          explanation: "ตัวเลขไม่ตรงหลักฐานจำลอง",
        },
        {
          id: "r4",
          text: "ใส่เบอร์ 09X-XXX-XXXX ของผู้ต้องสงสัยในสรุป",
          hasFlag: true,
          flagType: "pii",
          explanation: "ไม่ควรใส่เบอร์โทรในสรุปที่แชร์กว้าง",
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
          label: "ทำตารางเปรียบเทียบโอนเงิน + สต็อกจำลอง แล้วขอเอกสารเพิ่ม",
          isBest: true,
          feedback: "ดี — สอดคล้องหลักรวบรวมและตรวจสอบก่อนสรุป",
          scoreDelta: 0,
        },
        {
          id: "d2",
          label: "สรุปผลเป็นคดีฉ้อโกงทันที",
          isBest: false,
          feedback: "สรุปเร็วเกินไป — ยังอยู่ในขั้นวิเคราะห์",
          scoreDelta: -35,
        },
        {
          id: "d3",
          label: "อัปโหลดบันทึกจำลองทั้งหมดให้ AI สาธารณะวิเคราะห์",
          isBest: false,
          feedback: "เสี่ยงข้อมูลและไม่ผ่านกระบวนการตรวจสอบ",
          scoreDelta: -45,
        },
      ],
    },
  ],
};