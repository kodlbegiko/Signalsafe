# SignalSafe V2 Implementation Report

## 1. 實際修改

- 首頁由 mode-based 改成 intent-based：最高層「我現在遇到可疑情況」，第二層「開始防詐訓練」。
- 一般首頁不再顯示 Research Mode / Pilot 入口。
- Emergency CTA 在桌面 header 與手機底部持續可見；Emergency 頁本身不重複顯示浮動 CTA。
- Emergency Flow 第一屏直接顯示停手三原則，再詢問正在被要求做什麼。
- 短訓練加入三分類判斷，仍要求安全下一步與關鍵訊號；答案在提交後才揭示。
- 回饋頁改為「注意到／容易漏掉／下次怎麼做」，降低考試式對錯感。
- Learning Dashboard 改成四類能力橫條與定性狀態，不使用低樣本精密百分比。
- 弱項可直接啟動對應類別的短訓練。
- 加入 V2 study context、匿名 event logging、independent task definition、moderator control 與 deep links。
- V2 runtime / CSS / study / moderator assets 已納入 PWA offline cache；正式研究 cache/version boundary 不變。

## 2. Information Architecture

```text
SignalSafe
├─ 我現在遇到可疑情況
│  ├─ 立即停手提醒
│  ├─ 目前被要求做什麼
│  ├─ 是否能離開原訊息找到官方入口
│  └─ 安全下一步／獨立查證
├─ 防詐訓練
│  ├─ 自己判斷
│  ├─ 安全下一步
│  ├─ 關鍵訊號
│  └─ Learning-transfer feedback
├─ 我的能力
│  ├─ 話術辨識
│  ├─ 來源辨識
│  ├─ 行為風險
│  ├─ 金流風險
│  └─ 弱項練習
└─ 資料與隱私
```

Research Control 與正式 Consent / Research pipeline 不屬於一般 IA。

## 3. Homepage

「我現在遇到可疑情況」已由次要入口升級為首屏大型 Safety CTA。桌面 header 與手機 persistent button 提供跨頁快速入口。

## 4. Emergency Flow

立即停手 → 選高風險要求 → 離開原訊息 → 確認官方入口 → 安全下一步 → 官方／可信任來源查證。

安全邊界：不輸出「100% 安全」，不要求貼真實 OTP、密碼、帳號或訊息內容，不鼓勵使用對方提供的客服入口。

## 5. Training Flow

情境 → 三分類判斷 → 安全下一步 → 一個關鍵訊號 → learning-transfer feedback → 能力紀錄。

系統不在作答前先揭示 AI / 系統判斷；速度不計分。

## 6. Learning System

四類：話術、來源、行為、金流。少於三次觀察顯示「資料不足」；其餘顯示「優先加強／持續練習／目前較穩定」，並附 `X / Y 次有注意到`。弱項可直接啟動針對性短訓練。

圓形／精密百分比策略：移除無明確語意的裝飾性能力圓環；主要能力面改為 horizontal rows + qualitative status，避免 false precision。

## 7. Research Infrastructure

一般 UI 移除 Research Mode。`study` / `participant` / `task` query 只建立背景 usability context；`formal=1` 才進入既有 consent + 正式研究流程。

主持人使用 `prototype/research-control.html` 管理 Scenario、獨立 Task、狀態、deep link、備註與匿名 JSON 匯出。

## 8. Independent Task Architecture

T01–T08 都有獨立 `startRoute` 與獨立狀態：`PASS / PARTIAL / FAIL / NOT_ATTEMPTED`。

因此：

```text
T02 = FAIL
不會造成
T03 = BLOCKED
```

若前一任務失敗，主持人可以直接以 deep link 開啟下一任務所需起始狀態，且保留上一任務的 FAIL 紀錄。

## 9. Question Bank

既有正式前測／訓練／後測題庫沒有被刪改。V2 新增 assignment layer 與 usability task layer，不用「Research Mode」作為一般產品入口。

正式研究版本仍凍結：

- appVersion: `0.3.4-research-export-fix`
- questionBankVersion: `2026-08-10-v2-candidate`
- V2 productVersion: `2.0.0-intent-safety-research`
- V2 usability protocol: `signalsafe-v2-usability-2026-08-14`

這是刻意分離，不是版本遺漏。

## 10. Privacy & Safety

- 一般產品不要求登入。
- Emergency Flow 不要求輸入真實可疑訊息或敏感資料。
- Study 使用匿名 Participant ID。
- Moderator task data 與一般 learning data 分離。
- 不把 SignalSafe 結果當成官方鑑定。
- 仍導向自行開啟官方 App、手動官網、原聯絡方式、官方客服或 165。

## 11. Files Changed

主要 V2 檔案：

- `prototype/app-parts/app-v2.js`
- `prototype/styles/07-v2.css`
- `prototype/study-v2.mjs`
- `prototype/research-control.html`
- `prototype/index.html`
- `prototype/bootstrap.mjs`
- `prototype/sw.js`
- `prototype/VERSION.json`
- `prototype/README.md`
- `prototype/tests/v2-contract.test.mjs`
- `docs/research-protocol-v2.md`
- `docs/SIGNALSAFE_V2_PRODUCT_SPEC.md`
- `docs/V2_IMPLEMENTATION_REPORT.md`

## 12. Tests

Final branch head before this report-only commit: `9550c133405a453001bdeedf94e584f3567abb51`.

GitHub Actions `Prototype checks` run #54：

| Check | Result |
|---|---|
| checkout | PASS |
| setup Node | PASS |
| `npm run check` | PASS |
| `npm test` | PASS |
| upload test output | PASS |
| upload validated static prototype artifact | PASS |
| complete job | PASS |

CI 另外驗證 V2 offline cache contract：`study-v2.mjs`、`research-control.html`、`styles/07-v2.css`、`app-v2.js` 均必須存在於 Service Worker asset manifest。

## 13. Browser / Deployment Verification

未宣稱通過。

實際阻塞：

1. 本執行環境 Chromium 被組織政策禁止存取 `127.0.0.1`，因此 CI artifact 無法用 localhost 做 headless browser smoke。
2. Connected Vercel `deploy_to_vercel` action 的實際 validator 要求 `target / name / files`，但目前暴露的工具 schema 不提供這些輸入欄位，因此本輪無法安全建立 branch preview。
3. 目前 Vercel 專案沒有因此 PR 自動產生新的 branch preview。

因此沒有把 V2 推 production，也沒有合併 main。

## 14. Known Limitations

- 尚未完成 deployed-browser responsive smoke（375 / 390 / 768 / 1024 / 1440）。
- 尚未完成實機 VoiceOver / TalkBack / keyboard-only 驗證。
- 尚未以真人執行 V2 usability T01–T08。
- OCR / AI 任意訊息分析、教師統計與 advanced analytics 未納入 V2 core。
- usability task success 不等於教育成效證據；正式成效仍需前後測與適當研究設計。

## 15. Acceptance Checklist

| Requirement | Status |
|---|---|
| P0 移除一般 UI 可見 Research Mode | PASS |
| P0 強化 Emergency CTA | PASS |
| P0 Safety-first Emergency Flow | PASS |
| P0 保留 Training Flow | PASS |
| P0 產品導航不再強制線性 | PASS |
| P0 usability tasks 獨立 | PASS |
| P1 Learning Dashboard 重構 | PASS |
| P1 圓環／false precision 重構 | PASS |
| P1 V2 event logging | PASS |
| P1 Study URL infrastructure | PASS |
| P1 Assignment layer | PASS |
| P1 V2 offline cache | PASS |
| P2 basic moderator control | PASS |
| CI syntax + tests | PASS |
| Deployed browser smoke | BLOCKED |
| Real-device accessibility | NOT YET VERIFIED |
| 真人 usability run | NOT YET EXECUTED |

## 16. Final Status

**SIGNALSAFE V2 PARTIALLY ACCEPTED**

程式、IA、安全流程、訓練流程、能力頁、研究基礎設施、PWA asset contract 與 CI 已完成並通過；但因部署／瀏覽器工具限制，尚缺 deployed-browser 與實機視覺／互動證據，所以不應標成完全 ACCEPTED，也不應直接 merge / release。
