# SignalSafe 專案狀態

更新日期：2026-08-08

## Executive status

> **BLOCKED — DO NOT START HUMAN TESTING**

`0.2.3-usability-r1-hotfix3` 已完成 main CI 與 Production HTTP 結構驗證，但正式 Round 1 仍未凍結。唯一不可用自動證據取代的核心 blocker 是：真實 Production URL 的 Desktop／Mobile Chrome 或 Chromium 互動 Gate 尚未完成。

## 現行候選

| 項目 | 值 |
|---|---|
| App | `0.2.3-usability-r1-hotfix3` |
| Question Bank | `2026-08-01-r1` |
| Runtime source SHA | `fd8655b18c807221feea23cd8754a665e9298414` |
| Production | https://signalsafe-v02-usability-r1.vercel.app |
| Deployment | `dpl_ES53zV4bght2rBx4rCSJhyCTCCFN` |
| Main CI | run #18 — success |
| Round 1 | `UT001–UT004` 尚未開始 |

## 已完成

- 16–18 歲新版核心流程與 24 題平衡題庫
- 90 秒快練、完整 assessment、急救、dashboard、data management 的程式實作
- 版本一致性修正至 hotfix3
- anti-gaming 自動測試
- JSON required export fields / CSV PII header QA
- localStorage memory fallback 不再偽裝成持久保存
- Service Worker cache rotation 與 asset integrity test
- GitHub Actions main run #18 success
- Production deployment READY、正式 alias HTTP 200
- Production `VERSION.json`／`bootstrap.mjs`／`sw.js` 可讀
- UT001–UT004 匿名空白模板、schema、test-day checklist
- machine-readable Question Bank audit
- 2026-08-01 啟動事故證據修正與保留

## 尚未完成的 Freeze Gate

- Desktop 1440×900 真實 browser navigation
- Mobile 390×844 真實 browser navigation
- 正式 UI 90 秒快練完整 3 題
- 正式 UI Pre → Training → Post 24 題
- pause / resume
- emergency / dashboard / export / import / clear 的瀏覽器操作
- refresh / persistence
- console 無 P0/P1 runtime exception
- Service Worker install → reload → offline
- keyboard / focus / overflow / 44px target quick audit

## Deployment limitation

Production 已不再用 client-side payload reconstruction，HTML 也不直接引用外部 CDN URL；但 Vercel rewrite 的上游仍是固定 Git SHA 的 jsDelivr。首次載入仍需要網路與外部 CDN，因此不能宣稱 fully self-contained 或 offline PASS。

## 接下來真正需要真人／真實瀏覽器的工作

先完成上列 browser Freeze Gate。只有全部無 P0/P1 後，才能把版本標成 `Round 1 FROZEN` 並開始 UT001–UT004。完成 Round 1 後才依觀察修正、凍結 Round 2、執行 UT005–UT012。

## 證據邊界

目前可以說：工程自動 QA 與 Production HTTP 結構已完成。不能說：正式瀏覽器驗收完成、可用性成立、提升防詐能力、降低受騙率或具長期保留效果。
