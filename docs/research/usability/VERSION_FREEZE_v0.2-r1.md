# SignalSafe v0.2 Usability Round 1 正式凍結紀錄

更新日期：2026-08-01

## 凍結結論

狀態：**Round 1 技術凍結完成**

此版本可供 UT001–UT004 使用。Round 1 開始後，不得任意修改核心流程、題庫或評分規則。

## 固定版本

| 項目 | 固定值 |
|---|---|
| App | `0.2.0-usability-r1` |
| 題庫 | `2026-08-01-r1` |
| 開發分支 | `product/v0.2-usability-r1` |
| 合併 PR | #28 |
| Git implementation commit | `5933fee58eeefae737fb8cabd5a70f1f039cbcac` |
| Vercel deployment ID | `dpl_6REA4HsmvW5rhSYe5Y1JPLoaZdyA` |
| 正式測試網址 | https://signalsafe-v02-usability-r1.vercel.app |
| 部署原型 SHA-256 | `16092f8aba7191969378c59c370a32d3090ae01ea186139df50bd89e8fd2a279` |

## 固定規格

- 目標族群：16–18 歲高中階段學生
- 首頁主要入口：開始 90 秒快練
- 快練：3 題，只回答最安全行動與一個最重要訊號
- 研究模式：前測 8 題、訓練 8 題、後測 8 題
- 每個 8 題階段分布：3 題明顯風險、2 題資訊不足、3 題目前較可信
- 急救模式：只提供停手與獨立查證，不判定真假
- 資料：不登入、不收姓名學校、本機匿名保存
- 評分：安全行動、macro recall、較可信誤判、高自信錯誤與訊號 F1；速度不加分

## 自動驗證證據

GitHub Actions run：`Prototype checks #1`

- syntax check：PASS
- scoring tests：PASS
- 全選高風險校準防呆：PASS
- 24 題唯一 ID：PASS
- 前測／訓練／後測各 8 題：PASS
- 各階段 3／2／3 分布：PASS
- 模組入口、CSS 與 service worker 資產 wiring：PASS

## 部署與互動驗收

完整報告：[`ACCEPTANCE_REPORT_v0.2-r1.md`](ACCEPTANCE_REPORT_v0.2-r1.md)

- 技術檢查：71 PASS／0 FAIL
- Vercel production：READY
- 根路徑、Service Worker、首尾 payload：HTTP 200
- 首頁與定位：PASS
- 90 秒快練三題：PASS
- 急救模式：PASS
- 前測／訓練／後測共 24 題：PASS
- 暫停與恢復：PASS
- JSON／CSV 匯出：PASS
- JSON 匯入：PASS
- 清除本機資料：PASS
- 390px viewport：PASS
- 未捕捉 JavaScript 例外：0
- console error：0
- P0：0
- P1：0

## Freeze Gate

- [x] GitHub Actions syntax check 通過
- [x] scoring tests 通過
- [x] 24 題數量與 3／2／3 分布測試通過
- [x] 原型程式碼合併至 `main`
- [x] Vercel production 部署成功
- [x] 桌面核心流程完成瀏覽器驗收
- [x] 390px 手機 viewport 無水平溢出，核心 CTA 尺寸通過
- [x] JSON／CSV 匯出、JSON 匯入及清除資料通過
- [x] Service Worker 預快取及離線資產完整性通過
- [x] 確認無 P0 隱私或安全問題
- [x] 記錄正式測試 URL、Git commit、deployment ID 與 SHA-256

## 實體裝置場務確認

驗收執行環境的 Chromium 受組織 URLBlocklist 管理，因此沒有宣稱已在實體手機完成斷網重開。UT001–UT004 開始前，主持人應以實際使用裝置做一次 3–5 分鐘 spot-check：

1. 開啟正式網址。
2. 完成一題快練。
3. 確認字體、捲動與按鈕正常。
4. 確認場地網路可用。

此項是現場場務確認，不是程式版本阻塞。若 spot-check 發現 P0 或 P1，必須停測、更新版本並建立新凍結紀錄。

## 凍結後修改規則

Round 1 開始後，只有以下情況可修改：

1. P0 隱私、安全或危險操作問題。
2. P1 核心任務阻塞。
3. Round 1 重複出現且事前規則要求處理的 P2。

任何修改都必須更新 App 版本、題庫版本、Git commit、deployment ID 與測試紀錄，不得將不同版本資料直接合併。

## 證據邊界

此版本只用於可用性測試。技術凍結與可用性測試即使通過，也不能宣稱已提升防詐能力或降低真實受騙率。
