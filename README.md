# ✈️ Air Travel Justification Tool

> A config-driven React web application built for the **Environmental Association for Universities and Colleges (EAUC)**, helping academic professionals make conscious, sustainable decisions about conference air travel.

**Live URL:** <a href="https://eauc-travel-better.vercel.app" target="_blank">https://eauc-travel-better.vercel.app</a>
&nbsp;|&nbsp;
**Stack:** React 19 · TypeScript · Vite · Tailwind CSS v4

---

## 👥 Who is this repository for?

This repository serves three distinct audiences. Jump to the guide that applies to you:

| Role                                                      | Document                                                 |
| --------------------------------------------------------- | -------------------------------------------------------- |
| 📖 **Anyone** — Learn what the tool does and why          | [Tool Overview](docs/TOOL_OVERVIEW.md)                   |
| ✏️ **EAUC Staff** — Update questions, text, and links     | [Content Admin Guide](docs/CONTENT_GUIDE.md)             |
| 🌐 **EAUC Web Team** — Embed the tool on the EAUC website | [Website Integration Guide](docs/WEBSITE_INTEGRATION.md) |
| 🛠️ **STA Developers** — Maintain or extend the codebase   | [Developer Guide](docs/DEVELOPER_GUIDE.md)               |

---

## ⚡ Quick Start (Developers)

```bash
git clone <repository-url>
cd eauc_travel_better
npm install
npm run dev
```

App runs at `http://localhost:5173`.

| Command           | Description                      |
| ----------------- | -------------------------------- |
| `npm run dev`     | Local dev server with HMR        |
| `npm run build`   | Type-check + production build    |
| `npm run preview` | Preview production build locally |
| `npm run lint`    | Run ESLint                       |

---

## 📁 Repository Structure

```
eauc_travel_better/
├── docs/
│   ├── TOOL_OVERVIEW.md          # About the tool — background, purpose, how to use
│   ├── CONTENT_GUIDE.md          # For EAUC: how to update text and questions
│   ├── WEBSITE_INTEGRATION.md    # For EAUC: how to embed via iframe
│   └── DEVELOPER_GUIDE.md        # For STA: full technical reference
├── src/
│   ├── assets/
│   │   └── assessments_config.json   # ← Single source of truth for all content
│   ├── components/
│   ├── contexts/
│   ├── App.tsx
│   └── main.tsx
├── vercel.json
├── vite.config.ts
└── package.json
```

---

_Last updated: April 2026._
