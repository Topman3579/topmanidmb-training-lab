import type { Metadata } from "next";
import Link from "next/link";
import { AcademyQuiz } from "@/components/academy/AcademyQuiz";
import { CopyPrompt } from "@/components/academy/CopyPrompt";
import { WOW30_LESSONS, WOW30_PASS, WOW30_PROMPTS, WOW30_QUIZ, WOW30_STORAGE_KEY } from "@/data/wow-30s";

export const metadata: Metadata = {
  title: "บทเรียนคลิปว้าว 30 วิ · Google Flow Omni",
  description:
    "เรียนทำคลิปว้าว 30 วินาทีด้วย Google Flow และ Gemini Omni: ยิงทีละ 10 วิ ต่อด้วยเฟรมท้าย ไม่ใส่หน้าคน",
};

export default function Wow30LessonPage() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <section className="lab-card overflow-hidden">
        <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="p-7 sm:p-10">
            <p className="lab-kicker">TOPMAN AI Academy · AI Video</p>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-navy-900 sm:text-5xl">
              คลิปว้าว 30 วิ บน Google Flow
            </h1>
            <div className="mt-5 h-px w-16 bg-gold" />
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-navy-700 sm:text-lg">
              สูตรที่พิสูจน์แล้ว: Gemini Omni เจนทีละ 10 วิ ต่อฉากด้วยเฟรมท้าย 3 ใบ รวม ~30 วิ
              ใช้ทำคลิปโชว์ฉากว่าง เมือง ฝน โฮโลแกรม — ไม่ใส่หน้าคน และไม่ใช้ข้อมูลจริง
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="lab-mission-badge">⏱ ~20 นาที</span>
              <span className="lab-mission-badge">6 บท + ควิซ</span>
              <span className="lab-mission-badge">เล่นบน Flow ได้เลย</span>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#play" className="lab-btn-primary">
                ดูคลิปตัวอย่าง →
              </a>
              <Link href="/ai-video/" className="lab-btn-secondary">
                คู่มือ Image-to-Video
              </Link>
            </div>
          </div>
          <div className="border-t border-navy-900/10 bg-gradient-to-br from-navy-900 to-navy-800 p-7 text-ivory-50 lg:border-l lg:border-t-0 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-400">จำ 3 ข้อนี้ก็พอ</p>
            <ol className="mt-4 space-y-3 text-sm leading-relaxed text-ivory-100">
              <li>
                <strong className="text-ivory-50">1. หน่วยยิงคือ 10 วิ</strong> — ไม่มีปุ่ม 30 บน Omni
              </li>
              <li>
                <strong className="text-ivory-50">2. เฟรมท้าย = เชือกต่อฉาก</strong> — Extend มีเฉพาะ Veo
              </li>
              <li>
                <strong className="text-ivory-50">3. เลนนี้ไม่มีหน้าคน</strong> — ฉากว่าง เมือง ฝน โฮโลแกรม
              </li>
            </ol>
            <a href="#quiz" className="mt-6 inline-flex rounded-xl bg-gold px-5 py-2.5 text-sm font-semibold text-navy-900 transition hover:bg-gold-light">
              ข้ามไปทำควิซ →
            </a>
          </div>
        </div>
      </section>

      <section id="play" className="lab-card scroll-mt-24 overflow-hidden p-6 sm:p-8">
        <p className="lab-kicker">ตัวอย่างที่พิสูจน์แล้ว</p>
        <h2 className="mt-2 font-display text-2xl font-semibold text-navy-900 sm:text-3xl">
          เมฆ → วอร์รูม → ถนนเปียก → ทะลุกระจก → เจ้าพระยา
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-navy-700">
          คลิปร่าง 360p จาก 3 เทค Omni ต่อกัน ไม่มีหน้าคน ไม่มีป้ายอ่านได้ ใช้เป็นแบบฝึก ไม่ใช่มาสเตอร์ฉาย
        </p>
        <video
          className="mt-5 w-full rounded-2xl border border-navy-900/10 bg-navy-900"
          controls
          playsInline
          preload="metadata"
          src="/ai-video/wow-30s-demo.mp4"
        >
          เบราว์เซอร์นี้เล่นวิดีโอไม่ได้
        </video>
        <p className="mt-3 text-xs text-navy-500">ความยาว ~30 วิ · 640×360 · เสียงฝน/ฟ้าผ่าในคลิป</p>
      </section>

      <nav className="lab-card p-4 sm:p-5">
        <p className="lab-kicker">สารบัญ 6 บท</p>
        <ol className="mt-3 grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
          {WOW30_LESSONS.map((lesson) => (
            <li key={lesson.id}>
              <a
                href={`#${lesson.id}`}
                className="block rounded-lg border border-navy-900/10 bg-ivory-50 px-3 py-2 text-navy-700 transition hover:border-gold-400/60 hover:text-navy-900"
              >
                {lesson.kicker} · {lesson.title}
              </a>
            </li>
          ))}
          <li>
            <a href="#prompts" className="block rounded-lg border border-navy-900/10 bg-ivory-50 px-3 py-2 text-navy-700 transition hover:border-gold-400/60 hover:text-navy-900">
              พรอมต์ 3 ใบ พร้อมคัดลอก
            </a>
          </li>
          <li>
            <a href="#quiz" className="block rounded-lg border border-gold-400/40 bg-paper px-3 py-2 font-semibold text-gold-600 transition hover:text-navy-900">
              ควิซท้ายบท
            </a>
          </li>
        </ol>
      </nav>

      {WOW30_LESSONS.map((lesson) => (
        <section key={lesson.id} id={lesson.id} className="lab-card scroll-mt-24 p-6 sm:p-8">
          <p className="lab-kicker">{lesson.kicker}</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-navy-900 sm:text-3xl">{lesson.title}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-navy-700 sm:text-base">{lesson.lead}</p>
          <ul className="mt-5 space-y-2">
            {lesson.points.map((point) => (
              <li key={point} className="flex gap-3 rounded-xl border border-navy-900/10 bg-ivory-50 p-3 text-sm text-navy-700">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-navy-900 text-[10px] font-bold text-ivory-50">
                  •
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 rounded-xl border border-gold-400/40 bg-paper px-4 py-3 text-sm text-navy-800">
            <strong className="text-gold-700">เล่นเลย:</strong> {lesson.drill}
          </p>
        </section>
      ))}

      <section id="prompts" className="lab-card scroll-mt-24 p-6 sm:p-8">
        <p className="lab-kicker">ชุดยิงจริง</p>
        <h2 className="mt-2 font-display text-2xl font-semibold text-navy-900 sm:text-3xl">พรอมต์ 3 ใบ — คัดลอกไปวางบน Flow</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-navy-700">
          ชิปต้องเป็น วิดีโอ · Omni Flash · 360p · 10 วินาที · x1 · ปิด Agent · เปิด{" "}
          <a href="https://labs.google/fx/tools/flow" className="font-semibold text-gold-700 underline-offset-2 hover:underline">
            Google Flow
          </a>
        </p>
        <div className="mt-5 space-y-4">
          {WOW30_PROMPTS.map((prompt, index) => (
            <article key={prompt.id} className="rounded-2xl border border-navy-900/10 bg-ivory-50 p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-600">ใบ {index + 1}</p>
                  <h3 className="mt-1 font-display text-xl font-semibold text-navy-900">{prompt.title}</h3>
                  <p className="mt-1 text-sm text-navy-600">{prompt.frame}</p>
                </div>
                <CopyPrompt text={prompt.text} />
              </div>
              <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-navy-900 p-4 text-xs leading-relaxed text-ivory-100">
                {prompt.text}
              </pre>
            </article>
          ))}
        </div>
      </section>

      <AcademyQuiz
        questions={WOW30_QUIZ}
        storageKey={WOW30_STORAGE_KEY}
        passScore={WOW30_PASS}
        title="ทดสอบสูตร 30 วิ"
      />

      <section className="lab-card p-6 sm:p-8">
        <p className="lab-kicker">หลังควิซ</p>
        <h2 className="mt-2 font-display text-2xl font-semibold text-navy-900">ไปเล่นบน Flow เลย</h2>
        <ol className="mt-5 space-y-3 text-sm text-navy-700">
          <li>1. เปิดโปรเจกต์ใหม่บน Google Flow</li>
          <li>2. ดับ Agent · Video · Omni Flash · 10 วิ · x1</li>
          <li>3. วางพรอมต์ใบ 1 → เจน → โหลด</li>
          <li>4. ดึงเฟรมท้ายไปใบ 2 และใบ 3</li>
          <li>5. ต่อ 3 ไฟล์ในเครื่อง แล้วดูว่าโลกขยับครบเรื่อง</li>
        </ol>
      </section>
    </div>
  );
}
