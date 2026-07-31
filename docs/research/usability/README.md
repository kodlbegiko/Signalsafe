# SignalSafe 16–18 歲可用性測試準備包

更新日期：2026-07-31

## 已確認決策

- 完成層級：作業完成＋競賽證據（B）
- 測試原型：依根目錄 `DECISIONS.md` 改版的 16–18 歲新版原型
- 舊版用途：舊 Vercel 版本只作歷史版本與修改前對照
- 測試人數：8–12 位 16–18 歲高中階段學生
- 執行方式：兩輪，第一輪 4 位、第二輪 4–8 位
- 匿名編號：`UT001–UT012`
- 隱私：不錄臉、不收學校班級、預設不錄原始聲音
- 本階段目的：驗證可用性，不宣稱教育成效

## 文件

- [`PROTOCOL.md`](PROTOCOL.md)：測試目的、任務、門檻、兩輪執行及停止規則
- [`RECRUITMENT_AND_CONSENT.md`](RECRUITMENT_AND_CONSENT.md)：招募訊息、篩選及同意模板
- [`MODERATOR_AND_OBSERVER_GUIDE.md`](MODERATOR_AND_OBSERVER_GUIDE.md)：主持人逐字稿、觀察與 P0–P3 分級
- [`VERSION_FREEZE_AND_DATA_GOVERNANCE.md`](VERSION_FREEZE_AND_DATA_GOVERNANCE.md)：版本凍結、技術檢查、匿名與隱私
- [`ANALYSIS_AND_REPORTING.md`](ANALYSIS_AND_REPORTING.md)：資料分析、修改前後及作業四報告格式
- [`templates/`](templates/)：場次、任務、問卷、問題分級及技術故障 CSV 模板

## 使用順序

1. 完成新版原型並通過版本凍結檢查。
2. 先完成主持人／觀察員演練；演練資料使用 `DRYRUN-*`，不得混入正式樣本。
3. 取得適當同意後安排 Round 1 四位受測者。
4. 四位全部完成後，集中分級並修正 P0／P1，不在單一場次後立即改版。
5. 凍結 Round 2 版本，再測試 4–8 位新的受測者。
6. 不把兩輪不同版本的資料合併成教育成效。
7. 將結果整理成作業四與競賽修改前後證據。

## 相關 Issues

- #5：8–12 人目標族群可用性測試
- #10：可用性測試準備包
- #11：凍結 v0.2 測試版
- #12：Round 1 招募
- #13：Round 2 招募
- #14：轉成作業四與競賽證據
- #15：未成年人同意與刪除紀錄

## 證據邊界

這一階段只回答產品是否看得懂、找得到、做得完，以及安全行動與查證路徑是否清楚。它不能證明 SignalSafe 已提升防詐能力、降低真實受騙率，或 90 秒是最佳訓練長度。