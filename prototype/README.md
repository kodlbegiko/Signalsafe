# SignalSafe v0.2 Usability Prototype

16–18 歲新版、可離線、本機保存的可用性測試原型。

## 直接執行

```bash
python3 -m http.server 4173 -d prototype
```

開啟 `http://localhost:4173`。

## 核心流程

- 90 秒快練：3 題，只選最安全行動＋一個訊號
- 完整能力測驗：前測 8 題、訓練 8 題、後測 8 題
- 急救模式：只協助停止高風險操作與找官方查證路徑
- 儀表板：安全行動、三分類校準、較可信誤判率、訊號 F1、盲點
- 資料管理：JSON／CSV 匯出、JSON 匯入、清除本機資料

## 版本

- App：`0.2.0-usability-r1`
- Question bank：`2026-08-01-r1`

## 隱私

不需登入，不收姓名、Email、電話、學校或班級。所有資料預設保存在瀏覽器 localStorage。

## 證據邊界

本版本是可用性測試原型。功能可運作不代表已證明教育成效或降低真實受騙率。
