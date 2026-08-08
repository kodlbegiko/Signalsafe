# SignalSafe Usability Round 1 版本凍結紀錄

更新日期：2026-08-08

## 現行狀態

**未凍結。**

候選 App：`0.2.3-usability-r1-hotfix3`  
Question Bank：`2026-08-01-r1`  
Runtime source SHA：`fd8655b18c807221feea23cd8754a665e9298414`  
Production deployment：`dpl_ES53zV4bght2rBx4rCSJhyCTCCFN`

目前結論：

> **BLOCKED — DO NOT START HUMAN TESTING**

原因不是 main CI 失敗；main Actions run #18 已成功。阻塞點是真實 Production Chrome／Chromium Desktop＋Mobile 互動 Gate、refresh/persistence、console 與 Service Worker offline 尚未取得證據。

## 已固定且本輪未改動

- 目標族群：16–18 歲高中階段學生
- 90 秒快練：3 題，只回答最安全行動與一個最重要訊號
- 研究模式：Pre 8／Training 8／Post 8
- 每階段：Risk 3／Insufficient 2／Trusted 3
- 急救模式：只做停手與獨立查證，不要求真實訊息、不做 AI 最終真假裁決
- Question Bank：`2026-08-01-r1`
- 評分權重與題目答案未因 hotfix3 變更

## Hotfix3 範圍

- App version 一致化
- Service Worker cache rotation
- `localStorage` 被阻擋時明示暫時記憶模式
- JSON export 頂層補足匿名 ID 與 sessions
- CI 加入版本、same-origin source reference、SW asset、anti-gaming、export schema、PII header 等 gate
- 建立 UT001–UT004 空白匿名模板與 test-day checklist

## Freeze Gate

- [x] main `npm run check`
- [x] main `npm test`
- [x] 題庫 24 題與 3/2/3 分布自動稽核
- [x] anti-gaming 自動測試
- [x] JSON／CSV schema 自動稽核
- [x] Production deployment `READY`
- [x] Production alias HTTP 200
- [x] Production `VERSION.json` 為 `0.2.3-usability-r1-hotfix3`／`2026-08-01-r1`
- [x] Production HTML 改為相對靜態資產路徑，不再使用 client payload→decompress→eval
- [ ] 真實 Desktop Chrome／Chromium navigation
- [ ] 真實 Mobile 390×844 navigation
- [ ] Production 90 秒快練完整 3 題
- [ ] Production 24 題 assessment
- [ ] Pause／resume
- [ ] Emergency UI
- [ ] Dashboard UI
- [ ] Export／import／clear 的瀏覽器操作
- [ ] Refresh／persistence
- [ ] Console 無 P0/P1 runtime exception
- [ ] Service Worker install／reload／offline
- [ ] Accessibility／overflow／44px target 實際 viewport audit
- [ ] 正式標記 `Round 1 FROZEN`

## Deployment limitation

Production front-end URL 現在是同源相對路徑，但 Vercel rewrite 上游仍鎖定 jsDelivr 上的 immutable Git SHA。因此首次載入仍需要網路與外部 CDN；真正 self-contained deployment 與 offline 行為尚未通過真實 browser Gate。

## 凍結後修改規則

Round 1 一旦開始，只處理 P0、P1，以及依事前規則需處理的重複 P2。任何改動都必須更新 App version、Git SHA、deployment ID 與驗收紀錄；題庫內容或答案沒變則 Question Bank version 不變。

## 證據邊界

版本凍結只代表可用性測試技術版本固定；不代表教育成效、長期保留、真實受騙率下降或優於成熟防詐工具。
