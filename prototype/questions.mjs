import PRE_A from "./question-data/pre-a.mjs";
import PRE_B from "./question-data/pre-b.mjs";
import TRAINING_A from "./question-data/training-a.mjs";
import TRAINING_B from "./question-data/training-b.mjs";
import POST_A from "./question-data/post-a.mjs";
import POST_B from "./question-data/post-b.mjs";

export const APP_VERSION = "0.2.3-usability-r1-hotfix3";
export const QUESTION_BANK_VERSION = "2026-08-01-r1";

const QUESTIONS = [...PRE_A, ...PRE_B, ...TRAINING_A, ...TRAINING_B, ...POST_A, ...POST_B];

export function getQuestions() {
  return QUESTIONS.map((question) => structuredClone(question));
}

export function getQuestionsByPhase(phase) {
  return getQuestions().filter((question) => question.phase === phase);
}

export function getQuestionById(id) {
  const found = QUESTIONS.find((question) => question.id === id);
  return found ? structuredClone(found) : null;
}

export function pickQuickQuestions(seed = Date.now()) {
  const all = getQuestions();
  let state = Number(seed) || Date.now();
  const random = () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
  const shuffled = all.toSorted(() => random() - 0.5);
  const risk = shuffled.find((question) => question.correctJudgment === "risk");
  const nonRisk = shuffled.find((question) => question.correctJudgment !== "risk");
  const third = shuffled.find((question) => question.id !== risk?.id && question.id !== nonRisk?.id);
  return [risk, nonRisk, third].filter(Boolean);
}
