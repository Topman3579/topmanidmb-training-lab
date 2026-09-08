import Link from "next/link";
import type { Metadata } from "next";
import { LessonQuiz } from "@/components/academy/LessonQuiz";
import { AI101_GLOSSARY, AI101_SECTIONS } from "@/data/ai-101";

export const metadata: Metadata = {
  title: "บท 0 · AI สำหรับตำรวจ 101",
  description:
    "บทเรียนพื้นฐานสำหรับเจ้าหน้าที่ตำรวจ: AI คืออะไร ใช้ทำอะไรได้ ห้ามใช้ทำอะไร Hallucination ข้อมูลส่วนบุคคล และหลัก Verification First",
};

export default function Ai101Page() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <section className="lab-card overflow-hidden">
        <div className="grid gap-0 lg:grid-cols-[1fr_0.8fr]">
          <div className="p-7 sm:p-10">
            <p className="lab-kicker">TOPMAN AI Academy · บท 0</p>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-navy-900 sm:text-5xl">
              AI สำหรับตำรวจ 101
            </h1>
            <div className="mt-5 h-px w-16 bg-gold" />
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-navy-700 sm:text-lg">
              บทแรกก่อนใช้ AI ในงานสืบสวน — เข้าใจว่ามันคืออะไร ทำอะไรได้ดี จุดไหนห้ามพึ่ง
              และทำไมทุกผลลัพธ์ต้องตรวจก่อนใช้ อ่านจบทำควิซ 10 ข้อท้ายบท
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="lab-mission-badge">⏱ ~15 นาที</span>
              <span className="lab-mission-badge">ไม่ต้องมีพื้นฐาน</span>
              <span className="lab-mission-badge">ควิซ 10 ข้อ</span>
            </div>
          </div>
          <div className="border-t border-navy-900/10 bg-gradient-to-br from-navy-900 to-navy-800 p-7 text-ivory-50 lg:border-l lg:border-t-0 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-400">จำ 3 ข้อนี้ก็พอ</p>
            <ol className="mt-4 space-y-3 text-sm leading-relaxed text-ivory-100">
              <li>
                <strong className="text-ivory-50">1. AI เดาคำ ไม่ได้รู้ความจริง</strong> — ความมั่นใจของมันไม่ใช่หลักฐาน
              </li>
              <li>
                <strong className="text-ivory-50">2. ข้อมูลคดี/บุคคล ห้ามเข้า AI สาธารณะ</strong> — ปิดชื่อก่อนเสมอ
              </li>
              <li>
                <strong className="text-ivory-50">3. ทุกตัวเลขต้องชี้กลับไปยังต้นทางได้</strong> — ชี้ไม่ได้ = ตัดทิ้ง
              </li>
            </ol>
            <a href="#quiz" className="mt-6 inline-flex rounded-xl bg-gold px-5 py-2.5 text-sm font-semibold text-navy-900 transition hover:bg-gold-light">
              ข้ามไปทำควิซ →
            </a>
          </div>
        </div>
      </section>

      <nav className="lab-card p-4 sm:p-5">
        <p className="lab-kicker">สารบัญ</p>
        <ol className="mt-3 grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
          {AI101_SECTIONS.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="block rounded-lg border border-navy-900/10 bg-ivory-50 px-3 py-2 text-navy-700 transition hover:border-gold-400/60 hover:text-navy-900">
                {s.kicker}
              </a>
            </li>
          ))}
          <li>
            <a href="#glossary" className="block rounded-lg border border-navy-900/10 bg-ivory-50 px-3 py-2 text-navy-700 transition hover:border-gold-400/60 hover:text-navy-900">
              7 · ศัพท์ที่ต้องรู้
            </a>
          </li>
          <li>
            <a href="#quiz" className="block rounded-lg border border-gold-400/40 bg-paper px-3 py-2 font-semibold text-gold-600 transition hover:text-navy-900">
              ควิซท้ายบท
            </a>
          </li>
        </ol>
      </nav>

      {AI101_SECTIONS.map((s) => (
        <section key={s.id} id={s.id} className="lab-card scroll-mt-24 p-6 sm:p-8">
          <p className="lab-kicker">{s.kicker}</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-navy-900 sm:text-3xl">{s.title}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-navy-700 sm:text-base">{s.lead}</p>
          <ul className="mt-5 space-y-2">
            {s.points.map((p) => (
              <li key={p} className="flex gap-3 rounded-xl border border-navy-900/10 bg-ivory-50 p-3 text-sm text-navy-700">
                <span className="mt-0.5 h-2 w-2 shrink-0 translate-y-1.5 rounded-full bg-gold" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
          {s.example && (
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <div className="rounded-xl border border-rose-200 bg-rose-50/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-rose-700">✕ แบบนี้อันตราย</p>
                <p className="mt-2 text-sm text-rose-900">{s.example.bad}</p>
              </div>
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">✓ แบบนี้ใช้ได้</p>
                <p className="mt-2 text-sm text-emerald-900">{s.example.good}</p>
              </div>
              <p className="text-xs text-navy-600 md:col-span-2">💡 {s.example.why}</p>
            </div>
          )}
        </section>
      ))}

      <section id="glossary" className="lab-card scroll-mt-24 p-6 sm:p-8">
        <p className="lab-kicker">7 · ศัพท์ที่ต้องรู้</p>
        <h2 className="mt-2 font-display text-2xl font-semibold text-navy-900 sm:text-3xl">คำที่จะเจอบ่อยในบทถัดไป</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {AI101_GLOSSARY.map((g) => (
            <div key={g.term} className="rounded-xl border border-navy-900/10 bg-ivory-50 p-4">
              <p className="font-display text-lg font-semibold text-navy-900">
                {g.term} <span className="text-sm font-normal text-navy-500">· {g.thai}</span>
              </p>
              <p className="mt-1 text-sm text-navy-700">{g.meaning}</p>
            </div>
          ))}
        </div>
      </section>

      <LessonQuiz />

      <section className="lab-card border-gold-400/40 bg-gradient-to-br from-brand-50 to-paper p-6 sm:p-8">
        <p className="lab-kicker">บทถัดไป</p>
        <div className="mt-3 flex flex-wrap gap-3">
          <Link href="/prompt-engineering/" className="lab-btn-primary">
            บท 1 · Prompt Engineering →
          </Link>
          <Link href="/scenarios/lab-2026-001/" className="lab-btn-secondary">
            ลองภารกิจจำลอง LAB-2026-001
          </Link>
          <Link href="/academy/" className="lab-btn-secondary">
            กลับ Academy Hub
          </Link>
        </div>
      </section>
    </div>
  );
}
