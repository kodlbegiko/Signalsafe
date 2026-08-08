# SignalSafe Roadmap

更新日期：2026-08-08

## Phase 0：Repository 收斂

- [x] 建立單一事實來源
- [x] 匯入會議與證據文件
- [x] 建立隱私與資料規則
- [x] 匯入／重建現行原型原始碼
- [x] 建立 GitHub Issues 與自動 QA

## Phase 1：16–18 歲規格一致性改版

- [x] 目標族群統一為 16–18 歲
- [x] 首頁主 CTA 為 90 秒快練
- [x] 快練縮為最安全行動＋單一關鍵訊號
- [x] 研究模式保留三分類、證據、自信與計時
- [x] 急救模式固定為停手＋獨立查證
- [x] 匯出包含研究必要欄位與版本
- [x] memory fallback 明確標示為暫時保存

## Phase 2：題庫與研究準備

- [x] 24 題題庫與 Pre／Training／Post 3/2/3 平衡
- [x] 題庫 machine-readable 自動稽核
- [x] Anti-gaming 測試
- [x] 匿名 UT001–UT004 資料 schema／模板
- [x] Round 1 test-day checklist
- [ ] 人工題庫語意／難度／教育品質審核完成
- [ ] 正式受測同意程序依實際場域確認

## Phase 2.5：Pre-usability Freeze Gate

- [x] `0.2.3-usability-r1-hotfix3` main CI PASS
- [x] Production deployment READY
- [x] Production HTTP 與版本資產核對
- [x] 歷史 `71 PASS` 證據邊界修正
- [x] 2026-08-01 startup incident 保留
- [ ] Desktop 真實 Production browser Gate
- [ ] Mobile 真實 Production browser Gate
- [ ] 核心互動／refresh／persistence／console Gate
- [ ] Service Worker offline Gate
- [ ] 正式標記 `Round 1 FROZEN`

> 上述未完成前：**BLOCKED — DO NOT START HUMAN TESTING**。

## Phase 3：正式可用性測試

- [ ] Round 1：UT001–UT004
- [ ] 依 P0／P1／重複 P2 集中修正
- [ ] 凍結 Round 2
- [ ] Round 2：UT005–UT012
- [ ] 整理 before／after、匿名原話與限制

## Phase 4：初步成效驗證

- [ ] 20–40 位前測
- [ ] 訓練
- [ ] 立即後測
- [ ] 第 7 天延遲後測
- [ ] 分析安全行動、三分類、訊號、高自信錯誤與 retention
- [ ] 固定原始資料與可重現分析

## Phase 5：複賽交付

- [ ] 將 Round 1／2 真實結果回填簡報與作業四
- [ ] 最終 PDF／簡報
- [ ] Demo 與離線備援
- [ ] 產品操作錄影
- [ ] 來源與證據附件
- [ ] 評審問答演練
- [ ] Release／版本封存
