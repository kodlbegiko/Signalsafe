# SignalSafe Static UI / Accessibility Audit — 2026-08-08

> Execution completed on 2026-08-09 (Asia/Taipei). The filename follows the pre-usability mission naming convention.

## Executive Summary

- Evidence level: **L1 source inspection + L2 deterministic static tests**.
- Scope: `prototype/index.html`, `styles/**`, `app-parts/**`, runtime modules, storage, manifest, Service Worker and static test suite.
- Static UI/accessibility P0 remaining after fixes: **0**.
- Static UI/accessibility P1 remaining after fixes: **0 known from source-level checks**.
- Real keyboard/focus behavior, actual target hitboxes, viewport overflow and Production PWA/offline behavior remain **REAL BROWSER REQUIRED**.
- Question-bank semantic P1s are tracked separately and still block formal Freeze.

## Evidence Level

- **L1** — HTML/CSS/JS/source inspection.
- **L2** — Node syntax checks and deterministic tests.
- **L3** — not obtained in this mission.
- **L4** — not obtained in this mission.

An HTTP response, source inspection or CI pass is not treated as a real-browser accessibility pass.

## Semantic HTML

**Status: PASS (L1), browser/AT verification still required.**

Observed:
- document language and viewport are defined;
- application shell uses native `<header>`, `<main>`, and `<footer>`;
- core actions and navigation use native `<button>`;
- form-like answer controls are native buttons rather than click-only `<div>` elements;
- destructive operations use native browser confirmation dialogs;
- no custom modal implementation requiring an unverified focus trap is present.

Non-blocking note:
- the app is a dynamically rendered single-page interface rather than a conventional document/navigation structure. Real assistive-technology behavior remains to be observed.

## Keyboard

### Findings before fix

1. File import used `.file-button input{display:none}`. The visible label was mouse/touch clickable, but the file input was removed from the keyboard focus order.
2. Selection actions call `render()`, replacing `app.innerHTML`. The focused control therefore risked disappearing after every keyboard selection.

### Fixes

- File input is now visually hidden while remaining focusable.
- `.file-button:focus-within` exposes a focus ring on the visible file-import control.
- Selection rerenders capture a stable `data-*` focus token and restore focus to the replacement control.
- Deterministic tests verify the focus-preservation code is present.

**Static status: PASS (L1/L2).**  
**Actual Tab / Enter / Space traversal: REAL BROWSER REQUIRED.**

## Focus

### Before

Focus styling used a semi-transparent blue outline:

`rgba(15,91,215,.25)`

This was visually subtle and not a strong static focus-contrast guarantee.

### After

- `button:focus-visible`, `input:focus-visible`, and `.file-button:focus-within` use a 3px solid `var(--blue)` outline with 3px offset.
- No `outline:none` rule was found.
- compact text navigation controls now have a 44px minimum height.

**Static status: PASS (L1/L2).**  
**Real focus order / focus visibility on rendered pages: REAL BROWSER REQUIRED.**

## Touch Targets

### Before

- `.icon-button`: `42×42px`.
- `.text-button`, `.resume-link`, `.back-button`: no guaranteed 44px minimum height.

### After

- `.icon-button`: `44×44px`.
- `.text-button`, `.resume-link`, `.back-button`: `min-height:44px`.
- generic `.button`: already `min-height:46px`.
- major answer and emergency controls already exceed 44px in their static CSS.

**Static status: PASS for known explicit control classes (L1/L2).**  
**Actual rendered hitboxes: REAL BROWSER REQUIRED.**

## Responsive Risks

Static responsive design includes breakpoints at 900px and 620px. At the 620px breakpoint:
- question, signal, judgment, confidence and emergency choice grids collapse to one column;
- dashboard collapses to one column;
- data-action rows move buttons to a full row;
- fixed/sticky desktop side panels become static;
- outer page width uses `calc(100% - 24px)`;
- body minimum width is 320px.

No deterministic source-level horizontal-overflow blocker was identified for a 390px viewport.

**Status: WARN / REAL BROWSER REQUIRED.**

The following cannot be closed by source inspection:
- 390×844 actual overflow;
- on-screen keyboard interactions;
- long translated/wrapped labels;
- sticky/fixed interactions under browser chrome;
- actual 1440×900 composition.

## Contrast

WCAG contrast was calculated for key normal-text token/background pairs after the fix.

| Foreground | Background | Ratio | Requirement | Verdict |
|---|---|---:|---:|---|
| `#0d1f35` ink | `#ffffff` | 16.61:1 | 4.5:1 | PASS |
| `#5f6f82` muted | `#ffffff` | 5.14:1 | 4.5:1 | PASS |
| `#0f5bd7` blue | `#ffffff` | 6.00:1 | 4.5:1 | PASS |
| `#157d58` green | `#e8f7f1` | 4.63:1 | 4.5:1 | PASS |
| `#a85b0f` orange | `#fff2e4` | 4.58:1 | 4.5:1 | PASS |
| `#b53b4a` red | `#fff0f2` | 5.15:1 | 4.5:1 | PASS |
| `#9eb1c6` | `#0d2541` | 7.04:1 | 4.5:1 | PASS |
| `#c3d0df` | `#0d2541` | 9.87:1 | 4.5:1 | PASS |

Before the fix, orange on orange-soft was about **3.79:1** and green on green-soft about **4.45:1**, both below the requested 4.5:1 normal-text threshold.

**Status: PASS for audited static pairs (L2).**  
State combinations not represented by these deterministic pairs still need rendered inspection.

## ARIA / Accessible State

### Findings before fix

Selection state was communicated visually through `.is-selected` but not exposed programmatically.

### Fixes

Added `aria-pressed` to:
- Quick Mode action and signal choices;
- Assessment action, judgment, signal and confidence choices;
- Emergency request and official-channel choices.

Added `role="progressbar"` plus numeric ARIA values to:
- Quick Mode progress;
- full Assessment progress;
- dashboard metric bars.

Toast notifications now use:
- `role="status"` / `role="alert"`;
- `aria-live`;
- `aria-atomic="true"`.

The hero phone mockup is marked decorative (`aria-hidden="true"`) to avoid duplicate narration.

**Static status: PASS (L1/L2).**  
Screen-reader behavior remains **REAL BROWSER / AT REQUIRED**.

## Reduced Motion

`@media(prefers-reduced-motion:reduce)` is present and suppresses transitions/animation durations while disabling smooth scrolling.

**Status: PASS (L1/L2).**

## Typography / Reading Accessibility

- primary body text inherits a normal browser-readable base;
- main scenario messages use 1.75 line-height;
- hero explanatory text uses 1.8 line-height;
- mobile layouts reduce complexity rather than compress multi-column content;
- primary question/action labels are substantially larger than 12px metadata.

Warnings:
- several metadata labels use 12px text. They are supplementary rather than the sole source of critical instructions.
- no empirical reading-time or comprehension data exists yet.

**Status: PASS with non-blocking WARN (L1).**

## Emergency Mode

Static review confirms:
- it explicitly instructs users not to paste message/account/password/OTP content;
- it does not upload suspicious content;
- it first identifies requested behavior rather than claiming scam detection;
- high-risk actions are stopped before verification guidance;
- verification is redirected to independently opened apps/sites/known contact paths;
- output explicitly states SignalSafe has **not** determined the message is definitely true or false;
- money/account/personal-data cases can route to trusted adults, official support or 165.

**Status: PASS (L1).**  
Actual flow completion and mobile behavior remain **REAL BROWSER REQUIRED**.

## Data / Privacy UI

### Finding before fix

The footer correctly distinguished `memory` from persistent storage, but the Home privacy strip still always said that all records were stored on the device, which could imply durable persistence during memory fallback.

### Fixes

- Home privacy copy now explicitly warns when `storageMode === "memory"` that refresh/closing may lose data.
- Data screen adds the same memory-mode warning.
- File import remains local and import replacement requires confirmation.
- Clear-all remains explicit and irreversible.
- CSV schema continues to exclude direct identity headers in automated tests.

**Static status: PASS (L1/L2).**  
Browser storage failure modes and reload persistence remain **REAL BROWSER REQUIRED**.

## PWA / Offline

Static Service Worker architecture:
- registers only outside `file:` mode;
- precaches the modular runtime;
- uses a versioned cache;
- deletes old SignalSafe caches on activation;
- falls back to cached resources / `index.html` when fetch fails;
- manifest has relative `start_url` and `scope`.

**Static architecture status: PASS (L1/L2).**

Important limitation:
Production currently reaches the pinned runtime through Vercel rewrites to immutable jsDelivr content. Therefore **first-load offline independence is not proven and must not be marked PASS**. Service Worker `install → reload → offline` behavior also remains L4 browser-only evidence.

## Fixes Applied

| Problem | File(s) | Fix | Verification | Evidence |
|---|---|---|---|---|
| 42px icon target | `styles/01.css` | 44×44px | static test | L2 |
| compact text controls lacked 44px floor | `styles/01.css` | `min-height:44px` | static test | L2 |
| weak focus outline | `styles/01.css` | solid blue 3px focus ring | static test | L2 |
| file input removed from keyboard order | `styles/02.css` | visually hidden focusable input + focus-within | static test | L2 |
| orange/green state contrast below 4.5 | `styles/01.css` | darkened status colors | contrast calculation test | L2 |
| selected state only visual | Quick/Assessment/Emergency views | `aria-pressed` | static test | L2 |
| rerender could drop selection focus | `app-runtime.js` | focus-token capture/restore | syntax + static test | L2 |
| progress state visual only | Quick/Assessment/Dashboard | ARIA progressbar values | static test | L2 |
| toast not announced | `app-core.js` | live region status/alert semantics | static test | L2 |
| memory-mode durability overclaim on Home/Data | `app-home.js`, `app-insights.js` | conditional temporary-memory warning | source review | L1 |
| offline label could overclaim availability | `app-core.js` | changed to “目前離線” | source review | L1 |

## Remaining Real-Browser Gates

These are **not PASS** in this audit:

- Desktop 1440×900 real navigation;
- Mobile 390×844 real navigation;
- actual Quick Mode flow;
- actual 24-question flow;
- pause/resume;
- Emergency Mode interaction;
- dashboard rendering;
- export/import/clear UI;
- reload persistence;
- console/runtime exception check;
- Service Worker install → reload → offline;
- real Tab/Shift+Tab/Enter/Space traversal;
- actual focus movement after screen transitions;
- actual touch hitboxes;
- actual viewport overflow.

**Static UI/accessibility conclusion: source-level P0/P1 issues found in this mission were fixed and verified at L1/L2. Formal browser gate remains blocked.**
