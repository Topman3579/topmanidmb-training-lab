import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prompt Engineering สำหรับงานสืบสวน",
  description: "บทเรียน Prompt Engineering สำหรับ TOPMAN AI Academy เน้น Verification First และงานราชการ/สืบสวน",
};

const formula = [
  {
    title: "Role",
    thai: "บทบาทของ AI",
    detail: "กำหนดให้ AI ทำหน้าที่อะไร เช่น เลขานุการคดี นักวิเคราะห์ OSINT หรือผู้ช่วยจัดทำรายงาน",
  },
  {
    title: "Task",
    thai: "ภารกิจ",
    detail: "สั่งให้ทำอะไรให้ชัด เช่น สรุป ถอดข้อเท็จจริง วิเคราะห์ความเสี่ยง หรือออกแบบรายงาน",
  },
  {
    title: "Context",
    thai: "บริบท",
    detail: "ให้ข้อมูลพื้นฐาน ขอบเขต ระยะเวลา หน่วยงาน เอกสาร หรือข้อจำกัดที่เกี่ยวข้อง",
  },
  {
    title: "Evidence",
    thai: "หลักฐานอ้างอิง",
    detail: "ระบุว่าให้ยึดเฉพาะข้อมูลจากไฟล์ ข้อความ ตาราง หรือแหล่งข้อมูลที่ตรวจสอบได้",
  },
  {
    title: "Output",
    thai: "ผลลัพธ์ที่ต้องการ",
    detail: "กำหนดรูปแบบคำตอบ เช่น ส่งไลน์ รายงานราชการ ตาราง executive brief หรือ checklist",
  },
  {
    title: "Guardrails",
    thai: "ข้อห้าม / วิธีตรวจสอบ",
    detail: "ห้ามเดา ระบุสิ่งที่ยังไม่ยืนยัน แยกข้อเท็จจริงกับข้อสันนิษฐาน และเสนอสิ่งที่ต้องตรวจเพิ่ม",
  },
];

const templates = [
  {
    title: "สรุปเอกสารราชการ",
    prompt:
      "คุณคือผู้ช่วยจัดทำรายงานราชการ ให้สรุปเอกสารที่แนบโดยยึดเฉพาะข้อมูลในเอกสาร แยกเป็น 1) ประเด็นสำคัญ 2) ข้อเท็จจริง 3) ผู้เกี่ยวข้อง 4) กำหนดเวลา 5) สิ่งที่ต้องดำเนินการต่อ หากข้อมูลไม่พบในเอกสารให้ระบุว่า ‘ยังไม่พบข้อมูลในเอกสาร’ ห้ามเดา",
  },
  {
    title: "วิเคราะห์คดี / เส้นทางข้อมูล",
    prompt:
      "คุณคือผู้ช่วยวิเคราะห์ข้อมูลสืบสวน ให้เรียบเรียงข้อมูลที่ให้มาเป็น timeline, actor map, risk flag และประเด็นตรวจสอบเพิ่มเติม แยกข้อเท็จจริงที่ยืนยันแล้วออกจากข้อสงสัย ห้ามระบุชื่อหรือข้อมูลบุคคลที่ไม่ได้อยู่ในข้อมูลตั้งต้น",
  },
  {
    title: "ทำ Executive Brief",
    prompt:
      "จัดทำสรุปผู้บริหาร 1 หน้า โครงสร้าง: เรื่อง, สาระสำคัญ, ข้อเท็จจริง, การวิเคราะห์, ความเสี่ยง, ทางเลือก, ข้อเสนอแนะ และ next action ใช้ภาษาไทยทางการ กระชับ พร้อมใช้เสนอผู้บังคับบัญชา",
  },
  {
    title: "สร้าง Prompt สำหรับภาพ/โปสเตอร์",
    prompt:
      "ออกแบบ prompt สำหรับสร้างโปสเตอร์อินโฟกราฟิก ใช้ TOPMANIDMB AI Command Center brand: navy/gold/cyan, gold shield T emblem style, official executive layout, Thai typography readable, 3:4 ratio, no fake logo, use real logo asset if required",
  },
];

const guardrails = [
  "ข้อมูลไม่ชัด = ระบุว่าต้องตรวจสอบเพิ่ม",
  "ห้ามเดาชื่อ–นามสกุล หรือข้อมูลบุคคล",
  "แยกข้อเท็จจริง / ข้อสันนิษฐาน / ข้อเสนอแนะ",
  "ใช้หลักฐานมาก่อนความเร็ว",
  "งานสำคัญต้องมีขั้นตอนตรวจซ้ำ",
  "งาน public ห้ามใส่ข้อมูลลับหรือข้อมูลส่วนบุคคลโดยไม่จำเป็น",
];

const useCases = [
  "ถอดข้อความและสรุปเอกสาร",
  "วิเคราะห์เส้นทางเงิน / timeline",
  "จัดทำรายงานราชการ",
  "ออกแบบ Dashboard / War Room",
  "ทำโปสเตอร์ อินโฟกราฟิก และสไลด์",
  "สร้างคู่มือการทำงานของทีม",
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

export default function PromptEngineeringPage() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <section className="lab-card overflow-hidden">
        <div className="grid gap-0 lg:grid-cols-[1fr_0.85fr]">
          <div className="p-7 sm:p-10">
            <p className="lab-kicker">TOPMAN AI Academy · Core Skill</p>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-navy-900 sm:text-5xl">
              Prompt Engineering สำหรับงานสืบสวน วิเคราะห์ข้อมูล และรายงานราชการ
            </h1>
            <div className="mt-5 h-px w-16 bg-gold" />
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-navy-700 sm:text-lg">
              ทักษะหลักในการสั่ง AI ให้ทำงานได้แม่นยำ ตรวจสอบได้ และพร้อมใช้งานจริง โดยยึดหลัก Verification First,
              Evidence Over Assumption และ Human Judgment Final
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="lab-mission-badge">Verification First</span>
              <span className="lab-mission-badge">Evidence Over Assumption</span>
              <span className="lab-mission-badge">Official Output</span>
            </div>
          </div>
          <div className="border-t border-navy-900/10 bg-gradient-to-br from-navy-900 to-navy-800 p-7 text-ivory-50 lg:border-l lg:border-t-0 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-400">Master Formula</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-ivory-50">Role + Task + Context + Evidence + Output + Guardrails</h2>
            <p className="mt-4 text-sm leading-relaxed text-ivory-100">
              สูตรนี้ช่วยลดงานถามตอบซ้ำ ลดการเดา และทำให้ผลลัพธ์ออกมาเป็นรูปแบบที่ใช้งานจริงได้เร็วขึ้น
            </p>
            <Link href="/academy/" className="mt-6 inline-flex rounded-xl bg-gold px-5 py-2.5 text-sm font-semibold text-navy-900 transition hover:bg-gold-light">
              กลับ Academy Hub →
            </Link>
          </div>
        </div>
      </section>

      <section className="lab-card p-6 sm:p-8">
        <SectionTitle
          kicker="Prompt Framework"
          title="สูตร 6 ส่วนสำหรับสั่งงาน AI"
          desc="ใช้เป็นแม่แบบกลางสำหรับงานราชการ งานสืบสวน งานข่าวกรอง งานเอกสาร และงานสื่อสารผู้บริหาร"
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {formula.map((item, index) => (
            <article key={item.title} className="rounded-2xl border border-navy-900/10 bg-ivory-50 p-5 shadow-card">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-600">{item.title}</p>
                  <h3 className="mt-2 font-display text-xl font-semibold text-navy-900">{item.thai}</h3>
                </div>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-sm font-bold text-ivory-50">
                  {index + 1}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-navy-700">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="lab-card p-6 sm:p-8">
          <SectionTitle kicker="Prompt Templates" title="ตัวอย่าง Prompt พร้อมใช้" />
          <div className="space-y-4">
            {templates.map((item) => (
              <article key={item.title} className="rounded-2xl border border-navy-900/10 bg-ivory-50 p-5 shadow-card">
                <h3 className="font-display text-xl font-semibold text-navy-900">{item.title}</h3>
                <p className="mt-3 rounded-xl border border-navy-900/10 bg-paper p-4 text-sm leading-relaxed text-navy-700">
                  {item.prompt}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <section className="lab-card border-gold-400/40 bg-gradient-to-br from-brand-50 to-paper p-6 sm:p-8">
            <SectionTitle kicker="Guardrails" title="กติกากัน AI เพี้ยน" />
            <ul className="space-y-3">
              {guardrails.map((rule) => (
                <li key={rule} className="flex gap-3 rounded-xl border border-navy-900/10 bg-paper p-3 text-sm text-navy-700">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lab-success text-xs font-bold text-white">✓</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="lab-card p-6 sm:p-8">
            <SectionTitle kicker="Use Cases" title="ใช้กับงานอะไรได้บ้าง" />
            <div className="grid gap-3 sm:grid-cols-2">
              {useCases.map((item) => (
                <div key={item} className="rounded-xl border border-navy-900/10 bg-ivory-50 p-3 text-sm font-medium text-navy-700">
                  {item}
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className="lab-card p-6 sm:p-8">
        <SectionTitle kicker="Training Plan" title="แผนฝึก 7 วัน" desc="ฝึกจากงานง่ายไปงานจริง โดยเน้นให้ AI สร้างผลลัพธ์ที่ตรวจสอบได้" />
        <div className="grid gap-4 md:grid-cols-7">
          {[
            "สรุปข้อความสั้น",
            "สรุปเอกสารยาว",
            "ทำตารางข้อเท็จจริง",
            "แยก red flag",
            "ทำ executive brief",
            "สร้าง prompt ภาพ/เว็บ",
            "ทำ workflow จริง 1 งาน",
          ].map((item, index) => (
            <div key={item} className="rounded-2xl border border-navy-900/10 bg-ivory-50 p-4 text-center shadow-card">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-navy-900 text-sm font-bold text-ivory-50">
                {index + 1}
              </div>
              <p className="mt-3 text-sm font-medium leading-relaxed text-navy-700">{item}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
