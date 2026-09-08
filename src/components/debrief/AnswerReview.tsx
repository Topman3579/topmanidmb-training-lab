import type {
  DecisionOption,
  EvidenceClass,
  EvidenceItem,
  RedFlagSegment,
  Scenario,
  SessionAnswers,
  TimelineEvent,
} from "@/lib/types";

const CLASS_LABEL: Record<EvidenceClass, string> = {
  observable: "สังเกตได้",
  derived: "สรุปจากหลักฐาน",
  inferred: "อนุมาน",
  noise: "สัญญาณรบกวน",
};

const FLAG_LABEL: Record<NonNullable<RedFlagSegment["flagType"]>, string> = {
  pii: "PII รั่ว",
  unsupported: "ข้อสรุปไร้หลักฐาน",
  procedural: "ข้ามขั้นตอน",
  hallucination: "AI แต่งข้อมูล",
};

interface AnswerReviewProps {
  scenario: Scenario;
  answers?: SessionAnswers;
}

function Mark({ ok }: { ok: boolean }) {
  return (
    <span
      className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
        ok ? "bg-lab-success" : "bg-lab-danger"
      }`}
      aria-label={ok ? "ถูก" : "ผิด"}
    >
      {ok ? "✓" : "✕"}
    </span>
  );
}

function Row({ ok, children }: { ok: boolean; children: React.ReactNode }) {
  return (
    <li
      className={`flex gap-3 rounded-xl border p-3 text-sm ${
        ok ? "border-emerald-200 bg-emerald-50/40" : "border-rose-200 bg-rose-50/40"
      }`}
    >
      <Mark ok={ok} />
      <div className="min-w-0 flex-1 space-y-1 text-navy-800">{children}</div>
    </li>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="lab-card p-5">
      <h3 className="font-display text-lg font-semibold text-navy-900">{title}</h3>
      <ul className="mt-3 space-y-2">{children}</ul>
    </section>
  );
}

export function AnswerReview({ scenario, answers }: AnswerReviewProps) {
  if (!answers) {
    return (
      <section className="lab-card p-5 text-sm text-navy-600">
        ผลรอบนี้บันทึกไว้ก่อนมีระบบเฉลย — เล่นอีกครั้งเพื่อดูเฉลยรายข้อ
      </section>
    );
  }

  const evidencePhase = scenario.phases.find((p) => p.type === "evidence");
  const timelinePhase = scenario.phases.find((p) => p.type === "timeline");
  const redflagPhase = scenario.phases.find((p) => p.type === "redflag");
  const decisionPhase = scenario.phases.find((p) => p.type === "decision");

  const selectedFlags = new Set(answers.redFlagSelected);

  return (
    <div className="space-y-4">
      <div>
        <p className="lab-kicker">เฉลยรายข้อ</p>
        <p className="mt-1 text-sm text-navy-600">
          เทียบคำตอบของคุณกับเหตุผลของแต่ละข้อ — จุดที่ผิดคือสิ่งที่ควรทบทวนก่อนเล่นรอบถัดไป
        </p>
      </div>

      {evidencePhase && (
        <Section title="① จัดประเภทหลักฐาน">
          {(evidencePhase.payload as EvidenceItem[]).map((item) => {
            const picked = answers.evidence[item.id] ?? null;
            const ok = picked === item.correctClass;
            return (
              <Row key={item.id} ok={ok}>
                <p className="font-medium text-navy-900">{item.label}</p>
                <p className="text-xs text-navy-500">แหล่ง: {item.source}</p>
                <p>
                  คุณตอบ: <strong>{picked ? CLASS_LABEL[picked] : "—"}</strong>
                  {!ok && (
                    <>
                      {" "}· เฉลย: <strong>{CLASS_LABEL[item.correctClass]}</strong>
                    </>
                  )}
                </p>
                <p className="text-xs text-navy-600">💡 {item.hint}</p>
                {item.isTrap && (
                  <p className="text-xs font-semibold text-amber-700">⚠️ ข้อนี้เป็นกับดัก — ข่าวลือ/ความเห็นมักถูกจัดผิดเป็นหลักฐาน</p>
                )}
              </Row>
            );
          })}
        </Section>
      )}

      {timelinePhase && (
        <Section title="② เรียงลำดับเหตุการณ์">
          {(() => {
            const events = timelinePhase.payload as TimelineEvent[];
            const byId = Object.fromEntries(events.map((e) => [e.id, e]));
            const target = [...events].sort((a, b) => a.correctOrder - b.correctOrder);
            return target.map((event, index) => {
              const yoursId = answers.timelineOrder[index];
              const ok = yoursId === event.id;
              const yours = yoursId ? byId[yoursId] : undefined;
              return (
                <Row key={event.id} ok={ok}>
                  <p className="font-medium text-navy-900">
                    ลำดับ {index + 1}: {event.label}
                    <span className="ml-2 text-xs font-semibold text-brand-700">{event.displayDate}</span>
                  </p>
                  {!ok && yours && (
                    <p className="text-xs text-navy-600">
                      คุณวางไว้: {yours.label} ({yours.displayDate})
                    </p>
                  )}
                </Row>
              );
            });
          })()}
        </Section>
      )}

      {redflagPhase && (
        <Section title="③ จับ Red Flag ในผลลัพธ์ AI">
          {(redflagPhase.payload as RedFlagSegment[]).map((seg) => {
            const picked = selectedFlags.has(seg.id);
            const ok = picked === seg.hasFlag;
            return (
              <Row key={seg.id} ok={ok}>
                <p className="font-medium text-navy-900">“{seg.text}”</p>
                <p>
                  {seg.hasFlag ? (
                    <>
                      เฉลย: <strong>มีปัญหา</strong>
                      {seg.flagType && <> — {FLAG_LABEL[seg.flagType]}</>}
                      {!picked && " · คุณไม่ได้เลือก"}
                    </>
                  ) : (
                    <>
                      เฉลย: <strong>ใช้ได้</strong>
                      {picked && " · คุณเลือกเป็นปัญหา (false positive)"}
                    </>
                  )}
                </p>
                <p className="text-xs text-navy-600">💡 {seg.explanation}</p>
              </Row>
            );
          })}
        </Section>
      )}

      {decisionPhase && (
        <Section title="④ เลือกทางดำเนินการ">
          {(decisionPhase.payload as DecisionOption[]).map((opt) => {
            const picked = answers.decisionId === opt.id;
            const ok = opt.isBest;
            return (
              <Row key={opt.id} ok={ok}>
                <p className="font-medium text-navy-900">
                  {opt.label}
                  {picked && (
                    <span className="ml-2 rounded-full bg-navy-900 px-2 py-0.5 text-xs font-semibold text-ivory-50">
                      คุณเลือก
                    </span>
                  )}
                  {ok && (
                    <span className="ml-2 rounded-full border border-gold-400/60 bg-paper px-2 py-0.5 text-xs font-semibold text-gold-600">
                      ทางที่ดีที่สุด
                    </span>
                  )}
                </p>
                <p className="text-xs text-navy-600">💡 {opt.feedback}</p>
              </Row>
            );
          })}
        </Section>
      )}
    </div>
  );
}
