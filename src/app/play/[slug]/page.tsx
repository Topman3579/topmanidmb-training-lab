import { notFound } from "next/navigation";
import { GameSession } from "@/components/game/GameSession";
import { getAllScenarioIds, getScenarioById } from "@/data/scenarios";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllScenarioIds().map((slug) => ({ slug }));
}

export default function PlayPage({ params }: PageProps) {
  const scenario = getScenarioById(params.slug);
  if (!scenario) notFound();

  return <GameSession scenario={scenario} />;
}