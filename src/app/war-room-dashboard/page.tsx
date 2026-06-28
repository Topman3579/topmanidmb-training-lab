import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "War Room Dashboard Blueprint",
  description: "ต้นแบบแนวคิด Dashboard / Command Center / Executive War Room สำหรับ TOPMAN AI Academy",
};

const dashboardZones = [
  {
    title: "Executive Snapshot",
    thai: "ภาพรวมผู้บังคับบัญชา",
    detail: "แสดงสถานะภารกิจ KPI สำคัญ ความคืบหน้า ความเสี่ยง และข้อสั่งการที่ต้องตัดสินใจทันที",
  },
  {
    title: "Case Timeline",
    thai: "ลำดับเหตุการณ์",
    detail: "เรียงเหตุการณ์ตามวันเวลา แยกข้อมูลยืนยันแล้วกับข้อมูลที่ต้องตรวจสอบเพิ่มเติม",
  },
  {
    title: "Entity Network",
    thai: "เครือข่ายบุคคล/นิติบุคคล",
    detail: "เชื่อมโยง actor, company, account, phone, address, vehicle, domain และหลักฐานประกอบ",
  },
  {
    title: "Evidence Board",
    thai: "กระดานหลักฐาน",
    detail: "รวมเอกสาร ภาพ แหล่งอ้างอิง source reliability และสถานะการตรวจพิสูจน์",
  },
  {
    title: "Risk & Red Flag",
    thai: "ความเสี่ยง / จุดผิดปกติ",
    detail: "จัดลำดับความเสี่ยง สีสถานะ และประเด็นที่ต้องเร่งดำเนินการ",
  },
  {
    title: "Action Queue",
    thai: "รายการสั่งการ",
    detail: "ระบุผู้รับผิดชอบ กำหนดเวลา สถานะ และผลการดำเนินการถัดไป",
  },
];

const kpis = [
  "คดี/เป้าหมายทั้งหมด",
  "เป้าหมายเสี่ยงสูง",
  "เอกสารที่ตรวจแล้ว",
  "รายการต้องตรวจเพิ่ม",
  "หมาย/คำสั่งที่ต้องติดตาม",
  "เส้นทางเงิน/บัญชีที่เชื่อมโยง",
  "ความคืบหน้ารายหน่วย",
  "ข้อสั่งการค้างดำเนินการ",
];

const dataLayers = [
  "Case file / incident record",
  "RAG knowledge base",
  "OSINT source index",
  "Timeline database",
  "Entity / relationship graph",
  "Evidence and attachment index",
  "Action log / task tracker",
  "Executive brief archive",
];

const promptTemplates = [
  {
    title: "ออกแบบ Dashboard จากข้อมูลคดี",
    text:
      "จากข้อมูลที่ให้มา ให้ออกแบบ War Room Dashboard โดยแยกเป็น 1) KPI cards 2) timeline 3) entity network 4) evidence board 5) risk table 6) action queue และระบุว่าข้อมูลใดยังไม่พอสำหรับแสดงผล ห้ามเดาข้อมูลที่ไม่มีหลักฐาน",
  },
  {
    title: "ทำสรุปผู้บังคับบัญชาจาก Dashboard",
    text:
      "สรุปข้อมูลจาก dashboard เป็น Executive Brief 1 หน้า แยก สถานการณ์ปัจจุบัน, ประเด็นเสี่ยง, ความคืบหน้า, สิ่งที่ต้องตัดสินใจ, next action และข้อมูลที่ต้องตรวจเพิ่ม ใช้ภาษาไทยทางการ กระชับ",
  },
  {
    title: "ตรวจความพร้อมข้อมูลก่อนขึ้นจอ War Room",
    text:
      "ตรวจ checklist ความพร้อมของข้อมูลก่อนขึ้น War Room แยกเป็น complete, incomplete, conflicting, needs verification และ sensitive data risk พร้อมข้อเสนอการแก้ไขก่อนเผยแพร่",
  },
];

const guardrails = [
  "Dashboard ต้องแยกข้อมูลยืนยันแล้วกับข้อมูลที่ยังต้องตรวจสอบ",
  "ทุก KPI สำคัญต้องมีแหล่งข้อมูลและเวลาอัปเดต",
  "ข้อมูลลับต้องควบคุมสิทธิ์ ไม่เปิดใน public deployment",
  "หลีกเลี่ยงการแสดงข้อมูลส่วนบุคคลเกินจำเป็น",
  "ใช้สีแดงเฉพาะความเสี่ยงจริง ไม่ใช้จนเสียความหมาย",
  "ผู้บังคับบัญชาต้องเห็น next action ภายใน 30 วินาที",
  "Human Judgment Final ก่อนสั่งการจริง",
];

const layoutRules = [
  { label: "บนสุด", value: "Executive KPI + Mission Status" },
  { label: "ซ้าย", value: "Timeline / Action Queue" },
  { label: "กลาง", value: "Network / Map / Evidence Focus" },
  { label: "ขวา", value: "Risk / Red Flag / Decision Panel" },
  { label: "ล่าง", value: "Source / Update Log / Verification" },
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

export default function WarRoomDashboardPage() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <section className="lab-card overflow-hidden">
        <div className="grid gap-0 lg:grid-cols-[1fr_0.85fr]">
          <div className="p-7 sm:p-10">
            <p className="lab-kicker">TOPMAN AI Academy · Command Center Track</p>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-navy-900 sm:text-5xl">
              War Room Dashboard Blueprint สำหรับงานสั่งการ วิเคราะห์ และสรุปผู้บริหาร
            </h1>
            <div className="mt-5 h-px w-16 bg-gold" />
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-navy-700 sm:text-lg">
              ต้นแบบแนวคิด Dashboard / Command Center ที่เชื่อมข้อมูลจาก RAG, OSINT, Timeline, Evidence และ Action Queue
              เพื่อให้ผู้บังคับบัญชาเห็นสถานการณ์ ความเสี่ยง และข้อสั่งการถัดไปได้อย่างรวดเร็ว
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="lab-mission-badge">Executive View</span>
              <span className="lab-mission-badge">Decision Ready</span>
              <span className="lab-mission-badge">Verification Layer</span>
            </div>
          </div>
          <div className="border-t border-navy-900/10 bg-gradient-to-br from-navy-900 to-navy-800 p-7 text-ivory-50 lg:border-l lg:border-t-0 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-400">Core Rule</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-ivory-50">เห็นเร็ว · ตรวจได้ · สั่งการต่อได้</h2>
            <p className="mt-4 text-sm leading-relaxed text-ivory-100">
              Dashboard ที่ดีไม่ใช่แค่สวย แต่ต้องตอบได้ว่า ข้อมูลมาจากไหน อัปเดตเมื่อไร เสี่ยงตรงไหน และต้องทำอะไรต่อ
            </p>
            <Link href="/academy/" className="mt-6 inline-flex rounded-xl bg-gold px-5 py-2.5 text-sm font-semibold text-navy-900 transition hover:bg-gold-light">
              กลับ Academy Hub →
            </Link>
          </div>
        </div>
      </section>

      <section className="lab-card p-6 sm:p-8">
        <SectionTitle kicker="Dashboard Zones" title="6 พื้นที่หลักของ War Room Dashboard" desc="ใช้เป็นโครงหน้าแรกสำหรับ Command Center ที่ต้องสรุปสถานการณ์ได้ในจอเดียว" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {dashboardZones.map((zone, index) => (
            <article key={zone.title} className="rounded-2xl border border-navy-900/10 bg-ivory-50 p-5 shadow-card">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-600">{zone.title}</p>
                  <h3 className="mt-2 font-display text-xl font-semibold text-navy-900">{zone.thai}</h3>
                </div>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-sm font-bold text-ivory-50">{index + 1}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-navy-700">{zone.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="lab-card p-6 sm:p-8">
          <SectionTitle kicker="KPI Cards" title="ตัวชี้วัดที่ควรมี" />
          <div className="grid gap-3 sm:grid-cols-2">{kpis.map((item) => <div key={item} className="rounded-xl border border-navy-900/10 bg-ivory-50 p-3 text-sm font-medium text-navy-700">{item}</div>)}</div>
        </div>
        <div className="lab-card border-gold-400/40 bg-gradient-to-br from-brand-50 to-paper p-6 sm:p-8">
          <SectionTitle kicker="Data Layers" title="ชั้นข้อมูลที่ควรเชื่อม" />
          <div className="grid gap-3 sm:grid-cols-2">{dataLayers.map((item) => <div key={item} className="rounded-xl border border-navy-900/10 bg-paper p-3 text-sm font-medium text-navy-700">{item}</div>)}</div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lab-card p-6 sm:p-8">
          <SectionTitle kicker="Screen Layout" title="ตำแหน่งการจัดวางบนจอ" />
          <div className="space-y-3">{layoutRules.map((item) => <div key={item.label} className="flex gap-3 rounded-xl border border-navy-900/10 bg-ivory-50 p-4 text-sm text-navy-700"><span className="min-w-14 rounded-lg bg-navy-900 px-2 py-1 text-center text-xs font-bold text-ivory-50">{item.label}</span><span className="font-medium">{item.value}</span></div>)}</div>
        </div>
        <div className="lab-card p-6 sm:p-8">
          <SectionTitle kicker="Prompt Templates" title="Prompt สำหรับออกแบบ/ตรวจ Dashboard" />
          <div className="space-y-4">{promptTemplates.map((item) => <article key={item.title} className="rounded-2xl border border-navy-900/10 bg-ivory-50 p-5 shadow-card"><h3 className="font-display text-xl font-semibold text-navy-900">{item.title}</h3><p className="mt-3 rounded-xl border border-navy-900/10 bg-paper p-4 text-sm leading-relaxed text-navy-700">{item.text}</p></article>)}</div>
        </div>
      </section>

      <section className="lab-card border-gold-400/40 bg-gradient-to-br from-brand-50 to-paper p-6 sm:p-8">
        <SectionTitle kicker="Guardrails" title="กติกาก่อนขึ้นจอ War Room" />
        <div className="grid gap-3 md:grid-cols-2">{guardrails.map((rule) => <div key={rule} className="flex gap-3 rounded-xl border border-navy-900/10 bg-paper p-3 text-sm text-navy-700"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lab-success text-xs font-bold text-white">✓</span><span>{rule}</span></div>)}</div>
      </section>
    </div>
  );
}
