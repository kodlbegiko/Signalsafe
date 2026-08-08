import test from "node:test";
import assert from "node:assert/strict";
import { getQuestions } from "../questions.mjs";

const questions = getQuestions();

test("every expected answer points to an explicitly safe action", () => {
  for (const question of questions) {
    const safeIds = new Set(question.actionOptions.filter((option) => option.riskLevel === "safe").map((option) => option.id));
    assert.ok(question.correctActionIds.length >= 1, `${question.id} missing correct action`);
    for (const id of question.correctActionIds) assert.ok(safeIds.has(id), `${question.id} correct action ${id} is not marked safe`);
    for (const id of safeIds) assert.ok(question.correctActionIds.includes(id), `${question.id} has an uncredited safe action ${id}`);
  }
});

test("primary signal is part of the credited signal set", () => {
  for (const question of questions) {
    assert.ok(question.correctSignalIds.includes(question.primarySignalId), `${question.id} primary signal is not credited`);
    const optionIds = new Set(question.signalOptions.map((option) => option.id));
    for (const id of question.correctSignalIds) assert.ok(optionIds.has(id), `${question.id} references missing signal ${id}`);
  }
});

test("trusted items still require independent or existing official verification", () => {
  for (const question of questions.filter((item) => item.correctJudgment === "trusted")) {
    assert.match(question.officialVerification, /(自行|原|官方|學校|校務|社團|遊戲|購票|承辦|指導老師)/, `${question.id} trusted verification path is too weak`);
    assert.ok(!question.correctActionIds.some((id) => question.actionOptions.find((option) => option.id === id)?.riskLevel !== "safe"));
  }
});

test("scenario messages contain no executable live URL or direct credential instruction in trusted items", () => {
  for (const question of questions) {
    assert.doesNotMatch(question.message, /https?:\/\//i, `${question.id} contains a live URL`);
  }
  for (const question of questions.filter((item) => item.correctJudgment === "trusted")) {
    const normalized = question.message.replaceAll("不會要求你回覆密碼", "").replaceAll("承辦人不會索取密碼", "");
    assert.doesNotMatch(normalized, /(請|要你|要求).{0,10}(回覆|提供|傳送|輸入).{0,8}(密碼|驗證碼|OTP)/i, `${question.id} trusted item affirmatively asks for credentials`);
  }
});
