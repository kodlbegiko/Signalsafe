# SignalSafe 正式部署啟動失敗事件紀錄

日期：2026-08-01

## 事件摘要

使用者在正式網址開啟 SignalSafe v0.2.0 時，畫面顯示：

> SignalSafe 無法啟動

因此，先前將 `0.2.0-usability-r1` 判定為「Round 1 技術凍結完成」的結論失效。先前 71 項檢查證明核心 UI 與資料流程可在瀏覽器引擎執行，但沒有直接證明正式網址能在真實使用者瀏覽器啟動。

## 根因

正式部署使用兩層動態載入：

1. 根頁面抓取 14 段 payload。
2. payload 重建內層 HTML。
3. 內層再解壓 CSS／JavaScript 並使用 `eval` 啟動。

這種部署包裝增加了正式環境失敗點。檢查時使用的執行方式也對 `localStorage` 與 `crypto.randomUUID` 提供了測試環境替代，因而沒有暴露正式部署啟動風險。

## 修正

建立 `0.2.1-usability-r1-hotfix1`：

- 新增 `compat.mjs`，補足 `toSorted`、`toReversed`、`structuredClone` 與 `crypto.randomUUID` 相容層。
- `storage.mjs` 在 `localStorage` 被阻擋時改用暫時記憶體儲存，不再因第二次寫入例外而中止啟動。
- Service Worker 改用新 cache 名稱並採 network-first，避免舊損壞入口長期留在快取。
- 題庫內容、核心流程與評分規則沒有變更。
- 正式 Vercel alias 重新部署。

## 新部署

- 正式網址：https://signalsafe-v02-usability-r1.vercel.app
- 建議首次開啟：https://signalsafe-v02-usability-r1.vercel.app/?v=021-hotfix1
- Vercel deployment：`dpl_r8gnvR3XZ5rdrikE3KpBMVN94aD6`
- App：`0.2.1-usability-r1-hotfix1`
- 題庫：`2026-08-01-r1`

## 驗證狀態

已完成：

- Vercel production 狀態 `READY`。
- 正式 alias 回傳新的 hotfix 入口。
- 正式 payload 來源可讀取。
- hotfix 載入器以相同 14 段 payload 在 Chromium 中重建並成功顯示首頁。
- 啟動測試沒有未捕捉例外。

仍需完成：

- 由實際使用者在原本出錯的 Chrome 開啟 cache-busted URL。
- 確認首頁顯示 `App 0.2.1-usability-r1-hotfix1`。
- 完成一題快練後再正式凍結 UT001–UT004。

## 流程修正

往後部署驗收不得只依賴：

- HTTP 200
- Vercel `READY`
- payload 雜湊一致
- 注入式或模擬式瀏覽器測試

正式凍結前必須保留一項真實網址、真實瀏覽器、真實裝置的啟動證據。
