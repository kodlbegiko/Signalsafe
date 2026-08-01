# SignalSafe

SignalSafe 是一套面向 **16–18 歲高中階段學生**的防詐決策訓練系統。

> **不是替你猜真假，而是訓練你在關鍵時刻做對下一步。**

本 Repository 是 SignalSafe 的單一事實來源，集中管理產品原型、規格、證據、使用者研究、複賽作業、測試計畫、視覺資產與答辯材料。

## 現行規格

| 項目 | 現行決策 |
|---|---|
| 目標族群 | 16–18 歲高中階段學生 |
| 產品核心 | 防詐決策訓練，不做訊息真假裁判 |
| 核心模式 | 90 秒快練 |
| 快練輸入 | 最安全行動＋一個最重要風險訊號 |
| 研究模式 | 安全行動＋三分類＋證據＋自信 |
| 急救模式 | 先停止高風險操作，再改走獨立官方查證 |
| AI 範圍 | 後台題庫與文字輔助，不作前台最終判定 |
| 資料原則 | 匿名、本機優先、姓名對照與作答資料分離 |
| 驗證順序 | 8–12 人可用性測試 → 20–40 人初步成效驗證 → 第 7 天延遲後測 |

## Round 1 正式原型

- 正式網址：https://signalsafe-v02-usability-r1.vercel.app
- App：`0.2.0-usability-r1`
- 題庫：`2026-08-01-r1`
- Git implementation commit：`5933fee58eeefae737fb8cabd5a70f1f039cbcac`
- Vercel deployment：`dpl_6REA4HsmvW5rhSYe5Y1JPLoaZdyA`
- 部署原型 SHA-256：`16092f8aba7191969378c59c370a32d3090ae01ea186139df50bd89e8fd2a279`
- 技術驗收：**71 PASS／0 FAIL**

完整證據：[`docs/research/usability/ACCEPTANCE_REPORT_v0.2-r1.md`](docs/research/usability/ACCEPTANCE_REPORT_v0.2-r1.md)

### 核心功能

- 90 秒快練：3 題，只選最安全行動與一個最重要訊號
- 完整能力測驗：前測 8 題、訓練 8 題、後測 8 題
- 24 題合成情境：每階段 3 題明顯風險、2 題資訊不足、3 題目前較可信
- 急救模式：只提供停手與獨立查證，不要求真實訊息、不作真假裁決
- 儀表板：安全行動、macro recall、較可信誤判、高自信錯誤、訊號 F1 與盲點
- JSON／CSV 匯出、JSON 匯入、清除本機資料
- 本機匿名保存、PWA 與離線資產快取
- 不需登入、不使用雲端 API

### 本機執行

```bash
python3 -m http.server 4173 -d prototype
```

再開啟 `http://localhost:4173`。

### 自動檢查

```bash
npm run check
npm test
```

PR #28 的 syntax check、評分測試、題庫分布及資產 wiring tests 均已通過。

## Repository 導覽

### 專案與規格

- [`PROJECT_STATUS.md`](PROJECT_STATUS.md)：目前完成度與下一步
- [`DECISIONS.md`](DECISIONS.md)：凍結決策與舊版差異
- [`ROADMAP.md`](ROADMAP.md)：從現在到複賽繳件的順序
- [`docs/SIGNALSAFE_CANONICAL_DOSSIER.md`](docs/SIGNALSAFE_CANONICAL_DOSSIER.md)：產品、證據、研究與競賽故事總檔
- [`docs/MEETING_RECORDS.md`](docs/MEETING_RECORDS.md)：三次導師會議紀錄

### 複賽作業與圖片

- [`docs/assignments/README.md`](docs/assignments/README.md)：作業一至四文件與完成狀態
- [`assets/assignments/README.md`](assets/assignments/README.md)：13 張作業分支及結果模板 SVG
- [`docs/evidence/ASSIGNMENT_3_CASE_SOURCE_CARDS.md`](docs/evidence/ASSIGNMENT_3_CASE_SOURCE_CARDS.md)：案例來源卡
- [`docs/competition/SEMIFINAL_DECK_DRAFT_ANSVA.md`](docs/competition/SEMIFINAL_DECK_DRAFT_ANSVA.md)：20 頁 ANSVA 複賽簡報初稿

### 測試與教材

- [`docs/research/usability/README.md`](docs/research/usability/README.md)：8–12 人兩輪可用性測試執行包
- [`docs/research/usability/VERSION_FREEZE_v0.2-r1.md`](docs/research/usability/VERSION_FREEZE_v0.2-r1.md)：Round 1 正式凍結紀錄
- [`docs/research/usability/ACCEPTANCE_REPORT_v0.2-r1.md`](docs/research/usability/ACCEPTANCE_REPORT_v0.2-r1.md)：部署與技術驗收
- [`docs/reference-materials/2026-SFT-semifinal-coaching-materials.md`](docs/reference-materials/2026-SFT-semifinal-coaching-materials.md)：輔導教材索引與要求對照
- [`privacy/data-handling-policy.md`](privacy/data-handling-policy.md)：公開資料與隱私規則

## 舊版部署

- Historical prototype：https://signalsafe-pwa.vercel.app/

舊 Vercel 版本只作為歷史原型與修改前對照，不得用於正式 16–18 歲可用性測試。

## 目前尚未完成

- UT001–UT004 第一輪可用性測試
- Round 1 修正與 UT005–UT012 第二輪測試
- 修改前後真實證據
- 20–40 人初步成效驗證及第 7 天後測

## 驗收邊界

新版已完成正式部署與瀏覽器技術驗收。受管驗收環境無法直接導航外部 URL，因此互動驗收使用正式部署 payload 無損重建出的相同 CSS／JavaScript；離線部分完成 Service Worker 預快取與資產完整性驗證，但不宣稱已在實體手機切斷網路後重開。

UT001–UT004 前仍應在實際使用裝置進行一次 3–5 分鐘場務 spot-check；不得因此臨時更改核心流程或題庫。

## 證據邊界

原型完成與技術驗收通過，不能被解讀為已降低真實受騙率、90 秒是最佳長度、適合所有高中生或教育成效可長期保留。

## 公開資料政策

本 Repository 不收錄受訪者姓名對照、未成年人聯絡資料、原始會議錄音、可辨識個人的影像／聲音，以及未經確認的原始轉錄資料。
