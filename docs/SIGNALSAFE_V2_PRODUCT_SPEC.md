# SignalSafe V2 Product Decision Record

## 核心決策

1. **Intent before mode**：一般首頁只回答「我現在有問題」或「我想練能力」，不顯示研究模式。
2. **Safety before classification**：真實情況先停掉點擊、登入、OTP、付款等風險，再判斷來源與查證。
3. **Learn before automate**：訓練中使用者先分類、選安全下一步與關鍵訊號，系統後揭示回饋。
4. **Independent research tasks**：usability tasks 不串成解鎖鏈；FAIL 不阻塞下一任務。
5. **Research is infrastructure**：匿名 study context、task 與 event 在背景記錄；主持人 control 不進一般 IA。
6. **Evidence over decoration**：能力頁以資料量與命中次數呈現，不顯示沒有足夠證據的精密能力百分比。

## V2 IA

```text
SignalSafe
├─ 我現在遇到可疑情況
│  ├─ 立即停手提醒
│  ├─ 目前被要求做什麼
│  ├─ 是否能離開原訊息找到官方入口
│  └─ 安全下一步／獨立查證
├─ 防詐訓練
│  ├─ 短情境
│  ├─ 自己判斷
│  ├─ 安全下一步
│  ├─ 關鍵訊號
│  └─ Learning transfer 回饋
├─ 我的能力
│  ├─ 話術辨識
│  ├─ 來源辨識
│  ├─ 行為風險
│  ├─ 金流風險
│  └─ 弱項練習
└─ 資料與隱私
```

Research Control 與正式 Research Consent 不屬於一般 IA。

## V2 圓形／圖表決策

- REMOVE：沒有明確語意的裝飾性圓形、純百分比能力圓環。
- REDESIGN：能力視覺改為四條 horizontal progress rows + qualitative status。
- KEEP：品牌 mark 與小型 icon container 等具明確導覽／辨識用途的圓角形狀。

## 安全邊界

- 不輸出「完全安全」。
- 不要求使用者把真實 OTP、密碼、帳號或截圖貼進事件當下流程。
- 不鼓勵回覆原訊息確認。
- 導向自行開啟官方 App、手動官網、卡片背面電話、原聯絡方式或 165。

## Research boundary

- `?study=...&participant=...`：usability context，正常產品 UI。
- `formal=1`：沿用既有正式 consent + 24 題 Research pipeline。
- Task 狀態由主持人 control 獨立記錄，不改寫產品 learning record。
