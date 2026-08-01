# SignalSafe v0.2 部署與技術驗收報告

更新日期：2026-08-01

## 結論

- 技術檢查：**71 PASS／0 FAIL**
- P0 隱私／安全阻塞：**0**
- P1 核心流程阻塞：**0**
- 判定：**Round 1 技術凍結通過**

本報告證明原型可作為 UT001–UT004 的可用性測試版本；不證明教育成效、長期保留或真實受騙率下降。

## 固定版本

| 項目 | 固定值 |
|---|---|
| App | `0.2.0-usability-r1` |
| 題庫 | `2026-08-01-r1` |
| Git implementation commit | `5933fee58eeefae737fb8cabd5a70f1f039cbcac` |
| 合併 PR | #28 |
| Vercel deployment ID | `dpl_6REA4HsmvW5rhSYe5Y1JPLoaZdyA` |
| 正式網址 | https://signalsafe-v02-usability-r1.vercel.app |
| 部署原型 SHA-256 | `16092f8aba7191969378c59c370a32d3090ae01ea186139df50bd89e8fd2a279` |

## 部署驗證

Vercel production 狀態為 `READY`，正式 alias 無錯誤。下列資源均回傳 HTTP 200：

- `/`
- `/sw.js`
- `/payload/00.txt`
- `/payload/13.txt`

正式回應包含：

- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: no-referrer`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

部署 payload 共 14 段，解碼後與固定原型逐位元相同，SHA-256 完全一致。

## 自動與互動驗收摘要

### 首頁與定位

- 首頁成功渲染。
- 目標族群為 16–18 歲學生。
- 主 CTA 為「開始 90 秒快練」。
- 顯示「不是替你猜真假」定位。
- App 與題庫版本正確。
- 首頁只有一個 H1；按鈕具有可見文字或 `aria-label`。

### 90 秒快練

- 未完成必要選擇時，提交按鈕保持停用。
- 三題均可選最安全行動與一個關鍵訊號。
- 三題均可提交、顯示理由、獨立查證與記憶句。
- 完成後顯示安全行動、關鍵訊號及中位作答時間。
- 本機保存一個包含三筆作答的匿名 quick session。
- 快練儀表板明示日常模式不測真假分類，不偽造完整校準分數。

### 急救模式

- 不提供真實訊息自由輸入欄位。
- 能針對付款／轉帳要求輸出停止操作建議。
- 明示 SignalSafe 不判定訊息一定真或假。
- 提供官方 App、官網、公開客服與 165 等獨立查證路徑。

### 完整能力測驗

- 前測、訓練、後測流程可啟動。
- 每題需完成安全行動、三分類、關鍵訊號與自信四欄後才能提交。
- 暫停後首頁顯示繼續入口，恢復位置正確。
- 完成全部 24 題後保存 assessment session，`activeAssessment` 正確清除。
- 儀表板顯示三分類校準、較可信誤判率、高自信錯誤與關鍵訊號 F1。

### 資料管理

- JSON 匯出包含正確 App／題庫版本及兩個場次。
- CSV 匯出包含完整欄位及 27 筆作答資料。
- 有效 JSON 可經檔案輸入 UI 匯入。
- 清除資料後所有場次歸零，並重新建立匿名 ID。

### 手機版與可及性

以 390 × 844 viewport 驗證：

- `innerWidth = 390`
- `scrollWidth = 390`
- 無水平溢出
- 主要 CTA 寬 366px、高 54px
- 主要 CTA 高度超過 44px
- 首頁僅一個 H1
- 所有按鈕均有文字或 `aria-label`

### 執行穩定性

- 核心流程未出現未捕捉 JavaScript 例外。
- 核心流程未出現 console error。
- 原型不依賴外部雲端 API 或第三方 runtime 資源。

## 離線與測試環境邊界

Service Worker 已確認預快取首頁、`index.html` 及全部 14 段 payload；部署內容可無損重建。

本次執行環境的 Chromium 受組織政策 `URLBlocklist: ["*"]` 管理，無法直接導航到 localhost、file 或 Vercel URL。互動驗收因此使用正式部署 payload 無損重建出的相同 CSS／JavaScript，在 `about:blank` 中執行，沒有修改或規避瀏覽器政策。

因此，本報告可以主張：

- 離線資產與預快取配置已驗證。
- 核心 UI 與資料流程已在瀏覽器引擎中完整執行。

本報告不主張：

- 已在實體 iPhone 或 Android 切斷網路後重新啟動 PWA。

UT001–UT004 開始前，仍應在實際使用裝置進行一次 3–5 分鐘場務 spot-check。這不是程式開發阻塞，也不得在 spot-check 前臨時修改核心流程或題庫。

## Round 1 使用規則

1. 正式受測網址固定為本報告所列 URL。
2. App、題庫、Git commit 與部署 SHA 不得任意變更。
3. Round 1 中只有 P0、P1 或事前規則要求處理的重複 P2 才可修改。
4. 修改後必須建立新版本及新部署，不得把不同版本資料直接合併。
5. 本次驗收是技術驗收，不得轉述為教育成效驗證。
