# Changelog

All notable changes in this contribution fork are documented here,
grouped by the upstream issue they resolve.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Dates are UTC.

## [2026-09-13] – Contribution batch 1

### Added

- **#2325 – Madrid F3 double qualifying / double feature format**
  - New session keys `qualifying2` and `feature1` in the F3 calendar model.
  - `_db/f3/config.json`: sessions list, `sessionMap`, `sessionLengths`
    and `collapsedSessions` extended for the new keys.
  - `src/models/Sessions.ts`: session type extended.
  - `locales/en/localization.json`: schedule label for `feature1`
    ("Feature Race 1"); `qualifying2` already existed.
  - `_db/f3/2026.json`: Madrid round now carries both qualifying sessions
    (16:25 / 16:55 UTC) and both feature races (16:00 / 07:45 UTC).
    Verified against the official FIA Formula 3 weekend schedule.

### Fixed

- **#2179 – Google Calendar does not respect the selected sessions**
  - The "Add to Google Calendar" link previously passed the
    cache-busted-less `webcal://` URL in the `cid` parameter, so Google
    Calendar could re-import a stale/mismatched calendar.
  - It now uses the cache-busted `https://` URL (with a `?t=` timestamp)
    that matches the user's current session selections.
  - `src/app/[locale]/generate/form.tsx`

### Evaluated, no code change

- **#2324 – Monza F2/F3 times** – re-verified against the official FIA
  Formula 2 and Formula 3 schedules for the Monza round; the data
  currently in `main` already matches the official times, so no code or
  data change was required.
- **#2224 – SVG icon request** – issue is assigned to the maintainer and
  does not specify a target; left for maintainer triage with a comment.
- **#2161 – Google flags f2/f3calendar.com as deceptive** – genuine
  fix belongs to Google Safe Browsing (report a false positive); the
  sites already ship canonical, language alternates and `WebSiteSchema`
  structured data.
- **#2178 – SBK Events support**; **#748 – MotorsportsCalendar.com
  setup** – large product-level features, out of scope for this batch.

### Verification performed

- `node build/generate-calendars.js f3` – ICS permalinks for every
  session permutation, including the two new ones, generate correctly;
  no "undefined" session titles in any generated file.
- Generated ICS for the Madrid round contains all six sessions with the
  correct UTC start and duration.
- `npm run build` (Next.js production build) passes.
- Local screenshot of the f3 generate page confirms the two new session
  checkboxes render (see `docs/screenshots/`).