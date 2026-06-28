import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Executive Brief System",
  description: "ระบบสรุปผู้บังคับบัญชา 1 หน้า + ฉบับละเอียด สำหรับ TOPMAN AI Academy",
};

const briefBlocks = [
  {
    title: "Issue",
    thai: "เรื่อง / ปัญหา",
    detail: "ระบุประเด็นหลักให้ชัดใน 1–2 บรรทัด ว่าเรื่องนี้เกี่ยวกับอะไร ต้องการให้ผู้บังคับบัญชาทราบหรือตัดสินใจเรื่องใด",
  },
  {
    title: "Facts",
    thai: "ข้อเท็จจริง",
    detail: "เรียงเฉพาะข้อมูลที่ตรวจสอบได้ พร้อมแหล่งที่มา วันที่ และสถานะการยืนยัน หลีกเลี่ยงการปะปนกับความเห็น",
  },
  {
    title: "Analysis",
    thai: "การวิเคราะห์",
    detail: "อธิบายความหมายของข้อเท็จจริง ความเชื่อมโยง รูปแบบผิดปกติ และผลกระทบ โดยแยกจากข้อเท็จจริงให้ชัด",
  },
  {
    title: "Risk",
    thai: "ความเสี่ยง",
    detail: "ประเมินความเสี่ยงด้านเวลา กฎหมาย ภาพลักษณ์ ความเสียหาย ข้อมูลไม่ครบ และความเร่งด่วน",
  },
  {
    title: "Options",
    thai: "ทางเลือก",
    detail: "เสนอ 2–3 ทางเลือกพร้อมข้อดี ข้อเสีย ผลกระทบ และเงื่อนไขที่ต้องพิจารณา",
  },
  {
    title: "Recommendation",
    thai: "ข้อเสนอแนะ",
    detail: "เสนอแนวทางที่เหมาะสมที่สุด พร้อมเหตุผลและ next action ที่ทำต่อได้ทันที",
  },
];

const outputs = [
  "ฉบับ 1 หน้า สำหรับผู้บังคับบัญชา",
  "ฉบับละเอียดสำหรับทีมปฏิบัติ",
  "ตารางข้อเท็จจริงและแหล่งอ้างอิง",
  "Timeline สำคัญ",
  "Risk / Red Flag Matrix",
  "Next Action Checklist",
  "ข้อความส่งไลน์แบบย่อ",
  "Talking Points สำหรับบรีฟปากเปล่า",
];

const promptTemplates = [
  {
    title: "สรุปผู้บังคับบัญชา 1 หน้า",
    text:
      "จัดทำ Executive Brief 1 หน้า จากข้อมูลที่ให้มาเท่านั้น โครงสร้าง: เรื่อง, สาระสำคัญ, ข้อเท็จจริง, การวิเคราะห์, ความเสี่ยง, ทางเลือก, ข้อเสนอแนะ, next action ใช้ภาษาไทยทางการ กระชับ พร้อมระบุข้อมูลที่ยังต้องตรวจสอบเพิ่ม ห้ามเดาข้อมูลที่ไม่มีหลักฐาน",
  },
  {
    title: "ฉบับละเอียดสำหรับทีมทำงาน",
    text:
      "จัดทำรายงานฉบับละเอียดสำหรับทีมปฏิบัติ แยกเป็น background, facts, timeline, actors, evidence index, analysis, risk, action plan, owner, deadline และ open questions โดยแยก fact / inference / recommendation ให้ชัด",
  },
  {
    title: "แปลงเป็นข้อความส่งไลน์",
    text:
      "สรุปข้อมูลนี้เป็นข้อความส่งไลน์ผู้บังคับบัญชา ความยาวไม่เกิน 10 บรรทัด เน้นประเด็นสำคัญ ความคืบหน้า ความเสี่ยง และสิ่งที่ขออนุมัติ/ขอสั่งการ ใช้ภาษาทางการ กระชับ อ่านง่าย",
  },
];

const qualityChecks = [
  "ทุกข้อเท็จจริงต้องตรวจที่มาได้",
  "แยกข้อเท็จจริง / วิเคราะห์ / ข้อเสนอแนะ",
  "ระบุสิ่งที่ยังไม่พบหรือยังไม่ยืนยัน",
  "ไม่มีข้อมูลส่วนบุคคลเกินจำเป็นในฉบับส่งต่อ",
  "หัวข้อสำคัญต้องอ่านเข้าใจภายใน 30 วินาที",
  "มี next action ที่ชัดเจนพร้อมผู้รับผิดชอบ",
  "ใช้ภาษาไทยทางการ กระชับ ไม่กำกวม",
];

const formats = [
  { label: "One Page", value: "สำหรับผู้บังคับบัญชา / บรีฟเร็ว" },
  { label: "Detailed", value: "สำหรับทีมปฏิบัติ / ใช้ทำงานต่อ" },
  { label: "Line", value: "ข้อความส่งไลน์ / แจ้งสั้น" },
  { label: "Deck", value: "สไลด์หรือภาพประกอบการประชุม" },
];

function SectionTitle({ kicker, title, desc }: { kicker: string; title: string; desc?: string }) {
  return (
    <div className="mb-5">
      <p className="lab-kicker">{kicker}</p>
      <h2 className="mt-2 font-display text-2xl font-semibold text-navy-900 sm:text-3xl">{title}</h2>
      {desc ? <p className="mt-2 max-w-3xl text-sm leading-relaxed text-navy-700 sm:text-base">{desc}</p> : null}
    </div>
  );
}

export default function ExecutiveBriefSystemPage() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <section className="lab-card overflow-hidden">
        <div className="grid gap-0 lg:grid-cols-[1fr_0.85fr]">
          <div className="p-7 sm:p-10">
            <p className="lab-kicker">TOPMAN AI Academy · Executive Track</p>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-navy-900 sm:text-5xl">
              Executive Brief System สำหรับสรุปผู้บังคับบัญชา 1 หน้า + ฉบับละเอียด
            </h1>
            <div className="mt-5 h-px w-16 bg-gold" />
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-navy-700 sm:text-lg">
              ระบบจัดรูปแบบข้อมูลให้พร้อมเสนอผู้บังคับบัญชา โดยยึดหลักข้อเท็จจริงก่อน วิเคราะห์แยกส่วน และจบด้วยข้อเสนอแนะพร้อม next action
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="lab-mission-badge">One Page Brief</span>
              <span className="lab-mission-badge">Detailed Report</span>
              <span className="lab-mission-badge">Decision Ready</span>
            </div>
          </div>
          <div className="border-t border-navy-900/10 bg-gradient-to-br from-navy-900 to-navy-800 p-7 text-ivory-50 lg:border-l lg:border-t-0 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-400">Core Rule</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-ivory-50">สั้นพอให้ตัดสินใจ · ละเอียดพอให้ตรวจสอบ</h2>
            <p className="mt-4 text-sm leading-relaxed text-ivory-100">
              Brief ที่ดีต้องบอกได้ว่า เรื่องคืออะไร ข้อเท็จจริงคืออะไร เสี่ยงตรงไหน และต้องสั่งการอะไรต่อ
            </p>
            <Link href="/academy/" className="mt-6 inline-flex rounded-xl bg-gold px-5 py-2.5 text-sm font-semibold text-navy-900 transition hover:bg-gold-light">
              กลับ Academy Hub →
            </Link>
          </div>
        </div>
      </section>

      <section className="lab-card p-6 sm:p-8">
        <SectionTitle kicker="Brief Structure" title="โครงสร้าง 6 ส่วนของ Executive Brief" desc="ใช้เป็นแม่แบบกลางสำหรับรายงาน 1 หน้าและฉบับละเอียด" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {briefBlocks.map((block, index) => (
            <article key={block.title} className="rounded-2xl border border-navy-900/10 bg-ivory-50 p-5 shadow-card">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-600">{block.title}</p>
                  <h3 className="mt-2 font-display text-xl font-semibold text-navy-900">{block.thai}</h3>
                </div>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-sm font-bold text-ivory-50">{index + 1}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-navy-700">{block.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="lab-card p-6 sm:p-8">
          <SectionTitle kicker="Outputs" title="ผลลัพธ์ที่ระบบควรผลิตได้" />
          <div className="grid gap-3 sm:grid-cols-2">{outputs.map((item) => <div key={item} className="rounded-xl border border-navy-900/10 bg-ivory-50 p-3 text-sm font-medium text-navy-700">{item}</div>)}</div>
        </div>
        <div className="lab-card border-gold-400/40 bg-gradient-to-br from-brand-50 to-paper p-6 sm:p-8">
          <SectionTitle kicker="Formats" title="รูปแบบใช้งาน" />
          <div className="space-y-3">{formats.map((item) => <div key={item.label} className="flex gap-3 rounded-xl border border-navy-900/10 bg-paper p-4 text-sm text-navy-700"><span className="min-w-20 rounded-lg bg-navy-900 px-2 py-1 text-center text-xs font-bold text-ivory-50">{item.label}</span><span className="font-medium">{item.value}</span></div>)}</div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="lab-card p-6 sm:p-8">
          <SectionTitle kicker="Prompt Templates" title="Prompt สำหรับสร้าง Brief" />
          <div className="space-y-4">{promptTemplates.map((item) => <article key={item.title} className="rounded-2xl border border-navy-900/10 bg-ivory-50 p-5 shadow-card"><h3 className="font-display text-xl font-semibold text-navy-900">{item.title}</h3><p className="mt-3 rounded-xl border border-navy-900/10 bg-paper p-4 text-sm leading-relaxed text-navy-700">{item.text}</p></article>)}</div>
        </div>
        <div className="lab-card p-6 sm:p-8">
          <SectionTitle kicker="Quality Gate" title="Checklist ก่อนส่ง" />
          <ul className="space-y-3">{qualityChecks.map((rule) => <li key={rule} className="flex gap-3 rounded-xl border border-navy-900/10 bg-ivory-50 p-3 text-sm text-navy-700"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lab-success text-xs font-bold text-white">✓</span><span>{rule}</span></li>)}</ul>
        </div>
      </section>
    </div>
  );
}
