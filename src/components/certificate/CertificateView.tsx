"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AI101_PASS, AI101_STORAGE_KEY } from "@/data/ai-101";
import { scenarioSummaries } from "@/data/scenarios";
import { loadProgress } from "@/lib/storage";

const NAME_KEY = "topmanidmb-training-lab-cert-name-v1";

interface Requirement {
  id: string;
  label: string;
  done: boolean;
  score: number | null;
  href: string;
}

function readAi101(): number | null {
  try {
    const raw = window.localStorage.getItem(AI101_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { best?: number };
    return typeof parsed.best === "number" ? parsed.best : null;
  } catch {
    return null;
  }
}

function formatThaiDate(d: Date): string {
  const months = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear() + 543}`;
}

export function CertificateView() {
  const [reqs, setReqs] = useState<Requirement[]>([]);
  const [name, setName] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const store = loadProgress();
    const ai101 = readAi101();
    const list: Requirement[] = [
      {
        id: "ai-101",
        label: "บท 0 · AI สำหรับตำรวจ 101 (ควิซ)",
        done: (ai101 ?? 0) >= AI101_PASS,
        score: ai101,
        href: "/ai-101/",
      },
      ...scenarioSummaries.map((s) => {
        const hits = store.sessions.filter((x) => x.scenarioId === s.id);
        const best = hits.length ? Math.max(...hits.map((x) => x.scores.total)) : null;
        return {
          id: s.id,
          label: `${s.code} · ${s.title}`,
          done: hits.some((x) => x.passed),
          score: best,
          href: `/scenarios/${s.id}/`,
        };
      }),
    ];
    setReqs(list);
    try {
      setName(window.localStorage.getItem(NAME_KEY) ?? "");
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const allDone = useMemo(() => reqs.length > 0 && reqs.every((r) => r.done), [reqs]);
  const doneCount = reqs.filter((r) => r.done).length;
  const avg = useMemo(() => {
    const scores = reqs.map((r) => r.score).filter((s): s is number => typeof s === "number");
    return scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
  }, [reqs]);

  const saveName = (v: string) => {
    setName(v);
    try {
      window.localStorage.setItem(NAME_KEY, v);
    } catch {
      /* ignore */
    }
  };

  const today = formatThaiDate(new Date());
  const refCode = useMemo(() => {
    // รหัสอ้างอิงเฉพาะเครื่อง — ไม่ใช่เลขทะเบียนกลาง
    const seed = `${name}|${avg}|${doneCount}`;
    let h = 0;
    for (let i = 0; i < seed.length; i += 1) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
    return `LAB-${h.toString(16).toUpperCase().padStart(8, "0")}`;
  }, [name, avg, doneCount]);

  if (!ready) return null;

  return (
    <div className="space-y-6 animate-fade-in-up">
      <section className="lab-card p-6 sm:p-8 print:hidden">
        <p className="lab-kicker">ใบประกาศผ่านหลักสูตร</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-navy-900">TOPMANIDMB AI Training Lab — หลักสูตรพื้นฐาน</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-navy-700">
          ผ่านครบ {reqs.length} รายการ (ควิซบท 0 + ภารกิจจำลอง 4 ภารกิจ เกณฑ์ 70 คะแนน) แล้วพิมพ์ใบประกาศได้จากหน้านี้
          ทุกอย่างอยู่ในเครื่องนี้ — ไม่มีการส่งชื่อหรือคะแนนออกไปที่ใด ใบประกาศนี้ใช้เพื่อการฝึกอบรมภายใน ไม่ใช่วุฒิบัตรทางราชการ
        </p>

        <div className="mt-5">
          <div className="flex items-center justify-between text-xs font-semibold text-navy-600">
            <span>ความคืบหน้า</span>
            <span>
              {doneCount}/{reqs.length}
            </span>
          </div>
          <div className="mt-1 h-2 overflow-hidden rounded-full bg-navy-900/10">
            <div className="h-full bg-gold transition-all" style={{ width: `${(doneCount / Math.max(reqs.length, 1)) * 100}%` }} />
          </div>
        </div>

        <ul className="mt-5 space-y-2">
          {reqs.map((r) => (
            <li
              key={r.id}
              className={`flex items-center justify-between gap-3 rounded-xl border p-3 text-sm ${
                r.done ? "border-emerald-200 bg-emerald-50/40" : "border-navy-900/10 bg-ivory-50"
              }`}
            >
              <span className="flex items-center gap-3">
                <span
                  className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
                    r.done ? "bg-lab-success" : "bg-navy-300"
                  }`}
                >
                  {r.done ? "✓" : "·"}
                </span>
                <span className="text-navy-900">{r.label}</span>
              </span>
              <span className="flex shrink-0 items-center gap-3">
                <span className="font-semibold text-navy-700">{r.score !== null ? r.score : "—"}</span>
                {!r.done && (
                  <Link href={r.href} className="text-xs font-semibold text-brand-700 hover:underline">
                    ไปทำ →
                  </Link>
                )}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
          <label className="block text-sm text-navy-700">
            ชื่อ-สกุลที่จะแสดงบนใบประกาศ (เก็บในเครื่องนี้เท่านั้น)
            <input
              value={name}
              onChange={(e) => saveName(e.target.value)}
              placeholder="เช่น ร.ต.อ. ตัวอย่าง ฝึกอบรม"
              className="mt-1 w-full rounded-xl border border-navy-900/20 bg-white px-4 py-2.5 text-navy-900 outline-none focus:border-gold"
              maxLength={80}
            />
          </label>
          <button
            type="button"
            disabled={!allDone || !name.trim()}
            onClick={() => window.print()}
            className="lab-btn-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            🖨 พิมพ์ / บันทึก PDF
          </button>
        </div>
        {!allDone && <p className="mt-2 text-xs text-navy-500">ปุ่มพิมพ์จะเปิดเมื่อผ่านครบทุกรายการ</p>}
      </section>

      {allDone && name.trim() && (
        <section className="cert-sheet lab-card overflow-hidden border-gold-400/60 p-0">
          <div className="bg-gradient-to-br from-navy-900 to-navy-800 px-8 py-6 text-ivory-50">
            <div className="flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/logo-icon.svg" alt="TOPMANIDMB" className="h-14 w-14 rounded-xl" />
              <div>
                <p className="font-display text-2xl font-semibold tracking-wide">TOPMANIDMB</p>
                <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-gold-400">Intelligence · Data · Mission</p>
              </div>
            </div>
          </div>
          <div className="px-8 py-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-600">Certificate of Completion</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-navy-900">ใบประกาศผ่านการฝึกอบรม</h2>
            <p className="mt-6 text-sm text-navy-600">ขอรับรองว่า</p>
            <p className="mt-2 font-display text-4xl font-semibold text-navy-900">{name.trim()}</p>
            <div className="mx-auto mt-4 h-px w-24 bg-gold" />
            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-navy-700">
              ได้ผ่านหลักสูตร <strong>AI สำหรับงานสืบสวน — ระดับพื้นฐาน</strong> ของ TOPMANIDMB Training Lab
              ประกอบด้วยบทเรียน AI 101, การจำแนกหลักฐาน, การเรียงลำดับเหตุการณ์, การตรวจจับข้อผิดพลาดของ AI
              และการเลือกแนวทางปฏิบัติตามหลัก Verification First · Human Judgment Final
            </p>
            <div className="mx-auto mt-8 grid max-w-md grid-cols-3 gap-4 text-center text-sm">
              <div>
                <p className="text-xs uppercase tracking-wide text-navy-500">คะแนนเฉลี่ย</p>
                <p className="mt-1 font-display text-2xl font-semibold text-navy-900">{avg}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-navy-500">วันที่</p>
                <p className="mt-1 font-display text-lg font-semibold text-navy-900">{today}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-navy-500">รหัสอ้างอิง</p>
                <p className="mt-1 font-mono text-sm font-semibold text-navy-900">{refCode}</p>
              </div>
            </div>
            <p className="mt-8 text-[11px] text-navy-500">
              ใบประกาศเพื่อการฝึกอบรมภายใน · ออกโดยระบบในเครื่องผู้เรียน · ไม่ใช่วุฒิบัตรทางราชการ · lab.topmanidmb.studio
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
