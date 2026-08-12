import { notFound } from "next/navigation";
import { DebriefView } from "@/components/debrief/DebriefView";
import { getAllScenarioIds, getScenarioById } from "@/data/scenarios";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllScenarioIds().map((slug) => ({ slug }));
}

export default async function DebriefPage({ params }: PageProps) {
  const { slug } = await params;
  const scenario = getScenarioById(slug);
  if (!scenario) notFound();

  return <DebriefView scenarioId={slug} />;
}
