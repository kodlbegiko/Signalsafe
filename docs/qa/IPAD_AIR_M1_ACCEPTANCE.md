# iPad Air M1 Acceptance — SignalSafe v0.3

Primary target: iPad Air M1 / iPadOS Safari.

Required viewports: 820×1180 portrait, 1180×820 landscape; sanity 768×1024 and 744×1133 when tooling permits. Regression: 390×844 mobile and 1440×900 desktop.

## Engineering controls

- content breakpoints 600–899 and 900–1199
- portrait questions single-column
- landscape questions approximately 40/60 scenario/interaction split
- tablet portrait home uses 2+1 cards
- `100dvh` with `100vh` fallback
- safe-area insets
- 44px minimum target layer
- no core information depends on hover
- standard click/button semantics for touch, Pencil, trackpad, mouse, keyboard
- normal document flow; no fixed-height question shell
- readable text measure
- reduced-motion retained

## Acceptance checklist

| Item | Automated/emulated | Physical iPad |
|---|---|---|
| Home | PENDING | HUMAN AT REVIEW PENDING |
| Quick 3/3 | PENDING | HUMAN AT REVIEW PENDING |
| Research start | PENDING | HUMAN AT REVIEW PENDING |
| Pre / Training / Post | PENDING | HUMAN AT REVIEW PENDING |
| Dashboard | PENDING | HUMAN AT REVIEW PENDING |
| Emergency | PENDING | HUMAN AT REVIEW PENDING |
| Export / Import | PENDING | HUMAN AT REVIEW PENDING |
| Refresh / pause / resume | PENDING | HUMAN AT REVIEW PENDING |
| Portrait ↔ Landscape | PENDING | HUMAN AT REVIEW PENDING |
| Offline/PWA | PENDING | HUMAN AT REVIEW PENDING |
| VoiceOver | not automatable here | HUMAN AT REVIEW PENDING |

Playwright WebKit or other automation must not be labeled as physical iPad Safari L5 evidence.
