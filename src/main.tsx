import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import App from "./App.tsx";
import { Assessment } from "./components/pages/Assessment.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/individual_context",
    element: <Assessment />,
  },
  {
    path: "/social_context_networking",
    element: <Assessment />,
  },
  {
    path: "/social_context_learning",
    element: <Assessment />,
  },
  {
    path: "social_context_presenting",
    element: <Assessment />,
  },
  {
    path: "material_context",
    element: <Assessment />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
