# Quick Bank Separation Audit — v0.3

## Finding

v0.2 `pickQuickQuestions()` sampled from the combined Pre + Training + Post pool. A participant using Quick before a formal study could therefore see formal items. Severity: **P1 research contamination risk**.

## v0.3 control

- `prototype/question-data/quick.mjs`: 12 dedicated Quick items.
- Quick IDs use `quick-*` and are excluded from the 24 formal items.
- Quick sampling reads only `QUICK_BANK`.
- Every 3-item Quick sample contains risk, insufficient, and trusted.
- Every Quick item has `constructId` and `surfaceScenario`.

## Automated evidence

`quick-bank-independence.test.mjs` checks ID intersection, minimum bank size, surface uniqueness, three-class balance, exact message/option clones, and a normalized bigram similarity threshold for near-clones.

This audit proves engineering separation only. Human semantic review remains required for educational validity.
