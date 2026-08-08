import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const prototypeDir = path.resolve(here, "..");
const read = (relative) => fs.readFileSync(path.join(prototypeDir, relative), "utf8");
const css = `${read("styles/01.css")}\n${read("styles/02.css")}`;
const quick = read("app-parts/app-quick.js");
const assessment = read("app-parts/app-assessment.js");
const insights = read("app-parts/app-insights.js");
const core = read("app-parts/app-core.js");
const runtime = read("app-parts/app-runtime.js");

function hexToRgb(hex) {
  const normalized = hex.replace("#", "");
  return [0, 2, 4].map((index) => Number.parseInt(normalized.slice(index, index + 2), 16) / 255);
}
function luminance(hex) {
  const linear = hexToRgb(hex).map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}
function contrast(a, b) {
  const [high, low] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (high + 0.05) / (low + 0.05);
}

test("interactive controls have a visible high-contrast focus treatment", () => {
  assert.match(css, /button:focus-visible, input:focus-visible, \.file-button:focus-within \{ outline: 3px solid var\(--blue\)/);
  assert.doesNotMatch(css, /outline\s*:\s*none/i);
});

test("known compact controls meet the 44px static target", () => {
  assert.match(css, /\.icon-button \{ width: 44px; height: 44px;/);
  assert.match(css, /\.text-button, \.resume-link, \.back-button \{ min-height: 44px;/);
  assert.match(css, /\.button \{ min-height: 46px;/);
});

test("file import remains keyboard-focusable instead of display-none", () => {
  assert.doesNotMatch(css, /\.file-button input\s*\{\s*display\s*:\s*none/);
  assert.match(css, /\.file-button input\{position:absolute;width:1px;height:1px/);
});

test("dynamic selection controls expose selected state", () => {
  for (const [name, source, patterns] of [
    ["quick", quick, [/data-select-action=.*aria-pressed=/, /data-select-signal=.*aria-pressed=/]],
    ["assessment", assessment, [/data-assessment-action=.*aria-pressed=/, /data-assessment-judgment=.*aria-pressed=/, /data-assessment-signal=.*aria-pressed=/, /data-assessment-confidence=.*aria-pressed=/]],
    ["emergency", insights, [/data-emergency-request=.*aria-pressed=/, /data-emergency-official="yes" aria-pressed=/]],
  ]) {
    for (const pattern of patterns) assert.match(source, pattern, `${name} missing ${pattern}`);
  }
});

test("selection rerenders preserve keyboard focus by token", () => {
  assert.match(runtime, /captureFocusToken\(\)/);
  assert.match(runtime, /restoreFocusToken\(focusToken\)/);
  assert.match(runtime, /focus\(\{preventScroll:true\}\)/);
});

test("progress and status changes have machine-readable semantics", () => {
  assert.match(quick, /role="progressbar"/);
  assert.match(assessment, /role="progressbar"/);
  assert.match(insights, /metric-bar__track" role="progressbar"/);
  assert.match(core, /node\.setAttribute\("aria-live"/);
  assert.match(core, /node\.setAttribute\("aria-atomic", "true"\)/);
});

test("reduced-motion fallback is present", () => {
  assert.match(css, /@media\(prefers-reduced-motion:reduce\)/);
});

test("status text colors meet WCAG AA normal-text contrast on their soft backgrounds", () => {
  assert.ok(contrast("#a85b0f", "#fff2e4") >= 4.5);
  assert.ok(contrast("#157d58", "#e8f7f1") >= 4.5);
  assert.ok(contrast("#b53b4a", "#fff0f2") >= 4.5);
  assert.ok(contrast("#0f5bd7", "#ffffff") >= 4.5);
  assert.ok(contrast("#5f6f82", "#ffffff") >= 4.5);
});
