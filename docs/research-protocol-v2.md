# SignalSafe V2 Usability Research Protocol

## 1. Study goal

驗證第一次使用者是否能在沒有主持人操作提示的情況下：

- 找到防詐訓練入口。
- 理解訓練是「自己判斷後才看回饋」。
- 找到自己的能力弱項。
- 在真實可疑事件假設下快速找到「我現在遇到可疑情況」。
- 找到立即停手與獨立查證方式。

本 protocol 測的是產品可用性與資訊架構，不把單一 Task 成敗當成教育成效證據。

## 2. Participant ID policy

只使用匿名代碼，例如 `U001`、`U002`。不得在 task log 寫入姓名、學校、電話、Email、社群帳號、真實詐騙網址或 OTP。

## 3. Scenarios

### Scenario A — 學校防詐訓練

> 老師今天希望同學使用 SignalSafe 練習判斷可疑訊息。

- T01：找到開始防詐訓練的方法。
- T02：完成一次你認為適合自己的練習。
- T03：找出自己比較容易忽略哪一種風險。
- T04：再進行一個針對弱項的練習。

### Scenario B — 真實可疑事件

> 你剛收到一則要求今天內登入帳號，否則帳號會被停權的訊息。你不確定是不是真的。

- T05：使用 SignalSafe 處理現在的情況。
- T06：找出現在第一件不應該做的事情。
- T07：找到安全的下一步。
- T08：找到可信任的查證方式。

## 4. Independent task rule

Task 彼此獨立。禁止使用「完成 T02 才能解鎖 T03」的產品或研究流程。

若前一個 Task 失敗，主持人可使用 `research-control.html` 產生下一個 Task 的 deep link。研究紀錄必須保留前一 Task 的 FAIL，不得因主持人重設狀態而改寫。

## 5. Result definitions

- **PASS**：未獲操作提示，自行達成目標。
- **PARTIAL**：最終達成，但有明顯繞路、誤解後自行修正，或需要不指向具體 UI 的輕微提醒。
- **FAIL**：無法完成、放棄，或必須由主持人直接指出應按哪個控制項。
- **NOT_ATTEMPTED**：未執行，不可視為 FAIL。

## 6. Moderator restrictions

主持人不得說「點紅色按鈕」「按左上角」「進急救模式」等會直接提示解法的話。若必須協助，只能使用不指出位置的中性提示，並記錄 `help_requested=true`。

## 7. Metrics

每個 Task 建議記錄：

- result
- completion_time
- time_to_first_action
- misclick_count
- backtrack_count
- help_requested
- path_taken
- moderator_note

產品背景 event 至少包含：`session_started`、`emergency_cta_clicked`、`training_started`、`judgment_selected`、`answer_submitted`、`feedback_viewed`、`emergency_risk_selected`、`verification_route_answered`、`safe_action_viewed`。

## 8. Reset / deep-link procedure

主持人 control 會產生：

```text
/prototype/?study=SST-V2&participant=U001&task=T05&route=home
```

使用者看到的是正常 SignalSafe，不顯示研究模式入口。若要執行既有正式研究 Consent + 24 題研究流程，使用 `formal=1`，不得把 usability tasks 與正式成效研究混成同一指標。

## 9. Data export

主持人 control 匯出的 task data 與產品 learning state 分開保存。輸出僅含匿名 participant、study、task 狀態、時間與主持人研究欄位。

## 10. Privacy

- 不收集不必要個資。
- 不要求受試者貼真實可疑訊息。
- 不以研究頁替代正式倫理／監護人／校方流程。
- 已完成的正式 Research 匯出仍沿用既有 consent 與 export validation。

## 11. Limitations

V2 independent task infrastructure 是 usability 研究工具，不自動證明判斷能力提升。教育成效仍需平衡題組、前後測、足夠樣本與適當統計方法另行驗證。
