# SignalSafe Production Browser Acceptance — 2026-08-09

## Environment

- Timestamp: 2026-08-09 07:26 Asia/Taipei
- Repository main: `64b24698d02852ca57a7c217947c7b20327082c0`
- Candidate app / question bank: `0.2.4-usability-r1-hotfix4` / `2026-08-01-r1`
- Production URL: `https://signalsafe-v02-usability-r1.vercel.app/prototype/`
- Browsers: Codex in-app browser plus Playwright Chromium 151.
- Viewports: desktop `1440x900`; mobile `390x844`.

## Production Baseline

The production alias was still serving the pre-repair external rewrite: response header `x-jsd-version: 3cecb0d3b0eea53ff65839e4241cd5043e1aee7a`. A real Playwright Chromium request received `Content-Type: text/plain; charset=utf-8` and rendered the literal HTML source. This is a P0 production-render failure, even though an HTTP 200 response is returned.

Commit `64b2469` removes the external rewrite so Vercel will serve the repository's first-party static `prototype/` files. Local checks and GitHub Actions run `31283919334` passed, but deployment is pending because the configured Vercel CLI token is invalid and no deployment was created for this commit.

## Desktop

Using the in-app real browser before the production P0 was discovered: Home, Quick Mode (3/3), the full 24-question assessment, Training feedback, Emergency Mode (two paths), Dashboard and responsive overflow at `1440x900` rendered and interacted without application console errors. These are supporting L4 observations only; they do not override the Chromium production failure.

## Mobile

At `390x844`, Home, Quick Mode (3/3), an Assessment item, Emergency Mode and Data Management rendered without body horizontal overflow (`scrollWidth = clientWidth = 390`). Core controls measured at least 44px in one dimension.

## Quick Mode

L4 interaction completed all 3 questions, verified selection `aria-pressed`, disabled/enabled gating, feedback, result, saved session and dashboard rendering.

## Full Assessment

L4 interaction completed Pre 8, Training 8 (with feedback), and Post 8. Dashboard rendered finite metrics and progress bars. A separate run completed three Pre items, paused, reloaded, and resumed at question 4 with existing responses retained.

## Pause / Resume

PASS in the supporting in-app browser run: pause showed a local-save status, reload exposed `繼續上次進度`, and resume returned to the preserved Pre-test position.

## Persistence

PASS in the supporting in-app browser run for normal local storage: a completed Quick session survived reload and appeared on Dashboard. Blocked-localStorage memory fallback remains L2-only because the available browser surface could not safely simulate storage failure.

## Emergency

PASS in two L4 paths. No account, OTP, payment-card, identity-document, screenshot or upload request was required. Both results directed the user to stop risky action and independently verify; neither declared a message certainly safe or fraudulent.

## Dashboard

PASS in the supporting run: empty and populated states rendered without `NaN`, `Infinity`, `undefined`, negative percentages or broken progress bars.

## Export JSON

L4 BLOCKED: clicking the production export control in the in-app browser did not surface a readable download event. L2 PASS: the checked source/test verifies the required top-level anonymous export fields.

## Export CSV

L4 BLOCKED: same browser-download limitation. L2 PASS: the checked source/test verifies CSV headers omit direct identity fields.

## Import

L4 PASS for valid schema import with a non-sensitive technical fixture; the UI confirmed import and restored the provided anonymous ID/session count. The exact export-clear-import-same-file chain is BLOCKED by the unreadable export download above.

## Clear

L4 PASS: confirmation is required; the resulting state showed zero sessions and a fresh anonymous ID. Invalid JSON and `{}` both showed clear error alerts while the existing data remained intact.

## Keyboard

L4 BLOCKED: the in-app browser driver did not deliver Tab/Enter activation reliably. L2 PASS: the 33-test suite covers focus-visible styling, keyboard-focusable import, focus restoration and `aria-pressed` state. A post-deploy Chromium keyboard run remains required.

## Focus

L4 PASS for mouse-triggered selection rerenders: selected Quick and Assessment controls retained focus on their replacement elements. Full keyboard traversal remains blocked as above.

## Touch Targets

L4 PASS for sampled core controls at mobile: icon control `44x44`, primary CTAs `366x54`, Assessment cards `328x52` or higher, signal/confidence controls `328x76`, and submit `328x46`.

## Overflow

L4 PASS for sampled Home, Quick result, Assessment, Emergency and Data Management at mobile plus Home/Dashboard/Emergency at desktop.

## Console

No application console errors or warnings were observed in the successful in-app runs. Playwright Chromium reported a favicon 404 in addition to the P0 raw-HTML rendering caused by the HTML MIME failure.

## Network

FAIL (P0): Playwright Chromium 151 received a document response with `mimeType: text/plain`; no application modules could execute. The pre-repair alias also exposed the external jsDelivr runtime pin in its headers.

## Service Worker

L2 PASS for precache/static checks. L4 BLOCKED: the available in-app driver did not expose reliable Service Worker inspection or network emulation; the Playwright Chromium page could not execute while served as text/plain.

## Offline

L4 BLOCKED by the P0 production render failure; no offline claim is made.

## Accessibility

L2 PASS: 33/33 tests include static focus, ARIA state, progress/live-region, touch-target and contrast checks. L4 sampled ARIA state and focus preservation passed; full keyboard and Axe scans remain incomplete. Screen-reader review remains human/manual pending.

## Bugs Found

| Priority | Finding | Status |
| --- | --- | --- |
| P0 | Production `/prototype/` is served as `text/plain` to Playwright Chromium and displays raw HTML instead of running the app. | Fix committed; deployment pending. |
| P2 | `/favicon.ico` returns 404 in Playwright Chromium. | Open; non-blocking. |

## Fixes Applied

- P0 deployment architecture: `vercel.json` now serves first-party repository static files instead of proxying the production application through an immutable external rewrite.
- Commit: `64b2469` (`fix: serve production prototype as first-party static assets`).
- Validation: local `npm run check`, local `npm test` (33/33), GitHub Actions `31283919334` PASS.
- Production retest: pending a valid Vercel deployment credential or an automatic deployment.

## Re-test

After production deployment, retest in fresh Playwright Chromium: document MIME, visible render, console/network, keyboard, JSON/CSV download contents, Service Worker install/reload/offline and a clean desktop/mobile regression.

## Remaining Blockers

1. Production deployment of `64b2469` is blocked because the configured Vercel CLI token is invalid; GitHub has no deployment for this SHA.
2. The current production P0 prevents browser-freeze completion.
3. Human question-bank domain review remains required for `train-04`, `train-08`, and `post-08` and is not changed here.

## Pre-deployment Test Matrix (historical)

| Gate | Desktop | Mobile | Evidence | Status |
| ---- | ------- | ------ | -------- | ------ |
| Home/render | FAIL | FAIL | Playwright Chromium MIME/render | FAIL |
| Quick | PASS (supporting run) | PASS (supporting run) | Real browser interaction | WARN |
| Assessment | PASS (supporting run) | PASS smoke | Real browser interaction | WARN |
| Pause/resume | PASS | NOT APPLICABLE | Real browser reload/resume | WARN |
| Emergency | PASS | PASS | Two desktop paths, one mobile path | WARN |
| Dashboard/data | PASS | PASS | Real browser rendering and import/clear | WARN |
| Keyboard | BLOCKED | BLOCKED | Driver could not deliver keys reliably | BLOCKED |
| Overflow/touch | PASS | PASS | DOM geometry/scroll metrics | PASS |
| Console/network | FAIL | FAIL | Chromium document MIME failure | FAIL |
| Service Worker/offline | BLOCKED | BLOCKED | P0 prevents executable Chromium page | BLOCKED |

## Post-deployment Revalidation

At 07:39 Asia/Taipei, deployment `dpl_ioSgKN2uAvTEujYujsCi959FXRwd` became `READY` and was aliased to `https://signalsafe-v02-usability-r1.vercel.app`. It contains source `c5e72268e2e0aee28b1d343588ef333101c14dbb`, including the first-party static serving fix in `64b2469`.

Fresh Playwright Chromium 151 evidence:

- `/prototype/` returned 200 `text/html; charset=utf-8`; `bootstrap.mjs` returned `application/javascript; charset=utf-8`; `styles/01.css` returned `text/css; charset=utf-8`.
- No `x-jsd-version` or other jsDelivr-upstream header was present. All entry, module and question-data requests returned 200; console had zero errors and warnings.
- Desktop targeted regression completed Home, Quick 3/3, Dashboard/data and an Assessment smoke. Existing full 24-question, training-feedback and pause/resume L4 evidence remains valid supporting evidence.
- Mobile `390x844` completed Home, Quick 3/3, Dashboard, Assessment smoke, Emergency and Data Management. Home, Assessment, Emergency and Data pages each measured `scrollWidth = clientWidth = 390`; visible core controls met 44px in at least one dimension. The hidden native file input is intentionally `1x1` and its visible label is the touch target.
- Real downloads were captured and read: JSON parsed with all required top-level fields and one three-response session; CSV was UTF-8 with the expected header and three rows. Neither export contained direct PII, `undefined` or `[object Object]`.
- The exact L4 data chain passed: generated Quick session -> downloaded JSON -> confirmed Clear to zero sessions -> imported that exact downloaded file -> restored anonymous ID, one session and Dashboard.
- Real Playwright keyboard API exercised Tab order, Enter and Space across Home, Quick, Assessment, Emergency, Data/Import and Clear confirmation. Focus remained on the rerendered selected buttons and the import input was keyboard-focusable.
- Fresh Service Worker registration was present, active and controlling the page at `/prototype/sw.js`. After reload, real offline mode reloaded Home from cache and Quick remained enabled; `navigator.onLine` was false and the offline event rendered `目前離線`.

Blocked localStorage fallback remains L2-only. Axe and screen-reader testing remain non-blocking accessibility follow-up; neither is represented as a complete compliance claim.

## Final Test Matrix

| Gate | Desktop | Mobile | Evidence | Status |
| ---- | ------- | ------ | -------- | ------ |
| First-party render/MIME | PASS | PASS | Fresh Chromium 151 headers and visible render | PASS |
| Quick | PASS | PASS | 3/3 live interactions | PASS |
| Assessment | PASS | PASS smoke | Full prior L4 plus fresh smoke | PASS |
| Pause/resume/persistence | PASS | NOT APPLICABLE | Existing L4 evidence | PASS |
| Emergency/Dashboard/Data | PASS | PASS | Fresh regression | PASS |
| JSON/CSV/export-import-clear | PASS | PASS | Real downloads and exact restore chain | PASS |
| Keyboard/focus | PASS | PASS | Real Playwright keyboard API | PASS |
| Overflow/touch | PASS | PASS | Geometry and scroll metrics | PASS |
| Console/network | PASS | PASS | No runtime errors; all core assets 200 | PASS |
| Service Worker/offline | PASS | PASS | Registration, control, reload and offline render | PASS |

## Final Verdict

**TECHNICAL BROWSER FREEZE COMPLETE**

Technical freeze timestamp: **2026-08-09 07:48 Asia/Taipei**.

**HUMAN QUESTION-BANK REVIEW REQUIRED BEFORE SCORED HUMAN TESTING.** The historical `text/plain` P0, old deployment and jsDelivr architecture are retained above as audit evidence; they are closed only for the new first-party deployment after this revalidation.
