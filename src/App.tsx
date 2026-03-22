import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { ScrollToTop } from "./components/helpers/ScrollToTop";
import { Home } from "./components/pages/Home";
import { Assessment, type Outcome } from "./components/pages/Assessment";
import { useReducer } from "react";
import {
  ResultsContext,
  ResultsDispatchContext,
} from "./contexts/ResultsContext";
import { Results } from "./components/pages/Results";

const initialResults = {
  individual_context: {},
  social_context_networking: {},
  social_context_learning: {},
  social_context_presenting: {},
  material_context: {},
};

export interface AssessmentPage {
  assessment_id: string;
  assessment_results: Record<string, unknown>;
}

type ResultResponse = {
    questionId: string,
    questionText: string,
    questionScore: number
  }

export type ResultCategory = {
  totalScore: number,
  outcome: Outcome,
  responses: ResultResponse[]
}

export interface Results {
  "individual_context": Record<string, ResultCategory>;
  "social_context_networking": Record<string, ResultCategory>;
  "social_context_learning": Record<string, ResultCategory>;
  "social_context_presenting": Record<string, ResultCategory>;
  "material_context": Record<string, ResultCategory>;
}

export interface AssessmentResults {
  assessment_title: string;
  responses: unknown;
  totalScore: number;
  outcome: Outcome;
}

export interface UpdateResultsPayload {
  page: string;
  title: string;
  responses: unknown;
  totalScore: number;
  outcome: unknown;
}

const resultsReducer = (results: Results, page: AssessmentPage): Results => {
  return {
    ...results,
    [page.assessment_id]: page.assessment_results,
  };
};

function App() {
  const [results, dispatch] = useReducer(resultsReducer, initialResults);

  const handleUpdateResults = (results: UpdateResultsPayload): void => {
    dispatch({
      assessment_id: results.page,
      assessment_results: {
        assessment_title: results.title,
        responses: results.responses,
        totalScore: results.totalScore,
        outcome: results.outcome,
      },
    });
  };

  return (
    <ResultsContext value={results}>
      <ResultsDispatchContext value={dispatch}>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route
              path="/"
              element={
                <Home results={results} />
              }
            />
             <Route
              path="/assessment_results"
              element={
                <Results results={results} />
              }
            />
            <Route
              path="/individual_context"
              element={<Assessment results={results} onUpdateResults={handleUpdateResults} />}
            />
            <Route
              path="/social_context_networking"
              element={<Assessment results={results} onUpdateResults={handleUpdateResults} />}
            />
            <Route
              path="/social_context_learning"
              element={<Assessment results={results} onUpdateResults={handleUpdateResults} />}
            />
            <Route
              path="/social_context_presenting"
              element={<Assessment results={results} onUpdateResults={handleUpdateResults} />}
            />
            <Route
              path="/material_context"
              element={<Assessment results={results} onUpdateResults={handleUpdateResults} />}
            />
          </Routes>
        </Router>
      </ResultsDispatchContext>
    </ResultsContext>
  );
}

export default App;
