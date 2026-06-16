import { notFound } from "next/navigation";
import { DebriefView } from "@/components/debrief/DebriefView";
import { getAllScenarioIds, getScenarioById } from "@/data/scenarios";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllScenarioIds().map((slug) => ({ slug }));
}

export default function DebriefPage({ params }: PageProps) {
  const scenario = getScenarioById(params.slug);
  if (!scenario) notFound();

  return <DebriefView scenarioId={params.slug} />;
}