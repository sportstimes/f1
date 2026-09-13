# Open Source Contribution Report

**Contributor:** [SadmaFaahiim](https://github.com/SadmaFaahiim)
**Upstream repository:** [sportstimes/f1](https://github.com/sportstimes/f1)
**Date:** 2026-09-13

---

## 1. Purpose

Analyze the currently open issues on `sportstimes/f1` (the F1/F2/F3
calendar project), triage them by type and effort, implement the fixes
that are well-defined and self-contained, and open one pull request per
issue. This report documents the full engagement in a way that is easy
for a maintainer to review.

## 2. Scope

All open issues as of 2026-09-13 were inspected:

| Issue | Title | Type | Action |
|-------|-------|------|--------|
| [#2325](https://github.com/sportstimes/f1/issues/2325) | Madrid F2/F3 wrong times + two qualifying sessions + two feature races | Data + schema | **Fixed (PR)** – F3 double qualifying / double feature support |
| [#2324](https://github.com/sportstimes/f1/issues/2324) | Monza F2/F3 incorrect times | Data | **Verified** – data already matches the official schedule |
| [#2179](https://github.com/sportstimes/f1/issues/2179) | Google Calendar does not respect selection | Code | **Fixed (PR)** – cache-busted calendar URL |
| [#2224](https://github.com/sportstimes/f1/issues/2224) | SVG icon request | Cosmetic | Commented – assigned to maintainer, underspecified |
| [#2161](https://github.com/sportstimes/f1/issues/2161) | Google Safe Browsing false positive on f2/f3calendar.com | External | Commented – resolution belongs to Google Side |
| [#2178](https://github.com/sportstimes/f1/issues/2178) | SBK Events support | Large feature | Out of scope – new site + 33 locales + CI |
| [#748](https://github.com/sportstimes/f1/issues/748) | MotorsportsCalendar.com setup | Product | Out of scope |

## 3. How sessions are modeled (context)

Calendar sessions are stored as a flat map of **key → UTC timestamp**
per race in `_db/<siteKey>/<year>.json`. The set of session keys is
driven by `_db/<siteKey>/config.json` (`sessions`, `sessionMap`,
`sessionLengths`, `featuredSessions`, `collapsedSessions`).

Consumers iterate session keys generically:

- `src/pages/api/calendar.js` – JSON calendar API
- `src/pages/api/next.js` – next race API
- `build/generate-calendars.js` – ICS permalinks for every session permutation
- `build/generate-queues.mjs` – reminder notifications
- Frontend components (race tables, generate form, locale pages)

This is why the fix for #2325 is localized to the F3 config and the
2026 race data: every consumer picks up the new keys automatically.

## 4. Work completed

### 4.1 #2325 – Madrid F3 double qualifying / double feature (PR)

The 2026 Madrid round uses two qualifying sessions and two feature
races, but the model could only store one of each:

```
practice   2026-09-11T07:55:00Z   (present)
qualifying 2026-09-11T16:25:00Z   (present)
qualifying2 2026-09-11T16:55:00Z  (NEW)
sprint     2026-09-12T09:05:00Z   (present)
feature1   2026-09-12T16:00:00Z   (NEW)
feature    2026-09-13T07:45:00Z   (present)
```

Changes:

- `_db/f3/config.json` – new keys in `sessions`, `sessionMap` (`q2`,
  `feature1`), `sessionLengths` (20 / 45 min), `collapsedSessions`.
- `src/models/Sessions.ts` – type extended with `qualifying2`,
  `feature1`.
- `locales/en/localization.json` – `feature1` label; `qualifying2`
  label already existed.
- `_db/f3/2026.json` – Madrid round populated.

Verification:

- `node build/generate-calendars.js f3` runs clean, e.g.
  `f3-calendar_p_q_q2_sprint_feature1_feature.ics`.
- Generated ICS contains all six sessions with the exact official times
  and durations; no `undefined` titles in any locale file.
- `npm run build` passes.
- Screenshots: `docs/screenshots/`.

### 4.2 #2179 – Google Calendar selection (PR)

The "Add to Google Calendar" button built its URL from the `webcal://`
link without a cache buster:

```
https://www.google.com/calendar/render?cid=webcal://files-f3.motorsportcalendars.com/f3-calendar<selection>.ics
```

Google Calendar caches the imported calendar per URL, so an older
import could be shown instead of the user's freshly generated
selection. Changed to the same HTTP(S) URL that already carries a
`?t=<timestamp>` cache buster and matches the exact selection.

Files: `src/app/[locale]/generate/form.tsx`

Verification: `npm run build` passes; download link suffixes already
exercise the same session permutations exercised by the ICS generator.

### 4.3 #2324 – Monza F2/F3 (verified, no change)

Re-checked the Monza round against the official FIA Formula 2 and F3
weekend timetables. All eight sessions in `main` already match the
official UTC times, so this issue is effectively resolved by the
maintainer's checker automation. No PR was opened to avoid a no-op data
change; a verification comment was posted on the issue instead.

### 4.4 #2224 / #2161 / #2178 / #748 (triage comments)

- **#2224** – assigned to the maintainer (`ay8s`) and does not state a
  concrete target beyond a generic request for an SVG icon variant;
  issues have creation restricted to maintainers. Posted a polite
  comment offering concrete options.
- **#2161** – Google Safe Browsing flags f2/f3calendar.com despite the
  legitimate content and correct structured data (`WebSiteSchema`,
  canonical, `alternates`). The genuine resolution is reporting a false
  positive to Google Safe Browsing; code cannot force this.
- **#2178 / #748** – large product features (a whole new SBK site
  across 33 locales with CI, and a central hub). Not attempted in this
  batch; documented as follow-ups.

## 5. Verification matrix

| Check | Command | Result |
|---|---|---|
| Data + localization JSON valid | `node -e "require(...)"` | Pass |
| ICS generation (all permutations) | `node build/generate-calendars.js f3` | Pass |
| No undefined session titles | grep of `static/**/*.ics` | Pass |
| Madrid sessions in ICS | inspect generated `.ics` | 6/6 present, times correct |
| Production build | `npm run build` | Pass |
| UI rendering | local dev server + browser snapshot | Pass |

## 6. Repository governance notes (for the maintainer)

- The project has no `CONTRIBUTING.md`, no `CODE_OF_CONDUCT.md`, and no
  issue templates. Adding them would materially improve first-time
  contributor experience.
- Issues can only be opened by maintainers; community members cannot
  report bugs. Consider enabling issue creation for the community.
- The checker bot keeps `_db` data fresh; human review is mostly needed
  for structural/schema changes like #2325.

## 7. How to review the pull requests

Two PRs are open from the fork `SadmaFaahiim/f1`:

1. `fix/f3-madrid-two-feature-races` → **Fixes #2325**
2. `fix/google-calendar-cachebust` → **Fixes #2179**

Each PR contains one focused change, related only to its issue, with a
verification summary. The two branches are based on the latest
`sportstimes/f1` `main` (0e59dca) and should merge without conflicts.

## 8. Follow-ups

- Add `qualifying2` / `feature1` to the remaining 32 locale files once
  translators approve labels (English included so nothing breaks).
- SBK support (#2178) and MotorsportsCalendar hub (#748) as separate,
  larger efforts.
- Include the f3 screenshot documentation in the project README if the
  maintainer wants user-facing docs.