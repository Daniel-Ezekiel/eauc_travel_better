import { createContext, type ActionDispatch } from "react";
import type { AssessmentPage } from "../App";

export const ResultsContext  = createContext<null | object>(null);
export const ResultsDispatchContext = createContext<null | ActionDispatch<[page: AssessmentPage]>>(null);