# SignalSafe 部署與技術驗收報告

更新日期：2026-08-09

## 現行結論

**BLOCKED — DO NOT START HUMAN TESTING**

現行候選為 `0.2.4-usability-r1-hotfix4`，Question Bank `2026-08-01-r1`。工程與 static Accessibility QA 已收斂到 L1/L2，但仍有 3 個題庫 semantic P1，加上未完成的 Production real-browser Gate。

## 現行固定值

| 項目 | 值 |
|---|---|
| App candidate | `0.2.4-usability-r1-hotfix4` |
| Question Bank | `2026-08-01-r1` |
| Runtime Git SHA | `3cecb0d3b0eea53ff65839e4241cd5043e1aee7a` |
| Production URL | https://signalsafe-v02-usability-r1.vercel.app |
| Production deployment | `dpl_F7Euc7qTtUvqKKPaM6f5iwq6m5mP` |
| Main technical CI | Actions run #26 — success |
| Runtime tests | 33/33 PASS |
| Static artifact | `signalsafe-static-prototype` / `9024665427` |
| Artifact SHA-256 | `895ae43f8aa3e55bb32e4dd6efc334725eba3d94bf1110cb235c9b15f52b009e` |

## Automated QA

- `npm run check`：PASS
- runtime `npm test`：33/33 PASS
- 24 題：Pre／Training／Post 各 8 題
- 每階段：Risk 3／Insufficient 2／Trusted 3
- 24 個 question ID 唯一
- Anti-gaming：PASS
- JSON export required top-level fields：PASS
- CSV direct-PII header audit：PASS
- Service Worker asset references：PASS
- static Accessibility guardrails：PASS
- question semantic-integrity guardrails：PASS

上述自動測試只能證明 deterministic invariants，不代表人工 semantic validity 或 real-browser usability。

## Question Bank semantic review

修正後 item-level count：**11 PASS / 10 WARN / 3 FAIL**。

3 個 P1 FAIL：`train-04`、`train-08`、`post-08`。它們都涉及 `risk` 與 `insufficient` 的 operational boundary；目前沒有自動修改 key。若人工審查決定改 classification 或 construct，必須評估 Question Bank 升版。

## Production HTTP / artifact reality check

Production deployment `dpl_F7Euc7qTtUvqKKPaM6f5iwq6m5mP` 為 `READY`。正式 alias 已確認：

- `/prototype/`：HTTP 200、`text/html; charset=utf-8`
- `bootstrap.mjs`：HTTP 200、`application/javascript`
- `styles/01.css`：HTTP 200、`text/css`
- `VERSION.json`：hotfix4 / `2026-08-01-r1`
- `sw.js`：`signalsafe-v0.2.4-r1-hotfix4`
- upstream immutable pin：`3cecb0d...`

本輪曾發現第一個 hotfix4 Production deployment 把正確 HTML body 回成 `Content-Type: text/plain`。此 P0 已由 PR #38 的 Vercel response headers 修正並重新部署。

Production 仍透過 Vercel rewrite 使用 jsDelivr immutable upstream，首次載入依賴外部 CDN，因此不是 fully self-contained deployment。

## 尚未通過的 Freeze Gate

### Human domain review

- `risk` vs `insufficient` operational rule
- `train-04`／`train-08`／`post-08` P1 resolution
- `pre-04`／`pre-08` boundary review
- per-item source/rewrite basis
- human reviewer/status

### Real browser

- Desktop 1440×900 Production navigation
- Mobile 390×844 Production navigation
- Quick Mode 3 題
- Pre → Training → Post 24 題
- pause / resume
- Emergency / Dashboard
- JSON／CSV download、JSON import、clear data
- refresh / persistence / blocked-storage behavior
- Service Worker install → reload → offline
- console / uncaught runtime exception
- real keyboard/focus / actual hitboxes / overflow

上述不得用程式碼審查、HTTP 200 或 CI 取代。

## Evidence correction

- 歷史 `71 PASS / 0 FAIL` 只代表 core/browser-engine QA，不代表 Production navigation PASS。
- 2026-08-01 真實 Chrome 啟動失敗事件保留於 `INCIDENT_2026-08-01_LIVE_STARTUP.md`。
- 本輪語意 review 早期摘要 `19 PASS / 2 WARN / 3 FAIL` 是計數錯誤；依 24 個 item verdict 正確統計為 **11 / 10 / 3**。

完整本輪稽核見 `PRE_USABILITY_FREEZE_AUDIT_2026-08-08.md`。
