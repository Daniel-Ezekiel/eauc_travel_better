import { createContext, type ActionDispatch } from "react";
import type { AssessmentPage } from "../types";

export const ResultsContext = createContext<null | object>(null);
export const ResultsDispatchContext = createContext<null | ActionDispatch<
  [page: AssessmentPage]
>>(null);
