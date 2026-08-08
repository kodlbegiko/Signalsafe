# SignalSafe Question Bank Semantic Review — 2026-08-08 (executed 2026-08-09 Asia/Taipei)

## Executive Summary

- Evidence level: **L1 — source/content inspection**, with L2 structural tests for machine-checkable invariants.
- Scope: all **24** questions in Question Bank `2026-08-01-r1`.
- AI semantic review result: **19 PASS / 2 WARN / 3 FAIL**.
- P0: **0**.
- P1 semantic blockers: **3** — `train-04`, `train-08`, `post-08`.
- No question answer/classification was changed in this mission because doing so would alter the measured construct and likely require a Question Bank version bump.
- Human anti-fraud / pedagogy sign-off remains required. This document is **not** a human expert sign-off and does not validate empirical item difficulty.

The common blocking issue is the operational boundary between **「有明顯風險」** and **「資訊不足」**. Several `insufficient` items contain a direct risky request (same-day deposit, short-link payment/address entry, or an unknown installer). In a three-label UI where `risk` literally means “有明顯風險”, these items can be semantically double-keyed.

## Method

Each item was reviewed for:
1. scenario realism for 16–18-year-old users;
2. classification validity;
3. safest-action validity and uniqueness;
4. signal validity;
5. distractor plausibility;
6. answer leakage;
7. reading/cognitive load;
8. educational safety.

Difficulty labels below are **AI-reviewer estimates only**, not empirical item-response difficulty. Source/rewrite basis for the bank is synthetic scenario content in the repository; no per-item authoritative case-source citation is presently recorded in the question objects.

## Per-question review

### pre-01

- Stage: Pre
- Expected classification: `risk`
- Estimated difficulty: Easy
- Scenario realism: PASS
- Classification validity: PASS
- Action validity: PASS
- Signal validity: PASS
- Distractor quality: PASS
- Answer leakage: PASS
- Reading load: PASS
- Educational safety: PASS
- Issues: 無阻塞。
- Recommended action: 維持。
- Verdict: **PASS**

### pre-02

- Stage: Pre
- Expected classification: `trusted`
- Estimated difficulty: Easy
- Scenario realism: PASS
- Classification validity: PASS
- Action validity: PASS
- Signal validity: PASS
- Distractor quality: WARN
- Answer leakage: PASS
- Reading load: PASS
- Educational safety: PASS
- Issues: 部分誘答（如「全部當成詐騙並封鎖導師」）偏容易排除，可能降低鑑別難度。
- Recommended action: 維持題意；真人測試觀察是否過易。
- Verdict: **WARN**

### pre-03

- Stage: Pre
- Expected classification: `risk`
- Estimated difficulty: Easy
- Scenario realism: PASS
- Classification validity: PASS
- Action validity: PASS
- Signal validity: PASS
- Distractor quality: PASS
- Answer leakage: PASS
- Reading load: PASS
- Educational safety: PASS
- Issues: 無阻塞。
- Recommended action: 維持。
- Verdict: **PASS**

### pre-04

- Stage: Pre
- Expected classification: `insufficient`
- Estimated difficulty: Medium
- Scenario realism: PASS
- Classification validity: WARN
- Action validity: PASS
- Signal validity: PASS
- Distractor quality: PASS
- Answer leakage: PASS
- Reading load: PASS
- Educational safety: PASS
- Issues: 主辦資訊缺失＋一開始蒐集姓名、手機、生日、家長聯絡方式＋稀缺催促，已存在可感知風險；「資訊不足」與「有明顯風險」邊界需要統一定義。
- Recommended action: 保留現版避免靜默改 construct；列入人工領域審查。
- Verdict: **WARN**

### pre-05

- Stage: Pre
- Expected classification: `risk`
- Estimated difficulty: Easy
- Scenario realism: PASS
- Classification validity: PASS
- Action validity: PASS
- Signal validity: PASS
- Distractor quality: PASS
- Answer leakage: PASS
- Reading load: PASS
- Educational safety: PASS
- Issues: OTP 要求與停用威脅足以支持明顯風險。
- Recommended action: 維持。
- Verdict: **PASS**

### pre-06

- Stage: Pre
- Expected classification: `trusted`
- Estimated difficulty: Easy
- Scenario realism: PASS
- Classification validity: PASS
- Action validity: PASS
- Signal validity: PASS
- Distractor quality: WARN
- Answer leakage: PASS
- Reading load: PASS
- Educational safety: PASS
- Issues: 誘答較明顯，但官方系統補件路徑合理。
- Recommended action: 維持；真人測試觀察難度。
- Verdict: **WARN**

### pre-07

- Stage: Pre
- Expected classification: `trusted`
- Estimated difficulty: Easy
- Scenario realism: PASS
- Classification validity: PASS
- Action validity: PASS
- Signal validity: PASS
- Distractor quality: WARN
- Answer leakage: PASS
- Reading load: PASS
- Educational safety: PASS
- Issues: 正確路徑清楚，誘答較容易。
- Recommended action: 維持。
- Verdict: **WARN**

### pre-08

- Stage: Pre
- Expected classification: `insufficient`
- Estimated difficulty: Medium
- Scenario realism: PASS
- Classification validity: WARN
- Action validity: PASS
- Signal validity: PASS
- Distractor quality: PASS
- Answer leakage: PASS
- Reading load: PASS
- Educational safety: PASS
- Issues: 未知賣家要求先付保留金本身已有金流風險；雖仍不足以判定賣家身分真假，但與「有明顯風險」標籤存在語意競合。
- Recommended action: 保留現版；人工審查 taxonomy。
- Verdict: **WARN**

### train-01

- Stage: Training
- Expected classification: `risk`
- Estimated difficulty: Easy
- Scenario realism: PASS
- Classification validity: PASS
- Action validity: PASS
- Signal validity: PASS
- Distractor quality: PASS
- Answer leakage: PASS
- Reading load: PASS
- Educational safety: PASS
- Issues: 先儲值才能工作＋保證高報酬，風險與安全行動一致。
- Recommended action: 維持。
- Verdict: **PASS**

### train-02

- Stage: Training
- Expected classification: `trusted`
- Estimated difficulty: Easy
- Scenario realism: PASS
- Classification validity: PASS
- Action validity: PASS
- Signal validity: PASS
- Distractor quality: PASS
- Answer leakage: PASS
- Reading load: PASS
- Educational safety: PASS
- Issues: 把正常安全通知與釣魚通知區分開，且回原 App 查證。
- Recommended action: 維持。
- Verdict: **PASS**

### train-03

- Stage: Training
- Expected classification: `risk`
- Estimated difficulty: Easy
- Scenario realism: PASS
- Classification validity: PASS
- Action validity: PASS
- Signal validity: PASS
- Distractor quality: PASS
- Answer leakage: PASS
- Reading load: PASS
- Educational safety: PASS
- Issues: ATM 解除設定為明確錯誤行為，教學安全。
- Recommended action: 維持。
- Verdict: **PASS**

### train-04

- Stage: Training
- Expected classification: `insufficient`
- Estimated difficulty: Medium
- Scenario realism: PASS
- Classification validity: FAIL
- Action validity: PASS
- Signal validity: PASS
- Distractor quality: PASS
- Answer leakage: PASS
- Reading load: PASS
- Educational safety: FAIL
- Issues: 寄件網域與官網不同＋要求當日匯 3,000 元保證金，已同時存在來源異常、金流與時間壓力；在 UI 分類「有明顯風險／資訊不足」下，標成 insufficient 可能教低風險閾值。
- Recommended action: P1。不得在本輪靜默改答案；需人工領域審查，若改 classification 應升 Question Bank version。
- Verdict: **FAIL**

### train-05

- Stage: Training
- Expected classification: `trusted`
- Estimated difficulty: Easy
- Scenario realism: PASS
- Classification validity: PASS
- Action validity: PASS
- Signal validity: PASS
- Distractor quality: WARN
- Answer leakage: PASS
- Reading load: PASS
- Educational safety: PASS
- Issues: 正確路徑清楚；誘答偏容易。
- Recommended action: 維持。
- Verdict: **WARN**

### train-06

- Stage: Training
- Expected classification: `risk`
- Estimated difficulty: Easy
- Scenario realism: PASS
- Classification validity: PASS
- Action validity: PASS
- Signal validity: PASS
- Distractor quality: PASS
- Answer leakage: PASS
- Reading load: PASS
- Educational safety: PASS
- Issues: 保證獲利＋內線＋匯款代操足以支持 risk。
- Recommended action: 維持。
- Verdict: **PASS**

### train-07

- Stage: Training
- Expected classification: `trusted`
- Estimated difficulty: Easy
- Scenario realism: PASS
- Classification validity: PASS
- Action validity: PASS
- Signal validity: PASS
- Distractor quality: WARN
- Answer leakage: PASS
- Reading load: PASS
- Educational safety: PASS
- Issues: 校內系統＋低敏資料＋實體核對，可信判斷合理；誘答偏容易。
- Recommended action: 維持。
- Verdict: **WARN**

### train-08

- Stage: Training
- Expected classification: `insufficient`
- Estimated difficulty: Medium
- Scenario realism: PASS
- Classification validity: FAIL
- Action validity: PASS
- Signal validity: PASS
- Distractor quality: PASS
- Answer leakage: PASS
- Reading load: PASS
- Educational safety: FAIL
- Issues: 短網址＋重填地址＋小額付款是典型高風險請求組合；「近期確實網購」只能增加迷惑性，不能消除明顯風險。Training 階段若回饋為 insufficient 可能弱化釣魚辨識。
- Recommended action: P1。需人工領域審查；若改 classification 應升 Question Bank version。
- Verdict: **FAIL**

### post-01

- Stage: Post
- Expected classification: `risk`
- Estimated difficulty: Easy
- Scenario realism: PASS
- Classification validity: PASS
- Action validity: PASS
- Signal validity: PASS
- Distractor quality: PASS
- Answer leakage: PASS
- Reading load: PASS
- Educational safety: PASS
- Issues: 阻止原方式確認＋第三方帳戶＋急迫借款，risk 合理。
- Recommended action: 維持。
- Verdict: **PASS**

### post-02

- Stage: Post
- Expected classification: `trusted`
- Estimated difficulty: Easy
- Scenario realism: PASS
- Classification validity: PASS
- Action validity: PASS
- Signal validity: PASS
- Distractor quality: WARN
- Answer leakage: PASS
- Reading load: PASS
- Educational safety: PASS
- Issues: 原售票 App 自行查看、無登入連結，可信路徑合理；誘答偏容易。
- Recommended action: 維持。
- Verdict: **WARN**

### post-03

- Stage: Post
- Expected classification: `risk`
- Estimated difficulty: Easy
- Scenario realism: PASS
- Classification validity: PASS
- Action validity: PASS
- Signal validity: PASS
- Distractor quality: PASS
- Answer leakage: PASS
- Reading load: PASS
- Educational safety: PASS
- Issues: 同時索取卡片、OTP、身分證，risk 明確。
- Recommended action: 維持。
- Verdict: **PASS**

### post-04

- Stage: Post
- Expected classification: `risk`
- Estimated difficulty: Medium
- Scenario realism: PASS
- Classification validity: PASS
- Action validity: PASS
- Signal validity: PASS
- Distractor quality: PASS
- Answer leakage: PASS
- Reading load: PASS
- Educational safety: PASS
- Issues: 政府 Logo、無承辦單位、敏感資料與帳密要求，已構成明顯風險。
- Recommended action: 維持。
- Verdict: **PASS**

### post-05

- Stage: Post
- Expected classification: `trusted`
- Estimated difficulty: Easy
- Scenario realism: PASS
- Classification validity: PASS
- Action validity: PASS
- Signal validity: PASS
- Distractor quality: WARN
- Answer leakage: PASS
- Reading load: PASS
- Educational safety: PASS
- Issues: 原校務系統＋既有重設功能合理；誘答偏容易。
- Recommended action: 維持。
- Verdict: **WARN**

### post-06

- Stage: Post
- Expected classification: `insufficient`
- Estimated difficulty: Medium
- Scenario realism: PASS
- Classification validity: PASS
- Action validity: PASS
- Signal validity: PASS
- Distractor quality: PASS
- Answer leakage: PASS
- Reading load: PASS
- Educational safety: PASS
- Issues: 官方交易所是正面訊號，但低價與新帳號仍不足以確認；留在官方機制，insufficient 與 safe action 相容。
- Recommended action: 維持；此題是目前最清楚的 insufficient 範例。
- Verdict: **PASS**

### post-07

- Stage: Post
- Expected classification: `trusted`
- Estimated difficulty: Easy
- Scenario realism: PASS
- Classification validity: PASS
- Action validity: PASS
- Signal validity: PASS
- Distractor quality: WARN
- Answer leakage: PASS
- Reading load: PASS
- Educational safety: PASS
- Issues: 金額用途可核對、收據、核准平台，trusted 合理；誘答偏容易。
- Recommended action: 維持。
- Verdict: **WARN**

### post-08

- Stage: Post
- Expected classification: `insufficient`
- Estimated difficulty: Medium
- Scenario realism: PASS
- Classification validity: FAIL
- Action validity: PASS
- Signal validity: PASS
- Distractor quality: PASS
- Answer leakage: PASS
- Reading load: PASS
- Educational safety: FAIL
- Issues: 未核對 HR／職缺／寄件網域，同時要求下載不明安裝檔。即使公司真實，『不明安裝檔』本身已是明顯風險要求；標 insufficient 會污染後測分類效度。
- Recommended action: P1。需人工領域審查；若改 classification 應升 Question Bank version。
- Verdict: **FAIL**

## Pre/Post Pairing Matrix

| Pre | Post | Underlying skill | Surface similarity | Difficulty similarity | Leakage risk | Verdict |
|---|---|---|---|---|---|---|
| pre-01 | post-01 | impersonation, urgency resistance, independent contact verification | Medium | Similar | Low | PASS |
| pre-02 | post-02 | trusted-source judgment via self-opened existing app | Low | Similar | Low | PASS |
| pre-03 | post-04 | claimed authority/service vs sensitive requests; independent official verification | Low | Post slightly harder | Low | PASS |
| pre-04 | post-08 | unverified organizer/employer plus premature risky request | Medium | Similar | Medium | **BLOCKED by post-08 classification ambiguity** |
| pre-05 | post-03 | credential/OTP protection | Medium | Similar | Medium | PASS |
| pre-06 | post-05 | institutional notification via existing official portal | High | Similar | Medium | WARN — surface form is similar enough that transfer may partly reward memorization |
| pre-07 | post-07 | trusted routine activity with official/approved verification path | Low | Similar | Low | PASS |
| pre-08 | post-06 | mixed-signal transaction; avoid prepayment/off-platform action while verifying | Medium | Similar | Low | PASS |

The pairing matrix is conceptually plausible, but empirical equivalence is not established. `post-08` prevents claiming clean construct equivalence for all pairs.

## Training Transfer Review

Strengths:
- explanations usually state **why** rather than only naming the answer;
- safe actions consistently redirect to an independent/original official channel;
- Training includes trusted examples, reducing the incentive to classify everything as dangerous;
- no live URL is embedded in scenario messages;
- safe-action keys align with action metadata in automated checks.

Blocking weakness:
- `train-04` and `train-08` teach `insufficient` in situations that already contain an explicit high-risk request. Because these are Training items, this is more serious than a mere scoring disagreement: the feedback may teach an unstable decision threshold.

## Distribution Summary

| Stage | Easy | Medium | Hard | risk | insufficient | trusted |
|---|---:|---:|---:|---:|---:|---:|
| Pre | 6 | 2 | 0 | 3 | 2 | 3 |
| Training | 6 | 2 | 0 | 3 | 2 | 3 |
| Post | 5 | 3 | 0 | 3 | 2 | 3 |

The label distribution is balanced. Estimated difficulty is also broadly balanced, but there are **no Hard items**, and several trusted-item distractors are obviously unsafe. This is a non-blocking limitation for a first usability round but limits discrimination if the instrument is later used as a stronger learning-effect measure.

## Blocking Findings

### P1 — Classification taxonomy is not operationally stable for three items

1. `train-04`: domain mismatch + same-day NT$3,000 deposit.
2. `train-08`: short URL + address re-entry + payment.
3. `post-08`: unverified recruiter + unknown installer.

For all three, a reasonable participant can select **「有明顯風險」** without misunderstanding the scenario. Treating that answer as wrong would confound “calibration” with an unresolved authoring convention.

### Why the bank was not changed automatically

Changing `correctJudgment` would:
- change scoring;
- change Pre/Training/Post construct balance;
- change what Training teaches;
- affect comparability with any prior pilot data;
- normally require a Question Bank version bump.

Therefore the correct action in this mission is **document + block + human review**, not silent mutation.

## Non-blocking Improvements

- Several trusted items use distractors that are easy to eliminate; later revisions can make wrong options more plausible without becoming unsafe.
- `pre-04` and `pre-08` also sit near the risk/insufficient boundary and should be included in the same human taxonomy review.
- `pre-06` ↔ `post-05` share a school/portal surface pattern and may have moderate transfer leakage.
- No per-item authoritative source/rewrite citation is recorded in the question objects; Issue #4 should remain open until source/rewrite basis and human reviewer fields are completed.

## Human Expert Review Required

A human anti-fraud / pedagogy reviewer should explicitly approve:
1. an operational rule distinguishing `risk` from `insufficient`;
2. `train-04`, `train-08`, and `post-08`;
3. boundary items `pre-04` and `pre-08`;
4. whether any classification change requires a new Question Bank version;
5. per-item source/rewrite basis and reviewer status.

**Semantic QA status: BLOCKED by unresolved P1 classification validity.**
