# SignalSafe 專案狀態

更新日期：2026-08-22

## Executive status

> **SIGNALSAFE V2.1 PARTIALLY ACCEPTED**

V2.1 的 production-integrity / safety / measurement 修補已完成 code、tests、CI、merge 與 production HTTP 部署驗證；但 deployment automation、current V2.1 production browser / PWA runtime smoke、部分 accessibility runtime acceptance 與 performance measurement 尚未完全閉環，因此不得標為 `ACCEPTED`。

研究證據另有一條獨立邊界：**2026-08-17 exploratory usability observation 已完成；Formal scored Round 1 仍是 NOT STARTED。** 兩者不得混為同一批研究資料。

## 2026-08-17 exploratory usability status

**Exploratory usability observation: COMPLETED on 2026-08-17.**

- Participants: `n = 3`。
- Age: 3 位皆為 18 歲，位於 16–18 歲目標使用者範圍。
- Core tasks: 每人 5 個——開始快練、完成 3 題、查看結果、找到急救功能、回到首頁。
- Task completion: **15/15**。
- Moderator intervention: **0/15**。

本次觀察支持 usability、task completion、navigation / interaction feasibility 與 design iteration。它不建立 learning effect、scam-prevention effectiveness、unseen-scenario transfer、Day-7 retention、reduction in victimization、statistical significance 或其他教育成效。

本次操作造成三項產品修改：

1. 產品定位改為「安全決策訓練」。
2. 快練入口前移。
3. 英文介面改成白話。

完整 evidence boundary：[`docs/research/usability/EXPLORATORY_USABILITY_2026-08-17.md`](docs/research/usability/EXPLORATORY_USABILITY_2026-08-17.md)。

## Formal Round 1 status

> **Formal Round 1 human usability validation: NOT STARTED**

`data/usability/round-1/UT001.json`–`UT004.json` 仍是正式 Round 1 的 `not_started` 模板／資料位置。2026-08-17 exploratory observation 不屬於 Formal Round 1，也不會填入 UT001–UT004 或混入 formal scored study。

## Implemented V2.1 controls

- production runtime 改為 first-party same-origin static assets，不再使用 jsDelivr GitHub runtime bridge；
- formal research version、product version 與 PWA cache version 分離；
- T03/T04 改用 deterministic synthetic anonymous fixtures；
- usability study context 改為 session-scoped，participant/task/setup 建立後從 URL 移除；
- Study Event Store 與 Product Learning Store 邏輯分離；
- Quick Training 改為 primary-signal measurement；Full Assessment 保持 multi-signal recall，Dashboard 分開呈現；
- weakness/status minimum observations 同為 5，並明確標為 product heuristic；
- Emergency Flow 加入 pre-action 與 post-action recovery；
- 加入 `tel:165` 與 165 官方查證入口；
- consumer full training 改用自然 Phase wording；formal research wording 維持研究模式；
- 加入 History API、skip link、route title/focus、44px controls、reduced-motion / sticky focus guardrails；
- Research Control 加入 Start Task / Reset Task State / Apply Fixture / Open Participant View / End Task 與匿名 task/event export。

## Frozen formal research boundary

| 項目 | 值 |
|---|---|
| Formal research appVersion | `0.3.4-research-export-fix` |
| Question Bank | `2026-08-10-v2-candidate` |
| V2 usability protocol | `signalsafe-v2-usability-2026-08-16` |
| Product version | `2.1.0` |
| PWA cache version | `signalsafe-product-2.1.0` |
| Research event schema | `signalsafe-research-events-v1` |
| Study fixture version | `signalsafe-study-fixtures-v1` |

V2.1 不修改 question IDs、correct answers、pre/post pairing、confidence scale、formal scoring、Consent 或 formal export schema。

## Git / CI / local rerun evidence

- V2.1 implementation PR: `#47`。
- PR final head: `50f62c28b33d79b4c2407267d7dfa721152d2874`。
- CI workflow: `Prototype checks` run `69` / `31927605475`，conclusion `success`。
- CI validated static artifact digest: `sha256:9ce6930b2e859b5f63bebbde9e2346d75b68c968153840bdb5c0796126812f31`。
- Merged implementation commit: `69b352cd98aa38595b27fa1ef384d3eb98a32c38`。
- Merged implementation tree: `1f9cdf8bd794137f0005da1fe7597618def4d9dd`。
- 2026-08-22 isolated rerun on the unchanged current prototype/package source: `npm run check` PASS；`npm test` **112/112 PASS**。

PR head 與 merged implementation commit 使用相同 Git tree；implementation merge 後到本次 evidence sync 前，`prototype/**` 與 `package.json` 未變更，後續變動集中在文件與 `vercel.json` routing。因此 2026-08-22 rerun 用 current `vercel.json` 搭配該 validated prototype source 重新確認 source/runtime test suite。

## Production evidence boundary

V2.1 production deployment：

- Deployment ID: `dpl_CzAkQijjCiHY8poJ9jLEXdC7cPQV`
- Production alias: `https://signalsafe-v02-usability-r1.vercel.app`
- Deployment state: `READY`
- Source payload: immutable GitHub commit archive `69b352cd98aa38595b27fa1ef384d3eb98a32c38`

HTTP / static verification 與 current V2.1 real-browser acceptance 是不同證據層級。舊版 0.2.4 曾完成其指定 browser acceptance，但不得外推成 V2.1 已通過目前所有 runtime gates。

## Remaining acceptance blockers

1. **Vercel Git integration / automatic deployment 未證明恢復**
   本次 production payload source 可追溯，但 GitHub `main` 更新後自動 deployment 的長期閉環尚未證明。

2. **Current V2.1 production browser / PWA runtime smoke 未完全閉環**
   仍需以 current V2.1 驗證 SW install → reload controlled → offline reload、Browser Back、focus movement、T03/T04 fixture interaction、study context leakage interaction、Emergency before/after-action clicks等 runtime 行為。

3. **Accessibility runtime acceptance 未完成**
   Static checks 已涵蓋 skip link、44px、reduced motion、focus guardrails；仍缺 Safari iPad、keyboard-only、200% zoom、VoiceOver、sticky focus not obscured 等人工／真瀏覽器證據。

4. **Performance measurement 未完成**
   尚未取得正式 production waterfall 的 FCP/LCP/INP/CLS/JS request count/time-to-interactive，因此不宣稱 performance optimization 已完成。

5. **Formal Round 1 human validation NOT STARTED**
   2026-08-17 已有 exploratory usability evidence，但它不是 formal scored Round 1，也不能用來宣稱 learning / transfer / retention / scam-prevention effectiveness。

6. **Formal expert/domain question-bank review 未完成**
   既有 AI-assisted semantic review 的 P1 items 與 taxonomy 仍需要人工領域／專家 review；不得宣稱題庫已 expert-approved。

## Final status

> **SIGNALSAFE V2.1 PARTIALLY ACCEPTED**

工程、研究與真人 evidence 現在分層呈現：V2.1 technical acceptance 尚有上述 blocker；2026-08-17 exploratory usability 已完成；Formal scored Round 1 仍為 `NOT STARTED`。這三個狀態可同時成立，不能互相替代。
