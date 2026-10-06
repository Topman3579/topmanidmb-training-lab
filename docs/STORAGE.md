# Storage (localStorage)

สรุปการเก็บ progress จาก `src/lib/storage.ts`, `src/lib/types.ts`, `src/lib/constants.ts` — เก็บใน browser `localStorage` เท่านั้น ไม่มี server-side persistence

## Key

- Key: `topmanidmb-training-lab-progress-v1` (ค่า `STORAGE_KEY` ใน `src/lib/constants.ts`)

## รูปแบบ JSON (ProgressStore)

ตัวอย่างโครงสร้างที่เก็บจริง:

```json
{
  "sessions": [
    {
      "scenarioId": "lab-2026-001",
      "completedAt": "2026-10-06T09:00:00.000Z",
      "scores": { "evidence": 75, "timeline": 60, "redflag": 100, "decision": 100, "total": 84 },
      "passed": true,
      "answers": {
        "evidence": { "ev-1": "observable", "ev-2": null },
        "timelineOrder": ["t-1", "t-2", "t-3"],
        "redFlagSelected": ["rf-2"],
        "decisionId": "d-1"
      }
    }
  ],
  "badges": ["passed:lab-2026-001"]
}
```

- `sessions` — `SessionResult[]` ใหม่สุดอยู่หน้าสุด (prepend)
- `scores` — `PhaseScores` คะแนน 0–100 ครบทั้ง 4 เฟส + `total`
- `answers` — optional (`SessionAnswers`) session เก่าที่บันทึกก่อนมี Debrief เฉลยรายข้ออาจไม่มีฟิลด์นี้
- `badges` — `string[]`

## History cap

- เก็บสูงสุด **50 sessions** — `saveSession` ทำ `slice(0, 50)` หลัง prepend ตัวใหม่ รายการเกินถูกตัดทิ้งจากฝั่งเก่า
- กันซ้ำ: ก่อนเพิ่ม session ใหม่จะลบ session เดิมที่ตรงกัน**ทั้ง** `scenarioId` และ `completedAt` (บันทึก session เดียวกันซ้ำ) — การเล่นซ้ำคนละรอบ (`completedAt` ต่างกัน) ของ scenario เดิมยังถูกเก็บครบ

## Badge rules

- ชนิดเดียวที่โค้ดสร้างตอนนี้: `passed:<scenarioId>` — เพิ่มเข้า `badges` เมื่อบันทึก session ที่ `passed === true`
- dedupe ด้วย `new Set` — badge เดียวกันไม่ซ้ำกัน

## การอ่านและข้อมูลเสียหาย (`loadProgress`)

ลำดับการตรวจ:

1. ไม่มี `window`/`localStorage` (SSR หรือ environment ที่ไม่รองรับ) → คืน `{ sessions: [], badges: [] }`
2. ไม่มีค่าใน key → คืนค่าว่างเช่นกัน
3. `JSON.parse` ล้มเหลว (ข้อมูลเสีย/corrupted) → catch แล้วคืนค่าว่าง — **ทิ้งข้อมูลเดิมทั้งก้อน** และการ `saveSession` ครั้งถัดไปจะเขียนทับค่าที่ reset นี้ลงไป
4. `parsed.sessions` ขาดหายหรือไม่ใช่ array → คืนค่าว่างทั้งก้อนเช่นเดียวกับข้อ 3
5. `parsed.badges` ไม่ใช่ array → normalize เป็น `[]` แต่ยังเก็บ `sessions` ไว้

หมายเหตุ: โค้ด cast ด้วย `as ProgressStore` — ไม่มี validation ระดับ field ของ session แต่ละตัว

## Helper อื่น ๆ

- `saveSession(result)` — คำนวณ store ใหม่แล้วคืนค่ากลับมาด้วย (ถ้าไม่มี `localStorage` จะได้ค่าที่คำนวณแล้วแต่ไม่ถูกเขียนลง storage)
- `getBestScore(scenarioId)` — `scores.total` สูงสุดในบรรดา session ของ scenario นั้น; ไม่เคยมี session → `null`
- `clearProgress()` — ลบ key ทิ้งทั้งหมด (no-op ถ้าไม่มี `localStorage`)
