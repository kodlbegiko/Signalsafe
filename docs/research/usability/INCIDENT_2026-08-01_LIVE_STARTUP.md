# SignalSafe 正式部署啟動失敗事件紀錄

事件日期：2026-08-01  
最新追蹤：2026-08-08

## 事件摘要

使用者曾在正式網址開啟 SignalSafe v0.2.0 時看到：

> SignalSafe 無法啟動

因此，先前把 `0.2.0-usability-r1` 判定為「Round 1 技術凍結完成」的結論失效。當時的 71 項檢查只能證明核心 UI 與資料流程可在測試瀏覽器引擎執行，不能證明正式網址可在真實使用者瀏覽器啟動。

## 原始根因

當時正式部署使用多層動態載入：

1. 根頁面抓取 payload。
2. payload 重建內層 HTML。
3. 內層再解壓 CSS／JavaScript 並以 `eval` 啟動。

此外，測試環境對 `localStorage` 與 `crypto.randomUUID` 提供替代，因此未暴露正式啟動風險。

## 2026-08-01 修正

`0.2.1-usability-r1-hotfix1` 加入：

- Browser API compatibility layer
- `localStorage` 非致命 memory fallback
- Service Worker cache rotation／network-first
- 題庫、答案與評分規則不變

但依新的證據標準，仍必須用原本出錯類型的真實 Chrome 直接驗證 Production URL，不能只靠 payload 重建或 Chromium 測試引擎。

## 2026-08-08 追蹤修正

後續 `0.2.2` 移除 client-side payload reconstruction，`0.2.3-usability-r1-hotfix3` 進一步處理：

- App／package／Service Worker version consistency
- memory fallback 明確標示為暫時保存
- JSON export schema 補足頂層匿名 ID 與 sessions
- CI 加入 anti-gaming、version、asset、export、PII gate
- 正式 Production HTML 改為相對資產路徑

現行 runtime source SHA：`fd8655b18c807221feea23cd8754a665e9298414`  
現行 Production deployment：`dpl_ES53zV4bght2rBx4rCSJhyCTCCFN`

Production HTTP 已能讀取 `VERSION.json`、`bootstrap.mjs` 與 `sw.js`，但此次執行環境沒有可用的真實 JS browser，因此**事故不能被標記為已由真實 Chrome 最終關閉**。

另外，Vercel rewrite 上游仍鎖定 jsDelivr immutable Git SHA；首次載入仍依賴外部 CDN。這項限制必須保留，不能寫成 fully self-contained deployment。

## 流程修正（永久）

往後部署驗收不得只依賴 HTTP 200、Vercel `READY`、雜湊一致、注入式頁面、mock 或測試瀏覽器引擎。正式 Freeze 前必須保留至少一份：

- 直接 navigation 到正式 URL
- 一般 Chrome／Chromium
- Desktop 與 Mobile viewport
- 核心互動流程
- refresh／persistence
- console/runtime exception
- Service Worker／offline（若宣稱）

的實際證據。

## 目前事件狀態

**OPEN AS FREEZE BLOCKER**

只有上述真實 Production browser Gate 通過後，才能把此事故改標為「已驗證修復」，並開始 UT001–UT004。
