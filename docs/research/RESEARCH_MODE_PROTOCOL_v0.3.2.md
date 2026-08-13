# SignalSafe Research Mode Protocol v0.3.2

App：`0.3.2-pilot-protocol`
Pilot protocol：`signalsafe-pilot-2026-08-13-v1`
Question bank：`2026-08-10-v2-candidate`（未變更）
Study：`signalsafe-study-2026-08-r1`（未變更）
Consent：`signalsafe-consent-2026-08-10-v1`（未變更）

## Pilot 定位

目前優先執行 5–8 人 Pilot，目標是驗證流程、題目理解、介面可用性與資料匯出可靠性，不把 Pilot 本身直接宣稱為 SignalSafe 教育成效證據。

## 測試情境

以高中生日常使用 LINE、Instagram、遊戲、購物平台與其他網路服務為背景。主持人口語不直接說「每一題都在抓詐騙」，避免受測者進入不自然的全警戒模式；正式研究參與說明仍完整告知 SignalSafe 的反詐決策訓練目的。

## 四項任務

1. 自行從首頁找到 Research Mode。
2. 自行閱讀與完成研究參與確認。
3. 依真實判斷完成 Pre 8 → Training 8 → Post 8。
4. 查看結果並口頭說明最需加強處與產品改善建議。

## 場域

校內安靜場域、個別進行、穩定 Wi-Fi、統一 iPad Air + Safari；主持人坐側後方觀察。

## 提示規則

採 Level 0–3 分級提示，記錄每項任務最高提示 Level。提示只能協助操作，不得提供正式題目的正確答案。

## 招募條件

- 16–18 歲高中階段學生。
- 日常使用智慧型手機與常見數位服務。
- 可自行閱讀繁體中文並操作網頁。
- Pilot 可曾使用一般 SignalSafe，但未完成同版本正式 Research Mode。

## Research flow

- Pre：8 題，不提供 immediate correctness feedback。
- Training：8 題，提供 5-part immediate learning feedback。
- Post：8 題，不提供 immediate correctness feedback。
- Quick bank 繼續與正式題庫隔離。
- Participant ID、consent、deterministic order、pause/resume、PII guard 與 JSON export 繼續沿用 v0.3.1。

## 資料版本

新建立的 research session 應記錄 `pilotProtocolVersion = signalsafe-pilot-2026-08-13-v1`，Research JSON export 亦包含該欄位，以便未來判斷不同場次是否採用相同 Pilot 執行規格。

## 尚未完成的人工作業

- `train-04`、`train-08`、`post-08` human semantic sign-off。
- 實體 iPad Air M1 / iPadOS Safari 驗收。
- 實體 VoiceOver 驗收。
- 任何研究情境實際要求的監護人、學校或倫理程序。
