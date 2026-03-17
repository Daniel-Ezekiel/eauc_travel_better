import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { ScrollToTop } from "./components/helpers/ScrollToTop";
import { Home } from "./components/pages/Home";
import { Assessment } from "./components/pages/Assessment";
import { useReducer } from "react";
import {
  ResultsContext,
  ResultsDispatchContext,
} from "./contexts/ResultsContext";

const initialResults = {
  individual_context: {},
  social_context_networking: {},
  social_context_learning: {},
  social_context_presenting: {},
  material_context: {},
};

export interface AssessmentPage {
  assessment_title: string;
  assessment_results: Record<string, unknown>;
}

interface Results {
  individual_context: Record<string, unknown>;
  social_context_networking: Record<string, unknown>;
  social_context_learning: Record<string, unknown>;
  social_context_presenting: Record<string, unknown>;
  material_context: Record<string, unknown>;
}

// interface AssessmentResults {
//   responses: unknown;
//   totalScore: number;
//   outcome: unknown;
// }

export interface UpdateResultsPayload {
  page: string;
  responses: unknown;
  totalScore: number;
  outcome: unknown;
}

const resultsReducer = (results: Results, page: AssessmentPage): Results => {
  return {
    ...results,
    [page.assessment_title]: page.assessment_results,
  };
};

function App() {
  const [results, dispatch] = useReducer(resultsReducer, initialResults);

  const handleUpdateResults = (results: UpdateResultsPayload): void => {
    dispatch({
      assessment_title: results.page,
      assessment_results: {
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
              path="/individual_context"
              element={<Assessment onUpdateResults={handleUpdateResults} />}
            />
            <Route
              path="/social_context_networking"
              element={<Assessment onUpdateResults={handleUpdateResults} />}
            />
            <Route
              path="/social_context_learning"
              element={<Assessment onUpdateResults={handleUpdateResults} />}
            />
            <Route
              path="/social_context_presenting"
              element={<Assessment onUpdateResults={handleUpdateResults} />}
            />
            <Route
              path="/material_context"
              element={<Assessment onUpdateResults={handleUpdateResults} />}
            />
          </Routes>
        </Router>
      </ResultsDispatchContext>
    </ResultsContext>
  );
}

export default App;
