# Prototype architecture

The prototype intentionally avoids package-install and cloud-runtime dependencies.

- `bootstrap.mjs`: exposes versioned modules and loads UI parts in order.
- `app-parts/`: screen rendering and interaction flows.
- `question-data/`: six four-question modules composing a 24-question bank.
- `scoring.mjs`: calibrated metrics independent from UI.
- `storage.mjs`: anonymous local persistence and import/export.
- `styles/`: code-native responsive visual system.
- `sw.js`: offline asset cache.
- `tests/`: Node built-in tests for metrics, question balance and asset wiring.

The app is static and can be served with any HTTP file server. No personal data or external API is required.
