import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TOPMAN AI Academy Hub",
  description: "ศูนย์กลางบทเรียนและคลังความรู้ AI สำหรับ TOPMANIDMB Training Lab",
};

const tracks = [
  {
    title: "AI Video",
    href: "/ai-video/",
    status: "เปิดใช้งานแล้ว",
    description: "Image-to-Video ด้วย Seedance / Grok Imagine Video พร้อม workflow และ prompt template",
  },
  {
    title: "Prompt Engineering",
    href: "/prompt-engineering/",
    status: "เปิดใช้งานแล้ว",
    description: "สูตร prompt สำหรับงานสืบสวน วิเคราะห์ข้อมูล สรุปเอกสาร และสร้างสื่อ",
  },
  {
    title: "RAG & Knowledge Base",
    href: "/rag-knowledge-base/",
    status: "เปิดใช้งานแล้ว",
    description: "จัดการฐานความรู้ เอกสาร และการอ้างอิงข้อมูลสำหรับงานตรวจสอบ",
  },
  {
    title: "OSINT & Investigation AI",
    href: "/osint-toolkit/",
    status: "เปิดใช้งานแล้ว",
    description: "กระบวนการรวบรวม ตรวจสอบ วิเคราะห์ และนำเสนอข้อมูลแบบ Verification First",
  },
  {
    title: "Command Dashboard",
    href: "/war-room-dashboard/",
    status: "เปิดใช้งานแล้ว",
    description: "KPI, timeline, network, case status, action queue และ executive brief",
  },
  {
    title: "Executive Brief System",
    href: "/executive-brief-system/",
    status: "เปิดใช้งานแล้ว",
    description: "ระบบสรุปผู้บังคับบัญชา 1 หน้า + ฉบับละเอียด พร้อม next action",
  },
];

const workflow = [
  "สั่งงานใน ChatGPT",
  "ตรวจ repo และ brand tokens",
  "สร้าง branch ใหม่",
  "แก้/เพิ่มหน้าเว็บ",
  "เปิด Pull Request",
  "Merge เข้า main",
  "Vercel Auto Deploy",
];

const standards = [
  "ใช้ TOPMANIDMB Brand System เป็นค่าเริ่มต้น",
  "Official surface ใช้ Navy / Gold / Ivory / Ink",
  "ใช้โลโก้จริงเป็น asset ไม่ให้ AI วาดโลโก้ใหม่ในงาน production",
  "ใช้ design tokens / Tailwind classes แทน hard-code สี",
  "ยึด Verification First และ Human Judgment Final",
  "ไม่ใช้ข้อมูลจริงหรือข้อมูลอ่อนไหวใน public AI โดยไม่จำเป็น",
];

export default function AcademyHubPage() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <section className="lab-card overflow-hidden">
        <div className="grid gap-0 lg:grid-cols-[1fr_0.8fr]">
          <div className="p-7 sm:p-10">
            <p className="lab-kicker">TOPMAN AI Academy</p>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-navy-900 sm:text-5xl">
              ศูนย์กลางบทเรียน AI สำหรับงานวิเคราะห์ สืบสวน และ Command Center
            </h1>
            <div className="mt-5 h-px w-16 bg-gold" />
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-navy-700 sm:text-lg">
              รวมบทเรียน เครื่องมือ prompt template และ workflow การทำงานจริงของ TOPMANIDMB ตั้งแต่ AI Video,
              Prompt Engineering, RAG, OSINT, Dashboard ไปจนถึง Executive Brief
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="lab-mission-badge">Brand Standard</span>
              <span className="lab-mission-badge">Verification First</span>
              <span className="lab-mission-badge">Deploy Ready</span>
            </div>
          </div>
          <div className="border-t border-navy-900/10 bg-gradient-to-br from-navy-900 to-navy-800 p-7 text-ivory-50 lg:border-l lg:border-t-0 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-400">Operating Model</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-ivory-50">ChatGPT → GitHub → Vercel</h2>
            <p className="mt-4 text-sm leading-relaxed text-ivory-100">
              ใช้ ChatGPT เป็นศูนย์สั่งงาน เขียน/แก้ไฟล์ผ่าน GitHub และเผยแพร่ผ่าน Vercel Git Integration
              โดยยังสามารถใช้ Claude Code หรือ Terminal เป็นเครื่องมือเสริมเมื่อเป็นงานใหญ่
            </p>
            <Link href="/executive-brief-system/" className="mt-6 inline-flex rounded-xl bg-gold px-5 py-2.5 text-sm font-semibold text-navy-900 transition hover:bg-gold-light">
              ต่อด้วย Executive Brief →
            </Link>
          </div>
        </div>
      </section>

      <section className="lab-card p-6 sm:p-8">
        <div className="mb-5">
          <p className="lab-kicker">Learning Tracks</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-navy-900 sm:text-3xl">หมวดบทเรียนหลัก</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-navy-700 sm:text-base">
            ใช้หน้านี้เป็นศูนย์กลางสำหรับต่อยอดบทเรียนใหม่ในอนาคต โดยเริ่มจาก AI Video, Prompt Engineering, RAG, OSINT, Dashboard และ Executive Brief
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tracks.map((track) => (
            <Link key={track.title} href={track.href} className="group rounded-2xl border border-navy-900/10 bg-ivory-50 p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-card-hover">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-xl font-semibold text-navy-900 group-hover:text-gold-600">{track.title}</h3>
                <span className="rounded-full border border-gold-400/40 bg-paper px-2.5 py-1 text-xs font-semibold text-gold-600">
                  {track.status}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-navy-700">{track.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="lab-card p-6 sm:p-8">
          <p className="lab-kicker">Deploy Workflow</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-navy-900">ขั้นตอนทำเว็บมาตรฐาน</h2>
          <ol className="mt-5 space-y-3">
            {workflow.map((item, index) => (
              <li key={item} className="flex gap-3 rounded-xl border border-navy-900/10 bg-ivory-50 p-3 text-sm text-navy-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy-900 text-xs font-bold text-ivory-50">
                  {index + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="lab-card border-gold-400/40 bg-gradient-to-br from-brand-50 to-paper p-6 sm:p-8">
          <p className="lab-kicker">Brand & Safety Standard</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-navy-900">กติกาที่ต้องยึดทุกงาน</h2>
          <ul className="mt-5 space-y-3">
            {standards.map((item) => (
              <li key={item} className="flex gap-3 rounded-xl border border-navy-900/10 bg-paper p-3 text-sm text-navy-700">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lab-success text-xs font-bold text-white">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="roadmap" className="lab-card p-6 sm:p-8">
        <p className="lab-kicker">Roadmap</p>
        <h2 className="mt-2 font-display text-2xl font-semibold text-navy-900">ลำดับต่อยอดที่แนะนำ</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-4">
          {[
            "AI Tool Comparison",
            "Case Study Library",
            "Command Center App",
            "Brand Asset Manager",
          ].map((item, index) => (
            <div key={item} className="rounded-2xl border border-navy-900/10 bg-ivory-50 p-5 text-center shadow-card">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-navy-900 text-sm font-bold text-ivory-50">
                {index + 1}
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-navy-900">{item}</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
