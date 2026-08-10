# SignalSafe Research Mode Protocol v0.3.1

Status: engineering protocol for `0.3.1-research-entry-consent`.

## Entry

Consumer homepage exposes a dedicated Research Mode card with same-origin CTA:

`/prototype/?mode=research`

The card is additive. 90-second Quick, full consumer training, Insights, and Emergency remain available in the consumer product, but are hidden once formal Research Mode begins.

## Consent sequence

Research Mode uses four explicit stages:

1. Read the complete participation notice.
2. Confirm four required acknowledgements and explicitly choose whether to participate.
3. Enter the anonymous Participant ID supplied by the researcher.
4. Begin the formal Pre / Training / Post workflow.

Current consent version: `signalsafe-consent-2026-08-10-v1`.

The website confirmation is not represented as a substitute for separate school, guardian, ethics/IRB, administrative, or other procedures when those are required.

## Formal flow

- Pre-test: 8 questions; no immediate correctness feedback.
- Training: 8 questions; immediate five-part learning feedback.
- Post-test: 8 questions; no immediate correctness feedback.
- Formal question ordering remains deterministic per research session.
- Quick bank remains separate from formal research items.

## Consent metadata

A completed research session carries:

- `consentVersion`
- `consentReviewed`
- `consentReviewedAt`
- `consentAccepted`
- `consentAcceptedAt`
- `consentAcknowledgements`

The research JSON export includes the same metadata. Direct identity fields remain excluded.

If the current consent version differs from an unfinished session/draft, the old draft is not treated as valid consent. The participant must complete the current participation notice before the research session can continue.

## Participant ID

Use anonymous codes only, for example `UT001`, `U004`, `E001`, or `DRYRUN-001`.

Do not enter names, school names, phone numbers, email addresses, social handles, passwords, OTPs, payment credentials, or other direct identifiers.

Any real-identity-to-participant-code mapping must be managed outside the SignalSafe research export and stored separately.

## Pause and withdrawal

Participants may pause an active research session. Research Mode also exposes an explicit exit control.

`退出研究並清除本次未完成紀錄` clears only `activeAssessment` for the current unfinished research session. It must not delete consumer history, other completed sessions, or already exported external files.

## Evidence boundary

This protocol supports pilot collection workflow and engineering validation. It does not by itself establish educational effectiveness, formal ethics approval, guardian consent completion, physical iPad acceptance, VoiceOver acceptance, or human semantic sign-off.

The existing pending gates remain pending, including `train-04`, `train-08`, `post-08`, physical iPad Air M1 Safari, and physical VoiceOver review.
