# SignalSafe 部署與技術驗收報告

更新日期：2026-08-01

## 現行結論

- `0.2.0-usability-r1` 的正式啟動驗收：**撤回**
- 原因：真實使用者 Chrome 顯示「SignalSafe 無法啟動」
- 現行修正版：`0.2.1-usability-r1-hotfix1`
- 技術狀態：**hotfix 已部署，等待原出錯裝置完成真實網址確認**

事件詳情：[`INCIDENT_2026-08-01_LIVE_STARTUP.md`](INCIDENT_2026-08-01_LIVE_STARTUP.md)

## 為什麼撤回原結論

先前的 71 項檢查證明：

- 核心 UI 與資料流程可在 Chromium 引擎執行。
- 90 秒快練、完整測驗、急救模式及資料操作在測試環境可運作。
- 題庫與評分自動測試通過。

但先前沒有直接從正式網址完成真實瀏覽器導航。正式部署另加入兩層動態 payload 重建與解壓啟動，該部署層在真實 Chrome 中失敗。因此：

> **71 PASS 不能再被解讀為正式網址驗收通過。**

## 現行固定值

| 項目 | 固定值 |
|---|---|
| App | `0.2.1-usability-r1-hotfix1` |
| 題庫 | `2026-08-01-r1` |
| 正式網址 | https://signalsafe-v02-usability-r1.vercel.app |
| 首次驗證網址 | https://signalsafe-v02-usability-r1.vercel.app/?v=021-hotfix1 |
| Hotfix deployment ID | `dpl_r8gnvR3XZ5rdrikE3KpBMVN94aD6` |
| 原實作 commit | `5933fee58eeefae737fb8cabd5a70f1f039cbcac` |

## Hotfix 修正內容

1. 新增瀏覽器相容層：
   - `Array.prototype.toSorted`
   - `Array.prototype.toReversed`
   - `structuredClone`
   - `crypto.randomUUID`
2. `localStorage` 無法讀寫時，改用暫時記憶體儲存，不再讓 App 啟動失敗。
3. Service Worker 更換 cache 名稱並改採 network-first，降低舊入口持續被快取的風險。
4. App 版本提升為 `0.2.1-usability-r1-hotfix1`。
5. 題庫、核心流程與評分規則沒有變更。

## 已完成驗證

- Vercel production 狀態：`READY`
- 正式 alias 回傳 hotfix 入口：HTTP 200
- hotfix 入口可讀取原固定 payload
- 以相同 14 段正式 payload 在 Chromium 重建：PASS
- 首頁顯示「開始 90 秒快練」：PASS
- 啟動流程未捕捉例外：PASS
- GitHub 自動測試與題庫分布：待 hotfix PR CI 再確認

## 真實裝置 Gate

在 UT001–UT004 前，必須由實際使用者在原本出錯的 Chrome 完成：

1. 開啟 `?v=021-hotfix1` 網址。
2. 確認首頁成功顯示。
3. 確認頁尾版本是 `0.2.1-usability-r1-hotfix1`。
4. 完成一題 90 秒快練。
5. 重新整理後確認仍可開啟。

只有完成上述五項，才能重新標示為 Round 1 正式凍結。

## 證據邊界

本報告只處理技術啟動與操作問題。即使 hotfix 驗收通過，也不能宣稱教育成效、長期保留或真實受騙率下降。
