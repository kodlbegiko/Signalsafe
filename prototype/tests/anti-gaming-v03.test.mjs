import test from "node:test";
import assert from "node:assert/strict";
import { getQuestionsByPhase } from "../questions.mjs";
import { calculateMetrics } from "../scoring.mjs";

function responsesFor(strategy) {
  return getQuestionsByPhase("post").map((question,index)=>({
    correctJudgment: question.correctJudgment,
    selectedJudgment: strategy(question,index),
    isJudgmentCorrect: strategy(question,index) === question.correctJudgment,
    isActionCorrect: true,
    selectedActionId: question.correctActionIds[0],
    selectedSignalIds: question.correctSignalIds,
    correctSignalIds: question.correctSignalIds,
    confidence: 3,
    activeResponseTimeMs: 1000,
    responseTimeMs: 1000,
    wasInterrupted: false,
  }));
}

for (const [name,choice] of [["always risk","risk"],["always insufficient","insufficient"],["always trusted","trusted"]]) {
  test(`${name} cannot look calibrated`,()=>{
    const metrics=calculateMetrics(responsesFor(()=>choice));
    assert.ok(metrics.judgmentMacroRecall <= 1/3 + Number.EPSILON);
    assert.ok([metrics.recallRisk,metrics.recallInsufficient,metrics.recallTrusted].filter((value)=>value===1).length <= 1);
  });
}

test("deterministic pseudo-random guessing does not look calibrated",()=>{
  const choices=["risk","trusted","insufficient","risk","insufficient","trusted","risk","trusted"];
  const metrics=calculateMetrics(responsesFor((question,index)=>choices[index]));
  assert.ok(metrics.judgmentMacroRecall < 0.7);
  assert.ok(metrics.highConfidenceErrorRate > 0.25);
});
