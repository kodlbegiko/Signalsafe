import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { PILOT_PROTOCOL_VERSION, PILOT_SAMPLE_TARGET, PILOT_TASKS, PILOT_SETTING, PILOT_ELIGIBILITY, PILOT_ASSISTANCE_LEVELS } from "../pilot-protocol.mjs";
import { SIGNALSAFE_V2_PROTOCOL_VERSION, V2_RESEARCH_SCENARIOS, V2_RESEARCH_TASKS } from "../study-v2.mjs";

test("legacy pilot protocol remains frozen for historical research traceability", () => {
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

test("public test guide now reflects the current dual-scenario independent-task protocol", () => {
  const guide = fs.readFileSync(new URL("../test-guide.html", import.meta.url), "utf8");
  assert.equal(SIGNALSAFE_V2_PROTOCOL_VERSION, "signalsafe-v2-usability-2026-08-16");
  assert.equal(V2_RESEARCH_SCENARIOS.length, 2);
  assert.equal(V2_RESEARCH_TASKS.length, 8);
  for (const label of [
    "A. 測試方法",
    "B. 情境一：老師要求進行防詐訓練",
    "C. 情境二：收到疑似帳號異常通知",
    "D. 任務結果判定",
    "E. 測試場域",
    "F. 招募受測者條件",
    "G. Deep Link 與研究資料邊界",
    "PASS",
    "PARTIAL",
    "FAIL",
    "NOT ATTEMPTED",
  ]) assert.ok(guide.includes(label), label);
  for (const task of V2_RESEARCH_TASKS) {
    assert.ok(guide.includes(task.id), `guide missing task id: ${task.id}`);
    assert.ok(guide.includes(task.participantPrompt), `guide missing participant prompt: ${task.id}`);
  }
  assert.ok(guide.includes("學校圖書館、自習室"));
  assert.ok(guide.includes("iPad Air"));
  assert.ok(guide.includes("前一任務 FAIL 不代表下一任務不能測"));
  assert.ok(!guide.includes("?mode=research"));
});

test("legacy homepage pilot layer remains preserved as historical infrastructure", () => {
  const layer = fs.readFileSync(new URL("../app-parts/app-v032-pilot.js", import.meta.url), "utf8");
  assert.ok(layer.includes("/prototype/test-guide.html"));
  assert.ok(layer.includes("16–18 歲高中生"));
  assert.ok(layer.includes("PILOT_PROTOCOL_VERSION"));
  const prior = fs.readFileSync(new URL("../app-parts/app-v031-consent.js", import.meta.url), "utf8");
  assert.ok(prior.includes("/prototype/?mode=research"));
});

test("version boundaries keep question bank, study, consent and legacy pilot protocol fixed while usability protocol advances", () => {
  const version = JSON.parse(fs.readFileSync(new URL("../VERSION.json", import.meta.url), "utf8"));
  assert.equal(version.appVersion, "0.3.4-research-export-fix");
  assert.equal(version.questionBankVersion, "2026-08-10-v2-candidate");
  assert.equal(version.studyVersion, "signalsafe-study-2026-08-r1");
  assert.equal(version.consentVersion, "signalsafe-consent-2026-08-10-v1");
  assert.equal(version.pilotProtocolVersion, PILOT_PROTOCOL_VERSION);
  assert.equal(version.v2ProtocolVersion, SIGNALSAFE_V2_PROTOCOL_VERSION);
  assert.equal(version.marketFeasibilityVersion, "signalsafe-market-feasibility-2026-08-13-v1");
});

test("bootstrap and service worker still ship legacy pilot assets required by frozen research history", () => {
  const bootstrap = fs.readFileSync(new URL("../bootstrap.mjs", import.meta.url), "utf8");
  const sw = fs.readFileSync(new URL("../sw.js", import.meta.url), "utf8");
  assert.ok(bootstrap.includes("pilot-protocol.mjs"));
  assert.ok(bootstrap.includes("app-v032-pilot.js"));
  for (const asset of ["./pilot-protocol.mjs", "./test-guide.html", "./styles/06-v032-pilot.css", "./app-parts/app-v032-pilot.js"]) assert.ok(sw.includes(asset), asset);
});
