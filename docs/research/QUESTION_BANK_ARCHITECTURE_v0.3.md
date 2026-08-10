# SignalSafe v0.3 Question Bank Architecture

Status: candidate engineering architecture. Human domain sign-off is still required for `train-04`, `train-08`, and `post-08`.

## Version boundary

- Frozen v0.2 evidence remains under `docs/research/usability/` and is not rewritten.
- App: `0.3.0-usability-r2-candidate`
- Question bank: `2026-08-10-v2-candidate`
- Study: `signalsafe-study-2026-08-r1`

## Bank separation

```text
Daily Training
  QUICK_BANK (12 independent items)
  -> randomly select 3
  -> one risk + one insufficient + one trusted

Formal / Research
  Pre A (8)
  Training (8)
  Post B (8)

Future parallel forms
  Pre B
  Post A
```

Quick may share a construct with formal items, but must not share IDs, message wording, surface scenarios, or cloned option sets.

## Construct pairing

| Pair | Construct | Pre | Pre surface | Post | Post surface |
|---|---|---|---|---|---|
| 01 | credential-protection | pre-01 | social-vote | post-03 | streaming-refund |
| 02 | official-channel | pre-02 | school-event-reminder | post-02 | ticket-delivery |
| 03 | payment-stop | pre-03 | marketplace-receiving | post-01 | family-borrowing |
| 04 | independent-verification | pre-04 | volunteer-recruitment | post-08 | internship-invitation |
| 05 | sensitive-data-protection | pre-05 | payment-otp-alert | post-04 | grant-application |
| 06 | official-workflow | pre-06 | scholarship-supplement | post-07 | club-fee |
| 07 | known-platform-verification | pre-07 | in-game-event | post-05 | course-registration |
| 08 | mixed-signal-verification | pre-08 | ticket-resale | post-06 | game-marketplace |

## Automated guards

- `quick-bank-independence.test.mjs`: ID intersection, class balance, surface uniqueness, clone guard.
- `construct-pairing.test.mjs`: eight Pre/Post construct pairs and different surface scenarios.
- Existing phase/category balance tests remain active.

Passing structure tests proves engineering separation, not psychometric parallelism or human domain validity.
