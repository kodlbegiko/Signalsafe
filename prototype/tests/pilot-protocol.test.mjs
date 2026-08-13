import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { PILOT_PROTOCOL_VERSION, PILOT_SAMPLE_TARGET, PILOT_TASKS, PILOT_SETTING, PILOT_ELIGIBILITY, PILOT_ASSISTANCE_LEVELS } from "../pilot-protocol.mjs";

test("pilot protocol freezes recommended assignment decisions", () => {
  assert.equal(PILOT_PROTOCOL_VERSION, "signalsafe-pilot-2026-08-13-v1");
  assert.deepEqual(PILOT_SAMPLE_TARGET, { min: 5, max: 8 });
  assert.equal(PILOT_TASKS.length, 4);
  assert.match(PILOT_SETTING.location, /圖書館|自習/);
  assert.match(PILOT_SETTING.device, /iPad Air/);
  assert.equal(PILOT_ELIGIBILITY.length, 4);
  assert.match(PILOT_ELIGIBILITY[0], /16–18/);
  assert.match(PILOT_ELIGIBILITY[3], /未曾完成同版本.*Research Mode/);
  assert.equal(PILOT_ASSISTANCE_LEVELS.length, 4);
});

test("public test guide contains A-D assignment and facilitator rules", () => {
  const guide = fs.readFileSync(new URL("../test-guide.html", import.meta.url), "utf8");
  for (const label of ["A. 設定測試情境", "B. 設定測試任務", "C. 設定測試場域", "D. 招募受測者需符合的關鍵屬性", "Level 0", "Level 3", "5–8"] ) assert.ok(guide.includes(label), label);
  for (const task of PILOT_TASKS) assert.ok(guide.includes(task), `guide missing task: ${task}`);
  assert.ok(guide.includes("學校圖書館、自習空間"));
  assert.ok(guide.includes("iPad Air"));
});

test("homepage layer links the pilot guide and exposes eligibility without replacing Research CTA", () => {
  const layer = fs.readFileSync(new URL("../app-parts/app-v032-pilot.js", import.meta.url), "utf8");
  assert.ok(layer.includes("/prototype/test-guide.html"));
  assert.ok(layer.includes("16–18 歲高中生"));
  assert.ok(layer.includes("PILOT_PROTOCOL_VERSION"));
  const prior = fs.readFileSync(new URL("../app-parts/app-v031-consent.js", import.meta.url), "utf8");
  assert.ok(prior.includes("/prototype/?mode=research"));
});

test("version boundaries keep question bank, study, consent and pilot protocol fixed while app advances", () => {
  const version = JSON.parse(fs.readFileSync(new URL("../VERSION.json", import.meta.url), "utf8"));
  assert.equal(version.appVersion, "0.3.4-research-export-fix");
  assert.equal(version.questionBankVersion, "2026-08-10-v2-candidate");
  assert.equal(version.studyVersion, "signalsafe-study-2026-08-r1");
  assert.equal(version.consentVersion, "signalsafe-consent-2026-08-10-v1");
  assert.equal(version.pilotProtocolVersion, PILOT_PROTOCOL_VERSION);
  assert.equal(version.marketFeasibilityVersion, "signalsafe-market-feasibility-2026-08-13-v1");
});

test("bootstrap and service worker ship pilot assets", () => {
  const bootstrap = fs.readFileSync(new URL("../bootstrap.mjs", import.meta.url), "utf8");
  const sw = fs.readFileSync(new URL("../sw.js", import.meta.url), "utf8");
  assert.ok(bootstrap.includes("pilot-protocol.mjs"));
  assert.ok(bootstrap.includes("app-v032-pilot.js"));
  for (const asset of ["./pilot-protocol.mjs", "./test-guide.html", "./styles/06-v032-pilot.css", "./app-parts/app-v032-pilot.js"]) assert.ok(sw.includes(asset), asset);
});
