import { notFound } from "next/navigation";
import { GameSession } from "@/components/game/GameSession";
import { getAllScenarioIds, getScenarioById } from "@/data/scenarios";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllScenarioIds().map((slug) => ({ slug }));
}

export default async function PlayPage({ params }: PageProps) {
  const { slug } = await params;
  const scenario = getScenarioById(slug);
  if (!scenario) notFound();

  return <GameSession scenario={scenario} />;
}
