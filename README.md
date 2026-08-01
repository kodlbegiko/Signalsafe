# SignalSafe

SignalSafe 是一套面向 **16–18 歲高中階段學生**的防詐決策訓練系統。

> **不是替你猜真假，而是訓練你在關鍵時刻做對下一步。**

本 Repository 是 SignalSafe 的單一事實來源，集中管理產品規格、證據、使用者研究、複賽作業、測試計畫、視覺資產與答辯材料。

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

## Repository 導覽

### 專案與規格

- [`PROJECT_STATUS.md`](PROJECT_STATUS.md)：目前完成度、唯一核心阻塞與下一步
- [`DECISIONS.md`](DECISIONS.md)：凍結決策與舊版差異
- [`ROADMAP.md`](ROADMAP.md)：從現在到複賽繳件的順序
- [`docs/SIGNALSAFE_CANONICAL_DOSSIER.md`](docs/SIGNALSAFE_CANONICAL_DOSSIER.md)：產品、證據、研究與競賽故事總檔
- [`docs/MEETING_RECORDS.md`](docs/MEETING_RECORDS.md)：三次導師會議紀錄

### 複賽作業與圖片

- [`docs/assignments/README.md`](docs/assignments/README.md)：作業一至四文件與完成狀態
- [`assets/assignments/README.md`](assets/assignments/README.md)：13 張作業分支及結果模板 SVG
- [`docs/evidence/ASSIGNMENT_3_CASE_SOURCE_CARDS.md`](docs/evidence/ASSIGNMENT_3_CASE_SOURCE_CARDS.md)：165、Whoscall、Google Messages 來源卡
- [`docs/competition/SEMIFINAL_DECK_DRAFT_ANSVA.md`](docs/competition/SEMIFINAL_DECK_DRAFT_ANSVA.md)：20 頁 ANSVA 複賽簡報初稿

### 測試與教材

- [`docs/research/usability/README.md`](docs/research/usability/README.md)：8–12 人兩輪可用性測試執行包
- [`docs/reference-materials/2026-SFT-semifinal-coaching-materials.md`](docs/reference-materials/2026-SFT-semifinal-coaching-materials.md)：45 頁輔導教材來源索引與作業要求對照
- [`privacy/data-handling-policy.md`](privacy/data-handling-policy.md)：公開資料與隱私規則
- [`data/pilot/pilot-summary.csv`](data/pilot/pilot-summary.csv)：第一輪匿名彙總資料

## 已部署原型

- Web prototype: https://signalsafe-pwa.vercel.app/

> 舊部署版本只作為歷史原型與修改前對照。正式測試必須使用依現行規格重建或改版、並完成版本凍結的 16–18 歲新版原型。

## 目前狀態

已完成：

- 作業一至三的文字與分支圖片
- 作業三來源卡、15 個創意點子、收斂方案、六構面與故事版
- 作業四測試準備包及三張結果模板
- ANSVA 複賽簡報文字初稿

尚未完成：

- 16–18 歲新版原型與題庫版本凍結
- 8–12 位目標學生可用性測試
- 修改前後真實證據
- 20–40 人初步成效驗證及第 7 天後測

## 證據邊界

目前不能宣稱 SignalSafe 已降低真實受騙率、90 秒是最佳長度、適合所有高中生或教育成效可長期保留。

## 公開資料政策

本 Repository 不收錄受訪者姓名對照、未成年人聯絡資料、原始會議錄音、可辨識個人的影像／聲音，以及未經確認的原始轉錄資料。
