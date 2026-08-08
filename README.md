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

- App：`0.2.3-usability-r1-hotfix3`
- Question Bank：`2026-08-01-r1`
- Runtime source SHA：`fd8655b18c807221feea23cd8754a665e9298414`
- Production：https://signalsafe-v02-usability-r1.vercel.app
- Production deployment：`dpl_ES53zV4bght2rBx4rCSJhyCTCCFN`
- Main CI：Actions run #18 — `success`
- 狀態：**BLOCKED — DO NOT START HUMAN TESTING**

阻塞原因：目前缺正式 Production URL 的真實 Chrome／Chromium Desktop＋Mobile 互動驗收、refresh/persistence、console/runtime exception 與 Service Worker/offline 證據。HTTP 200、Vercel `READY` 與單元測試都不能替代這個 Gate。

### 已完成的工程驗證

- `npm run check` PASS
- `npm test` PASS
- 24 題題庫與 3／2／3 分布 PASS
- Anti-gaming PASS
- JSON export required fields PASS
- CSV direct-PII header audit PASS
- Service Worker asset/reference audit PASS
- Production `VERSION.json`／`bootstrap.mjs`／`sw.js` HTTP 200
- Production HTML 使用相對資產路徑，不再使用 client `payload → decompress → eval`

### 已知部署限制

Production 目前由 Vercel 同源路徑 rewrite 到固定 Git SHA 的 jsDelivr 靜態檔。瀏覽器頁面與資產 URL 皆為 Production origin 路徑，但**首次網路載入仍依賴外部 CDN**，所以不能宣稱 fully self-contained 或 offline 已通過。Service Worker/offline 必須在真實 browser 再驗證。

## 歷史證據邊界

`0.2.0-usability-r1` 曾在真實 Chrome 顯示「SignalSafe 無法啟動」。先前的 `71 PASS / 0 FAIL` 只能代表 core/browser-engine QA，不能再寫成 Production navigation PASS。事故與修正紀錄永久保留：

- [`docs/research/usability/INCIDENT_2026-08-01_LIVE_STARTUP.md`](docs/research/usability/INCIDENT_2026-08-01_LIVE_STARTUP.md)
- [`docs/research/usability/ACCEPTANCE_REPORT_v0.2-r1.md`](docs/research/usability/ACCEPTANCE_REPORT_v0.2-r1.md)
- [`docs/research/usability/VERSION_FREEZE_v0.2-r1.md`](docs/research/usability/VERSION_FREEZE_v0.2-r1.md)
- [`docs/research/usability/PRE_USABILITY_FREEZE_AUDIT_2026-08-08.md`](docs/research/usability/PRE_USABILITY_FREEZE_AUDIT_2026-08-08.md)

## 核心功能

- 90 秒快練：3 題，安全行動＋單一關鍵訊號
- 完整能力測驗：Pre 8／Training 8／Post 8
- 24 題合成情境與 balanced three-class design
- 急救模式：只做停手與獨立查證
- 儀表板：安全行動、macro recall、Trusted false-positive、高自信錯誤、signal F1、blind spots
- JSON／CSV export、JSON import、clear local data
- 匿名本機儲存；localStorage 被阻擋時只用暫時記憶體並明確提示
- PWA / Service Worker source 已具備，但 production offline 尚未真實驗收

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

GitHub Actions 會另外驗證版本一致性、Production artifact reference、Service Worker assets、anti-gaming、export schema 與直接識別欄位。

## Round 1 執行資料

- [`data/usability/round-1/`](data/usability/round-1/)：UT001–UT004 匿名空白模板與 schema
- [`docs/research/usability/ROUND_1_TEST_DAY_CHECKLIST.md`](docs/research/usability/ROUND_1_TEST_DAY_CHECKLIST.md)：測試日清單

目前四個 UT 檔均為 `not_started`，不是正式受測資料。

## Repository 導覽

- [`PROJECT_STATUS.md`](PROJECT_STATUS.md)：目前狀態與 blocker
- [`ROADMAP.md`](ROADMAP.md)：交付順序
- [`docs/SIGNALSAFE_CANONICAL_DOSSIER.md`](docs/SIGNALSAFE_CANONICAL_DOSSIER.md)：總檔
- [`docs/competition/SEMIFINAL_DECK_DRAFT_ANSVA.md`](docs/competition/SEMIFINAL_DECK_DRAFT_ANSVA.md)：複賽簡報初稿
- [`docs/research/usability/QUESTION_BANK_AUDIT_2026-08-08.json`](docs/research/usability/QUESTION_BANK_AUDIT_2026-08-08.json)：machine-readable 題庫稽核
- [`privacy/data-handling-policy.md`](privacy/data-handling-policy.md)：公開資料與隱私政策

## 目前尚未完成

- 正式 Production 的真實 Chrome／Chromium Desktop＋Mobile Gate
- UT001–UT004 Round 1
- Round 1 fixes → UT005–UT012 Round 2
- 真實 before/after evidence 與使用者原話
- 20–40 人初步成效驗證
- 第 7 天 retention test

## 不可宣稱

目前不能聲稱已提升防詐能力、降低受騙率、90 秒是最佳訓練長度、適合所有高中生、第 7 天仍保留效果，或優於 165、Whoscall、Google Messages 等成熟工具。
