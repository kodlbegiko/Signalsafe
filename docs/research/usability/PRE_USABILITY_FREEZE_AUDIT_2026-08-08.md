# SignalSafe Pre-Usability Freeze Audit — 2026-08-08

> Final static/semantic QA execution updated on 2026-08-09 (Asia/Taipei).

## Executive verdict

**BLOCKED — DO NOT START HUMAN TESTING**

The remaining blockers are now explicit and evidence-separated:

1. **P1 question-bank semantic validity:** `train-04`, `train-08`, and `post-08` are keyed `insufficient` despite containing direct high-risk requests. A human anti-fraud/pedagogy decision is required before scored human testing.
2. **Real Production browser gates:** this execution environment still has no usable JavaScript Chrome/Chromium, so Desktop/Mobile interaction, persistence, console, real focus traversal and Service Worker offline behavior have not been proven.

Static/runtime QA was materially strengthened in this mission, and a Production HTML MIME-type P0 found during HTTP verification was fixed before closeout. None of that is being used to fabricate L3/L4 browser evidence.

## Current candidate

| Item | Value |
|---|---|
| App | `0.2.4-usability-r1-hotfix4` |
| Question Bank | `2026-08-01-r1` |
| Runtime source SHA | `3cecb0d3b0eea53ff65839e4241cd5043e1aee7a` |
| Production config main SHA before final docs sync | `a74b714f5933c6004cc81801e27429b934cb18ad` |
| Production deployment | `dpl_F7Euc7qTtUvqKKPaM6f5iwq6m5mP` |
| Production URL | `https://signalsafe-v02-usability-r1.vercel.app` |
| Main CI | Actions run #26 — `success` |
| Runtime test artifact | Actions run #22 `prototype-test-output` — 33/33 PASS |
| Latest static artifact | `signalsafe-static-prototype`, artifact `9024665427` |
| Static artifact SHA-256 | `895ae43f8aa3e55bb32e4dd6efc334725eba3d94bf1110cb235c9b15f52b009e` |
| Round 1 | UT001–UT004 remain `not_started` |

## Evidence levels

- **L1** — source/docs/content inspection.
- **L2** — deterministic automated tests / CI / immutable artifact evidence.
- **L3** — local real-browser execution. **Not obtained in this mission.**
- **L4** — Production real-browser execution. **Not obtained in this mission.**

HTTP 200, MIME-type verification, source inspection and CI are not treated as substitutes for L3/L4.

## Automated QA — L2

The hotfix4 runtime test artifact records **33 tests / 33 pass / 0 fail**. Coverage includes:

- static focus treatment and 44px compact-control targets;
- keyboard-focusable file import;
- ARIA selection/progress/status guardrails;
- focus-token restoration source guardrail;
- reduced-motion rule;
- audited WCAG contrast pairs;
- modular entry assets;
- localStorage nonfatal memory fallback;
- Service Worker asset references;
- App/QB version consistency;
- no positive “完全安全” verdict;
- anti-gaming adversarial strategy;
- JSON top-level research export fields;
- CSV direct-identity header guardrail;
- 24-question phase/balance/ID checks;
- safe-action and signal-reference semantic invariants;
- trusted-item independent verification guardrail;
- scoring and calibration metrics.

Main Actions run #26 subsequently passed after the Production MIME configuration fix.

## Question-bank semantic QA — L1

Full review: `QUESTION_BANK_SEMANTIC_REVIEW_2026-08-08.md`.

Corrected item-level count:

- **11 PASS**
- **10 WARN**
- **3 FAIL**
- P0: **0**
- P1: **3** (`train-04`, `train-08`, `post-08`)

The earlier summary `19 PASS / 2 WARN / 3 FAIL` was a documentation counting error and has been corrected. The 24 per-item verdicts now reconcile exactly.

### P1 semantic blockers

- `train-04`: domain mismatch + same-day NT$3,000 deposit, but key is `insufficient`.
- `train-08`: short URL + address re-entry + payment, but key is `insufficient`.
- `post-08`: unverified recruiter + unknown installer, but key is `insufficient`.

No key was silently changed. Resolving these may alter scoring/construct validity and likely requires Question Bank version review.

Boundary WARNs `pre-04` and `pre-08` should be reviewed under the same operational rule distinguishing **有明顯風險** from **資訊不足**. Per-item source/rewrite basis and named human reviewer status also remain incomplete, so Issue #4 stays open.

## Static UI / accessibility QA — L1/L2

Full review: `STATIC_UI_ACCESSIBILITY_AUDIT_2026-08-08.md`.

### Fixed in hotfix4

- icon button 42×42 → 44×44;
- compact text/back controls gain 44px minimum height;
- focus ring strengthened to solid 3px blue;
- JSON import input remains keyboard-focusable instead of `display:none`;
- dynamic selections expose `aria-pressed`;
- selection rerenders preserve a focus token;
- Quick/Assessment/dashboard progress exposes progressbar semantics;
- toast exposes status/alert live-region semantics;
- orange/green audited text colors brought above 4.5:1 on their soft backgrounds;
- memory-mode copy now warns that refresh/close can lose data;
- offline label no longer overclaims “offline usable”;
- decorative hero phone mockup is hidden from the accessibility tree.

No source-level static UI/accessibility P0/P1 remains known after these fixes. Actual keyboard traversal, focus order, touch hitboxes, assistive-technology behavior and viewport overflow still require real browser evidence.

## Production HTTP verification — not browser interaction

Production deployment `dpl_F7Euc7qTtUvqKKPaM6f5iwq6m5mP` is `READY` and owns the public alias.

Verified through the Production origin:

- `/prototype/` → HTTP 200, correct hotfix4 HTML body, now `Content-Type: text/html; charset=utf-8`;
- `/prototype/bootstrap.mjs` → HTTP 200, `application/javascript`;
- `/prototype/styles/01.css` → HTTP 200, `text/css`;
- `/prototype/VERSION.json` → App `0.2.4-usability-r1-hotfix4`, QB `2026-08-01-r1`;
- `/prototype/sw.js` → cache `signalsafe-v0.2.4-r1-hotfix4`;
- upstream response metadata pins runtime to Git commit `3cecb0d3b0eea53ff65839e4241cd5043e1aee7a`.

### Production P0 found and fixed during this mission

The first hotfix4 deployment returned the correct HTML body as `Content-Type: text/plain`. That is a deployment-level blocker because a browser may display source text rather than render the application. PR #38 added explicit HTML response headers, main CI passed, Production was redeployed, and the public alias now returns `text/html; charset=utf-8`.

This is HTTP evidence only; it is not a claim that JavaScript executed successfully in a real browser.

## Deployment architecture limitation

The browser-visible HTML uses relative same-origin asset paths, and the old client `payload → decompress → eval` reconstruction is gone. However, Vercel still rewrites to an immutable jsDelivr upstream pinned to Git SHA `3cecb0d...`.

Therefore:

- first-load availability still depends on the external CDN;
- the deployment is not fully self-contained;
- Service Worker first-install/reload/offline behavior is not proven;
- offline must remain blocked until real browser testing.

## Freeze gates still not proven

| Gate | Status | Evidence boundary |
|---|---|---|
| Desktop 1440×900 Production navigation | **REAL BROWSER REQUIRED** | No L4 browser |
| Mobile 390×844 Production navigation | **REAL BROWSER REQUIRED** | No L4 browser |
| 90-second Quick Mode 3-question flow | **REAL BROWSER REQUIRED** | Source/tests cannot replace interaction |
| Pre → Training → Post 24-question flow | **REAL BROWSER REQUIRED** | Same |
| Pause / resume | **REAL BROWSER REQUIRED** | Browser storage/state required |
| Emergency UI | **REAL BROWSER REQUIRED** | Source safety PASS only |
| Dashboard UI | **REAL BROWSER REQUIRED** | Metric tests PASS only |
| Export / import / clear UI | **REAL BROWSER REQUIRED** | Schema/source tests PASS only |
| Refresh / persistence / blocked-storage behavior | **REAL BROWSER REQUIRED** | Real localStorage behavior required |
| Console / uncaught runtime exception | **REAL BROWSER REQUIRED** | No browser console |
| Service Worker install → reload → offline | **REAL BROWSER REQUIRED** | Static SW architecture only |
| Real keyboard/focus traversal | **REAL BROWSER REQUIRED** | Static a11y guardrails only |
| Actual 44px hitboxes / 390px overflow | **REAL BROWSER REQUIRED** | Static CSS only |
| Human question-bank taxonomy sign-off | **HUMAN REVIEW REQUIRED** | AI review is not expert sign-off |

## Historical evidence correction

- Historical `71 PASS / 0 FAIL` means core/browser-engine QA only, not Production navigation PASS.
- The 2026-08-01 real-Chrome startup failure incident remains preserved and must not be rewritten away.
- Old `0.2.0`, `0.2.1-hotfix1` and `0.2.3-hotfix3` evidence remains historical; `0.2.4-hotfix4` is only the current **pre-freeze candidate**.
- No freeze timestamp is recorded because the version is not frozen.

## Required next gates

Before UT001–UT004:

1. Human anti-fraud/pedagogy reviewer resolves the `risk` vs `insufficient` rule and the 3 P1 items; update QB version if warranted.
2. In a normal Chrome/Chromium browser, directly test the public Production URL for Desktop/Mobile, Quick, full assessment, pause/resume, Emergency, dashboard, export/import/clear, reload persistence, console, Service Worker offline, keyboard/focus and overflow.
3. Only if no P0/P1 remains may `round-1-pre-freeze-candidate` become `Round 1 FROZEN` and human usability testing start.

## Final freeze status

**BLOCKED — DO NOT START HUMAN TESTING**
