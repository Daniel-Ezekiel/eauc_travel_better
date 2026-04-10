# 🛠️ Developer Guide — For STA

← [Back to README](../README.md)

This is the complete technical reference for developers maintaining or extending the codebase.

---

## Table of Contents

1. [Tech Stack](#1-tech-stack)
2. [Local Development Setup](#2-local-development-setup)
3. [Project Structure](#3-project-structure)
4. [Architecture Overview](#4-architecture-overview)
5. [Accessibility (a11y)](#5-accessibility-a11y)
6. [Assessment Scoring System](#6-assessment-scoring-system)
7. [PDF Export](#7-pdf-export)
8. [Deployment](#8-deployment)
9. [Adding a New Assessment](#9-adding-a-new-assessment)

---

## 1. Tech Stack

| Technology                                                                           | Version           | Role                    |
| ------------------------------------------------------------------------------------ | ----------------- | ----------------------- |
| <a href="https://react.dev" target="_blank">React</a>                                | 19.x              | UI framework            |
| <a href="https://www.typescriptlang.org/" target="_blank">TypeScript</a>             | ~5.9              | Static typing           |
| <a href="https://vite.dev" target="_blank">Vite</a>                                  | 7.x               | Build tool & dev server |
| <a href="https://tailwindcss.com/" target="_blank">Tailwind CSS</a>                  | 4.x (Vite plugin) | Utility-first styling   |
| <a href="https://reactrouter.com/" target="_blank">React Router</a>                  | 7.x               | Client-side routing     |
| <a href="https://ekoopmans.github.io/html2pdf.js/" target="_blank">html2pdf.js</a>   | 0.14.x            | PDF export of results   |
| <a href="https://react-icons.github.io/react-icons/" target="_blank">react-icons</a> | 5.x               | Icon library            |

---

## 2. Local Development Setup

**Prerequisites:** Node.js ≥ 18, npm ≥ 9

```bash
# 1. Clone the repository
git clone <repository-url>
cd eauc_travel_better

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

**Available Scripts:**

| Command           | Description                                   |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Start local dev server with HMR               |
| `npm run build`   | Type-check and build for production (`/dist`) |
| `npm run preview` | Serve the production build locally            |
| `npm run lint`    | Run ESLint                                    |

---

## 3. Project Structure

```
eauc_travel_better/
├── docs/                             # This documentation folder
├── public/                           # Static assets served as-is
├── src/
│   ├── assets/
│   │   └── assessments_config.json   # ← Single source of truth for all content
│   ├── components/
│   │   ├── pages/
│   │   │   ├── Home.tsx              # Homepage with assessment card grid
│   │   │   ├── Assessment.tsx        # Dynamic assessment form page (reused for all 5)
│   │   │   └── AllResults.tsx           # Final results summary page
│   │   ├── modal/
│   │   │   └── ResultsModal.tsx      # Per-assessment score modal (accessible)
│   │   ├── layout/
│   │   │   ├── MainLayout.tsx        # Page wrapper with header + footer
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── helpers/
│   │   │   └── ScrollToTop.tsx       # Resets scroll on route change
│   │   ├── AssessmentCard.tsx        # Card component for homepage grid
│   │   └── ResultCard.tsx            # Card component for results page
│   ├── contexts/
│   │   └── ResultsContext.tsx        # React Context + Dispatch for results state
│   ├── types/
│   │   └── index.ts                  # All shared TypeScript interfaces (single source of truth)
│   ├── App.tsx                       # Root component: router and reducer
│   ├── App.css                       # Global styles
│   ├── index.css                     # Tailwind base import
│   └── main.tsx                      # React DOM entry point
├── index.html
├── vite.config.ts
├── vercel.json                       # SPA rewrite rule for Vercel deployment
├── tsconfig.app.json
└── package.json
```

---

## 4. Architecture Overview

### Config-Driven UI

The entire application is data-driven. `assessments_config.json` is imported directly as a typed module at build time. No API calls are made — everything is bundled statically. This means:

- All routes, questions, scores, and outcomes are derived from the config.
- Adding a new assessment requires only a new entry in the `data` array **and** a corresponding route in `App.tsx` and a key in `initialResults`.
- Content changes by EAUC staff trigger an automatic Vercel rebuild without any code change.

### Routing

React Router v7 is used for client-side routing. All routes are defined statically in `App.tsx`.

| Route                        | Component    | Description                    |
| ---------------------------- | ------------ | ------------------------------ |
| `/`                          | `Home`       | Lists all assessments as cards |
| `/individual_context`        | `Assessment` | Assessment 1 form              |
| `/social_context_networking` | `Assessment` | Assessment 2 form              |
| `/social_context_learning`   | `Assessment` | Assessment 3 form              |
| `/social_context_presenting` | `Assessment` | Assessment 4 form              |
| `/material_context`          | `Assessment` | Assessment 5 form              |
| `/assessment_results`        | `AllResults` | Final results summary          |

The `Assessment` component is **reused across all five assessment routes**. It determines which assessment to render by reading `useLocation().pathname` and filtering the config `data` array.

**SPA Routing on Vercel:** `vercel.json` contains a catch-all rewrite rule that redirects all paths to `index.html`, enabling deep-linking and browser refresh to work correctly:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### State Management

Global state is managed with **React's built-in `useReducer` + Context API** — no external state library is used.

```
App.tsx
 └── useReducer(resultsReducer, initialResults)
      │
      ├── ResultsContext          → provides read access (results object)
      └── ResultsDispatchContext  → provides write access (dispatch function)
```

The `results` object holds one entry per assessment, keyed by assessment ID:

```typescript
// Initial state — empty objects before an assessment is completed
const initialResults = {
  individual_context: {},
  social_context_networking: {},
  social_context_learning: {},
  social_context_presenting: {},
  material_context: {},
};

// Populated state after submission — each key becomes a ResultCategory
interface ResultCategory {
  assessment_title: string;
  totalScore: number;
  outcome: Outcome;
  responses: ResultResponse[];
}
```

**Data flow:**

1. User submits an assessment form in `Assessment.tsx`.
2. `handleSubmit` calculates the total score, finds the matching outcome band, and calls `onUpdateResults`.
3. `onUpdateResults` (from `App.tsx`) calls `dispatch`, triggering `resultsReducer`.
4. The reducer spreads the new result into the global `results` object.
5. The updated `results` object is passed as a prop to all page components.

### Key Type Definitions (`src/types/index.ts`)

All shared interfaces live in a single file, grouped into three logical categories. Types not prefixed with `export` are module-private (used only within the types file itself as building blocks).

```typescript
// ─── Assessment Config Types ──────────────────────────────────────────────────

interface Questions {
  // private — used only by AssessmentCategory
  id: string;
  text: string;
  scores: { disagree: number; neutral: number; agree: number };
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
  // private — used only by ResultCategory
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
  // used by ResultCard.tsx
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
  // used by ResultsContext and resultsReducer
  assessment_id: string;
  assessment_results: Record<string, unknown>;
}

export interface UpdateResultsPayload {
  // used by Assessment.tsx → App.tsx
  page: string;
  title: string;
  responses: unknown;
  totalScore: number;
  outcome: unknown;
}
```

> The `ResultCategory | {}` union allows the initial empty `{}` objects to satisfy the type checker before a user completes an assessment.

---

## 5. Accessibility (a11y)

This application was built with accessibility as a first-class concern, adhering to WCAG 2.1 AA standards.

| Feature                 | Implementation                                                       |
| ----------------------- | -------------------------------------------------------------------- |
| Semantic form structure | Questions use `<fieldset>` + `<legend>` for screen reader grouping   |
| Required fields         | `aria-required="true"` and HTML `required` on all radio inputs       |
| Results Modal           | `role="dialog"`, `aria-modal="true"`, `aria-labelledby`              |
| Modal focus management  | Auto-focuses close button on open via `useRef` + `useEffect`         |
| Focus trap              | Custom `keydown` handler traps `Tab`/`Shift+Tab` within modal bounds |
| Escape key              | Closes the modal (standard dialog pattern)                           |
| Route changes           | `ScrollToTop` component resets scroll position on navigation         |

**Focus Trap implementation note:** The focus trap in `ResultsModal.tsx` is implemented manually (not via a library). It queries all focusable elements within the modal container and wraps Tab/Shift+Tab at the boundaries. The listener is cleaned up via the `useEffect` return function when the modal unmounts.

---

## 6. Assessment Scoring System

Each question has three possible scores configured in the JSON: `disagree`, `neutral`, and `agree`. Most questions score `0 / 1 / 2` but some strategically weighted questions (e.g. _"I am an early-career academic"_) score `0 / 1 / 4` to give early-career status greater influence on the outcome.

On form submission:

1. A `FormData` object is built from the submitted form.
2. Scores are summed into a `totalScore`.
3. The `outcomes` array for the current assessment is searched to find the band where `min_score ≤ totalScore ≤ max_score`.
4. The matching outcome's `at_a_glance` and `in_detail` texts are displayed in the `ResultsModal`.

---

## 7. PDF Export

The **Download Results** button on `/assessment_results` uses `html2pdf.js` to generate a PDF from the live DOM:

```typescript
const resultsSection = document.querySelector(
  "#results-section",
) as HTMLElement;
html2pdf().from(resultsSection).set(options).save();
```

> ⚠️ The `#results-section` ID is on the results grid `<section>` in `Results.tsx`. If this element is ever renamed or restructured, the PDF export will silently break. The PDF is rendered at `scale: 2` for high resolution via `html2canvas` under the hood.

---

## 8. Deployment

The application is deployed on **Vercel** and configured for automatic deployment on push to `main`.

**To test the production build locally** (do not open `index.html` directly — it will fail due to ES module CORS restrictions):

```bash
npm run build
npm run preview
```

**Deploying to GitHub Pages (alternative):** If hosting on GitHub Pages instead of Vercel, add a `base` property to `vite.config.ts` matching the repository name:

```typescript
// vite.config.ts
export default defineConfig({
  base: "/eauc_travel_better/",
  plugins: [react(), tailwindcss()],
});
```

Then deploy the `dist/` folder to the `gh-pages` branch. This can be automated with the <a href="https://github.com/peaceiris/actions-gh-pages" target="_blank">peaceiris/actions-gh-pages</a> GitHub Action.

> ⚠️ The `vercel.json` rewrite rule is not applicable for GitHub Pages. For GitHub Pages, handle SPA routing using a `404.html` redirect approach instead.

---

## 9. Adding a New Assessment

If a new assessment needs to be added to the tool in the future:

1. **Add the config entry** — Append a new object to the `data` array in `assessments_config.json` following the existing schema. Give it a unique `id` (e.g. `"career_context"`).

2. **Add the initial state key** — In `App.tsx`, add the new key to `initialResults`:

   ```typescript
   const initialResults = {
     // ... existing keys
     career_context: {},
   };
   ```

3. **Add the TypeScript type** — Extend the `Results` interface in `src/types/index.ts`:

   ```typescript
   export interface Results {
     // ... existing keys
     career_context: ResultCategory | {};
   }
   ```

4. **Add the route** — In the `<Routes>` block in `App.tsx`:
   ```tsx
   <Route
     path="/career_context"
     element={
       <Assessment results={results} onUpdateResults={handleUpdateResults} />
     }
   />
   ```

No changes are needed to the `Assessment`, `Home`, or `Results` components — they read dynamically from the config.

---

_Last updated: April 2026. For questions, contact the STA development team._
