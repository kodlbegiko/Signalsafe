# SignalSafe 專案狀態

更新日期：2026-08-01

## 目前階段

SignalSafe 已完成 16–18 歲新版原型的核心實作，但 `0.2.0-usability-r1` 在真實使用者 Chrome 發生正式網址啟動失敗，因此原「技術凍結完成」結論已撤回。

目前已部署 `0.2.1-usability-r1-hotfix1`，專案位於：

> **Hotfix 已部署，等待原出錯裝置完成真實網址 Gate，再正式進入 UT001–UT004。**

## 完成度概覽

| 面向 | 狀態 | 備註 |
|---|---|---|
| 問題背景與競賽故事 | 已完成初稿 | 待真實測試結果同步 |
| 目標族群 | 已凍結 | 16–18 歲高中階段學生 |
| 作業一 | 內容與 3 張圖片完成 | 正式目標族群資料待作業四補強 |
| 作業二 | 內容與 2 張圖片完成 | Persona、洞察、POV、HMW 仍屬探索性 |
| 作業三 | 可直接完成部分已完成 | 三案來源卡、15 點子、方案、六構面、故事版及 4 張圖片 |
| 作業四準備 | 已完成 | 測試包、主持觀察、結果模板及簡報初稿 |
| 原型核心功能 | 已完成 | 題庫、流程與評分規則未因 hotfix 改動 |
| GitHub 自動 QA | 核心版本已通過 | Hotfix PR 需重新通過 CI |
| Production 部署 | Hotfix 已部署 | 正式 alias 已更新 |
| 真實網址啟動 Gate | 待確認 | 需原出錯 Chrome 驗證 |
| Round 1 實測 | 尚未開始 | Gate 通過後執行 UT001–UT004 |
| 教育成效 | 尚未證明 | 可用性測試也不能直接證明教育成效 |

## 現行版本候選

- App：`0.2.1-usability-r1-hotfix1`
- 題庫：`2026-08-01-r1`
- 正式網址：https://signalsafe-v02-usability-r1.vercel.app
- 首次驗證網址：https://signalsafe-v02-usability-r1.vercel.app/?v=021-hotfix1
- Hotfix deployment：`dpl_r8gnvR3XZ5rdrikE3KpBMVN94aD6`
- 事件紀錄：[`docs/research/usability/INCIDENT_2026-08-01_LIVE_STARTUP.md`](docs/research/usability/INCIDENT_2026-08-01_LIVE_STARTUP.md)

## Hotfix 修正

- 新增 `toSorted`、`toReversed`、`structuredClone`、`crypto.randomUUID` 相容層
- `localStorage` 失敗時使用暫時記憶體儲存，不再阻斷啟動
- Service Worker 更換 cache 並改採 network-first
- App 版本更新

未修改：

- 24 題題目與答案
- 3／2／3 題型分布
- 評分權重
- 90 秒快練流程
- 完整前測／訓練／後測流程
- 急救模式規則

## 目前唯一 Gate

在原本出錯的 Chrome 完成：

1. 開啟 `?v=021-hotfix1`。
2. 確認首頁成功顯示。
3. 確認頁尾版本為 `0.2.1-usability-r1-hotfix1`。
4. 完成一題快練。
5. 重新整理後仍可開啟。

完成後才能重新標記 Round 1 正式凍結。

## Gate 通過後

1. Round 1：UT001–UT004。
2. 集中修正 P0、P1 與重複 P2。
3. 建立修改前後證據並凍結 Round 2。
4. Round 2：UT005–UT012。
5. 回填三張結果模板與匿名觀察紀錄。
6. 更新複賽簡報。

## 證據邊界

目前可以說核心原型與 hotfix 部署已完成；不能說真實網址驗收已完成、目標族群可用性成立、提升防詐能力或降低真實受騙率。
