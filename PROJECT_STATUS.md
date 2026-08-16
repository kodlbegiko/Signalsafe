# SignalSafe 專案狀態

更新日期：2026-08-16

## Executive status

> **SIGNALSAFE V2.1 PRODUCTION-INTEGRITY CANDIDATE — NOT YET ACCEPTED**

2026-08-16 baseline re-audit 發現 current production 與 GitHub `main` 不一致：GitHub `main` 為 `cd4b67b2a23a4606824464762ccf63aa5ddeed20`，production 首頁仍透過 jsDelivr 載入舊 commit `b2753323f0119a66cbfd309ba1119c5f4a306ec6`；`/VERSION.json` 與 `/manifest.webmanifest` 亦為 404。舊文件中「first-party deployment / production current / offline verified」不得視為 current truth。

V2.1 candidate 針對此 P0 與相關 integrity defects 建立修正：

- production root 以 first-party Vercel rewrites 直接服務 `prototype/` 靜態資產，不再使用 jsDelivr runtime bridge；
- product/PWA version 與 formal research version 分離；
- T03/T04 使用 deterministic synthetic study fixtures；
- usability study context 改為 session-scoped，並在建立 context 後移除 URL 中 participant/task/setup；
- Study Event Store 與 Product Learning Store 邏輯分離；
- Quick Training 改為 primary-signal measurement，與 Full multi-signal recall 分開呈現；
- weakness/status minimum observation 統一為 5（product heuristic）；
- Emergency Flow 新增「已經做過高風險操作」的 recovery path；
- 加入 `tel:165` 與 165 官方入口；
- consumer full training 隱藏 pre/training/post 研究術語；
- 加入 History API、skip link、route title/focus 與 sticky focus guardrails；
- Research Control 新增 Start/Reset/Apply Fixture/Open/End 與匿名 task/event export。

## Frozen formal research boundary

| 項目 | 值 |
|---|---|
| Formal research appVersion | `0.3.4-research-export-fix` |
| Question Bank | `2026-08-10-v2-candidate` |
| V2 usability protocol | `signalsafe-v2-usability-2026-08-16` |
| Product version candidate | `2.1.0` |
| PWA cache version | `signalsafe-product-2.1.0` |

不得因 V2.1 product iteration 改動 question IDs、correct answers、pre/post pairing、confidence scale、formal scoring、Consent 或 formal export schema。

## Acceptance gate

V2.1 只有在以下全部完成後才能標為 `SIGNALSAFE V2.1 ACCEPTED`：

1. branch / PR implementation 完成；
2. `npm run check` 與完整 `npm test` 全綠；
3. CI all green；
4. merged `main` SHA 與 production deployment source 一致；
5. production `/`, `/manifest.webmanifest`, `/icon.svg`, `/sw.js`, `/VERSION.json`, `/test-guide.html`, `/research-control.html` 與主要 JS/CSS 全部 200；
6. production HTML 無 `cdn.jsdelivr.net/gh/` runtime；
7. T03/T04 fixture 可在 fresh task deep link 獨立執行；
8. study end 後 normal use 不再產生前一 Participant ID events；
9. Quick / Dashboard measurement semantics 與 Emergency pre/post-action flow 驗證；
10. production browser smoke 與 Service Worker online→reload→offline 驗證。

在 real browser / PWA runtime gate 尚未完成前，只能宣稱 `implemented`、`technically verified`、`ready for human validation`，不得宣稱 usability validated 或教育成效成立。

## Historical evidence

過去 browser acceptance、deployment IDs 與舊 runtime pins 保留在 `docs/research/usability/` 作歷史 audit trail；它們不代表 2026-08-16 current production state。
