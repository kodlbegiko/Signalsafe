# SignalSafe Prototype V2

SignalSafe V2 是給 16–18 歲學生使用的防詐判斷訓練原型。核心不是替使用者保證「這是不是詐騙」，而是訓練使用者在情境中辨識話術、來源、行為與金流風險，並在真實可疑事件中先停止高風險操作、再改走獨立查證。

## 兩大使用意圖

1. **我現在遇到可疑情況**：最高優先安全 CTA。先停下點擊、登入、提供驗證碼、付款／轉帳等行為，再導向官方 App、官網、原聯絡方式、官方客服或 165。
2. **開始防詐訓練**：以短情境進行「先判斷 → 選安全下一步 → 找關鍵訊號 → 看回饋」。系統不先揭示答案。

一般產品 IA 不再顯示「研究模式」。研究是背景 infrastructure，不是使用者的產品功能分類。

## Product Architecture

- `app-parts/app-v2.js`：V2 intent-first UI、首頁、安全 CTA、Emergency Flow、短訓練三分類、學習能力頁、研究事件背景紀錄。
- `styles/07-v2.css`：V2 視覺層級、手機 persistent safety CTA、能力橫條與 responsive/accessibility 調整。
- `study-v2.mjs`：研究 Scenario、獨立 Task、Study assignment 與 deep-link helper。
- `research-control.html`：主持人控制頁；不從一般產品導覽連入。
- 既有 `research*.mjs`、Consent、正式前／訓練／後測與研究匯出仍保留。

## Training Flow

```text
情境
→ 自己判斷：有明顯風險／資訊不足／目前較可信
→ 選安全下一步
→ 找一個關鍵訊號
→ 回饋：注意到什麼／漏掉什麼
→ 獨立查證
→ 累積能力紀錄
```

30 秒／90 秒只作為設計節奏，不因時間到而判定失敗；速度不計分。

## Real-world Suspicious Situation Flow

```text
我現在遇到可疑情況
→ 立即顯示三項停手提醒
→ 選目前被要求做的高風險行為
→ 離開原訊息，確認是否能找到官方入口
→ 產生安全下一步
→ 官方／可信任來源查證
```

SignalSafe 不輸出「100% 安全」或最終鑑定。

## Learning System

能力頁不使用無證據的精密百分比。四類能力以：

- 資料不足
- 優先加強
- 持續練習
- 目前較穩定

搭配「X / Y 次有注意到」呈現。弱項可直接啟動針對性短訓練。

## Research Architecture

Usability Study 可使用：

```text
/prototype/?study=SST-V2&participant=U001&task=T01&route=home
```

研究 context 與 event 只在背景記錄；一般 UI 不顯示 Research Mode。若要執行既有正式 Consent + 24 題 Research 流程，可在 study URL 加上 `formal=1`，仍沿用既有 consent boundary。

主持人使用 `research-control.html` 管理 Scenario、Task、PASS/PARTIAL/FAIL/NOT_ATTEMPTED、備註、deep link 與匿名匯出。任務狀態彼此獨立，T02 FAIL 不會鎖住 T03。

完整 SOP：`../docs/research-protocol-v2.md`。

## Privacy Principles

- 不要求一般使用者登入。
- 不在緊急流程要求貼上真實訊息、帳密、OTP 或個資。
- Study 使用匿名 Participant ID。
- 一般 learning data 與 research task data 分離。
- 資料優先留在本機；使用者可自行清除。
- 不以 SignalSafe 結果取代官方查證。

## Question Bank

正式前測、訓練、後測題庫與既有 quick bank 都保留。V2 新增 `study-v2.mjs` assignment layer，避免把「哪一題永遠屬於哪一場研究」寫死在產品 UI。

## Run

本原型為靜態 PWA，可由目前 Vercel / 靜態伺服器提供 `prototype/`。不需要帳號或雲端資料庫。

## Test

```bash
npm run check
npm test
```

V2 另包含 contract tests，檢查：V2 檔案載入、Emergency CTA、Research Mode 不再進入一般首頁 IA、獨立 Task 定義與研究 control 基礎。

## Current Limitations

- 本輪仍需由部署環境完成真實瀏覽器 smoke、375/390/768/1024/1440 responsive 與實機 accessibility 驗證。
- 既有正式研究前測／訓練／後測仍是 phase-based assessment；V2 的 independent tasks 主要針對 usability research，不等同正式教育成效研究。
- 弱項導向短訓練目前使用既有 quick bank 做優先排序，並非自適應演算法。
- OCR / AI 任意訊息分析不是 V2 核心，也未宣稱可以自動判斷真偽。
