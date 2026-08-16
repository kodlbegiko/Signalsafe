# SignalSafe V2 Usability Research Protocol

Protocol version: `signalsafe-v2-usability-2026-08-16`

## 1. Study goal

本 protocol 測的是 **SignalSafe 的產品可用性、資訊架構與任務理解**，不是直接證明教育成效。

研究重點是觀察第一次使用者在兩種不同使用意圖下，是否能在沒有主持人操作提示的情況下：

- 在「老師要求練習」的情境中，自行找到合適的訓練入口。
- 理解並完成一次防詐情境練習。
- 找到自己的能力弱項與後續弱項練習方式。
- 在「真的收到可疑訊息」的情境中，快速找到「我現在遇到可疑情況」。
- 理解第一件應停止的高風險操作。
- 找到安全下一步與獨立查證方式。

單一 Task 的 PASS / FAIL 只能代表該任務的可用性表現，不應被解讀為詐騙辨識能力高低。

## 2. Why scenarios are required

這次測試不直接對受試者說「請點某個功能」。每一組任務前先給一個合理的真實世界情境，讓受試者知道 **為什麼此刻會打開 SignalSafe**。

情境的目的不是提示答案，而是建立使用意圖：

- Scenario A 建立「平常想練能力」的需求。
- Scenario B 建立「現在真的遇到可疑事件」的需求。

這樣才能觀察首頁的 Intent-based IA 是否真的讓使用者自己找到正確方向。

## 3. Participant ID policy

只使用匿名代碼，例如 `U001`、`U002`。不得在 task log 寫入姓名、學校、電話、Email、社群帳號、真實詐騙網址、OTP、密碼或真實金融資訊。

## 4. Scenario A — 老師要求進行防詐訓練

### 給受試者的情境

> 你是一名高中生。今天班導師告訴全班，最近很多學生收到假帳號通知、假購物訊息與假客服訊息，因此希望每個人使用 SignalSafe 練習自己的防詐判斷能力。老師只把 SignalSafe 網站交給你，沒有告訴你要按哪個功能。請依照你自己的理解使用這個網站。

### Independent Tasks

**T01**

> 請開始一次你認為適合這個情況的防詐訓練。

目的：測首頁 Training CTA discoverability 與 intent comprehension。

**T02**

> 請完成一次防詐情境練習。

目的：測訓練流程是否能在沒有主持人教操作的情況下完成。

**T03**

> 假設你已經使用 SignalSafe 練習一段時間，現在請找出自己目前最容易忽略哪一類風險。

目的：測 Learning Dashboard 與弱項資訊是否能被理解。

主持人應直接提供預先準備的 learning-history state；T03 不依賴 T02 是否成功。

**T04**

> 請找出一個可以針對這個弱項繼續練習的方法。

目的：測 Weakness → Practice learning loop。

主持人應提供已存在明確弱項的預設 state；T04 不依賴 T03 是否成功。

## 5. Scenario B — 收到疑似帳號異常通知

### 給受試者的情境

> 你正在使用手機，突然收到一則看起來像是你常用服務官方帳號傳來的訊息：
>
> 「系統偵測到您的帳號有異常登入。為避免帳號停權，請於今天 18:00 前完成身分驗證。」
>
> 訊息下方附有一個「立即驗證帳號」連結。
>
> 你不確定這到底是真的通知，還是有人想騙你。這時你想到可以打開 SignalSafe。

此為合成研究情境，不提供真實網址，也不要求受試者真的點擊外部連結。

### Independent Tasks

**T05**

> 請使用 SignalSafe 處理你現在遇到的情況。

目的：測受試者是否能自己找到「我現在遇到可疑情況」。

**T06**

> 請找出你現在第一件應該避免做的事情。

目的：測 Safety-before-classification 是否能被理解。

**T07**

> 請找出目前比較安全的下一步。

目的：測 Stop → Separate → Verify 的安全行動理解。

**T08**

> 請找出你可以怎麼確認這則通知是不是真的。

目的：測使用者是否理解應離開原訊息並使用獨立官方來源查證。

## 6. Independent task rule

T01–T08 全部視為獨立任務。

禁止使用：

```text
T02 FAIL → T03 BLOCKED
```

合法紀錄例如：

```text
T01 PASS
T02 FAIL
T03 PASS
T04 PARTIAL
```

若某 Task 需要特定資料狀態，主持人必須使用 reset / seeded state / deep link 建立任務起始條件，而不是要求前一任務先成功。

前一 Task 的 FAIL 必須保留，不得因主持人切換測試狀態而改寫。

## 7. Task delivery rule

主持人一次只讀出目前 Task 的任務描述。

不要把 UI 解法寫進指令。例如禁止：

- 「點紅色按鈕。」
- 「按『我現在遇到可疑情況』。」
- 「去我的能力頁。」
- 「按左上角。」

應保持 goal-oriented wording，讓受試者自己決定操作路徑。

## 8. Result definitions

- **PASS**：未獲操作提示，自行達成目標。
- **PARTIAL**：最終達成，但有明顯繞路、誤解後自行修正，或需要不指向具體 UI 的輕微提醒。
- **FAIL**：無法完成、放棄，或必須由主持人直接指出應按哪個控制項。
- **NOT_ATTEMPTED**：未執行，不可視為 FAIL。

## 9. Moderator assistance levels

- **Level 0**：不提示。
- **Level 1**：中性提醒，例如「請再看看畫面上還有哪些選項」。
- **Level 2**：只提示功能類型或區域，不說具體按鈕名稱。
- **Level 3**：直接說明操作方式，僅用於避免測試完全中斷；Task 原則上應記為 FAIL，並記錄 assistance level。

## 10. Metrics

每個 Task 建議記錄：

- result
- completion_time
- time_to_first_action
- misclick_count
- backtrack_count
- help_requested
- assistance_level
- path_taken
- moderator_note

產品背景 event 可包含：

- `session_started`
- `home_safety_cta_seen`
- `emergency_cta_clicked`
- `training_primary_clicked`
- `training_started`
- `judgment_selected`
- `answer_submitted`
- `feedback_viewed`
- `scenario_summary_shown`
- `scenario_summary_opened`
- `emergency_risk_selected`
- `verification_route_answered`
- `safe_action_viewed`

不要記錄每 10px scroll、持續 pointer tracking 或其他沒有明確研究必要性的高頻行為資料。

## 11. Reset / seeded-state / deep-link procedure

Usability study deep link 範例：

```text
/prototype/?study=SST-V2&participant=U001&task=T05&route=home
```

受試者看到的仍然是正常 SignalSafe，不顯示 Research Mode。

建議起始狀態：

| Task | startRoute | setup |
|---|---|---|
| T01 | home | fresh-home |
| T02 | home | fresh-home |
| T03 | dashboard | seeded-learning-history |
| T04 | dashboard | seeded-weakness-state |
| T05 | home | fresh-home |
| T06 | emergency | fresh-emergency |
| T07 | emergency | fresh-emergency |
| T08 | emergency | fresh-emergency |

若要執行既有正式 Consent + 24 題 effectiveness research，使用獨立 formal research pipeline；不得把 usability task 結果與正式前後測分數混成同一指標。

## 12. Test setting

- 場域：學校圖書館、自習室或其他安靜、不會被打擾的校內空間。
- 方式：一對一測試，每次一名受測者。
- 設備：統一使用 iPad Air，建議 iPadOS 16 以上，Safari 最新版本。
- 網路：穩定 Wi-Fi。
- 時間：每位約 30–45 分鐘，依個人操作速度而定。
- 主持人位置：側後方觀察，不主動指示操作路徑。

## 13. Recruitment criteria

1. 16–18 歲，高中階段學生。
2. 日常使用智慧型手機，並使用過 LINE、Instagram、遊戲、網路購物或其他數位服務。
3. 能自行閱讀繁體中文，並能獨立操作網頁與填答題目。
4. 未曾參與同版本 SignalSafe 正式研究測試；可曾使用一般模式或快速練習。
5. 若研究採 think-aloud，願意在主持人要求時說出自己的理解、判斷與操作想法。

## 14. Data export

主持人 control 匯出的 usability task data 與產品 learning state、formal research data 分開保存。

輸出使用匿名 Participant ID，只保留完成研究所必要的 task 狀態、時間、路徑與主持人研究欄位。

## 15. Privacy and safety

- 不收集不必要個資。
- 不要求受試者貼真實可疑訊息。
- Scenario B 使用完全合成的訊息，不提供可點擊的真實詐騙網址。
- 不以研究頁替代正式倫理／監護人／校方程序。
- Formal Research 匯出仍沿用既有 consent 與 export validation。

## 16. Limitations

這個 dual-scenario independent-task protocol 主要回答：

> 使用者在具有合理使用意圖的情境下，能不能自己找到並理解 SignalSafe 的核心流程？

它不能單獨回答：

> SignalSafe 是否造成可量化的防詐判斷能力提升？

教育成效仍需使用獨立的前後測設計、足夠樣本、平衡題組與適當統計方法驗證。
