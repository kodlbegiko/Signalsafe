# SignalSafe Pre-Usability Freeze Audit — 2026-08-08

## Executive verdict

**BLOCKED — DO NOT START HUMAN TESTING**

工程與研究準備已大幅收斂，但本次執行環境沒有可執行 JavaScript 的真實 Chrome／Chromium 瀏覽器，因此不能完成正式 Production URL 的 Desktop／Mobile navigation、互動流程、refresh/persistence、Service Worker/offline 與 console/runtime exception Gate。依既定 Freeze 規則，這些 P1 Gate 未取得證據前不得開始 UT001–UT004。

## 固定候選

| 項目 | 值 |
|---|---|
| App | `0.2.3-usability-r1-hotfix3` |
| Question Bank | `2026-08-01-r1` |
| Runtime source SHA | `fd8655b18c807221feea23cd8754a665e9298414` |
| Production deployment | `dpl_ES53zV4bght2rBx4rCSJhyCTCCFN` |
| Production URL | `https://signalsafe-v02-usability-r1.vercel.app` |
| Main CI | Actions run #18 — `success` |
| CI static artifact | `signalsafe-static-prototype`, artifact `9023289006` |
| Artifact SHA-256 | `d0645eebf408a0138296df8f04f336e5041b49cca57f7ef6871317d481f4d5d7` |

## 已證明

- `main` 的 `npm run check` 與 `npm test` 通過。
- 24 題題庫：Pre／Training／Post 各 8 題；每階段 Risk 3／Insufficient 2／Trusted 3；24 個 ID 唯一。
- Anti-gaming 自動測試：全選 Risk、全選訊號、安全行動全錯、最高自信時，安全行動正確率為 0、macro recall 不高於 1/3、Trusted false-positive rate 為 1、high-confidence error rate 至少 0.625，overall score 低於 0.5。
- JSON 匯出頂層包含 `appVersion`、`questionBankVersion`、`anonymousUserId`、`sessions`；舊 `data` 結構仍保留相容性。
- CSV 欄位不含姓名、學校、班級、電話、Email 或社群帳號等直接識別欄位。
- `localStorage` 無法使用時不會因例外直接 crash，且 UI 會標示為暫時記憶模式，不再宣稱已永久保存。
- Service Worker cache 已更新為 `signalsafe-v0.2.3-r1-hotfix3`，CI 會檢查預快取資產存在。
- Production deployment `READY`；正式 alias 回 HTTP 200。
- Production `VERSION.json`、`bootstrap.mjs`、`sw.js` 可讀，版本皆指向 `0.2.3-usability-r1-hotfix3`／`2026-08-01-r1`。
- Production HTML 使用相對資產路徑，不再直接把 jsDelivr URL 寫進 HTML。

## 仍未證明／阻塞

| Gate | 狀態 | 原因 |
|---|---|---|
| Desktop 1440×900 真實 browser navigation | BLOCKED | 本執行環境無可用 JS browser |
| Mobile 390×844 真實 browser navigation | BLOCKED | 同上 |
| 90 秒快練 Production UI 3 題 | BLOCKED | 必須在正式 UI 真跑 |
| Pre → Training → Post 24 題 | BLOCKED | 必須在正式 UI 真跑 |
| Pause / resume | BLOCKED | 必須驗證瀏覽器狀態 |
| Emergency UI | BLOCKED | 程式碼可稽核，但未真實互動 |
| Dashboard UI | BLOCKED | 計算單元測試 PASS，但未真實渲染 |
| Export / import / clear UI | BLOCKED | 函式與 schema QA PASS，但未真實瀏覽器操作 |
| Refresh / persistence | BLOCKED | `localStorage` 行為需真實瀏覽器驗證 |
| Service Worker / offline | BLOCKED | SW 與資產存在，但未完成 install → reload → offline 測試 |
| Console / uncaught runtime exception | BLOCKED | 無真實 browser console |
| Accessibility / 44px target / overflow | BLOCKED | CSS 可稽核，但需實際 viewport 與鍵盤檢查 |
| Manual question-bank semantic review | PENDING | 自動 QA 不能取代人工語意、難度與教育品質審查 |

## Deployment architecture

Production 現在由 Vercel 同源 URL 對應到固定 Git SHA `fd8655b...` 的靜態檔；前端 HTML 與資產引用皆為相對路徑。這消除了先前 `payload → decompress → eval` 的 client runtime reconstruction，也避免 HTML 直接載入外部 CDN URL。

但 Vercel rewrite 的上游仍是 jsDelivr，因此**首次網路載入仍依賴外部 CDN**。這不是完整 self-contained deployment。Service Worker 理論上可在首次成功載入後快取核心資產，但本次沒有真實 browser/offline 證據，故 offline 不得標示 PASS。

## 歷史證據修正

- `71 PASS / 0 FAIL` 只代表當時的 core/browser-engine QA，不能再寫成 Production navigation PASS。
- 2026-08-01 真實 Chrome 正式啟動失敗事故保留，不刪除、不改寫。
- `0.2.0` 與 `0.2.1-hotfix1` 的舊版本仍作為歷史事故與修正證據。
- 本輪 `0.2.3-hotfix3` 只代表新的 pre-freeze candidate，不代表 Round 1 已凍結。

## 解除 blocker 的唯一下一個 Gate

使用一般 Chrome／Chromium 直接開正式 URL，至少完成：首頁、頁尾版本、3 題快練、refresh、完整 assessment、pause/resume、急救、資料匯出/匯入/清除、Desktop/Mobile responsive、console、Service Worker offline。全部無 P0/P1 後，才可把 `round-1-pre-freeze-candidate` 改成 `Round 1 FROZEN` 並開始 UT001–UT004。
