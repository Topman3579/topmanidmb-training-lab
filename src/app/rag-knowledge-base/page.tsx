import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RAG & Knowledge Base สำหรับงานสืบสวน",
  description: "บทเรียน RAG และ Knowledge Base สำหรับ TOPMAN AI Academy เน้นเอกสาร หลักฐาน และการอ้างอิงที่ตรวจสอบได้",
};

const stages = [
  {
    title: "Collect",
    thai: "รวบรวมเอกสาร",
    detail: "นำไฟล์ คำสั่ง รายงาน ตาราง รูปภาพ หรือบันทึกข้อมูลเข้าสู่คลัง โดยแยกแหล่งที่มาและวันที่ให้ชัดเจน",
  },
  {
    title: "Clean",
    thai: "จัดระเบียบข้อมูล",
    detail: "ตั้งชื่อไฟล์ แยกหมวด ลบซ้ำ ทำสารบัญ และกำหนด metadata เช่น คดี หน่วยงาน วันที่ บุคคล และสถานะตรวจสอบ",
  },
  {
    title: "Chunk",
    thai: "แบ่งข้อมูลเป็นช่วง",
    detail: "แบ่งเอกสารเป็นส่วนเล็กพอให้ AI ค้นได้แม่น เช่น หัวข้อ หน้า ย่อหน้า ตาราง หรือรายการข้อเท็จจริง",
  },
  {
    title: "Retrieve",
    thai: "ค้นคืนหลักฐาน",
    detail: "ให้ระบบค้นเฉพาะส่วนที่เกี่ยวข้องกับคำถาม พร้อมอ้างอิงแหล่งที่มา ไม่ดึงความจำกว้าง ๆ มาเดา",
  },
  {
    title: "Generate",
    thai: "สรุปพร้อมอ้างอิง",
    detail: "ให้ AI ตอบจากหลักฐานที่ค้นได้ แยกสิ่งที่ยืนยันแล้ว สิ่งที่ยังไม่พบ และสิ่งที่ต้องตรวจเพิ่ม",
  },
  {
    title: "Verify",
    thai: "ตรวจซ้ำก่อนใช้จริง",
    detail: "เจ้าหน้าที่ตรวจแหล่งอ้างอิงอีกครั้ง ก่อนนำไปใช้ในรายงาน บรีฟผู้บังคับบัญชา หรือเอกสารทางการ",
  },
];

const knowledgeTypes = [
  "คำสั่ง / หนังสือราชการ",
  "รายงานสืบสวน / บันทึกถ้อยคำ",
  "Excel / CSV / Statement",
  "ทะเบียนบุคคล / นิติบุคคล",
  "ภาพถ่าย / แผนผัง / timeline",
  "ข่าว / OSINT / web capture",
];

const metadataFields = [
  "ชื่อแฟ้ม / เลขอ้างอิง",
  "แหล่งที่มา",
  "วันที่ได้รับ / วันที่จัดทำ",
  "สถานะตรวจสอบ",
  "ระดับความลับ",
  "ผู้รับผิดชอบ",
  "คดี / โครงการ / ภารกิจ",
  "คำค้นสำคัญ",
];

const prompts = [
  {
    title: "ถามจากคลังเอกสาร",
    text:
      "ตอบคำถามนี้โดยยึดเฉพาะข้อมูลจากเอกสารในคลังที่ค้นพบเท่านั้น ระบุแหล่งอ้างอิงหรือชื่อไฟล์ทุกครั้ง หากไม่พบข้อมูลให้ตอบว่า ‘ยังไม่พบข้อมูลในคลัง’ และเสนอคำค้นหรือเอกสารที่ควรตรวจเพิ่ม",
  },
  {
    title: "สรุปแฟ้มคดี",
    text:
      "สรุปแฟ้มข้อมูลนี้เป็น 1) ข้อเท็จจริงสำคัญ 2) timeline 3) บุคคล/หน่วยงานเกี่ยวข้อง 4) red flag 5) ช่องว่างของข้อมูล 6) สิ่งที่ต้องตรวจสอบเพิ่ม โดยแยกข้อมูลที่ยืนยันแล้วออกจากข้อสันนิษฐาน",
  },
  {
    title: "ทำ brief จากหลักฐาน",
    text:
      "จัดทำ executive brief จากหลักฐานที่ค้นพบเท่านั้น โครงสร้าง: เรื่อง, สาระสำคัญ, ข้อเท็จจริง, การวิเคราะห์, ความเสี่ยง, ทางเลือก, ข้อเสนอแนะ และ next action ห้ามเพิ่มข้อมูลที่ไม่มีในหลักฐาน",
  },
];

const guardrails = [
  "ตอบจากหลักฐานที่ค้นพบเท่านั้น",
  "ทุกข้อสรุปสำคัญต้องมีแหล่งอ้างอิง",
  "ไม่พบข้อมูล = ระบุว่าไม่พบ ไม่เดา",
  "แยกข้อมูลจริง / ข้อสงสัย / ข้อเสนอแนะ",
  "ข้อมูลลับต้องเก็บในระบบที่ควบคุมสิทธิ์",
  "Human Judgment Final ก่อนนำไปใช้จริง",
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

export default function RagKnowledgeBasePage() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <section className="lab-card overflow-hidden">
        <div className="grid gap-0 lg:grid-cols-[1fr_0.85fr]">
          <div className="p-7 sm:p-10">
            <p className="lab-kicker">TOPMAN AI Academy · Knowledge Track</p>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-navy-900 sm:text-5xl">
              RAG & Knowledge Base สำหรับงานเอกสาร คดี และ War Room
            </h1>
            <div className="mt-5 h-px w-16 bg-gold" />
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-navy-700 sm:text-lg">
              RAG คือวิธีให้ AI ตอบจากคลังเอกสารที่ตรวจสอบได้ ไม่ใช่เดาจากความจำกว้าง ๆ เหมาะกับงานสืบสวน
              สรุปรายงาน คลังคำสั่ง แฟ้มคดี และการทำ brief ที่ต้องมีแหล่งอ้างอิง
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="lab-mission-badge">Evidence Retrieval</span>
              <span className="lab-mission-badge">Citable Answers</span>
              <span className="lab-mission-badge">Human Review</span>
            </div>
          </div>
          <div className="border-t border-navy-900/10 bg-gradient-to-br from-navy-900 to-navy-800 p-7 text-ivory-50 lg:border-l lg:border-t-0 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-400">Core Idea</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-ivory-50">ถามจากคลัง → อ้างอิงได้ → ตรวจซ้ำได้</h2>
            <p className="mt-4 text-sm leading-relaxed text-ivory-100">
              เป้าหมายไม่ใช่ให้ AI ตอบเก่งอย่างเดียว แต่ต้องรู้ว่า AI เอาคำตอบมาจากเอกสารไหน และส่วนใดยังต้องตรวจเพิ่ม
            </p>
            <Link href="/academy/" className="mt-6 inline-flex rounded-xl bg-gold px-5 py-2.5 text-sm font-semibold text-navy-900 transition hover:bg-gold-light">
              กลับ Academy Hub →
            </Link>
          </div>
        </div>
      </section>

      <section className="lab-card p-6 sm:p-8">
        <SectionTitle
          kicker="RAG Workflow"
          title="6 ขั้นตอนสร้าง Knowledge Base ที่ใช้กับ AI ได้จริง"
          desc="วางระบบข้อมูลตั้งแต่รับเอกสารจนถึงคำตอบที่ตรวจสอบแหล่งอ้างอิงได้"
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {stages.map((stage, index) => (
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
          <SectionTitle kicker="Knowledge Sources" title="ข้อมูลที่ควรนำเข้าคลัง" />
          <div className="grid gap-3 sm:grid-cols-2">
            {knowledgeTypes.map((item) => (
              <div key={item} className="rounded-xl border border-navy-900/10 bg-ivory-50 p-3 text-sm font-medium text-navy-700">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="lab-card border-gold-400/40 bg-gradient-to-br from-brand-50 to-paper p-6 sm:p-8">
          <SectionTitle kicker="Metadata" title="ช่องข้อมูลกำกับที่ควรมี" />
          <div className="grid gap-3 sm:grid-cols-2">
            {metadataFields.map((item) => (
              <div key={item} className="rounded-xl border border-navy-900/10 bg-paper p-3 text-sm font-medium text-navy-700">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="lab-card p-6 sm:p-8">
          <SectionTitle kicker="Prompt Templates" title="Prompt สำหรับถามจากคลังความรู้" />
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

        <div className="lab-card p-6 sm:p-8">
          <SectionTitle kicker="Guardrails" title="กติกาป้องกันคำตอบไม่มีหลักฐาน" />
          <ul className="space-y-3">
            {guardrails.map((rule) => (
              <li key={rule} className="flex gap-3 rounded-xl border border-navy-900/10 bg-ivory-50 p-3 text-sm text-navy-700">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lab-success text-xs font-bold text-white">✓</span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-2xl border border-gold-400/40 bg-brand-50 p-5">
            <p className="text-sm font-semibold text-navy-900">มาตรฐาน TOPMANIDMB</p>
            <p className="mt-2 text-sm leading-relaxed text-navy-700">
              คำตอบที่ดีต้องบอกได้ว่า “มาจากเอกสารไหน” และ “ส่วนไหนยังไม่พบหลักฐาน” ก่อนนำไปใช้ในงานจริง
            </p>
          </div>
        </div>
      </section>

      <section className="lab-card p-6 sm:p-8">
        <SectionTitle kicker="Training Plan" title="แผนฝึก 7 วัน" desc="ฝึกสร้างคลังความรู้เล็ก ๆ ก่อน แล้วค่อยขยายเป็นระบบ War Room" />
        <div className="grid gap-4 md:grid-cols-7">
          {[
            "จัดแฟ้มตัวอย่าง",
            "ตั้ง metadata",
            "ทำสารบัญเอกสาร",
            "สร้างคำถามจากแฟ้ม",
            "ตรวจคำตอบกับแหล่งอ้างอิง",
            "ทำ brief จากคลัง",
            "ออกแบบ workflow ทีม",
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
