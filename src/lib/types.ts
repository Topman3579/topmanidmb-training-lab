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

// --- 3D Evidence Room (separate from 2D game) ---

export type EvidenceRoom3DClass =
  | "fact"
  | "suspicion"
  | "requires_verification"
  | "recommended_next_step";

export type EvidenceRoom3DObjectType =
  | "document_box"
  | "laptop"
  | "phone"
  | "receipt_stack"
  | "case_folder";

export type EvidenceRoom3DPhase = "briefing" | "playing" | "debrief";

export interface EvidenceRoom3DItem {
  id: string;
  objectType: EvidenceRoom3DObjectType;
  title: string;
  titleEn: string;
  description: string;
  source: string;
  correctClass: EvidenceRoom3DClass;
  hint: string;
  explanation: string;
  position: [number, number, number];
  color: string;
}

export interface EvidenceRoom3DMission {
  code: string;
  title: string;
  titleEn: string;
  briefing: string;
  objectives: string[];
  instructions: string[];
}

export interface EvidenceRoom3DAnswer {
  itemId: string;
  selected: EvidenceRoom3DClass;
  correct: boolean;
}