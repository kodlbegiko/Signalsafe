# SignalSafe

SignalSafe 是一套面向 **16–18 歲高中階段學生**的防詐安全決策訓練系統。

> **不是替你猜真假，而是訓練你在關鍵時刻做對下一步。**

本 Repository 是產品原型、題庫、研究、部署、證據、競賽文件與匿名研究模板的公開單一事實來源。公開宣稱以「目前版本 + 明確證據邊界」為準；歷史版本的技術證據會保留，但不會拿來冒充目前研究成效。

## 現行產品規格

| 項目 | 現行決策 |
|---|---|
| 目標族群 | 16–18 歲高中階段學生 |
| 產品核心 | 防詐安全決策訓練／決策診斷，不做訊息真假裁判 |
| Training | 情境 → judgment → safe action → signal → feedback；核心口訣為「停、找、換」 |
| 3 題快練 | 每題練習最安全行動＋一個最重要風險訊號 |
| 正式研究題庫 | Pre 8／Training 8／Post 8，共 24 題；版本化管理 |
| 急救 / Rescue | 先停止新增高風險操作，再依已發生階段分流，回到獨立官方管道查證 |
| 診斷 | 分開看 judgment、action、signal，可區分安全行動不足與關鍵訊號辨識不足等錯因 |
| 資料 | Dashboard、本機匿名紀錄、JSON／CSV export、JSON import、clear local data |
| 資料原則 | 不登入、不收姓名／學校／聯絡方式；本機匿名優先 |
| 教育成效 | **尚未證明**；exploratory usability 或 task completion 不能等同 learning effect |

## 2026-08-17 Exploratory Usability Observation

2026-08-17 已完成一輪**探索性真人可用性操作（exploratory usability observation）**：

- 參與者：3 位，皆為 18 歲，位於 SignalSafe 16–18 歲目標使用者範圍內。
- 任務：每人 5 個核心任務——開始快練、完成 3 題、查看結果、找到急救功能、回到首頁。
- 結果：**15/15 核心任務完成**。
- 主持人介入：**0/15**。

這輪觀察支持的證據範圍只有：

- usability；
- task completion；
- navigation / interaction feasibility；
- design iteration。

它**不建立** learning effectiveness、scam-prevention effectiveness、unseen-scenario transfer、Day-7 retention、reduction in victimization、statistical significance 或任何正式教育成效結論。

本次真人操作直接造成三項產品修改：

1. 產品定位改為「安全決策訓練」。
2. 快練入口前移。
3. 英文介面改成白話。

完整 evidence boundary：[`docs/research/usability/EXPLORATORY_USABILITY_2026-08-17.md`](docs/research/usability/EXPLORATORY_USABILITY_2026-08-17.md)。

> **Formal scored Round 1 remains NOT STARTED.** `UT001–UT004` 仍是正式研究模板／正式 Round 1 資料位置，狀態維持 `not_started`；2026-08-17 exploratory observation 不會填入這些檔案，也不會混入 formal scored study。

## Current V2.1 engineering / runtime status

目前 V2.1 的 engineering acceptance 狀態仍是 **PARTIALLY ACCEPTED**；詳見 [`PROJECT_STATUS.md`](PROJECT_STATUS.md)。這個狀態和 2026-08-17 exploratory usability observation 是兩種不同證據：前者是技術／部署／runtime acceptance，後者是小樣本可用性觀察。

目前公開 source 的 QA：

- `npm run check`：PASS（2026-08-22 重新執行）。
- `npm test`：**112/112 PASS**（2026-08-22 重新執行；Node 22）。
- 24 題正式研究題庫結構可由 `prototype/questions.mjs` 與 `prototype/question-data/` 追溯。
- JSON／CSV、Dashboard、Emergency / Rescue、research control 與版本化研究資料流程皆有 repository source / tests。

目前仍有 technical acceptance 邊界：V2.1 的真實 production browser / PWA runtime smoke、部分 accessibility runtime acceptance、Vercel automatic deployment recovery 與正式 performance measurement 尚未完全閉環。不要把 static checks、HTTP 200 或舊版 browser acceptance 改寫成目前 V2.1 全面 runtime acceptance。

## Historical 0.2.4 technical browser freeze — preserved evidence

以下是 **2026-08-09、0.2.4-usability-r1-hotfix4 的歷史技術證據**，保留供追溯；它不是目前 V2.1 的 acceptance 狀態，也不是真人研究成效：

- App：`0.2.4-usability-r1-hotfix4`
- Question Bank：`2026-08-01-r1`
- Main source SHA：`c5e72268e2e0aee28b1d343588ef333101c14dbb`
- Production：`https://signalsafe-v02-usability-r1.vercel.app`
- Production deployment：`dpl_ioSgKN2uAvTEujYujsCi959FXRwd` (`READY`)
- Main technical CI：Actions run #26 — `success`
- Runtime test artifact：**33/33 PASS**（historical 0.2.4 suite）

該版曾以 fresh Playwright Chromium 驗證 Desktop/Mobile、Quick、Assessment smoke、Emergency、Dashboard/Data、normal persistence、keyboard/focus、JSON/CSV downloads、Export→Clear→Import、Service Worker 與 offline reload。完整歷史 evidence 見 [`PRODUCTION_BROWSER_ACCEPTANCE_2026-08-09.md`](docs/research/usability/PRODUCTION_BROWSER_ACCEPTANCE_2026-08-09.md)。

這段只代表當時指定版本的技術驗收；**不得外推成目前 V2.1 已全面完成 production browser / PWA acceptance。**

## 題庫語意 QA

AI-assisted 24 題逐題 review 的修正後 item-level 統計：

- 11 PASS
- 10 WARN
- 3 FAIL

3 個 P1 FAIL：`train-04`、`train-08`、`post-08`。沒有為了讓結果變綠而靜默修改答案；正式反詐／領域專家 review **尚未完成**。若人工審查決定修改 classification 或 construct，需評估 Question Bank 升版。

詳見 [`docs/research/usability/QUESTION_BANK_SEMANTIC_REVIEW_2026-08-08.md`](docs/research/usability/QUESTION_BANK_SEMANTIC_REVIEW_2026-08-08.md)。

## 核心功能與公開證據

- 3 題快練：安全行動＋單一關鍵訊號。
- 完整能力練習：Pre 8／Training 8／Post 8。
- Training Mode：以「停、找、換」將停手、找訊號、換官方管道轉成可操作決策。
- 急救 / Rescue：先停止高風險操作，再依 before-action / post-action 狀態分流並導向官方查證。
- 三層作答：judgment、action、signal；正式研究另記 confidence。
- Dashboard：安全行動、judgment calibration、signal evidence、blind spots 等分開呈現，不用單一總分宣稱「會不會防詐」。
- JSON／CSV export、JSON import、clear local data。
- 匿名本機儲存；localStorage 被阻擋時只用暫時記憶體並明確提示。
- PWA / Service Worker source 已具備；目前 V2.1 production runtime acceptance 邊界以 `PROJECT_STATUS.md` 為準。

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

GitHub Actions 會驗證 syntax、版本一致性、Service Worker assets、anti-gaming、export schema、PII header、static accessibility、V2.1 integrity contracts 與題庫 semantic-integrity guardrails，並產出靜態 prototype artifact。

## Formal Round 1 資料

- [`data/usability/round-1/`](data/usability/round-1/)：UT001–UT004 正式 Round 1 匿名模板與 schema。
- [`docs/research/usability/TEST_DAY_CHECKLIST_v0.2-r1.md`](docs/research/usability/TEST_DAY_CHECKLIST_v0.2-r1.md)：正式測試日清單。

四個 UT 檔目前均為 `not_started`，不是 2026-08-17 exploratory observation 的資料，也不是已完成的正式受測資料。

## Repository 導覽

- [`PROJECT_STATUS.md`](PROJECT_STATUS.md)：目前狀態與 blocker。
- [`docs/research/usability/EXPLORATORY_USABILITY_2026-08-17.md`](docs/research/usability/EXPLORATORY_USABILITY_2026-08-17.md)：2026-08-17 探索性真人可用性證據與邊界。
- [`data/usability/round-1/README.md`](data/usability/round-1/README.md)：formal Round 1 資料邊界。
- [`ROADMAP.md`](ROADMAP.md)：交付順序。
- [`docs/research/usability/PRE_USABILITY_FREEZE_AUDIT_2026-08-08.md`](docs/research/usability/PRE_USABILITY_FREEZE_AUDIT_2026-08-08.md)：pre-freeze audit。
- [`docs/research/usability/QUESTION_BANK_SEMANTIC_REVIEW_2026-08-08.md`](docs/research/usability/QUESTION_BANK_SEMANTIC_REVIEW_2026-08-08.md)：24 題語意 review。
- [`docs/research/usability/QUESTION_BANK_AUDIT_2026-08-08.json`](docs/research/usability/QUESTION_BANK_AUDIT_2026-08-08.json)：machine-readable 題庫結構稽核。
- [`privacy/data-handling-policy.md`](privacy/data-handling-policy.md)：公開資料與隱私政策。

## 歷史證據邊界

`0.2.0-usability-r1` 曾在真實 Chrome 顯示「SignalSafe 無法啟動」。先前的 `71 PASS / 0 FAIL` 只能代表 core/browser-engine QA，不能改寫成當時 Production navigation PASS。歷史事故保留，不因後續修復而刪除。

## Future validation / 尚未完成

- Formal scored Round 1（UT001–UT004）。
- Round 1 fixes → UT005–UT012 Round 2。
- 正式 learning-effect before/after evidence。
- 20–40 人初步成效驗證。
- unseen-scenario transfer validation。
- Day-7 retention test。
- 題庫 `risk`／`insufficient` taxonomy 的正式人工領域／專家 review 與既有 P1 resolution。
- V2.1 production browser / PWA runtime acceptance、部分 accessibility runtime acceptance、deployment automation 與 performance measurement。

## 不可宣稱

目前不能聲稱：

- 2026-08-17 exploratory usability 就是 Formal Round 1；
- 已證明提升防詐能力或降低受騙率；
- 已證明 learning effect、unseen-scenario transfer 或 Day-7 retention；
- 有統計顯著改善；
- 正式題庫已完成人工專家核可；
- planned adaptive question selection 已完成；
- 90 秒／3 題是最佳訓練長度；
- 適合所有高中生；
- 優於 165、Whoscall、Google Messages 等成熟工具；
- 舊版 0.2.4 browser acceptance 等同目前 V2.1 全面 runtime acceptance。
