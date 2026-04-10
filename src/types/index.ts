// ─── Assessment Config Types ──────────────────────────────────────────────────

interface Questions {
  id: string;
  text: string;
  scores: {
    disagree: number;
    neutral: number;
    agree: number;
  };
}

export interface Outcome {
  min_score: number;
  max_score: number;
  tag: string;
  at_a_glance: string;
  in_detail: string;
}

export interface AssessmentCategory {
  id: string;
  title: string;
  description: string;
  questions: Questions[];
  outcomes: Outcome[];
}

// ─── Results / State Types ────────────────────────────────────────────────────

interface ResultResponse {
  questionId: string;
  questionText: string;
  questionScore: number;
}

export interface ResultCategory {
  assessment_title: string;
  totalScore: number;
  outcome: Outcome;
  responses: ResultResponse[];
}

export interface AssessmentResults {
  assessment_title: string;
  responses: unknown;
  totalScore: number;
  outcome: Outcome;
}

export interface Results {
  individual_context: ResultCategory | {};
  social_context_networking: ResultCategory | {};
  social_context_learning: ResultCategory | {};
  social_context_presenting: ResultCategory | {};
  material_context: ResultCategory | {};
}

// ─── Reducer / Dispatch Types ─────────────────────────────────────────────────

export interface AssessmentPage {
  assessment_id: string;
  assessment_results: Record<string, unknown>;
}

export interface UpdateResultsPayload {
  page: string;
  title: string;
  responses: unknown;
  totalScore: number;
  outcome: unknown;
}
