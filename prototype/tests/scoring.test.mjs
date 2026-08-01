import test from "node:test";
import assert from "node:assert/strict";
import {
  actionAccuracy,
  calculateMetrics,
  highConfidenceErrorRate,
  macroRecall,
  signalScores,
  trustedFalsePositiveRate,
} from "../scoring.mjs";

const response = (correctJudgment, selectedJudgment, actionCorrect = true, selectedSignalIds = ["a"], correctSignalIds = ["a"], confidence = 3) => ({
  correctJudgment,
  selectedJudgment,
  isJudgmentCorrect: correctJudgment === selectedJudgment,
  isActionCorrect: actionCorrect,
  selectedSignalIds,
  correctSignalIds,
  confidence,
  responseTimeMs: 1000,
  wasInterrupted: false,
  selectedActionId: actionCorrect ? "safe" : "unsafe",
});

test("signalScores calculates precision, recall and F1", () => {
  const score = signalScores(["a", "b"], ["a", "c"]);
  assert.equal(score.precision, 0.5);
  assert.equal(score.recall, 0.5);
  assert.equal(score.f1, 0.5);
});

test("actionAccuracy reports safe-action performance", () => {
  assert.equal(actionAccuracy([
    response("risk", "risk", true),
    response("trusted", "trusted", false),
  ]), 0.5);
});

test("balanced correct judgments achieve full macro recall", () => {
  const responses = [
    response("risk", "risk"),
    response("insufficient", "insufficient"),
    response("trusted", "trusted"),
  ];
  assert.equal(macroRecall(responses), 1);
});

test("all-risk strategy cannot achieve high calibration", () => {
  const responses = [
    response("risk", "risk"),
    response("risk", "risk"),
    response("insufficient", "risk"),
    response("insufficient", "risk"),
    response("trusted", "risk"),
    response("trusted", "risk"),
  ];
  assert.ok(macroRecall(responses) <= 1 / 3 + Number.EPSILON);
  assert.equal(trustedFalsePositiveRate(responses), 1);
});

test("high confidence errors are separated from ordinary uncertainty", () => {
  const responses = [
    response("risk", "trusted", true, ["a"], ["a"], 4),
    response("trusted", "trusted", true, ["a"], ["a"], 4),
    response("risk", "trusted", true, ["a"], ["a"], 2),
  ];
  assert.equal(highConfidenceErrorRate(responses), 0.5);
});

test("calculateMetrics weights calibration, signals, actions and completeness", () => {
  const responses = [
    response("risk", "risk"),
    response("insufficient", "insufficient"),
    response("trusted", "trusted"),
  ];
  const metrics = calculateMetrics(responses);
  assert.equal(metrics.actionAccuracy, 1);
  assert.equal(metrics.judgmentMacroRecall, 1);
  assert.equal(metrics.signalF1, 1);
  assert.equal(metrics.overallScore, 1);
});
