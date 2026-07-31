# SignalSafe

SignalSafe 是一套面向 **16–18 歲高中階段學生**的防詐決策訓練系統。

> **不是替你猜真假，而是訓練你在關鍵時刻做對下一步。**

本 Repository 是 SignalSafe 的單一事實來源（Single Source of Truth），集中管理：

- 專案定位與凍結決策
- 權威證據與競品分析
- 使用者研究與探索性測試
- 產品規格與研究驗證計畫
- 三次導師會議紀錄
- Samsung Solve for Tomorrow 複賽作業與答辯素材
- 舊版規格及視覺素材的封存

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

- [`PROJECT_STATUS.md`](PROJECT_STATUS.md)：目前完成度、缺口與下一步
- [`DECISIONS.md`](DECISIONS.md)：凍結決策與舊版差異
- [`ROADMAP.md`](ROADMAP.md)：從現在到複賽繳件的執行順序
- [`docs/SIGNALSAFE_CANONICAL_DOSSIER.md`](docs/SIGNALSAFE_CANONICAL_DOSSIER.md)：現行產品、證據、研究與競賽故事總檔
- [`docs/MEETING_RECORDS.md`](docs/MEETING_RECORDS.md)：三次導師會議紀錄
- [`privacy/data-handling-policy.md`](privacy/data-handling-policy.md)：公開 Repository 的資料與隱私規則
- [`data/pilot/pilot-summary.csv`](data/pilot/pilot-summary.csv)：第一輪匿名彙總資料

## 已部署原型

- Web prototype: https://signalsafe-pwa.vercel.app/

> Repository 建立時尚未匯入該部署版本的原始碼。正式開發前應先取得目前部署版本的來源，或依現行規格重建後再部署。

## 目前證據邊界

目前已證明：

- 原型流程可操作
- 匿名作答資料可匯出
- 探索性測試可找出評分與互動漏洞
- 使用者對短時間、情境式、具體行動教學有初步需求

目前尚未證明：

- SignalSafe 能降低真實受騙率
- 90 秒是最佳訓練長度
- 產品已適合所有高中生
- 教育成效可長期保留
- 家庭擴散效果已成立

## 公開資料政策

本 Repository **不收錄**：

- 受訪者姓名與匿名編號對照
- 未成年人聯絡資料
- 原始會議錄音
- 可辨識個人的原始訪談影像或聲音
- 未經再次確認的聊天轉錄原始資料

詳見 [`privacy/data-handling-policy.md`](privacy/data-handling-policy.md)。
