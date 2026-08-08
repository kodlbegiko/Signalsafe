# SignalSafe 部署與技術驗收報告

更新日期：2026-08-08

## 現行結論

**BLOCKED — DO NOT START HUMAN TESTING**

現行候選為 `0.2.3-usability-r1-hotfix3`，Question Bank `2026-08-01-r1`。GitHub 自動 QA、題庫分布、anti-gaming、匿名匯出 schema、Service Worker 資產與 Production HTTP 結構均已驗證，但本執行環境沒有可執行 JavaScript 的真實 Chrome／Chromium，因此無法完成 Round 1 前必要的 Production browser navigation 與互動 Gate。

## 現行固定值

| 項目 | 值 |
|---|---|
| App candidate | `0.2.3-usability-r1-hotfix3` |
| Question Bank | `2026-08-01-r1` |
| Runtime Git SHA | `fd8655b18c807221feea23cd8754a665e9298414` |
| Production URL | https://signalsafe-v02-usability-r1.vercel.app |
| Production deployment | `dpl_ES53zV4bght2rBx4rCSJhyCTCCFN` |
| Main CI | Actions run #18 — success |
| Static artifact | `signalsafe-static-prototype` / `9023289006` |
| Artifact SHA-256 | `d0645eebf408a0138296df8f04f336e5041b49cca57f7ef6871317d481f4d5d7` |

## Automated QA

- `npm run check`：PASS
- `npm test`：PASS
- 24 題：Pre／Training／Post 各 8 題
- 每階段：Risk 3／Insufficient 2／Trusted 3
- 24 個 question ID 唯一
- Anti-gaming：PASS；全選 Risk／全選訊號／安全行動全錯／最高自信不能取得高分
- JSON export required top-level fields：PASS
- CSV direct-PII header audit：PASS
- Service Worker asset references：PASS
- `完全安全` 正向裁決防護：PASS；允許「不等於完全安全」等明確反向警語

## Production HTTP / artifact reality check

Production deployment 為 `READY`，正式 alias 回 HTTP 200。`VERSION.json`、`bootstrap.mjs`、`sw.js` 可由正式 Production 路徑取得，版本與 CI source 一致；HTML 使用相對資產路徑，不再使用先前的 payload → decompress → eval client reconstruction。

目前 Vercel 以 rewrite 對應固定 Git SHA 的 jsDelivr 靜態資產，因此首次網路載入仍依賴外部 CDN。這不是完整 self-contained deployment，且本次沒有真實 Service Worker/offline browser 證據。

## 尚未通過的 Freeze Gate

- Desktop 真實 Production navigation
- Mobile 真實 Production navigation
- 90 秒快練 3 題正式 UI
- Pre → Training → Post 24 題正式 UI
- Pause / resume
- Emergency UI
- Dashboard UI
- JSON／CSV download、JSON import、clear data 的瀏覽器互動
- Refresh / persistence / blocked-localStorage 實機行為
- Service Worker install → reload → offline
- Console / uncaught runtime exception
- Keyboard／focus／overflow／44px target 的實際 viewport 稽核

上述任一項在 Freeze 前都不能用程式碼審查或 HTTP 200 取代。

## Evidence correction

先前 `71 PASS / 0 FAIL` 只代表 core/browser-engine QA，**不得解讀為 Production navigation PASS**。2026-08-01 真實 Chrome 啟動失敗事件保留於 `INCIDENT_2026-08-01_LIVE_STARTUP.md`，不得刪除或改寫成沒有發生。

完整本輪稽核見 `PRE_USABILITY_FREEZE_AUDIT_2026-08-08.md`。
