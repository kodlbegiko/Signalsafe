# SignalSafe 專案狀態

更新日期：2026-08-01

## 目前階段

SignalSafe 已完成 16–18 歲新版原型的程式實作、自動檢查、GitHub 合併、Vercel production 部署與技術驗收。專案已從「部署與 smoke test」進入 **Round 1 真實目標族群可用性測試**階段。

## 完成度概覽

| 面向 | 狀態 | 備註 |
|---|---|---|
| 問題背景與競賽故事 | 已完成初稿 | 待真實測試結果同步 |
| 目標族群 | 已凍結 | 16–18 歲高中階段學生 |
| 作業一 | 內容與 3 張圖片完成 | 正式目標族群資料待作業四補強 |
| 作業二 | 內容與 2 張圖片完成 | Persona、洞察、POV、HMW 仍屬探索性 |
| 作業三 | 可直接完成部分已完成 | 三案來源卡、15 點子、方案、六構面、故事版及 4 張圖片 |
| 作業四準備 | 已完成 | 測試包、主持觀察、結果模板及簡報初稿 |
| 新版原型 | **完成** | `0.2.0-usability-r1` 已合併至 main |
| 自動 QA | **通過** | syntax、評分、題庫分布及資產 wiring tests 通過 |
| Production 部署 | **完成** | https://signalsafe-v02-usability-r1.vercel.app |
| 技術驗收 | **通過** | 71 PASS／0 FAIL；P0=0、P1=0 |
| Round 1 實測 | 尚未開始 | 下一步為 UT001–UT004 |
| 教育成效 | 尚未證明 | 可用性測試也不能直接證明教育成效 |

## 固定版本

- App：`0.2.0-usability-r1`
- 題庫：`2026-08-01-r1`
- Git implementation commit：`5933fee58eeefae737fb8cabd5a70f1f039cbcac`
- Vercel deployment：`dpl_6REA4HsmvW5rhSYe5Y1JPLoaZdyA`
- 正式網址：https://signalsafe-v02-usability-r1.vercel.app
- 部署原型 SHA-256：`16092f8aba7191969378c59c370a32d3090ae01ea186139df50bd89e8fd2a279`
- 驗收報告：[`docs/research/usability/ACCEPTANCE_REPORT_v0.2-r1.md`](docs/research/usability/ACCEPTANCE_REPORT_v0.2-r1.md)

## 新版原型已完成

- 首頁主要 CTA：「開始 90 秒快練」
- 快練：3 題，只選最安全行動與一個最重要訊號
- 完整能力測驗：前測 8 題、訓練 8 題、後測 8 題
- 每階段題目分布：3 題明顯風險、2 題資訊不足、3 題目前較可信
- 急救模式：停止高風險操作並改走獨立查證
- 儀表板：安全行動、macro recall、較可信誤判、高自信錯誤、訊號 F1 與盲點
- 本機匿名保存、JSON／CSV 匯出、JSON 匯入與清除資料
- PWA 及離線資產預快取
- 全部選高風險不能取得高校準分

## 已驗證

### GitHub Actions

- `npm run check`：PASS
- `npm test`：PASS
- scoring tests：通過
- 題庫：24 個唯一 ID，各階段 3／2／3 分布通過
- 模組入口、CSS 與 service worker wiring：通過

### Production 與互動驗收

- Vercel 狀態：`READY`
- 根路徑、Service Worker、首尾 payload：HTTP 200
- 首頁、90 秒快練、急救、完整 24 題測驗：PASS
- 暫停與恢復：PASS
- JSON／CSV 匯出、JSON 匯入、清除資料：PASS
- 390px viewport：無水平溢出，主要 CTA 高 54px
- 未捕捉 JavaScript 例外：0
- console error：0
- 部署 payload 可無損重建固定原型

## 現在的核心工作

> **不再是開發或部署，而是執行 UT001–UT004 Round 1，收集真實使用者阻塞與理解證據。**

## Round 1 前場務確認

正式受測前，只需在實際使用的手機完成一次 3–5 分鐘 spot-check：

1. 開啟正式網址。
2. 完成一題快練。
3. 確認按鈕、字體與捲動正常。
4. 切換網路後確認沒有明顯載入問題。
5. 不因此修改題庫、文案或核心流程。

此為現場裝置確認，不是程式開發阻塞。

## P1｜真實場域作業四

1. Round 1：UT001–UT004。
2. 集中修正 P0、P1 與重複 P2。
3. 建立修改前後證據並凍結 Round 2 版本。
4. Round 2：UT005–UT012。
5. 回填三張結果模板與匿名觀察紀錄。
6. 更新複賽簡報的測試結果與修改前後頁面。

## 證據邊界

目前可以說新版原型、正式部署與技術驗收已完成；不能說已完成目標族群可用性驗證、提升防詐能力或降低真實受騙率。
