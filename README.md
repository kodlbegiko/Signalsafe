# SignalSafe

SignalSafe 是一套面向 **16–18 歲高中階段學生**的防詐決策訓練系統。

> **不是替你猜真假，而是訓練你在關鍵時刻做對下一步。**

本 Repository 是產品原型、題庫、研究、部署、證據、競賽文件與匿名可用性測試模板的單一事實來源。

## 現行產品規格

| 項目 | 現行決策 |
|---|---|
| 目標族群 | 16–18 歲高中階段學生 |
| 產品核心 | 防詐決策訓練，不做訊息真假裁判 |
| 90 秒快練 | 每題只選最安全行動＋一個最重要風險訊號 |
| 研究模式 | 安全行動＋三分類＋證據＋自信；Pre 8／Training 8／Post 8 |
| 題庫平衡 | 每階段 Risk 3／Insufficient 2／Trusted 3 |
| 急救模式 | 先停止高風險操作，再改走獨立官方查證 |
| 資料原則 | 不登入、不收姓名／學校／聯絡方式；本機匿名優先 |
| 教育成效 | 尚未證明；可用性測試不能等同教育成效 |

## Round 1 pre-freeze candidate

- App：`0.2.4-usability-r1-hotfix4`
- Question Bank：`2026-08-01-r1`
- Runtime source SHA：`3cecb0d3b0eea53ff65839e4241cd5043e1aee7a`
- Production：https://signalsafe-v02-usability-r1.vercel.app
- Production deployment：`dpl_F7Euc7qTtUvqKKPaM6f5iwq6m5mP`
- Main technical CI：Actions run #26 — `success`
- Runtime test artifact：33/33 PASS
- 狀態：**BLOCKED — DO NOT START HUMAN TESTING**

目前有兩類正式 blocker：

1. **題庫 P1 語意效度**：`train-04`、`train-08`、`post-08` 的 `risk`／`insufficient` 邊界尚未由人工領域審查者定案。
2. **Production real-browser Gate**：Desktop／Mobile、完整互動、refresh/persistence、console、真實 focus traversal 與 Service Worker offline 尚未取得 L4 證據。

HTTP 200、Vercel `READY`、CI 或 source inspection 都不能替代真實瀏覽器 Gate。

## 已完成的工程／靜態 QA

- `npm run check` PASS
- runtime `npm test`：33/33 PASS
- 24 題結構、3/2/3 分布、unique IDs PASS
- Anti-gaming PASS
- JSON export required fields PASS
- CSV direct-PII header audit PASS
- Service Worker asset/reference audit PASS
- static Accessibility guardrails：focus、44px、keyboard-focusable import、ARIA states/progress/status、reduced motion、contrast PASS
- memory fallback 不再偽裝成持久儲存
- Production `VERSION.json`／`bootstrap.mjs`／`sw.js` HTTP 200
- Production entry HTML 已確認為 `text/html; charset=utf-8`
- module JavaScript 與 CSS MIME type 正確
- Production runtime 由 immutable Git SHA `3cecb0d...` 固定

## 題庫語意 QA

AI-assisted 24 題逐題 review 的**修正後** item-level 統計：

- 11 PASS
- 10 WARN
- 3 FAIL

3 個 P1 FAIL：`train-04`、`train-08`、`post-08`。沒有為了讓結果變綠而靜默修改答案；若人工審查決定修改 classification 或 construct，需評估 Question Bank 升版。

詳見 [`docs/research/usability/QUESTION_BANK_SEMANTIC_REVIEW_2026-08-08.md`](docs/research/usability/QUESTION_BANK_SEMANTIC_REVIEW_2026-08-08.md)。

## 已知部署限制

Production 由 Vercel 同源路徑 rewrite 到固定 Git SHA 的 jsDelivr 靜態檔。瀏覽器看到的資產 URL 是 Production origin 相對路徑，但**首次載入仍依賴外部 CDN**，所以不能宣稱 fully self-contained 或 offline 已通過。

本輪曾發現 external rewrite 首頁回 `Content-Type: text/plain`；已透過 Production header 修正並重新驗證為 `text/html; charset=utf-8`。這仍只是 HTTP 層證據，不等於 JavaScript 已在真實瀏覽器成功執行。

## 核心功能

- 90 秒快練：3 題，安全行動＋單一關鍵訊號
- 完整能力測驗：Pre 8／Training 8／Post 8
- 急救模式：只做停手與獨立查證
- 儀表板：安全行動、macro recall、Trusted false-positive、高自信錯誤、signal F1、blind spots
- JSON／CSV export、JSON import、clear local data
- 匿名本機儲存；localStorage 被阻擋時只用暫時記憶體並明確提示
- PWA / Service Worker source 已具備，但 Production offline 尚未真實驗收

## 本機執行

```bash
python3 -m http.server 4173 -d prototype
```

開啟 `http://localhost:4173`。

## 自動 QA

```bash
npm run check
npm test
```

GitHub Actions 會驗證 syntax、版本一致性、Service Worker assets、anti-gaming、export schema、PII header、static accessibility 與題庫 semantic-integrity guardrails，並產出靜態 prototype artifact。

## Round 1 執行資料

- [`data/usability/round-1/`](data/usability/round-1/)：UT001–UT004 匿名空白模板與 schema
- [`docs/research/usability/TEST_DAY_CHECKLIST_v0.2-r1.md`](docs/research/usability/TEST_DAY_CHECKLIST_v0.2-r1.md)：測試日清單

四個 UT 檔目前均為 `not_started`，不是正式受測資料。

## Repository 導覽

- [`PROJECT_STATUS.md`](PROJECT_STATUS.md)：目前狀態與 blocker
- [`ROADMAP.md`](ROADMAP.md)：交付順序
- [`docs/research/usability/PRE_USABILITY_FREEZE_AUDIT_2026-08-08.md`](docs/research/usability/PRE_USABILITY_FREEZE_AUDIT_2026-08-08.md)：權威 pre-freeze audit
- [`docs/research/usability/STATIC_UI_ACCESSIBILITY_AUDIT_2026-08-08.md`](docs/research/usability/STATIC_UI_ACCESSIBILITY_AUDIT_2026-08-08.md)：靜態 UI / Accessibility audit
- [`docs/research/usability/QUESTION_BANK_SEMANTIC_REVIEW_2026-08-08.md`](docs/research/usability/QUESTION_BANK_SEMANTIC_REVIEW_2026-08-08.md)：24 題語意 review
- [`docs/research/usability/QUESTION_BANK_AUDIT_2026-08-08.json`](docs/research/usability/QUESTION_BANK_AUDIT_2026-08-08.json)：machine-readable 題庫結構稽核
- [`docs/competition/SEMIFINAL_DECK_DRAFT_ANSVA.md`](docs/competition/SEMIFINAL_DECK_DRAFT_ANSVA.md)：複賽簡報初稿
- [`privacy/data-handling-policy.md`](privacy/data-handling-policy.md)：公開資料與隱私政策

## 歷史證據邊界

`0.2.0-usability-r1` 曾在真實 Chrome 顯示「SignalSafe 無法啟動」。先前的 `71 PASS / 0 FAIL` 只能代表 core/browser-engine QA，不能再寫成 Production navigation PASS。歷史事故不得刪除或改寫成沒有發生。

## 目前尚未完成

- 題庫 `risk`／`insufficient` taxonomy 的人工領域審查與 3 個 P1 resolution
- 正式 Production 的真實 Chrome／Chromium Desktop＋Mobile Gate
- Service Worker install → reload → offline real-browser Gate
- UT001–UT004 Round 1
- Round 1 fixes → UT005–UT012 Round 2
- 真實 before/after evidence 與使用者原話
- 20–40 人初步成效驗證
- 第 7 天 retention test

## 不可宣稱

目前不能聲稱 Round 1 已凍結、正式瀏覽器驗收已完成、題庫已經人工專家核可、已提升防詐能力、降低受騙率、90 秒是最佳訓練長度、適合所有高中生、第 7 天仍保留效果，或優於 165、Whoscall、Google Messages 等成熟工具。
