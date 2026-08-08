# SignalSafe Question Bank Semantic Review — 2026-08-08

> Executed 2026-08-09 (Asia/Taipei). This is an AI-assisted semantic QA review, not human anti-fraud/pedagogy sign-off and not empirical item-difficulty validation.

## Executive Summary

- Evidence: **L1 source/content inspection**, plus L2 deterministic guardrails for machine-checkable invariants.
- Scope: all **24** questions in Question Bank `2026-08-01-r1`.
- Corrected item-level verdict count: **11 PASS / 10 WARN / 3 FAIL**.
- P0: **0**.
- P1 semantic blockers: **3** — `train-04`, `train-08`, `post-08`.
- Question content and answer keys were **not** silently changed. Any change to classification, safe-action key, major scenario facts or measured construct requires explicit review and likely a Question Bank version bump.

The main blocking issue is the operational boundary between **「有明顯風險」 (`risk`)** and **「資訊不足」 (`insufficient`)**. Three items keyed as `insufficient` already contain an explicit high-risk request, so a reasonable participant can choose `risk` without misunderstanding the scenario. Scoring those responses as wrong would confound participant ability with an unresolved authoring convention.

## Method

Each item was reviewed for scenario realism, classification validity, action validity, signal validity, distractor quality, answer leakage, reading load and educational safety. Difficulty is an **AI-reviewer estimate only** (`Easy/Medium/Hard`). No item-response data exists yet.

Legend: `P` = PASS, `W` = WARN, `F` = FAIL.

## Per-question review

| ID | Stage | Key | Est. difficulty | Realism | Class | Action | Signal | Distractor | Leakage | Reading | Safety | Main issue / recommendation | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| pre-01 | Pre | risk | Easy | P | P | P | P | P | P | P | P | Familiar-account voting/login pressure is coherent; keep. | **PASS** |
| pre-02 | Pre | trusted | Easy | P | P | P | P | W | P | P | P | Some wrong options are obviously extreme; observe whether too easy. | **WARN** |
| pre-03 | Pre | risk | Easy | P | P | P | P | P | P | P | P | Risk and independent verification path are clear; keep. | **PASS** |
| pre-04 | Pre | insufficient | Medium | P | W | P | P | P | P | P | P | Unknown organizer + large PII request + scarcity sits near risk boundary; human taxonomy review. | **WARN** |
| pre-05 | Pre | risk | Easy | P | P | P | P | P | P | P | P | OTP request + account-disable threat clearly supports risk; keep. | **PASS** |
| pre-06 | Pre | trusted | Easy | P | P | P | P | W | P | P | P | Official portal path is coherent; distractors may be too easy. | **WARN** |
| pre-07 | Pre | trusted | Easy | P | P | P | P | W | P | P | P | Correct path is clear; distractors may be too easy. | **WARN** |
| pre-08 | Pre | insufficient | Medium | P | W | P | P | P | P | P | P | Unknown seller + advance deposit is near risk boundary; human taxonomy review. | **WARN** |
| train-01 | Training | risk | Easy | P | P | P | P | P | P | P | P | Prepay-to-work + guaranteed return is coherent; keep. | **PASS** |
| train-02 | Training | trusted | Easy | P | P | P | P | P | P | P | P | Existing-app verification teaches transferable safe behavior; keep. | **PASS** |
| train-03 | Training | risk | Easy | P | P | P | P | P | P | P | P | ATM instruction is a clear unsafe behavior; keep. | **PASS** |
| train-04 | Training | insufficient | Medium | P | F | P | P | P | P | P | F | Domain mismatch + same-day NT$3,000 deposit already creates explicit risk. **P1: human review; key change would require QB version review.** | **FAIL** |
| train-05 | Training | trusted | Easy | P | P | P | P | W | P | P | P | Trusted path is coherent; distractors may be too easy. | **WARN** |
| train-06 | Training | risk | Easy | P | P | P | P | P | P | P | P | Guaranteed profit + inside information + transfer request supports risk; keep. | **PASS** |
| train-07 | Training | trusted | Easy | P | P | P | P | W | P | P | P | School system + low-sensitivity data + physical verification is coherent; distractors may be easy. | **WARN** |
| train-08 | Training | insufficient | Medium | P | F | P | P | P | P | P | F | Short URL + address re-entry + payment is already an explicit phishing-risk request. **P1: human review; key change would require QB version review.** | **FAIL** |
| post-01 | Post | risk | Easy | P | P | P | P | P | P | P | P | Impersonation + urgency + third-party account supports risk; keep. | **PASS** |
| post-02 | Post | trusted | Easy | P | P | P | P | W | P | P | P | Self-opened ticketing app is coherent; distractors may be too easy. | **WARN** |
| post-03 | Post | risk | Easy | P | P | P | P | P | P | P | P | Card + OTP + identity-document request clearly supports risk; keep. | **PASS** |
| post-04 | Post | risk | Medium | P | P | P | P | P | P | P | P | Authority claim + sensitive-data/account request supports risk; keep. | **PASS** |
| post-05 | Post | trusted | Easy | P | P | P | P | W | P | P | P | Existing school reset flow is coherent; distractors may be too easy. | **WARN** |
| post-06 | Post | insufficient | Medium | P | P | P | P | P | P | P | P | Official marketplace is positive evidence but seller/price remain uncertain; good `insufficient` anchor. | **PASS** |
| post-07 | Post | trusted | Easy | P | P | P | P | W | P | P | P | Approved platform + receipt + verifiable purpose supports trusted; distractors may be easy. | **WARN** |
| post-08 | Post | insufficient | Medium | P | F | P | P | P | P | P | F | Unverified recruiter + unknown installer already contains an explicit high-risk action. **P1: human review; current key threatens Post calibration validity.** | **FAIL** |

### Count reconciliation

The item-level verdicts above total exactly **24 = 11 PASS + 10 WARN + 3 FAIL**. The earlier `19 PASS / 2 WARN / 3 FAIL` summary was a documentation counting error and has been corrected rather than preserved.

## Pre/Post Pairing Matrix

| Pre | Post | Underlying skill | Surface similarity | Difficulty similarity | Leakage risk | Verdict |
|---|---|---|---|---|---|---|
| pre-01 | post-01 | impersonation, urgency resistance, independent contact verification | Medium | Similar | Low | PASS |
| pre-02 | post-02 | trusted-source judgment through self-opened existing app | Low | Similar | Low | PASS |
| pre-03 | post-04 | claimed authority vs sensitive requests; independent official verification | Low | Post slightly harder | Low | PASS |
| pre-04 | post-08 | unverified organizer/employer plus risky request | Medium | Similar | Medium | **BLOCKED by post-08 ambiguity** |
| pre-05 | post-03 | credential / OTP protection | Medium | Similar | Medium | PASS |
| pre-06 | post-05 | institutional notification via existing official portal | High | Similar | Medium | WARN — surface form may reward memorization |
| pre-07 | post-07 | trusted routine activity with approved verification path | Low | Similar | Low | PASS |
| pre-08 | post-06 | mixed-signal transaction; stay in official mechanism and verify | Medium | Similar | Low | PASS |

The pairing is conceptually plausible, but empirical equivalence is unproven. `post-08` prevents claiming clean construct equivalence across all pairs.

## Training Transfer Review

### Strengths

- Explanations generally state **why**, not only the answer.
- Safe actions consistently redirect to an independent/original official channel.
- Training includes trusted examples, reducing the incentive to classify everything as risk.
- No executable live URL appears in scenario messages.
- Automated semantic guardrails verify credited actions are explicitly marked safe and credited signals exist.

### Blocking weakness

`train-04` and `train-08` teach `insufficient` in situations that already contain a direct high-risk request. Because these are Training items, the issue is pedagogical as well as scoring-related: the feedback may teach an unstable risk threshold.

## Distribution Summary

| Stage | Easy | Medium | Hard | risk | insufficient | trusted |
|---|---:|---:|---:|---:|---:|---:|
| Pre | 6 | 2 | 0 | 3 | 2 | 3 |
| Training | 6 | 2 | 0 | 3 | 2 | 3 |
| Post | 5 | 3 | 0 | 3 | 2 | 3 |

The label distribution is balanced. Estimated difficulty is broadly balanced, but there are no estimated Hard items and several trusted-item distractors are easy to eliminate. This is a measurement limitation, not empirical proof of item difficulty.

## Blocking Findings

### P1 — classification taxonomy is not operationally stable

1. `train-04`: domain mismatch + same-day NT$3,000 deposit.
2. `train-08`: short URL + address re-entry + payment.
3. `post-08`: unverified recruiter + unknown installer.

A reasonable participant can choose **「有明顯風險」** on all three. Until the team defines the `risk` vs `insufficient` threshold and resolves the keys, the current bank should **not** be treated as formally frozen for scored human testing.

## Non-blocking Improvements

- Several trusted items need more plausible distractors in a later bank revision.
- Boundary items `pre-04` and `pre-08` should be reviewed with the same taxonomy rule.
- `pre-06` ↔ `post-05` may have moderate surface leakage.
- No per-item authoritative source/rewrite citation and named human-review status are recorded in the question objects; Issue #4 therefore remains open.

## Human Expert Review Required

A human anti-fraud / pedagogy reviewer must explicitly decide:

1. the operational rule distinguishing `risk` from `insufficient`;
2. the classification of `train-04`, `train-08`, and `post-08`;
3. the boundary status of `pre-04` and `pre-08`;
4. whether any change triggers a new Question Bank version;
5. per-item source/rewrite basis and reviewer status.

**Semantic QA status: BLOCKED by unresolved P1 classification validity.**
