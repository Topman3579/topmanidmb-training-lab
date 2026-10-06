# Code Review — `src/lib/scoring.ts`, `src/lib/evidence-room-scoring.ts`, `src/lib/storage.ts`

> **สรุป (ไทย):** ตรรกะคะแนนภาพรวมถูกต้อง (clamp ขอบล่าง, กันโกงคะแนน red-flag, เฉลี่ยครบ 4 มิติตาม rubric) แต่พบจุดเสี่ยง 13 จุด — สำคัญสุดคือ guard localStorage เองโดนข้อยกเว้นได้ (High), เขียน `setItem` ไม่ห่อ try/catch, validation ข้อมูลที่อ่านกลับตื้นเกินไปจน `getBestScore` พังได้, `scoreDecision` ไม่ clamp ขอบบน (ได้ 110 ได้), และคะแนน 3D room ผูกกับสมมติฐาน 5 ชิ้น (ภารกิจ ≤3 ชิ้นผ่านไม่ได้เลย) — ไม่ได้แก้โค้ดใด ๆ เพิ่มเฉพาะรายงานนี้

## Summary

Reviewed the three modules for score bounds/clamping, rounding, division by zero, empty inputs, NaN propagation, SSR/static-export safety of `localStorage`, JSON parse-error handling, schema/version migration, and type safety. No source files were modified.

What is already correct:

- All percentage scores (`scoreEvidence`, `scoreTimeline`, `scoreRedFlags`, `buildPhaseScores`) are naturally bounded to 0–100 for well-formed numeric inputs, and division by zero is guarded by early returns on empty arrays.
- `scoreRedFlags` correctly clamps at 0 and applies the full-weight false-positive penalty, so "select everything" scores 0 — the anti-cheat intent in the comment holds.
- `buildPhaseScores` averages all 4 phases (missing = 0) matching the 25%/phase rubric, and `isPassed(NaN)` safely returns `false`.
- `loadProgress` is guarded for SSR (`typeof window`) and wraps `JSON.parse` in try/catch, so corrupt JSON degrades to an empty store instead of throwing.
- `saveSession` dedupes by `scenarioId + completedAt`, caps history at 50, and dedupes badges via `Set`.

Main risks (details in the table): the SSR/availability guard `canUseStorage()` can itself throw (Chrome "block all cookies" throws `SecurityError` on the `window.localStorage` property access), the `setItem` write in `saveSession` is not wrapped in try/catch, stored sessions are validated only shallowly (a malformed entry crashes `getBestScore` with a `TypeError` outside any try/catch), `scoreDecision` clamps only the lower bound (`scoreDelta: 60` → 110), and `scoreEvidenceRoom3D` returns `correct × 20` with no relation to item count, so a mission with ≤ 3 items can never reach the 70-point pass threshold while > 5 items can exceed 100.

## Findings

| Severity | Location | Issue | Recommendation |
|---|---|---|---|
| High | `src/lib/storage.ts:7` | `canUseStorage()` evaluates `typeof window.localStorage`, but in browsers with site data blocked (e.g. Chrome "Block all cookies") the property *access itself* throws `SecurityError`. The guard that exists to make storage unavailability safe instead crashes every caller (load/save/getBestScore) if invoked during render. | Wrap the access in `try { return !!window.localStorage } catch { return false }`. |
| Medium | `src/lib/storage.ts:35-37` | `window.localStorage.setItem(...)` in `saveSession` is not inside try/catch. `QuotaExceededError` (or a storage-blocked browser that got past the guard) throws at the exact moment a completed session is being saved — the player loses the result they just earned. | Wrap the write in try/catch and degrade gracefully (the function already returns `next`; consider returning a `{ store, persisted }` pair or just swallowing). |
| Medium | `src/lib/storage.ts:15-19` | `JSON.parse(raw) as ProgressStore` is an unchecked cast and validation is shallow: only `sessions` array-ness and `badges` array-ness are checked. A stored entry like `{"sessions":[{}]}` passes `loadProgress`, then `getBestScore` (line 45) does `s.scores.total` → uncaught `TypeError`, crashing the progress page. Non-array parses ("null", numbers) are saved only accidentally by falling into the same catch. | Validate each session (`scenarioId: string`, `completedAt: string`, `scores.total` finite number) and drop invalid entries; or introduce a small type guard / schema check on load. |
| Medium | `src/lib/scoring.ts:66` | `scoreDecision` clamps only the lower bound: `Math.max(0, 50 + picked.scoreDelta)`. `scoreDelta` is free-form data, so `scoreDelta: 60` yields **110**, inflating the phase score, the 4-phase total, and any pass/certificate derived from it. A non-finite `scoreDelta` propagates `NaN` into `buildPhaseScores`. | Clamp both bounds: `Math.min(100, Math.max(0, 50 + picked.scoreDelta))` and treat non-finite delta as 0 (or validate the data file). |
| Medium | `src/lib/evidence-room-scoring.ts:3-8` | `scoreEvidenceRoom3D` = `correct × POINTS_PER_ITEM (20)` with no relation to the mission's item count. A mission with exactly 5 items maxes at 100, but > 5 items can score above 100, and a mission with ≤ 3 items maxes at 60 — **below** `PASS_THRESHOLD_3D (70)`, i.e. unwinnable regardless of play. (Scenario data isn't in this checkout, so actual item counts couldn't be verified.) | Normalize to a percentage (`Math.round(correct / items.length * 100)` with the item list passed in), or validate at load time that each mission has exactly 5 items. |
| Low | `src/lib/storage.ts:4,11,16` | The module-level `EMPTY` constant is returned **by reference** on the SSR path, missing-key path, and parse-failure path. Any caller mutating `loadProgress().sessions` pollutes all future SSR/empty returns. | Return a fresh object (`{ sessions: [], badges: [] }`) instead of the shared constant. |
| Low | `src/lib/scoring.ts:50-53` | Selected ids that don't exist in `segments` are not counted as false positives (`seg` is `undefined` → falsy → skipped). Garbage/foreign ids in `selected` are "free" and can't lower the score. UI-only callers can't produce these, but the exported function can receive them. | Count unknown ids as false positives (`return !seg || !seg.hasFlag`) or document that unknown ids are ignored. |
| Low | `src/lib/scoring.ts:42-43` | When no segment has `hasFlag`, the function returns 100 **regardless of what was selected** — false positives are not penalized on this branch, which is inconsistent with the full-weight penalty design one line below. | Either return 100 only when `selected` is also empty, or document the "nothing to find = full marks" convention. |
| Low | `src/lib/scoring.ts:28-30` | With duplicate `correctOrder` values the "correct" order depends on `Array.sort` stability (insertion order). Deterministic on modern engines but implicit and data-dependent. | Pin the behavior with a test (below) and/or enforce unique `correctOrder` in scenario data; a strict comparator tie-break on `id` would make it explicit. |
| Low | `src/lib/scoring.ts:69-78` | `buildPhaseScores` trusts its inputs: a part > 100 or `NaN` flows into `total` unchecked. `NaN` is silently swallowed by `isPassed` (`NaN >= 70` is `false`) but would render as "NaN" in UI. | Clamp each part to [0,100] and coerce non-finite to 0 before averaging. |
| Low | `src/lib/storage.ts:30-32` | Badges are granted from the caller-supplied `result.passed` flag rather than recomputed via `isPassed(scores.total)`; an inconsistent caller can award a pass badge for a failing session. | Derive `passed` from `scores.total` inside `saveSession` (single source of truth) or document the trust contract. |
| Low | `src/lib/storage.ts:29` | History is silently truncated at 50 sessions (`.slice(0, 50)`); the oldest session (and its contribution to `getBestScore`) disappears without any notice or documentation. | Document the cap (see docs gaps) and/or surface it in the progress UI. |
| Low | `src/lib/storage.ts` (module) / `src/lib/constants.ts:5` | No schema version inside the stored payload and no migration path. Versioning exists only as the `-v1` key suffix: bumping to `-v2` orphans the old blob with no migration, and already-shipped schema drift (e.g. `answers?` noted as optional in `types.ts:77-78`) is handled only by optionality. | Embed `{ version: 1, ... }` in the payload and add a `migrate(parsed)` step in `loadProgress` that upgrades/drops old shapes explicitly. |

No division-by-zero, empty-input crash, or rounding error was found in `scoring.ts` itself; all expected outputs below are computed directly from the current code.

## Recommended unit tests

Fixtures used below (only the fields the functions read):

- Evidence items: `E = [{id:"e1",correctClass:"observable"},{id:"e2",correctClass:"noise"},{id:"e3",correctClass:"derived"}]`
- Timeline events: `T = [{id:"t3",correctOrder:3},{id:"t1",correctOrder:1},{id:"t2",correctOrder:2}]` → target order `[t1,t2,t3]`
- Red-flag segments: `R = [{id:"s1",hasFlag:true},{id:"s2",hasFlag:false},{id:"s3",hasFlag:true},{id:"s4",hasFlag:false}]` (flagged = s1, s3)
- Decision options: `D = [{id:"best",isBest:true,scoreDelta:0},{id:"ok",isBest:false,scoreDelta:20},{id:"weak",isBest:false,scoreDelta:-30},{id:"terrible",isBest:false,scoreDelta:-80},{id:"odd",isBest:false,scoreDelta:60}]`

### `scoreEvidence(items, answers)`

| # | Input | Expected | Why |
|---|---|---|---|
| 1 | `([], {})` | `0` | empty-items early return |
| 2 | `(E, {e1:"observable", e2:"noise", e3:"derived"})` | `100` | 3/3 |
| 3 | `(E, {e1:"observable", e2:"derived", e3:"derived"})` | `67` | 2/3 = 66.67 → `Math.round` |
| 4 | `(E, {})` | `0` | missing key ⇒ `undefined !== correctClass` ⇒ wrong |
| 5 | `(E, {e1:"observable", e2:null, e3:null})` | `33` | `null` counts wrong; 1/3 = 33.33 → 33 |
| 6 | `(E.slice(0,1) ×8 duplicates…)` — simpler: 8 items, 1 correct | `13` | 1/8 = 12.5 → `Math.round` half-up |
| 7 | `(E, {e1:"observable", e2:"noise", e3:"derived", eX:"whatever"})` | `100` | extra unknown answer keys are ignored |

### `scoreTimeline(events, order)`

| # | Input | Expected | Why |
|---|---|---|---|
| 1 | `([], [])` | `0` | empty-events early return |
| 2 | `(T, ["t1","t2","t3"])` | `100` | exact match |
| 3 | `(T, ["t2","t1","t3"])` | `33` | only position 3 matches; 1/3 = 33.33 → 33 |
| 4 | `(T, [])` | `0` | `order[i]` undefined never matches |
| 5 | `(T, ["t1"])` | `33` | short order: 1 of 3 positions |
| 6 | `(T, ["t1","t1","t1"])` | `33` | duplicate ids only match once (positional compare) |
| 7 | `(T, ["t1","t2","t3","t4"])` | `100` | extra entries beyond `target.length` ignored |
| 8 | `([{id:"a",correctOrder:1},{id:"b",correctOrder:1}], ["a","b"])` | `100` | tie broken by stable sort = insertion order |
| 9 | same events, `["b","a"]` | `0` | pins the stability-dependent tie-break |

### `scoreRedFlags(segments, selected)`

| # | Input | Expected | Why |
|---|---|---|---|
| 1 | `([], new Set())` | `100` | no flags ⇒ full marks by convention |
| 2 | `([{id:"x",hasFlag:false}], new Set(["x"]))` | `100` | same, even with a (false-positive) selection — pins the inconsistency |
| 3 | `(R, {"s1","s3"})` | `100` | 2 hits / 2 flagged |
| 4 | `(R, {"s1"})` | `50` | 1/2 |
| 5 | `(R, {"s1","s2"})` | `0` | (1 hit − 1 FP)/2 = 0 |
| 6 | `(R, {"s1","s2","s3","s4"})` | `0` | anti-cheat: (2 − 2)/2 = 0 |
| 7 | `(R, {"s1","s3","ghost"})` | `100` | unknown id not counted as FP — pins current leniency |
| 8 | 5 segments with 3 flagged, `{"s1","s3"}` | `67` | 2/3 = 66.67 → 67 |
| 9 | `(R, {"s2","s4"})` | `0` | 0 hits, 2 FPs → raw = −1 → round(−100) clamped by `Math.max(0,…)` |

### `scoreDecision(options, selectedId)`

| # | Input | Expected | Why |
|---|---|---|---|
| 1 | `(D, null)` | `0` | no selection |
| 2 | `(D, "nope")` | `0` | unknown id |
| 3 | `(D, "best")` | `100` | `isBest` |
| 4 | `(D, "ok")` | `70` | 50 + 20 |
| 5 | `(D, "weak")` | `20` | 50 − 30 |
| 6 | `(D, "terrible")` | `0` | 50 − 80 = −30 → lower clamp |
| 7 | `(D, "odd")` | `110` | **upper clamp missing** — pin current behavior, fix to 100 |

### `buildPhaseScores(parts)`

| # | Input | Expected total | Why |
|---|---|---|---|
| 1 | `{evidence:80, timeline:90, redflag:70, decision:100}` | `85` | plain average |
| 2 | `{evidence:100}` | `25` | missing phases default 0, still ÷4 — pins the fix noted in the code comment |
| 3 | `{}` | `0` | all defaults |
| 4 | `{evidence:70, timeline:70, redflag:70, decision:71}` | `70` | 70.25 → round down |
| 5 | `{evidence:70, timeline:70, redflag:70, decision:72}` | `71` | 70.5 → round half-up |
| 6 | `{evidence:NaN}` | `NaN` | pins NaN propagation (recommend guarding) |

### `isPassed` / evidence-room module

| # | Input | Expected |
|---|---|---|
| 1 | `isPassed(70)` / `isPassed(69)` / `isPassed(NaN)` | `true` / `false` / `false` |
| 2 | `scoreEvidenceRoom3D([])` | `0` |
| 3 | 5 answers, k correct (0…5) | `0, 20, 40, 60, 80, 100` |
| 4 | 6 answers all correct | `120` — pins the >100 coupling |
| 5 | 3-item mission, all correct → `isPassed3D(score)` | score `60`, `isPassed3D(60)` = `false` — pins "unwinnable ≤3 items" |
| 6 | `isPassed3D(70)` / `isPassed3D(69)` / `isPassed3D(NaN)` | `true` / `false` / `false` |
| 7 | `isClassificationCorrect("fact","fact")` / `("fact","suspicion")` | `true` / `false` |

### `storage.ts` (jsdom or a stubbed `localStorage`)

| # | Setup → call | Expected |
|---|---|---|
| 1 | no `window` (node env) → `loadProgress()` | `{sessions:[], badges:[]}`, no throw |
| 2 | key absent → `loadProgress()` | `{sessions:[], badges:[]}` |
| 3 | key = `"not json{"` → `loadProgress()` | `{sessions:[], badges:[]}` (parse error caught) |
| 4 | key = `"null"` → `loadProgress()` | `{sessions:[], badges:[]}` (`null.sessions` throws inside try, caught) |
| 5 | key = `'{"sessions":{}}'` → `loadProgress()` | `{sessions:[], badges:[]}` (non-array sessions rejected) |
| 6 | key = `'{"sessions":[],"badges":"x"}'` → `loadProgress()` | `{sessions:[], badges:[]}` (badges coerced to `[]`) |
| 7 | `saveSession(result)` → read key back | JSON equals returned store; new session is `sessions[0]` |
| 8 | `saveSession(r)` twice with same `scenarioId`+`completedAt` | 1 session kept |
| 9 | same `scenarioId`, different `completedAt` | 2 sessions; `getBestScore(id)` = max of both `scores.total` |
| 10 | seed 50 sessions, `saveSession` a new one | `sessions.length === 50`, oldest dropped |
| 11 | `saveSession({..., passed:true})` twice | badge `"passed:<scenarioId>"` present exactly once (Set) |
| 12 | `saveSession({..., passed:false})` | no badge added |
| 13 | `setItem` mocked to throw → `saveSession(r)` | currently **throws** (pin; fix = try/catch) |
| 14 | key = `'{"sessions":[{}]}'` → `getBestScore("x")` | currently **throws TypeError** on `s.scores.total` (pin; fix = per-session validation) |
| 15 | `clearProgress()` | key removed; no-op without `window` |
| 16 | no `window` → `saveSession(r)` | returns store containing `r` but writes nothing (pin: return value implies persistence) |

## Docs gaps

1. **`docs/GAME_DESIGN.md:17` is stale**: it says *"Total: average of completed phases"*, but `buildPhaseScores` now always averages all 4 phases with missing = 0 (the change is even explained in the code comment at `scoring.ts:74-75`). The doc contradicts shipped behavior.
2. The red-flag scoring rule is undocumented: full-weight false-positive deduction, the `Math.max(0, …)` clamp, and the "no flags to find ⇒ 100" convention (including that false positives aren't penalized on that branch) appear nowhere in `docs/GAME_DESIGN.md`.
3. The 3D evidence room has **no scoring documentation at all** — `GAME_DESIGN.md` covers only the 4-phase game. Points-per-item (20), pass threshold (70), and especially the implicit "exactly 5 items per mission" assumption should be documented (or removed by normalizing the score).
4. `docs/MOCK_DATA_POLICY.md:19` documents only the localStorage key. Missing: the `ProgressStore`/`SessionResult` schema, the 50-session cap (silent truncation), the badge format `passed:<scenarioId>`, and a versioning/migration policy for the stored blob.
5. `docs/MOCK_DATA_POLICY.md:5` allows scenario codes `LAB-2026-001 … LAB-2026-003`, but `README.md:58` (and recent history) includes `LAB-2026-004` — the policy range is stale.
6. `README.md:19` says "Next.js 14"; `package.json:16` pins `next 16.3.0`.
7. No test infrastructure or testing docs at all: `package.json` has no `test` script and no test framework dependency; the scoring modules are pure functions and trivially testable, so this is the cheapest quality win available.
8. Minor: `README.md:27` hardcodes a personal absolute path (`/Users/topmanidmb/projects/...`) in the quick start.
