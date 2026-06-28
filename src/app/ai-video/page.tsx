import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Video Guide 2026",
  description: "คู่มือเริ่มต้นทำ Image-to-Video ด้วย Seedance / Grok Imagine Video สำหรับ TOPMAN AI Academy",
};

const workflow = [
  {
    step: "01",
    title: "เตรียมภาพต้นฉบับ",
    detail: "ใช้ภาพที่ตัวแบบชัด ฉากไม่รก แสงดี และเลือกอัตราส่วนให้ตรงงาน เช่น 9:16, 3:4 หรือ 16:9",
  },
  {
    step: "02",
    title: "เขียน Prompt ให้ภาพขยับ",
    detail: "ใช้สูตร Subject + Motion + Camera + Lighting + Mood + Duration เพื่อบังคับทิศทางการเคลื่อนไหว",
  },
  {
    step: "03",
    title: "เลือกเครื่องมือ",
    detail: "Grok เหมาะกับการทดลองเร็ว ส่วน Seedance เหมาะกับงานที่ต้องการความนิ่ง เนียน และควบคุมกล้องดีขึ้น",
  },
  {
    step: "04",
    title: "Generate หลายเวอร์ชัน",
    detail: "ทำอย่างน้อย 3–5 รอบ แล้วเลือกช็อตที่นิ่งที่สุด หน้าไม่เพี้ยน ตัวหนังสือไม่บิด และ motion ต่อเนื่อง",
  },
  {
    step: "05",
    title: "ตัดต่อจบงาน",
    detail: "นำไฟล์เข้า CapCut หรือ Canva เพื่อใส่เสียง ข้อความ caption เพลง และ export เป็นไฟล์พร้อมส่ง",
  },
];

const tools = [
  {
    name: "Grok Imagine Video",
    bestFor: "คลิปสั้น ทดลองไอเดียไว",
    notes: "เหมาะกับ image-to-video 5–15 วินาที และใช้ทดสอบหลายมุมกล้องเร็ว",
  },
  {
    name: "Seedance",
    bestFor: "งานเนียน คุม motion",
    notes: "เหมาะกับงานที่ต้องการเสถียรภาพ การเคลื่อนไหวสมจริง และคุมบรรยากาศภาพ",
  },
  {
    name: "Veo / Kling / Runway",
    bestFor: "วิดีโอคุณภาพสูง",
    notes: "เหมาะกับงานยาว งานภาพยนตร์ งานโฆษณา หรือคลิปที่ต้องใช้รายละเอียดสูง",
  },
  {
    name: "CapCut / Canva",
    bestFor: "ตัดต่อและส่งงาน",
    notes: "เหมาะกับการใส่ caption เสียง เพลง โลโก้ ข้อความ และจัดไฟล์ให้ดูเป็นมืออาชีพ",
  },
];

const promptParts = [
  "Subject",
  "Motion / Action",
  "Camera movement",
  "Style",
  "Lighting",
  "Duration",
  "Mood",
];

const promptTemplates = [
  {
    title: "ภาพบุคคล",
    tag: "Portrait",
    prompt:
      "Animate this portrait with subtle natural movement, gentle head turn, realistic blinking, soft cinematic lighting, slow camera push-in, calm confident mood, 8 seconds, realistic motion.",
  },
  {
    title: "โปสเตอร์ / อินโฟกราฟิก",
    tag: "Infographic",
    prompt:
      "Animate this infographic with subtle parallax, glowing connection lines, slow camera zoom-in, clean executive briefing style, smooth motion, no text distortion, 8 seconds.",
  },
  {
    title: "งานสืบสวน / War Room",
    tag: "Investigation",
    prompt:
      "Animate this investigation board with moving data links, subtle document highlights, slow cinematic dolly-in, serious police command room atmosphere, realistic lighting, 10 seconds.",
  },
];

const guardrails = [
  "Keep the original composition.",
  "Do not change faces.",
  "Do not change text.",
  "No extra fingers.",
  "No distortion.",
  "Smooth realistic motion.",
  "Official, clean, professional, minimal motion.",
];

function SectionHeading({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-5">
      <p className="lab-kicker">{kicker}</p>
      <h2 className="mt-2 font-display text-2xl font-semibold text-navy-900 sm:text-3xl">{title}</h2>
      {description ? <p className="mt-2 max-w-3xl text-sm leading-relaxed text-navy-700 sm:text-base">{description}</p> : null}
    </div>
  );
}

export default function AiVideoGuidePage() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <section className="lab-card overflow-hidden">
        <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-7 sm:p-10">
            <p className="lab-kicker">TOPMAN AI Academy · Video Track</p>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-navy-900 sm:text-5xl">
              เริ่มจาก Seedance / Grok Imagine Video ทำ Image-to-Video
            </h1>
            <div className="mt-5 h-px w-16 bg-gold" />
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-navy-700 sm:text-lg">
              คู่มือเริ่มต้นสำหรับเปลี่ยนภาพนิ่ง 1 ภาพให้เป็นวิดีโอสั้นแบบมืออาชีพ เหมาะสำหรับทำสื่อการเรียนรู้
              คลิปสรุปงาน โปสเตอร์เคลื่อนไหว และคลิปเปิดเรื่อง โดยใช้หลัก Verification First และไม่ใช้ข้อมูลจริงที่มีความอ่อนไหว
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="lab-mission-badge">Image → Motion → Edit</span>
              <span className="lab-mission-badge">Beginner Friendly 2026</span>
              <span className="lab-mission-badge">Prompt First</span>
            </div>
          </div>
          <div className="border-t border-navy-900/10 bg-gradient-to-br from-navy-900 to-navy-800 p-7 text-ivory-50 lg:border-l lg:border-t-0 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-400">Quick Decision</p>
            <div className="mt-5 space-y-4">
              <div className="rounded-2xl border border-ivory-50/15 bg-ivory-50/10 p-5">
                <p className="text-sm text-ivory-100">ถ้าทำคลิปสั้นจากภาพ</p>
                <p className="mt-1 text-2xl font-semibold text-gold-400">Grok ดีและเร็ว</p>
              </div>
              <div className="rounded-2xl border border-ivory-50/15 bg-ivory-50/10 p-5">
                <p className="text-sm text-ivory-100">ถ้าต้องการงานเนียน/ยาว/คุณภาพสูง</p>
                <p className="mt-1 text-2xl font-semibold text-gold-400">Seedance · Veo · Kling · Runway</p>
              </div>
              <div className="rounded-2xl border border-ivory-50/15 bg-ivory-50/10 p-5">
                <p className="text-sm text-ivory-100">ขั้นตอนจำง่าย</p>
                <p className="mt-1 text-xl font-semibold">ภาพ 1 ใบ + Prompt 1 ย่อหน้า + Generate 5 รอบ + ตัดต่อใน CapCut</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="lab-card p-6 sm:p-8">
        <SectionHeading
          kicker="Workflow"
          title="5 ขั้นตอนทำวิดีโอจากภาพ"
          description="เริ่มแบบไม่ซับซ้อนก่อน แล้วค่อยเพิ่มเทคนิคกล้อง แสง เสียง และการต่อฉากเมื่อเริ่มชำนาญ"
        />
        <div className="grid gap-4 md:grid-cols-5">
          {workflow.map((item) => (
            <article key={item.step} className="rounded-2xl border border-navy-900/10 bg-ivory-50 p-4 shadow-card">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-900 text-sm font-bold text-ivory-50">
                {item.step}
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-navy-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-700">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lab-card p-6 sm:p-8">
          <SectionHeading kicker="Prompt Formula" title="สูตร Prompt หลัก" />
          <div className="flex flex-wrap gap-2">
            {promptParts.map((part) => (
              <span key={part} className="rounded-full border border-gold-400/50 bg-brand-50 px-3 py-1.5 text-sm font-semibold text-navy-800">
                {part}
              </span>
            ))}
          </div>
          <div className="mt-5 rounded-2xl border border-navy-900/10 bg-paper p-5">
            <p className="text-sm font-semibold text-navy-900">ตัวอย่าง Prompt สั้น</p>
            <p className="mt-2 text-sm leading-relaxed text-navy-700">
              Young Thai person walking in Bangkok night market, cinematic tracking shot, neon lights, realistic motion,
              8 seconds, confident and warm mood.
            </p>
          </div>
        </div>

        <div className="lab-card p-6 sm:p-8">
          <SectionHeading kicker="Tool Map" title="เลือกเครื่องมือให้ตรงงาน" />
          <div className="grid gap-4 sm:grid-cols-2">
            {tools.map((tool) => (
              <article key={tool.name} className="rounded-2xl border border-navy-900/10 bg-ivory-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-600">{tool.bestFor}</p>
                <h3 className="mt-2 font-display text-xl font-semibold text-navy-900">{tool.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-700">{tool.notes}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="lab-card p-6 sm:p-8">
        <SectionHeading
          kicker="Prompt Library"
          title="Prompt Template ใช้งานจริง"
          description="คัดลอกไปใช้เป็นฐาน แล้วปรับ Subject, mood, duration และ camera movement ตามภาพที่มี"
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {promptTemplates.map((item) => (
            <article key={item.title} className="rounded-2xl border border-navy-900/10 bg-ivory-50 p-5">
              <span className="lab-mission-badge">{item.tag}</span>
              <h3 className="mt-4 font-display text-xl font-semibold text-navy-900">{item.title}</h3>
              <p className="mt-3 rounded-xl border border-navy-900/10 bg-paper p-4 text-sm leading-relaxed text-navy-700">
                {item.prompt}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="lab-card p-6 sm:p-8">
          <SectionHeading kicker="Guardrails" title="คำสั่งกันภาพเพี้ยน" />
          <ul className="space-y-3">
            {guardrails.map((rule) => (
              <li key={rule} className="flex gap-3 rounded-xl border border-navy-900/10 bg-ivory-50 p-3 text-sm text-navy-700">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lab-success text-xs font-bold text-white">✓</span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lab-card border-gold-400/40 bg-gradient-to-br from-brand-50 to-paper p-6 sm:p-8">
          <SectionHeading kicker="Training Plan" title="แผนฝึก 7 วัน" />
          <div className="space-y-4 text-sm leading-relaxed text-navy-700">
            <p>
              วันที่ 1–2: ฝึก prompt ภาพนิ่งขยับเบา ๆ เช่น camera push-in, blinking, parallax และ no distortion
            </p>
            <p>วันที่ 3–4: ฝึกเปรียบเทียบ Grok กับ Seedance โดยใช้ภาพเดียวกันและ prompt เดียวกัน</p>
            <p>วันที่ 5–6: เอาคลิปเข้า CapCut/Canva ใส่ caption เสียง และ title reveal</p>
            <p>วันที่ 7: ทำคลิปจริง 1 ชิ้น ความยาว 15–30 วินาที พร้อม export สำหรับส่งไลน์หรือเปิดบรรยาย</p>
          </div>
          <div className="mt-6 rounded-2xl border border-gold-400/40 bg-paper p-5">
            <p className="text-sm font-semibold text-navy-900">มาตรฐานงานราชการ/สรุปผู้บังคับบัญชา</p>
            <p className="mt-2 text-sm leading-relaxed text-navy-700">
              ใช้ motion น้อย อ่านง่าย ไม่ใช้ข้อมูลจริงหรือข้อมูลส่วนบุคคลในระบบสาธารณะ และตรวจสอบความถูกต้องก่อนเผยแพร่ทุกครั้ง
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
