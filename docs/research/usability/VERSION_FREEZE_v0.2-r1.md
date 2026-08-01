# SignalSafe v0.2 Usability Round 1 版本凍結候選

更新日期：2026-08-01

## 版本

- App：`0.2.0-usability-r1`
- 題庫：`2026-08-01-r1`
- 開發分支：`product/v0.2-usability-r1`
- 合併 PR：#28
- `main` 實作 commit：`5933fee58eeefae737fb8cabd5a70f1f039cbcac`
- 狀態：**程式候選版本完成；待部署與人工 smoke test 後正式凍結**

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

## 凍結前 Gate

- [x] GitHub Actions syntax check 通過
- [x] scoring tests 通過
- [x] 24 題數量與 3／2／3 分布測試通過
- [x] 原型程式碼合併至 `main`
- [ ] 新版正式／預覽部署成功
- [ ] 手機與桌面核心流程試跑
- [ ] JSON／CSV 匯出、JSON 匯入及清除資料試跑
- [ ] 離線重開試跑
- [ ] 確認無 P0 隱私或安全問題
- [ ] 記錄正式測試 URL 與最終 freeze commit

## 正式凍結後不可任意修改

Round 1 開始後，只有以下情況可修改：

1. P0 隱私、安全或危險操作問題。
2. P1 核心任務阻塞。
3. Round 1 重複出現且事前規則要求處理的 P2。

任何修改都必須更新版本、commit 與測試紀錄，不得將不同版本資料直接合併。

## 證據邊界

此版本只用於可用性測試。即使所有技術 Gate 通過，也不能宣稱已提升防詐能力或降低真實受騙率。
