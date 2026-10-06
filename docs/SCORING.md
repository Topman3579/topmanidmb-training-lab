# Scoring

สรุปกลไกการให้คะแนนจากโค้ดจริง — `src/lib/scoring.ts` (เกม 2D), `src/lib/evidence-room-scoring.ts` (ห้องหลักฐาน 3D), `src/lib/constants.ts`, `src/data/rubric.ts`

## เกมหลัก 4 เฟส

ทุกเฟสให้คะแนน 0–100 และมีน้ำหนัก **25% เท่ากันทุกมิติ** ตาม rubric (`src/data/rubric.ts`)

### 1) Evidence — จัดประเภทหลักฐาน (`scoreEvidence`)

ข้อถูกเมื่อ `answers[item.id] === item.correctClass`

```
score = round(correct / items.length × 100)
```

- ถ้าไม่มี item เลย (`items.length === 0`) ได้ 0

### 2) Timeline — เรียงลำดับเหตุการณ์ (`scoreTimeline`)

เฉลยคือ events เรียงตาม `correctOrder` จากน้อยไปมาก แล้วเทียบ **ทีละตำแหน่ง** — ตำแหน่ง `i` ของผู้เล่นต้องตรงกับตำแหน่ง `i` ของเฉลย (ไม่ให้เครดิตแบบ relative order)

```
score = round(correct / events.length × 100)
```

- ไม่มี event เลยได้ 0

### 3) Red Flag — จับจุดผิดปกติ (`scoreRedFlags`)

- `flagged` = segment ที่ `hasFlag === true`
- `hits` = flagged ที่ผู้เล่นเลือก
- `falsePositives` = ที่ผู้เล่นเลือกและ id นั้นมีอยู่จริงใน segments แต่ `hasFlag` เป็นเท็จ (id ที่ไม่พบใน segments ไม่ถูกนับ)

```
score = max(0, round((hits − falsePositives) / flagged.length × 100))
```

- ถ้าไม่มี flagged เลย → 100 (ไม่สนใจ false positives)
- false positive หักเต็มน้ำหนัก 1:1 กับ hits — กันกลยุทธ์ "คลิกทุกประโยค" (เดิมหักแค่ 15% ต่อครั้ง ทำให้คลิกหมดยังได้คะแนนสูง)
- คะแนนถูก clamp ขั้นต่ำที่ 0 ไม่มีค่าติดลบ

### 4) Decision — เลือกทางดำเนินการ (`scoreDecision`)

- ไม่ได้เลือก หรือ id ที่เลือกไม่มีใน options → 0
- เลือกตัวที่ `isBest === true` → 100
- ไม่ใช่ best → `max(0, 50 + scoreDelta)` — ฐาน 50 บวก/ลบ `scoreDelta` ของตัวเลือกนั้น clamp ขั้นต่ำ 0 (ไม่มีการ clamp ด้านบนตามโค้ด)

### คะแนนรวม (`buildPhaseScores`)

```
total = round((evidence + timeline + redflag + decision) / 4)
```

- เฉลี่ย**ครบ 4 มิติเสมอ** — เฟสที่ไม่ได้ส่งค่ามาถือเป็น 0 (ไม่ตัดมิติที่ได้ 0 ทิ้ง เพราะจะทำให้เรียง timeline ผิดหมดแล้วคะแนนรวมกลับสูงขึ้น)
- ใช้ `Math.round` — ครึ่งตัวปัดขึ้น (เช่น 47.5 → 48)

### เกณฑ์ผ่าน

- `isPassed(total)` = `total >= PASS_THRESHOLD` โดย `PASS_THRESHOLD = 70` (`src/lib/constants.ts`)

## Worked examples

### ตัวอย่าง 1 — Evidence

8 item ตอบถูก 6 → `round(6/8 × 100)` = `round(75)` = **75**

### ตัวอย่าง 2 — Timeline

5 event เรียงตรงตำแหน่ง 3 → `round(3/5 × 100)` = **60**
กรณี 3 event ตรง 2 → `round(2/3 × 100)` = `round(66.67)` = **67** (ครึ่ง/ทศนิยมปัดขึ้น)

### ตัวอย่าง 3 — Red Flag

6 segment มี 4 ตัวที่มี flag จริง:

- เลือก flag ถูก 3 + เลือกเกิน (segment ที่ไม่มี flag) 2 → `round((3−2)/4 × 100)` = **25**
- คลิกครบทุก segment (ถูก 4 + เกิน 2) → `round((4−2)/4 × 100)` = **50** — คลิกหมดทุกข้อไม่มีทางได้ 100

### ตัวอย่าง 4 — Decision + คะแนนรวม

เลือกตัวไม่ใช่ best ที่ `scoreDelta = −20` → `max(0, 50 − 20)` = **30** (ถ้า `scoreDelta = −70` → `max(0, −20)` = **0**)

สมมติทั้ง session: evidence 75, timeline 60, redflag 25, decision 30
→ `round((75 + 60 + 25 + 30) / 4)` = `round(47.5)` = **48** → **ไม่ผ่าน** (ต่ำกว่าเกณฑ์ 70)

## 3D Evidence Room (แยกจากเกม 2D)

| ค่าคงที่ | ค่า | ที่มา |
|---|---|---|
| `POINTS_PER_ITEM` | 20 | `src/lib/evidence-room-scoring.ts` |
| `PASS_THRESHOLD_3D` | 70 | `src/lib/evidence-room-scoring.ts` |

- ข้อถูกเมื่อ `selected === correctClass` (`isClassificationCorrect`)
- `scoreEvidenceRoom3D(answers)` = `จำนวนข้อถูก × 20` — ตอบผิดไม่ถูกหัก แค่ไม่ได้แต้ม
- เกณฑ์ผ่าน: `isPassed3D(score)` = `score >= 70` → ต้องถูก **อย่างน้อย 4 ข้อ** (4 × 20 = 80 ≥ 70 ส่วน 3 × 20 = 60 ยังไม่ผ่าน)

**ตัวอย่าง:** ตอบ 5 ข้อถูก 4 → 80 คะแนน → ผ่าน; ถูก 3 → 60 → ไม่ผ่าน
