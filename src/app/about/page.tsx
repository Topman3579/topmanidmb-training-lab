import { ABOUT_COPY, MOCK_DATA_POLICY } from "@/data/disclaimers";
import { FUTURE_DOMAIN } from "@/lib/constants";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 animate-fade-in-up">
      <section className="lab-card p-6 sm:p-8">
        <h1 className="font-display text-3xl font-bold text-navy-900">{ABOUT_COPY.title}</h1>
        <p className="mt-4 leading-relaxed text-navy-700">{ABOUT_COPY.body}</p>
        <p className="mt-4 text-sm text-navy-600">{ABOUT_COPY.futureDomainNote}</p>
        <p className="mt-2 font-mono text-sm text-brand-700">{FUTURE_DOMAIN}</p>
      </section>

      <section className="lab-card p-6">
        <h2 className="font-display text-lg font-semibold text-navy-900">นโยบายข้อมูลจำลอง</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-navy-700">
          {MOCK_DATA_POLICY.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}