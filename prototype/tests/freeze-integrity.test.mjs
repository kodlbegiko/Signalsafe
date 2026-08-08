import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { APP_VERSION, QUESTION_BANK_VERSION, getQuestions } from "../questions.mjs";
import { calculateMetrics } from "../scoring.mjs";
import { exportState, sessionsToCsv } from "../storage.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const prototypeDir = path.resolve(here, "..");
const repoDir = path.resolve(prototypeDir, "..");
const read = (relative) => fs.readFileSync(path.join(repoDir, relative), "utf8");

const VERSION = JSON.parse(read("prototype/VERSION.json"));
const PACKAGE = JSON.parse(read("package.json"));

test("app and question-bank versions are consistent", () => {
  assert.equal(VERSION.appVersion, APP_VERSION);
  assert.equal(VERSION.questionBankVersion, QUESTION_BANK_VERSION);
  assert.equal(PACKAGE.version, APP_VERSION.split("-")[0]);
  assert.equal(APP_VERSION, "0.2.4-usability-r1-hotfix4");
  assert.equal(QUESTION_BANK_VERSION, "2026-08-01-r1");
});

test("production index is same-origin and service-worker assets exist", () => {
  const index = read("prototype/index.html");
  assert.doesNotMatch(index, /https?:\/\//i);
  assert.match(index, /\.\/bootstrap\.mjs/);
  assert.match(index, /\.\/styles\/01\.css/);
  assert.match(index, /\.\/styles\/02\.css/);

  const sw = read("prototype/sw.js");
  assert.match(sw, /signalsafe-v0\.2\.4-r1-hotfix4/);
  const refs = [...sw.matchAll(/"(\.\/[^\"]*)"/g)].map((match) => match[1]);
  assert.ok(refs.length >= 20);
  for (const ref of refs) {
    if (ref === "./") continue;
    const target = path.join(prototypeDir, ref.slice(2));
    assert.ok(fs.existsSync(target), `missing service-worker asset: ${ref}`);
  }
});

test("runtime and question bank contain no positive complete-safety verdict", () => {
  const files = [
    "prototype/index.html",
    "prototype/questions.mjs",
    "prototype/storage.mjs",
    ...fs.readdirSync(path.join(prototypeDir, "app-parts")).map((name) => `prototype/app-parts/${name}`),
    ...fs.readdirSync(path.join(prototypeDir, "question-data")).map((name) => `prototype/question-data/${name}`),
  ];
  const allowedDisclaimers = ["不等於完全安全", "不代表完全安全", "不是完全安全", "不表示完全安全"];
  for (const file of files) {
    let content = read(file);
    for (const disclaimer of allowedDisclaimers) content = content.replaceAll(disclaimer, "");
    assert.ok(!content.includes("完全安全"), `${file} contains a positive complete-safety verdict`);
  }
});

test("all-risk, all-signal, wrong-action, max-confidence gaming scores poorly", () => {
  const responses = getQuestions().filter((question) => question.phase === "post").map((question) => {
    const wrongAction = question.actionOptions.find((option) => !question.correctActionIds.includes(option.id));
    assert.ok(wrongAction, `question ${question.id} needs at least one wrong action for anti-gaming QA`);
    return {
      correctJudgment: question.correctJudgment,
      selectedJudgment: "risk",
      isJudgmentCorrect: question.correctJudgment === "risk",
      isActionCorrect: false,
      selectedActionId: wrongAction.id,
      selectedSignalIds: question.signalOptions.map((option) => option.id),
      correctSignalIds: question.correctSignalIds,
      confidence: 4,
      responseTimeMs: 1,
      wasInterrupted: false,
    };
  });
  const metrics = calculateMetrics(responses);
  assert.equal(metrics.actionAccuracy, 0);
  assert.ok(metrics.judgmentMacroRecall <= 1 / 3 + Number.EPSILON);
  assert.equal(metrics.trustedFalsePositiveRate, 1);
  assert.ok(metrics.highConfidenceErrorRate >= 0.625);
  assert.ok(metrics.overallScore < 0.5);
});

test("export schema exposes required anonymous research fields at top level", () => {
  const state = {
    anonymousUserId: "UT-TECHNICAL-TEST",
    sessions: [],
    storageMode: "persistent",
    settings: {},
    activeAssessment: null,
  };
  const exported = JSON.parse(exportState(state));
  assert.equal(exported.appVersion, APP_VERSION);
  assert.equal(exported.questionBankVersion, QUESTION_BANK_VERSION);
  assert.equal(exported.anonymousUserId, "UT-TECHNICAL-TEST");
  assert.ok(Array.isArray(exported.sessions));
  assert.equal(exported.data.anonymousUserId, exported.anonymousUserId);
  assert.deepEqual(exported.data.sessions, exported.sessions);
});

test("CSV schema contains no direct identity fields", () => {
  const header = sessionsToCsv([]).split("\n", 1)[0].toLowerCase();
  for (const forbidden of ["name", "school", "class", "email", "phone", "social", "姓名", "學校", "班級", "電話"]) {
    assert.ok(!header.includes(forbidden), `CSV header unexpectedly contains ${forbidden}`);
  }
});
