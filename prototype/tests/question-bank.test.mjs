import test from "node:test";
import assert from "node:assert/strict";
import { getQuestions, getQuestionsByPhase } from "../questions.mjs";

const expectedDistribution = { risk: 3, insufficient: 2, trusted: 3 };

for (const phase of ["pre", "training", "post"]) {
  test(`${phase} has 8 balanced questions`, () => {
    const questions = getQuestionsByPhase(phase);
    assert.equal(questions.length, 8);
    const distribution = questions.reduce((counts, question) => {
      counts[question.correctJudgment] = (counts[question.correctJudgment] ?? 0) + 1;
      return counts;
    }, {});
    assert.deepEqual(distribution, expectedDistribution);
  });
}

test("question IDs are unique and every question has actionable feedback", () => {
  const questions = getQuestions();
  assert.equal(questions.length, 24);
  assert.equal(new Set(questions.map((question) => question.id)).size, 24);
  for (const question of questions) {
    assert.ok(question.correctActionIds.length >= 1);
    assert.ok(question.correctSignalIds.length >= 1);
    assert.ok(question.primarySignalId);
    assert.ok(question.explanation.length >= 10);
    assert.ok(question.officialVerification.length >= 8);
    assert.ok(question.memoryTip.length >= 6);
    assert.ok(!question.message.includes("http"));
  }
});
