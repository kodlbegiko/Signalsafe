# SignalSafe 專案狀態

更新日期：2026-08-09

## Executive status

> **BLOCKED — DO NOT START HUMAN TESTING**

`0.2.4-usability-r1-hotfix4` 已完成 main CI、static Accessibility QA、24 題 AI-assisted semantic review 與 Production HTTP/MIME 結構驗證，但正式 Round 1 仍未凍結。

目前有兩個不同性質的 blocker：

1. **題庫 P1 semantic validity**：`train-04`、`train-08`、`post-08` 的 `risk`／`insufficient` 邊界需人工反詐／教育審查者定案。
2. **Production real-browser Gate**：本環境沒有可執行 JavaScript 的真實 Chrome／Chromium，因此 Desktop/Mobile、完整互動、persistence、console、實際 focus/overflow 與 Service Worker offline 尚未取得 L4 證據。

## 現行候選

| 項目 | 值 |
|---|---|
| App | `0.2.4-usability-r1-hotfix4` |
| Question Bank | `2026-08-01-r1` |
| Runtime source SHA | `3cecb0d3b0eea53ff65839e4241cd5043e1aee7a` |
| Production | https://signalsafe-v02-usability-r1.vercel.app |
| Deployment | `dpl_F7Euc7qTtUvqKKPaM6f5iwq6m5mP` |
| Main technical CI | run #26 — success |
| Runtime tests | 33/33 PASS |
| Latest static artifact | `9024665427`, SHA-256 `895ae43f8aa3e55bb32e4dd6efc334725eba3d94bf1110cb235c9b15f52b009e` |
| Round 1 | `UT001–UT004` 尚未開始 |

## 已完成

- 16–18 歲新版核心流程與 24 題三分類題庫
- 90 秒快練、完整 assessment、急救、dashboard、data management 程式實作
- App version 升至 hotfix4；Question Bank 未變更
- 33 項 runtime/static tests 全數通過
- anti-gaming 自動測試
- JSON required export fields / CSV direct-PII header QA
- localStorage memory fallback 不再偽裝成持久保存
- Service Worker cache rotation 與 asset integrity test
- static Accessibility：44px、focus、keyboard-focusable import、ARIA states/progress/status、reduced motion、contrast guardrails
- 24 題 AI-assisted semantic review與 Pre/Post pairing review
- Production deployment READY
- Production HTML／JS／CSS／VERSION／SW HTTP 取得成功
- Production HTML MIME-type P0 (`text/plain`) 已修正為 `text/html; charset=utf-8`
- Production runtime pin 為 immutable Git SHA `3cecb0d...`
- UT001–UT004 匿名空白模板、schema、test-day checklist
- 2026-08-01 啟動事故證據修正與保留

## 題庫目前狀態

修正後 item-level review 統計：

- 11 PASS
- 10 WARN
- 3 FAIL

P1 FAIL：

- `train-04`：寄件網域異常＋同日 NT$3,000 保證金，但 key 為 `insufficient`。
- `train-08`：短網址＋重填地址＋付款，但 key 為 `insufficient`。
- `post-08`：未核對 recruiter＋不明安裝檔，但 key 為 `insufficient`。

這三題沒有自動改 key，因為改動會影響 scoring／construct validity，並可能要求 Question Bank 升版。

## 尚未完成的 Freeze Gate

### Human domain review

- 定義 `risk` 與 `insufficient` 的 operational boundary
- 定案 `train-04`／`train-08`／`post-08`
- 同步 review 邊界 WARN `pre-04`／`pre-08`
- 補 per-item source/rewrite basis 與人工 reviewer/status

### Real Production browser

- Desktop 1440×900 navigation
- Mobile 390×844 navigation
- 90 秒快練完整 3 題
- Pre → Training → Post 24 題
- pause / resume
- emergency / dashboard / export / import / clear
- refresh / persistence
- console 無 P0/P1 runtime exception
- Service Worker install → reload → offline
- keyboard / focus / actual hitbox / overflow

## Deployment limitation

Production HTML 與資產在瀏覽器端使用同源相對路徑，但 Vercel rewrite 的上游仍是固定 Git SHA 的 jsDelivr。首次載入仍需要網路與外部 CDN，因此不能宣稱 fully self-contained 或 offline PASS。

## 證據邊界

目前可以說：

- 工程與靜態 QA 已收斂到 L1/L2；
- Production HTTP/MIME 與 immutable runtime pin 已驗證；
- 已找到並記錄 3 個題庫 P1，而不是把 AI review 冒充人工專家核可。

目前不能說：

- Round 1 已凍結；
- Production 真實瀏覽器驗收完成；
- 題庫已完成人工專家核可；
- 可用性成立；
- 已提升防詐能力或降低受騙率。

只有在 semantic P1 與 real-browser Gate 全部解決後，才能開始 UT001–UT004。
