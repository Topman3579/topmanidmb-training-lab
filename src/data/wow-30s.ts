import type { QuizQuestion } from "@/data/ai-101";

export const WOW30_STORAGE_KEY = "topmanidmb-wow30-quiz-v1";
export const WOW30_PASS = 70;

export const WOW30_LESSONS = [
  {
    id: "unit",
    kicker: "บท 1",
    title: "หน่วยยิงคือ 10 วิ ไม่ใช่ 30",
    lead: "Google Flow + Gemini Omni เจนทีละ 4 / 6 / 8 / 10 วินาที ปุ่ม 30 วิไม่มี คลิปว้าว 30 วิที่ได้จริงมาจาก 3 เทคต่อกัน",
    points: [
      "Omni เก่งเรื่องกล้องขยับในคลิปสั้น ไม่เก่งเรื่องเจนหนึ่งเทคยาว",
      "ปุ่ม Extend / ขยายฉาก ใช้ได้เฉพาะคลิปที่เจนด้วย Veo",
      "สูตรที่พิสูจน์แล้ว: 10 วิ × 3 ใบ แล้วต่อในเครื่อง = ~30 วิ",
      "รอยต่อที่วินาที 10 และ 20 มี เพราะคนละเทค — แลกกับได้เรื่องครบ",
    ],
    drill: "ถ้าอยากได้คลิปฝนซอย 30 วิ บน Flow ยิง 3 ครั้ง ครั้งละ 10 วิ อย่าหาปุ่ม 30",
  },
  {
    id: "bar",
    kicker: "บท 2",
    title: "จำแถบล่าง 6 ช่อง แค่นี้พอเล่นเป็น",
    lead: "โมเดลไม่อยู่แท็บบนหัวเว็บ อยู่ที่กล่องพิมพ์ด้านล่างของโปรเจกต์",
    points: [
      "ปิด Agent ก่อน — เปิดอยู่แถบตั้งค่าจะหาย",
      "กดชื่อโมเดล (มักขึ้น Nano Banana) แล้วเลือก Video ไม่ใช่ Image",
      "เลือก Omni Flash อย่า Veo Lite ถ้ายากได้โลกขยับ",
      "ชิปขวาตั้งเป็น วิดีโอ · 360p · 10 วินาที · x1",
      "ปุ่ม เริ่ม / สิ้นสุด = เฟรมต้นและเฟรมท้าย",
      "ลูกศร = Generate",
    ],
    drill: "เข้าโปรเจกต์ → ดับ Agent → Video → Omni → 10s x1 แล้วค่อยพิมพ์",
  },
  {
    id: "frame",
    kicker: "บท 3",
    title: "เฟรมท้ายคือเชือกต่อฉาก",
    lead: "เมื่อ Omni ยืดไม่ได้ ให้เอาภาพสุดท้ายของคลิปที่แล้วไปวางที่ปุ่ม เริ่ม ของคลิปถัดไป",
    points: [
      "ใบ 1 เจนจากข้อความล้วน ไม่ต้องมีเฟรม",
      "โหลดคลิป 1 แล้วดึงเฟรมวินาทีสุดท้าย (QuickTime หรือ ffmpeg)",
      "ลากรูปนั้นใส่ เริ่ม · สิ้นสุดปล่อยว่าง",
      "พรอมต์ใบ 2 ขึ้นต้นว่า Continue from this last frame",
      "ทำซ้ำกับใบ 3 แล้วต่อไฟล์ในเครื่อง",
    ],
    drill: "อย่าเจนคลิปใหม่โดยไม่ใส่เฟรมที่ เริ่ม — จะได้เรื่องคนละชุด",
  },
  {
    id: "prompt",
    kicker: "บท 4",
    title: "พรอมต์พูดกล้อง ไม่พูดบทกวี",
    lead: "โมเดลฟังการเคลื่อนที่ของกล้องดีกว่าคำสวย เขียนเป็นหนึ่งเทค สั้น ชัด ห้ามหน้าคน",
    points: [
      "บอกกล้อง: dives / flies low / punches through / pulls out",
      "บอกสภาพอากาศและแสง: heavy rain, lightning, wet asphalt, cyan hologram",
      "ปิดท้ายด้วยข้อห้าม: no people, no faces, no text, no logos",
      "ภาษาอังกฤษคุมกล้องได้แม่นกว่าในงานนี้",
      "อย่าใส่ชื่อจริง ป้ายอ่านได้ หรือใบหน้าเจ้าหน้าที่",
    ],
    drill: "หนึ่งย่อหน้า = กล้อง + สถานที่ + สภาพอากาศ + ข้อห้าม",
  },
  {
    id: "pick",
    kicker: "บท 5",
    title: "เลือกใบที่โลกขยับ แล้วโหลดทันที",
    lead: "Flow มักเจนหลายใบ ใบที่ถูกคือใบที่กล้องยังเดิน ไม่ใช่ใบที่นิ่งสวย",
    points: [
      "เล่นทุกใบก่อนเลือก อย่าเลือกจาก thumbnail",
      "เกณฑ์เดียว: ฝน เมือง ถนน หรือโฮโลแกรมขยับ",
      "ตั้ง x1 ตอนเรียน — x2 เสียเครดิตสองเท่า",
      "โหลดลงเครื่องทันที อย่าเก็บไว้แต่ในกริด",
      "360p คือร่าง คมขึ้นค่อยอัปสเกลหลังเคาะเรื่อง",
    ],
    drill: "ถ้าใบนั้นนิ่งทั้ง 10 วิ ทิ้ง แล้วเจนใหม่จากเฟรมเดิม",
  },
  {
    id: "noface",
    kicker: "บท 6",
    title: "เลนว้าวไม่มีหน้าคน",
    lead: "คลิปโชว์โรงใช้ฉากว่าง เมือง ฝน โฮโลแกรม คลิปหน่วยงานที่มีหน้าล็อกใช้เครื่องอื่น",
    points: [
      "เลนนี้: Google Flow Omni สำหรับคลิปว้าวไม่มีหน้า",
      "เลนหน่วยงานที่มีหน้าจากภาพนิ่งล็อก: ไม่ใช้สูตรนี้",
      "ห้ามอัปโหลดรูปคนจริงเป็นเฟรมต้นในเลนว้าว",
      "ห้ามข้อมูลคดี ชื่อจริง ป้ายหน่วยงาน อ่านได้บนคลิปสาธารณะ",
      "ขึ้นเว็บสาธารณะได้เฉพาะคลิปที่ตรวจแล้วว่าไม่มีหน้าและไม่มีข้อความอ่านได้",
    ],
    drill: "สงสัยว่ามีหน้า = ไม่ยิงเลนนี้",
  },
] as const;

export const WOW30_PROMPTS = [
  {
    id: "clip1",
    title: "ใบ 1 · ดำน้ำเมฆเข้าวอร์รูม",
    frame: "ข้อความล้วน ไม่ใส่เฟรม",
    text: `One continuous cinematic one-take. Night Bangkok from above in heavy rain, camera dives through clouds into a glass war-room tower. Empty command floor, no faces, no readable names. Holographic city map ignites cyan over the river, screens cascade like a storm, camera flies through the hologram and out over wet asphalt as lightning hits the skyline. Photoreal, IMAX, anamorphic flare, thunder and rain only, no logos, no text, no people close-up.`,
  },
  {
    id: "clip2",
    title: "ใบ 2 · ถนนเปียกขึ้นตึก",
    frame: "วางเฟรมท้ายใบ 1 ที่ปุ่ม เริ่ม",
    text: `Continue from this last frame. Camera flies low down the wet empty Bangkok road, rain streaks and neon reflections, then rises toward the glass tower as a second lightning bolt hits the skyline. No people, no faces, no text, no logos.`,
  },
  {
    id: "clip3",
    title: "ใบ 3 · ทะลุกระจกปิดวง",
    frame: "วางเฟรมท้ายใบ 2 ที่ปุ่ม เริ่ม",
    text: `Continue from this last frame looking up the glass tower. Camera flies straight up the facade through a lightning flash, punches through the glass into the empty cyan hologram war-room, then pulls out above Bangkok as the storm lights the river. No people, no faces, no text, no logos.`,
  },
];

export const WOW30_QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    question: "Omni บน Google Flow เจนคลิปยาวได้ทีละเท่าไร",
    choices: ["30 วิ ทีเดียว", "ยาวสุด 10 วิ ต่อครั้ง", "ยาวสุด 8 วิ เท่านั้น", "ไม่จำกัดถ้ากด Extend"],
    answerIndex: 1,
    explanation: "Omni เจนได้ 4 / 6 / 8 / 10 วิ คลิป 30 วิต้องต่อหลายเทค",
  },
  {
    id: "q2",
    question: "ปุ่ม Extend / ขยายฉาก ใช้กับคลิปอะไร",
    choices: ["ใช้กับ Omni ได้เสมอ", "ใช้กับคลิป Veo เท่านั้น", "ใช้กับทุกโมเดลถ้าปิด Agent", "ใช้เมื่ออัปสเกลเป็น 720p"],
    answerIndex: 1,
    explanation: "Google ล็อก Extend ไว้เฉพาะคลิปที่เจนด้วย Veo Omni ยังไม่มีปุ่มนี้",
  },
  {
    id: "q3",
    question: "จะต่อฉากบน Omni ต้องทำอะไร",
    choices: [
      "กด Extend บนคลิป",
      "เปิด Agent แล้วพิมพ์ ต่อไป",
      "เอาเฟรมสุดท้ายไปวางที่ปุ่ม เริ่ม ของคลิปใหม่",
      "ลากคลิปทั้งไฟล์เข้า Ingredients",
    ],
    answerIndex: 2,
    explanation: "เฟรมท้ายคือเชือกต่อฉาก สิ้นสุดปล่อยว่าง พรอมต์ขึ้นต้น Continue from this last frame",
  },
  {
    id: "q4",
    question: "ตอนเรียนควรตั้งจำนวนใบต่อครั้งเท่าไร",
    choices: ["x4 ให้มีตัวเลือก", "x2 เสมอ", "x1 เพื่อไม่เสียเครดิตสองเท่า", "ไม่สำคัญ"],
    answerIndex: 2,
    explanation: "x2 คือสองคลิปต่อหนึ่งคำสั่ง ตอนฝึกใช้ x1",
  },
  {
    id: "q5",
    question: "เลนคลิปว้าว 30 วินี้ใส่หน้าคนได้ไหม",
    choices: [
      "ได้ ถ้ายิงด้วย Omni",
      "ได้ ถ้าเป็นภาพนิ่งที่ล็อกแล้ว",
      "ไม่ได้ — เลนนี้ใช้ฉากว่าง เมือง ฝน โฮโลแกรม",
      "ได้เฉพาะหน้าเจ้าหน้าที่",
    ],
    answerIndex: 2,
    explanation: "หน้าคนล็อกใช้เครื่องอื่น เลนว้าวห้ามรูปคนจริง",
  },
  {
    id: "q6",
    question: "พรอมต์ที่ดีในเลนนี้เน้นอะไร",
    choices: [
      "คำสวยและบทกวี",
      "การเคลื่อนที่ของกล้อง สถานที่ สภาพอากาศ และข้อห้าม",
      "ชื่อหน่วยงานและโลโก้ให้อ่านชัด",
      "บทพูดของตัวละครยาว ๆ",
    ],
    answerIndex: 1,
    explanation: "โมเดลฟังกล้องดีกว่าคำสวย ปิดท้ายด้วย no people, no faces, no text, no logos",
  },
  {
    id: "q7",
    question: "คลิป 30 วิชุดนี้ต้องยิงกี่ครั้ง",
    choices: ["ครั้งเดียว", "สองครั้ง", "สามครั้ง ครั้งละ 10 วิ", "ห้าครั้ง ครั้งละ 6 วิ"],
    answerIndex: 2,
    explanation: "ใบ 1 ข้อความล้วน ใบ 2–3 ต่อจากเฟรมท้าย แล้ว concat ในเครื่อง",
  },
  {
    id: "q8",
    question: "ก่อนเจนต้องปิดอะไรบนแถบล่าง",
    choices: ["PRO", "ลายน้ำ", "Agent", "โหมด Video"],
    answerIndex: 2,
    explanation: "Agent เปิดอยู่แถบโมเดลและเฟรมจะหาย ต้องดับก่อน",
  },
];
