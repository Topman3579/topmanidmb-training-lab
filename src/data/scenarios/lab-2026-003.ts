import type { Scenario } from "@/lib/types";

export const lab2026003: Scenario = {
  id: "lab-2026-003",
  code: "LAB-2026-003",
  title: "เส้นทางสินค้าหายในคลังจำลองเซนทรัล",
  titleEn: "Missing Shipment Trail in Central Mock Warehouse",
  difficulty: "advanced",
  estMinutes: 12,
  learningObjectives: [
    "จัดการหลักฐานหลายชั้นในคดีจำลองที่ซับซ้อน",
    "เรียงเหตุการณ์ข้ามแหล่งข้อมูลจำลอง",
    "ตรวจ AI ที่ผสมข้อเท็จจริงกับข้อสมมติ",
    "เลือกทางดำเนินการที่สมดุลระหว่างความเร็วและความถูกต้อง",
  ],
  briefing:
    "คลังจำลองเซนทรัล DMK-WH-07 แจ้งพัสดุชุดฝึก 18 รายการหายระหว่างโอนย้ายจากโซน A ไปโซน B มีบันทึก RFID จำลอง ใบขนจำลอง สรุป AI จากระบบฝึก และบันทึกการสัมภาษณ์คุณซี เทรนนิ่ง (พยานจำลอง)",
  briefingEn:
    "Central mock warehouse DMK-WH-07 reports 18 training parcels missing during transfer from zone A to B. Review mock RFID logs, shipping docs, AI summary, and a mock witness note.",
  phases: [
    {
      type: "evidence",
      title: "จัดประเภทหลักฐาน",
      titleEn: "Classify Evidence",
      payload: [
        {
          id: "e1",
          label: "สแกน RFID จำลอง: พัสดุ 12 รายการผ่านประตูโซน B",
          source: "ระบบ RFID จำลอง",
          correctClass: "observable",
          hint: "บันทึกระบบโดยตรง",
          isTrap: false,
        },
        {
          id: "e2",
          label: "ใบขนจำลองระบุ 18 รายการออกจากโซน A",
          source: "เอกสารขนส่งจำลอง",
          correctClass: "observable",
          hint: "เอกสารต้นฉบับจำลอง",
          isTrap: false,
        },
        {
          id: "e3",
          label: "คำนวณว่าขาด 6 รายการจากผลต่าง 18 กับ 12",
          source: "สรุปทีมฝึก",
          correctClass: "derived",
          hint: "มาจากการคำนวณจากสองแหล่ง",
          isTrap: false,
        },
        {
          id: "e4",
          label: "คุณซี เทรนนิ่ง 'น่าจะเอาไปเอง' เพราะเคยมาสาย",
          source: "ความเห็นพยานจำลอง",
          correctClass: "inferred",
          hint: "ยังเป็นการอนุมานจากพฤติกรรม",
          isTrap: false,
        },
        {
          id: "e5",
          label: "ข่าวลือภายในว่า 'โดนขโมยจากภายนอกแน่นอน'",
          source: "กลุ่มแชทจำลอง",
          correctClass: "noise",
          hint: "ข่าวลือไม่ช่วยพิสูจน์",
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
          label: "ออกใบขนจำลอง 18 รายการจากโซน A",
          displayDate: "06:40",
          correctOrder: 1,
        },
        {
          id: "t2",
          label: "รถขนจำลองออกจากโซน A",
          displayDate: "07:05",
          correctOrder: 2,
        },
        {
          id: "t3",
          label: "RFID จำลองบันทึก 12 รายการเข้าโซน B",
          displayDate: "07:52",
          correctOrder: 3,
        },
        {
          id: "t4",
          label: "พนักงานจำลองพบยอดไม่ตรงตอนรับเข้าโซน B",
          displayDate: "08:20",
          correctOrder: 4,
        },
        {
          id: "t5",
          label: "เปิดรายงานเหตุการณ์ในระบบ LAB",
          displayDate: "08:45",
          correctOrder: 5,
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
          text: "สรุปว่าคุณซี เทรนนิ่ง เป็นผู้กระทำผิดแน่นอน",
          hasFlag: true,
          flagType: "unsupported",
          explanation: "ข้อสรุปถึงบุคคลยังไม่มีหลักฐานเพียงพอ",
        },
        {
          id: "r2",
          text: "แนะนำเปรียบเทียบใบขนจำลองกับบันทึก RFID ก่อน",
          hasFlag: false,
          explanation: "แนวทางตรวจสอบที่ถูกต้อง",
        },
        {
          id: "r3",
          text: "ข้ามขั้นตอนลงบันทึกเหตุการณ์เพราะ 'ชัดเจนแล้ว'",
          hasFlag: true,
          flagType: "procedural",
          explanation: "ไม่ควรข้ามกระบวนการบันทึกในบทฝึก",
        },
        {
          id: "r4",
          text: "อ้างบัญชี 123-4-56789-0 ของผู้ต้องสงสัยในสรุป",
          hasFlag: true,
          flagType: "pii",
          explanation: "เลขบัญชีเป็นข้อมูลอ่อนไหว ไม่ควรอยู่ในสรุปกว้าง",
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
          label: "ทำแผนผังเส้นทางจำลอง + ตารางเปรียบเทียบ 18 vs 12 แล้วสัมภาษณ์ตามแผน",
          isBest: true,
          feedback: "สมดุลดี — รวบรวม เรียบเรียง วิเคราะห์ ก่อนสรุป",
          scoreDelta: 0,
        },
        {
          id: "d2",
          label: "ปิดโซน B ทั้งหมดและระบุต้นเหตุว่าโดนขโมยภายนอก",
          isBest: false,
          feedback: "สรุปเร็วและอาจกระทบการฝึกโดยไม่จำเป็น",
          scoreDelta: -30,
        },
        {
          id: "d3",
          label: "ส่งสรุป AI ให้หน่วยอื่นโดยไม่ตรวจเลขบัญชี/เบอร์ในข้อความ",
          isBest: false,
          feedback: "เสี่ยงรั่วข้อมูลอ่อนไหว",
          scoreDelta: -50,
        },
      ],
    },
  ],
};