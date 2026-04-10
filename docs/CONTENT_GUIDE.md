# 📝 Content Admin Guide — For EAUC Staff

← [Back to README](../README.md)

> **You do not need to write any code.** All user-facing text in this application — every question, description, outcome, button label, and link — is managed through a single configuration file.

---

## Where is the Content File?

The file is located at:

```
src/assets/assessments_config.json
```

You can edit it directly on GitHub without installing anything.

---

## How to Edit Content on GitHub

1. Navigate to the repository on GitHub.
2. Open the file at `src/assets/assessments_config.json` by clicking on it.
3. Click the **pencil icon** (✏️) in the top-right corner to enter edit mode.
4. Make your changes carefully (see the rules below).
5. Scroll to the bottom and click the green **"Commit changes..."** button.
6. The live website will automatically rebuild and update **within 3–5 minutes**.

> **⚠️ CRITICAL — Formatting Rules:**
> Changing text is safe. However, **do not** delete or add any of the following structural characters — doing so may break the website:
>
> - Commas `,`
> - Square brackets `[ ]`
> - Curly braces `{ }`
> - Quotation marks `" "` (only change the text _inside_ them)

> **💡 Tip:** For safer editing, paste the file contents into <a href="https://jsoneditoronline.org/" target="_blank">JSON Editor Online</a>. It will highlight any formatting errors before you save.

---

## Configuration File Schema

The file has three top-level sections:

### `home_page`

Controls the title and introductory description shown on the homepage.

```json
"home_page": {
  "title": "Air Travel Justification Tool",
  "description": "..."
}
```

| Field         | Description                                          |
| ------------- | ---------------------------------------------------- |
| `title`       | The main heading on the homepage                     |
| `description` | The paragraph of introductory text below the heading |

---

### `results_page`

Controls the text and links on the final results summary page.

```json
"results_page": {
  "title": "Interpret your scores",
  "share_url": "https://eauc.org.uk",
  "download_button_text": "Download Results",
  "share_button_text": "Share your results"
}
```

| Field                  | Description                                                                |
| ---------------------- | -------------------------------------------------------------------------- |
| `title`                | The heading on the results page                                            |
| `share_url`            | The URL the "Share" button navigates to (e.g. your Communications Toolkit) |
| `download_button_text` | Label for the PDF download button                                          |
| `share_button_text`    | Label for the share/link button                                            |

---

### `data` — The Assessments Array

This is an array of five assessment objects. Each object has the following structure:

```json
{
  "id": "individual_context",
  "title": "Assessment 1: Individual Context",
  "description": "...",
  "questions": [ ... ],
  "outcomes": [ ... ]
}
```

> ⚠️ **Do not change the `id` fields.** These are used internally by the application for routing and state management.

**Questions** — each question has:

```json
{
  "id": "1.1",
  "text": "I believe social media is a useful tool...",
  "scores": {
    "disagree": 0,
    "neutral": 1,
    "agree": 2
  }
}
```

| Field             | Safe to Edit? | Notes                                                  |
| ----------------- | ------------- | ------------------------------------------------------ |
| `id`              | ❌ No         | Used for internal tracking                             |
| `text`            | ✅ Yes        | The statement shown to the user                        |
| `scores.disagree` | ⚠️ Caution    | Changing scores affects outcomes — coordinate with STA |
| `scores.neutral`  | ⚠️ Caution    | As above                                               |
| `scores.agree`    | ⚠️ Caution    | As above                                               |

**Outcomes** — each assessment has exactly **three** outcome bands. Do not add or remove bands.

```json
{
  "min_score": 8,
  "max_score": 12,
  "tag": "8-12",
  "at_a_glance": "Short summary shown in bold...",
  "in_detail": "Longer explanation shown below..."
}
```

| Field                     | Safe to Edit? | Notes                                                       |
| ------------------------- | ------------- | ----------------------------------------------------------- |
| `min_score` / `max_score` | ⚠️ Caution    | Ranges must not overlap or leave gaps — coordinate with STA |
| `tag`                     | ✅ Yes        | Should match `min_score`–`max_score` for clarity            |
| `at_a_glance`             | ✅ Yes        | The bold summary sentence shown first                       |
| `in_detail`               | ✅ Yes        | The full paragraph of guidance shown below                  |

---

## Updating the "Share your results" Link

If you move your Communications Toolkit to a new URL (e.g. from Google Drive to the EAUC website), update the `share_url` under `results_page` in the config file. No developer involvement is needed.
