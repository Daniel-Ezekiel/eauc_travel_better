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
import { AllResults } from "./components/pages/AllResults";
import type { AssessmentPage, Results, UpdateResultsPayload } from "./types";

const initialResults = {
  individual_context: {},
  social_context_networking: {},
  social_context_learning: {},
  social_context_presenting: {},
  material_context: {},
};

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
        <Router basename={import.meta.env.BASE_URL}>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home results={results} />} />
            <Route
              path="/assessment_results"
              element={<AllResults results={results} />}
            />
            <Route
              path="/individual_context"
              element={
                <Assessment
                  results={results}
                  onUpdateResults={handleUpdateResults}
                />
              }
            />
            <Route
              path="/social_context_networking"
              element={
                <Assessment
                  results={results}
                  onUpdateResults={handleUpdateResults}
                />
              }
            />
            <Route
              path="/social_context_learning"
              element={
                <Assessment
                  results={results}
                  onUpdateResults={handleUpdateResults}
                />
              }
            />
            <Route
              path="/social_context_presenting"
              element={
                <Assessment
                  results={results}
                  onUpdateResults={handleUpdateResults}
                />
              }
            />
            <Route
              path="/material_context"
              element={
                <Assessment
                  results={results}
                  onUpdateResults={handleUpdateResults}
                />
              }
            />
          </Routes>
        </Router>
      </ResultsDispatchContext>
    </ResultsContext>
  );
}

export default App;
