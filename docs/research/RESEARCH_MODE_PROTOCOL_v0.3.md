# SignalSafe v0.3 Research Mode Protocol

## Entry

Use the dedicated entry `/prototype/?mode=research`. The consumer homepage does not link to it.

## Consent boundary

The participant screen only confirms `研究者已完成受試同意程序`. The website does not replace formal consent. For minors, the study must separately follow applicable guardian/school requirements.

## Participant data

Only an anonymous code such as `UT001`, `E001`, or `DRYRUN-001` is accepted. Do not enter name, school, phone, email, social account, address, or other identifying information.

## Formal flow

```text
external consent completed
→ anonymous code
→ Pre 8 (no immediate correctness feedback)
→ Training 8 (immediate teaching feedback)
→ Post 8 (no immediate correctness feedback)
→ dedicated research export
```

During an active research session, Quick, Emergency, Dashboard, and unrelated educational content are not exposed.

## Determinism / resume

A session-specific seed produces deterministic question order and the order is stored. Pause/resume keeps phase, index, answers, order, versions, and timing carry. Timing separates wall time, active response time, and interruption duration.

## Local telemetry

Per response: question shown, first interaction, submission, wall/active time, interruption duration, answer changes, construct, surface scenario, judgment, safe action, signal choice, and confidence. Session data includes pause/resume counts and events.

## Research export

The dedicated JSON export is whitelist-based and includes study/form/app/question-bank versions, anonymous session/participant codes, question order, event timing, and response fields. A recursive PII-key guard rejects forbidden direct-identity keys.

## Interpretation boundary

Engineering readiness does not authorize an effectiveness claim. Human semantic sign-off and study governance remain separate gates.
