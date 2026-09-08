"use client";

import { useEffect, useMemo, useState } from "react";
import { AI101_PASS, AI101_QUIZ, AI101_STORAGE_KEY } from "@/data/ai-101";

interface StoredQuiz {
  best: number;
  attempts: number;
  lastAt: string;
}

function loadStored(): StoredQuiz | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(AI101_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredQuiz) : null;
  } catch {
    return null;
  }
}

export function LessonQuiz() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [stored, setStored] = useState<StoredQuiz | null>(null);

  useEffect(() => {
    setStored(loadStored());
  }, []);

  const answeredAll = AI101_QUIZ.every((q) => answers[q.id] !== undefined);

  const score = useMemo(() => {
    const correct = AI101_QUIZ.filter((q) => answers[q.id] === q.answerIndex).length;
    return Math.round((correct / AI101_QUIZ.length) * 100);
  }, [answers]);

  const submit = () => {
    setSubmitted(true);
    const prev = loadStored();
    const next: StoredQuiz = {
      best: Math.max(prev?.best ?? 0, score),
      attempts: (prev?.attempts ?? 0) + 1,
      lastAt: new Date().toISOString(),
    };
    try {
      window.localStorage.setItem(AI101_STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable */
    }
    setStored(next);
    document.getElementById("quiz-result")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const reset = () => {
    setAnswers({});
    setSubmitted(false);
    document.getElementById("quiz")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const passed = score >= AI101_PASS;

  return (
    <section id="quiz" className="lab-card p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="lab-kicker">ควิซท้ายบท</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-navy-900 sm:text-3xl">ทดสอบความเข้าใจ {AI101_QUIZ.length} ข้อ</h2>
          <p className="mt-2 text-sm text-navy-600">เกณฑ์ผ่าน {AI101_PASS} คะแนน · ผลเก็บในเครื่องนี้เท่านั้น</p>
        </div>
        {stored && (
          <div className="rounded-xl border border-gold-400/40 bg-paper px-4 py-2 text-sm text-navy-700">
            คะแนนดีสุด <strong className="text-navy-900">{stored.best}</strong> · ทำแล้ว {stored.attempts} ครั้ง
          </div>
        )}
      </div>

      {submitted && (
        <div
          id="quiz-result"
          className={`mt-6 rounded-2xl border p-5 ${
            passed ? "border-emerald-200 bg-emerald-50/60" : "border-amber-200 bg-amber-50/60"
          }`}
        >
          <p className="font-display text-xl font-semibold text-navy-900">
            {passed ? "✅ ผ่านบท 0" : "⚠️ ยังไม่ผ่าน"} — {score} / 100
          </p>
          <p className="mt-1 text-sm text-navy-700">
            {passed
              ? "พร้อมไปต่อที่ Prompt Engineering หรือลองภารกิจจำลอง LAB-2026-001"
              : "อ่านเฉลยข้อที่ผิดด้านล่าง แล้วทบทวนหัวข้อที่เกี่ยวข้องก่อนทำใหม่"}
          </p>
        </div>
      )}

      <ol className="mt-6 space-y-5">
        {AI101_QUIZ.map((q, qi) => {
          const picked = answers[q.id];
          const isCorrect = picked === q.answerIndex;
          return (
            <li key={q.id} className="rounded-2xl border border-navy-900/10 bg-ivory-50 p-4 sm:p-5">
              <p className="font-medium text-navy-900">
                <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-navy-900 text-xs font-bold text-ivory-50">
                  {qi + 1}
                </span>
                {q.question}
              </p>
              <div className="mt-3 space-y-2">
                {q.choices.map((choice, ci) => {
                  const active = picked === ci;
                  let cls = "border-navy-200 bg-white text-navy-800 hover:border-navy-300";
                  if (submitted) {
                    if (ci === q.answerIndex) cls = "border-emerald-400 bg-emerald-50 text-emerald-900";
                    else if (active) cls = "border-rose-400 bg-rose-50 text-rose-900";
                    else cls = "border-navy-100 bg-white text-navy-500";
                  } else if (active) {
                    cls = "border-navy-800 bg-navy-800 text-white";
                  }
                  return (
                    <button
                      key={ci}
                      type="button"
                      disabled={submitted}
                      onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: ci }))}
                      className={`w-full rounded-xl border px-4 py-2.5 text-left text-sm transition ${cls}`}
                    >
                      <span className="mr-2 font-semibold">{String.fromCharCode(0x41 + ci)}.</span>
                      {choice}
                    </button>
                  );
                })}
              </div>
              {submitted && (
                <p className={`mt-3 text-sm ${isCorrect ? "text-emerald-800" : "text-rose-800"}`}>
                  {isCorrect ? "✓ ถูกต้อง" : "✕ ยังไม่ถูก"} — 💡 {q.explanation}
                </p>
              )}
            </li>
          );
        })}
      </ol>

      <div className="mt-6 flex flex-wrap gap-3">
        {!submitted ? (
          <button type="button" disabled={!answeredAll} onClick={submit} className="lab-btn-primary">
            ส่งคำตอบ ({Object.keys(answers).length}/{AI101_QUIZ.length})
          </button>
        ) : (
          <button type="button" onClick={reset} className="lab-btn-secondary">
            ทำใหม่
          </button>
        )}
      </div>
    </section>
  );
}
