import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OSINT Toolkit สำหรับงานสืบสวน",
  description: "บทเรียน OSINT & Investigation AI สำหรับ TOPMAN AI Academy เน้น Verification First และการตรวจสอบแหล่งข้อมูล",
};

const cycle = [
  {
    title: "Define",
    thai: "ตั้งโจทย์",
    detail: "กำหนดวัตถุประสงค์ ขอบเขต คำถามหลัก บุคคล/นิติบุคคล/พื้นที่/ช่วงเวลาที่ต้องตรวจสอบ และข้อจำกัดด้านกฎหมาย/ความลับ",
  },
  {
    title: "Collect",
    thai: "รวบรวม",
    detail: "เก็บข้อมูลจากแหล่งเปิด เช่น เว็บไซต์ ข่าว ฐานข้อมูลสาธารณะ social signal แผนที่ โดเมน และเอกสารที่ตรวจสอบที่มาได้",
  },
  {
    title: "Preserve",
    thai: "เก็บหลักฐาน",
    detail: "บันทึก URL, เวลาเข้าถึง, screenshot, hash/ไฟล์ต้นฉบับ, metadata และ chain of custody สำหรับงานที่ต้องใช้ต่อ",
  },
  {
    title: "Verify",
    thai: "ตรวจสอบ",
    detail: "เทียบหลายแหล่ง ตรวจวันเวลา ตรวจเจ้าของแหล่ง ตรวจความน่าเชื่อถือ และแยกข้อมูลยืนยันแล้วออกจากข้อสงสัย",
  },
  {
    title: "Analyze",
    thai: "วิเคราะห์",
    detail: "สร้าง timeline, link chart, actor map, red flag, hypothesis และระบุช่องว่างข้อมูลที่ต้องตรวจเพิ่ม",
  },
  {
    title: "Report",
    thai: "รายงาน",
    detail: "ทำสรุปผู้บริหาร รายงานราชการ ตารางข้อเท็จจริง หรือ briefing โดยอ้างอิงแหล่งที่มาและระดับความเชื่อมั่น",
  },
];

const sources = [
  "เว็บไซต์ทางการ / หน่วยงานรัฐ",
  "ทะเบียนนิติบุคคล / ข้อมูลธุรกิจ",
  "ข่าว / press release / web archive",
  "แผนที่ / ภาพถ่ายดาวเทียม / street view",
  "โดเมน / DNS / certificate / WHOIS ที่เปิดเผย",
  "Social platform signal ที่เข้าถึงได้โดยชอบ",
  "เอกสาร PDF / file metadata",
  "ฐานข้อมูลสาธารณะที่อนุญาตให้ใช้",
];

const outputs = [
  "Timeline เหตุการณ์",
  "Actor / Entity Map",
  "Link Analysis",
  "Red Flag Table",
  "Source Reliability Matrix",
  "Executive Brief",
  "Next Action Checklist",
  "Evidence Index",
];

const prompts = [
  {
    title: "วางแผน OSINT",
    text:
      "ช่วยวางแผน OSINT โดยยึดโจทย์นี้ แยกเป็น 1) คำถามหลัก 2) entity ที่ต้องตรวจ 3) แหล่งข้อมูลเปิดที่ควรค้น 4) วิธีเก็บหลักฐาน 5) วิธี verify 6) output ที่ควรส่งผู้บังคับบัญชา ห้ามเดาข้อมูลบุคคลที่ยังไม่มีหลักฐาน",
  },
  {
    title: "ตรวจความน่าเชื่อถือแหล่งข้อมูล",
    text:
      "ประเมินแหล่งข้อมูลที่ให้มาโดยแยกเป็น แหล่งต้นทาง/แหล่งรอง วันที่เผยแพร่ ผู้เผยแพร่ หลักฐานสนับสนุน ความเสี่ยงของข้อมูลผิดพลาด และคะแนนความน่าเชื่อถือ พร้อมระบุสิ่งที่ต้องตรวจเพิ่ม",
  },
  {
    title: "สรุป OSINT เป็นรายงาน",
    text:
      "จัดทำรายงาน OSINT จากข้อมูลที่ให้มาเท่านั้น แยกข้อเท็จจริงที่ยืนยันแล้ว ข้อสงสัย สมมติฐาน ช่องว่างข้อมูล และ next action พร้อมตารางแหล่งอ้างอิง ห้ามเพิ่มข้อมูลที่ไม่มีในหลักฐาน",
  },
];

const guardrails = [
  "ใช้เฉพาะแหล่งข้อมูลที่เข้าถึงได้โดยชอบ",
  "บันทึก URL / วันเวลา / screenshot / source ทุกครั้ง",
  "ห้าม doxxing หรือเผยแพร่ข้อมูลส่วนบุคคลเกินจำเป็น",
  "แยก fact / inference / hypothesis ชัดเจน",
  "ข้อมูลจาก social ต้อง verify ซ้ำก่อนใช้งาน",
  "ไม่ข้ามขั้นตอนทางกฎหมายหรือคำสั่งผู้บังคับบัญชา",
  "Human Judgment Final ก่อนทำรายงานหรือดำเนินการจริง",
];

const reliability = [
  { level: "A", label: "แหล่งทางการ / เอกสารต้นทาง", detail: "ใช้เป็นฐานข้อเท็จจริงได้ แต่ยังต้องตรวจวันที่และบริบท" },
  { level: "B", label: "สื่อหลัก / ฐานข้อมูลสาธารณะ", detail: "ใช้ประกอบได้ ควรเทียบกับต้นทางอีกชั้น" },
  { level: "C", label: "โพสต์ / social signal", detail: "ใช้เป็นเบาะแส ต้อง verify ก่อนสรุป" },
  { level: "D", label: "ข้อมูลไม่ทราบที่มา", detail: "ใช้เป็น lead เท่านั้น ห้ามใช้เป็นข้อสรุป" },
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

export default function OsintToolkitPage() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <section className="lab-card overflow-hidden">
        <div className="grid gap-0 lg:grid-cols-[1fr_0.85fr]">
          <div className="p-7 sm:p-10">
            <p className="lab-kicker">TOPMAN AI Academy · Investigation Track</p>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-navy-900 sm:text-5xl">
              OSINT Toolkit สำหรับงานสืบสวน ข่าวกรอง และการตรวจสอบข้อมูลออนไลน์
            </h1>
            <div className="mt-5 h-px w-16 bg-gold" />
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-navy-700 sm:text-lg">
              OSINT คือการใช้ข้อมูลเปิดอย่างมีระเบียบ เพื่อรวบรวม ตรวจสอบ วิเคราะห์ และรายงานโดยอ้างอิงหลักฐานได้
              ไม่ใช่การเดา ไม่ใช่การละเมิดสิทธิ และต้องยึดหลัก Verification First ทุกครั้ง
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="lab-mission-badge">Open Sources</span>
              <span className="lab-mission-badge">Verification First</span>
              <span className="lab-mission-badge">Evidence Index</span>
            </div>
          </div>
          <div className="border-t border-navy-900/10 bg-gradient-to-br from-navy-900 to-navy-800 p-7 text-ivory-50 lg:border-l lg:border-t-0 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-400">Core Rule</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-ivory-50">Open Source ≠ Unverified Source</h2>
            <p className="mt-4 text-sm leading-relaxed text-ivory-100">
              ทุกข้อมูลที่พบต้องรู้ที่มา เวลา สถานะความน่าเชื่อถือ และระดับการตรวจสอบ ก่อนนำไปใช้ในงานจริง
            </p>
            <Link href="/academy/" className="mt-6 inline-flex rounded-xl bg-gold px-5 py-2.5 text-sm font-semibold text-navy-900 transition hover:bg-gold-light">
              กลับ Academy Hub →
            </Link>
          </div>
        </div>
      </section>

      <section className="lab-card p-6 sm:p-8">
        <SectionTitle
          kicker="OSINT Cycle"
          title="วงจร OSINT 6 ขั้นตอน"
          desc="ใช้เป็นกระบวนการมาตรฐาน ตั้งแต่ตั้งโจทย์จนถึงรายงานที่ตรวจสอบได้"
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {cycle.map((stage, index) => (
            <article key={stage.title} className="rounded-2xl border border-navy-900/10 bg-ivory-50 p-5 shadow-card">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-600">{stage.title}</p>
                  <h3 className="mt-2 font-display text-xl font-semibold text-navy-900">{stage.thai}</h3>
                </div>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-sm font-bold text-ivory-50">
                  {index + 1}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-navy-700">{stage.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="lab-card p-6 sm:p-8">
          <SectionTitle kicker="Source Map" title="แหล่งข้อมูลเปิดที่ใช้ได้โดยชอบ" />
          <div className="grid gap-3 sm:grid-cols-2">
            {sources.map((item) => (
              <div key={item} className="rounded-xl border border-navy-900/10 bg-ivory-50 p-3 text-sm font-medium text-navy-700">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="lab-card border-gold-400/40 bg-gradient-to-br from-brand-50 to-paper p-6 sm:p-8">
          <SectionTitle kicker="Outputs" title="ผลลัพธ์ที่ควรส่งต่อ" />
          <div className="grid gap-3 sm:grid-cols-2">
            {outputs.map((item) => (
              <div key={item} className="rounded-xl border border-navy-900/10 bg-paper p-3 text-sm font-medium text-navy-700">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="lab-card p-6 sm:p-8">
          <SectionTitle kicker="Prompt Templates" title="Prompt สำหรับงาน OSINT" />
          <div className="space-y-4">
            {prompts.map((item) => (
              <article key={item.title} className="rounded-2xl border border-navy-900/10 bg-ivory-50 p-5 shadow-card">
                <h3 className="font-display text-xl font-semibold text-navy-900">{item.title}</h3>
                <p className="mt-3 rounded-xl border border-navy-900/10 bg-paper p-4 text-sm leading-relaxed text-navy-700">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <section className="lab-card p-6 sm:p-8">
            <SectionTitle kicker="Reliability" title="ระดับความน่าเชื่อถือ" />
            <div className="space-y-3">
              {reliability.map((item) => (
                <div key={item.level} className="rounded-xl border border-navy-900/10 bg-ivory-50 p-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-900 text-sm font-bold text-ivory-50">{item.level}</span>
                    <h3 className="font-display text-lg font-semibold text-navy-900">{item.label}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-navy-700">{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="lab-card border-gold-400/40 bg-gradient-to-br from-brand-50 to-paper p-6 sm:p-8">
            <SectionTitle kicker="Guardrails" title="ข้อควรระวังสำคัญ" />
            <ul className="space-y-3">
              {guardrails.map((rule) => (
                <li key={rule} className="flex gap-3 rounded-xl border border-navy-900/10 bg-paper p-3 text-sm text-navy-700">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lab-success text-xs font-bold text-white">✓</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>

      <section className="lab-card p-6 sm:p-8">
        <SectionTitle kicker="Training Plan" title="แผนฝึก 7 วัน" desc="ฝึกจากโจทย์ง่ายไปสู่การทำรายงาน OSINT ที่ใช้ได้จริง" />
        <div className="grid gap-4 md:grid-cols-7">
          {[
            "ตั้งโจทย์ OSINT",
            "ทำ source map",
            "เก็บหลักฐาน",
            "ตรวจ source reliability",
            "ทำ timeline",
            "ทำ red flag table",
            "ทำ executive brief",
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
