export type EvidenceClass = "observable" | "derived" | "inferred" | "noise";
export type PhaseType = "evidence" | "timeline" | "redflag" | "decision";
export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface EvidenceItem {
  id: string;
  label: string;
  source: string;
  correctClass: EvidenceClass;
  hint: string;
  isTrap: boolean;
}

export interface TimelineEvent {
  id: string;
  label: string;
  displayDate: string;
  correctOrder: number;
}

export interface RedFlagSegment {
  id: string;
  text: string;
  hasFlag: boolean;
  flagType?: "pii" | "unsupported" | "procedural" | "hallucination";
  explanation: string;
}

export interface DecisionOption {
  id: string;
  label: string;
  isBest: boolean;
  feedback: string;
  scoreDelta: number;
}

export interface GamePhase {
  type: PhaseType;
  title: string;
  titleEn: string;
  payload: EvidenceItem[] | TimelineEvent[] | RedFlagSegment[] | DecisionOption[];
}

export interface Scenario {
  id: string;
  code: string;
  title: string;
  titleEn: string;
  difficulty: Difficulty;
  estMinutes: number;
  learningObjectives: string[];
  briefing: string;
  briefingEn: string;
  phases: GamePhase[];
}

export interface PhaseScores {
  evidence: number;
  timeline: number;
  redflag: number;
  decision: number;
  total: number;
}

export interface SessionResult {
  scenarioId: string;
  completedAt: string;
  scores: PhaseScores;
  passed: boolean;
}

export interface ProgressStore {
  sessions: SessionResult[];
  badges: string[];
}

export interface ScenarioSummary {
  id: string;
  code: string;
  title: string;
  titleEn: string;
  difficulty: Difficulty;
  estMinutes: number;
  tagline: string;
  taglineEn: string;
}