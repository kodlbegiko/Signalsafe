# SignalSafe 專案狀態

更新日期：2026-08-16

## Executive status

> **SIGNALSAFE V2.1 PARTIALLY ACCEPTED**

V2.1 的 production-integrity / safety / measurement 修補已完成 code、tests、CI、merge 與 production HTTP 部署驗證；但尚未完成真實瀏覽器的 Service Worker install/control/offline smoke、Safari/iPad/VoiceOver/200% zoom 互動驗證，也尚未證明 Vercel 已恢復 GitHub `main` 自動部署。因此依 V2.1 acceptance rules，不得標為 `ACCEPTED`。

## Baseline incident

2026-08-16 初始 re-audit 發現：

- 當時 GitHub `main`: `cd4b67b2a23a4606824464762ccf63aa5ddeed20`
- production runtime 仍由 jsDelivr 載入舊 commit `b2753323f0119a66cbfd309ba1119c5f4a306ec6`
- production `/VERSION.json`: 404
- production `/manifest.webmanifest`: 404

因此舊文件中的「production current / first-party / offline verified」不得視為當時 current truth。

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
- consumer full training 改用自然 Phase wording；formal research wording維持研究模式；
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

## Git / CI evidence

- V2.1 implementation PR: `#47`
- PR final head: `50f62c28b33d79b4c2407267d7dfa721152d2874`
- CI workflow: `Prototype checks` run `69` / `31927605475`
- `npm run check`: PASS
- full `npm test`: PASS
- validated static artifact digest: `sha256:9ce6930b2e859b5f63bebbde9e2346d75b68c968153840bdb5c0796126812f31`
- merged implementation commit: `69b352cd98aa38595b27fa1ef384d3eb98a32c38`
- merged implementation tree: `1f9cdf8bd794137f0005da1fe7597618def4d9dd`

PR head 與 merged implementation commit 使用相同 Git tree，因此 CI 驗證內容與 merged implementation source 等價。

## Production evidence

V2.1 production deployment：

- Deployment ID: `dpl_CzAkQijjCiHY8poJ9jLEXdC7cPQV`
- Production alias: `https://signalsafe-v02-usability-r1.vercel.app`
- Deployment state: READY
- Source payload: immutable GitHub commit archive `69b352cd98aa38595b27fa1ef384d3eb98a32c38`

Verified HTTP 200：

- `/`
- `/VERSION.json`
- `/manifest.webmanifest`
- `/icon.svg`
- `/sw.js`
- `/test-guide.html`
- `/research-control.html`
- `/bootstrap.mjs`
- `/styles/09-v21.css`
- `/app-parts/app-v21.js`
- `/DEPLOYMENT_SOURCE.json`

Production HTML 已無 `cdn.jsdelivr.net/gh/` runtime。`DEPLOYMENT_SOURCE.json` 記錄 implementation SHA、tree、CI head 與 CI artifact digest。

## Remaining acceptance blockers

1. **Vercel Git integration / automatic deployment 未證明恢復**  
   本次 production 是從 immutable merged commit archive 建置並發布，可證明本次 payload source；但 merge `main` 後 Vercel 沒有自動建立新 deployment。核心長期目標「GitHub 更新就等於 production 更新」尚未完整成立。

2. **Production browser / PWA runtime smoke 未完成**  
   HTTP 與 static contract 已通過，但尚缺真實瀏覽器：SW install → reload controlled → offline reload、Browser Back、focus movement、T03/T04 fixture interaction、study context leakage interaction、Emergency before/after-action clicks。

3. **Accessibility runtime acceptance 未完成**  
   Static checks 已涵蓋 skip link、44px、reduced motion、focus guardrails；仍缺 Safari iPad、keyboard-only、200% zoom、VoiceOver、sticky focus not obscured 的人工/真瀏覽器驗證。

4. **Performance measurement 未完成**  
   尚未取得正式 production waterfall 的 FCP/LCP/INP/CLS/JS request count/time-to-interactive，因此未做大型 bundler refactor。

5. **Human usability validation 未執行**  
   尚無真人 Scenario A/B 的 first-click、completion、time、backtracking、help、qualitative confusion 證據。只能宣稱 implemented / technically verified / ready for human validation。

## Final status

> **SIGNALSAFE V2.1 PARTIALLY ACCEPTED**

本輪 P0 code/measurement/safety/HTTP production integrity 已顯著修復；真正阻止 `ACCEPTED` 的不是缺功能，而是 deployment automation 與 runtime/browser evidence 尚未閉環。
