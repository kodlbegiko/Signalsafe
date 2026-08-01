# SignalSafe Usability Round 1 版本凍結紀錄

更新日期：2026-08-01

## 現行狀態

狀態：**`0.2.1-usability-r1-hotfix1` 凍結候選，等待原出錯裝置完成真實網址 Gate**

`0.2.0-usability-r1` 的正式凍結結論已撤回，原因是真實使用者 Chrome 顯示「SignalSafe 無法啟動」。詳見：

- [`INCIDENT_2026-08-01_LIVE_STARTUP.md`](INCIDENT_2026-08-01_LIVE_STARTUP.md)
- [`ACCEPTANCE_REPORT_v0.2-r1.md`](ACCEPTANCE_REPORT_v0.2-r1.md)

## 固定版本候選

| 項目 | 固定值 |
|---|---|
| App | `0.2.1-usability-r1-hotfix1` |
| 題庫 | `2026-08-01-r1` |
| 原型核心實作 | PR #28／`5933fee58eeefae737fb8cabd5a70f1f039cbcac` |
| Hotfix 分支 | `fix/v0.2.1-live-startup-hotfix` |
| 正式測試網址 | https://signalsafe-v02-usability-r1.vercel.app |
| 首次驗證網址 | https://signalsafe-v02-usability-r1.vercel.app/?v=021-hotfix1 |
| Hotfix deployment ID | `dpl_r8gnvR3XZ5rdrikE3KpBMVN94aD6` |

## 不變規格

- 目標族群：16–18 歲高中階段學生
- 首頁主要入口：開始 90 秒快練
- 快練：3 題，只回答最安全行動與一個最重要訊號
- 研究模式：前測 8 題、訓練 8 題、後測 8 題
- 每個 8 題階段分布：3 題明顯風險、2 題資訊不足、3 題目前較可信
- 急救模式：只提供停手與獨立查證，不判定真假
- 資料：不登入、不收姓名學校、本機匿名保存
- 評分：安全行動、macro recall、較可信誤判、高自信錯誤與訊號 F1；速度不加分

## Hotfix 範圍

本次只修正啟動與相容性：

- 新增瀏覽器 API 相容層
- `localStorage` 失敗時改用記憶體 fallback
- 旋轉 Service Worker cache 並改為 network-first
- App 版本更新

沒有修改：

- 題目內容
- 正確答案
- 評分權重
- 四項正式測試任務
- 目標族群與產品定位

## Freeze Gate

- [x] 原型核心 syntax、評分與題庫測試曾通過
- [x] 真實使用者回報正式網址啟動失敗並建立事件紀錄
- [x] Hotfix 已部署到正式 alias
- [x] 正式 alias 回傳新入口 HTTP 200
- [x] Hotfix 以相同 payload 在 Chromium 重建首頁成功
- [ ] Hotfix PR GitHub Actions 通過
- [ ] 原出錯 Chrome 開啟 cache-busted URL 成功
- [ ] 頁尾顯示 `0.2.1-usability-r1-hotfix1`
- [ ] 實際完成一題快練
- [ ] 重新整理後仍可正常開啟
- [ ] 正式標記 Round 1 freeze commit

## 凍結後修改規則

Round 1 開始後，只有以下情況可修改：

1. P0 隱私、安全或危險操作問題。
2. P1 核心任務阻塞。
3. Round 1 重複出現且事前規則要求處理的 P2。

任何修改都必須更新 App 版本、Git commit、deployment ID 與測試紀錄。題庫版本只有在題目或答案內容改動時才更新。

## 證據邊界

版本凍結只代表可用性測試的技術版本固定，不代表教育成效、長期保留或真實受騙率下降。
