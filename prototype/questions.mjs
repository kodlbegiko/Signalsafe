import PRE_A from "./question-data/pre-a.mjs";
import PRE_B from "./question-data/pre-b.mjs";
import TRAINING_A from "./question-data/training-a.mjs";
import TRAINING_B from "./question-data/training-b.mjs";
import POST_A from "./question-data/post-a.mjs";
import POST_B from "./question-data/post-b.mjs";
import QUICK_BANK from "./question-data/quick.mjs";

export const APP_VERSION = "0.3.2-pilot-protocol";
export const QUESTION_BANK_VERSION = "2026-08-10-v2-candidate";
export const STUDY_VERSION = "signalsafe-study-2026-08-r1";

const META = {
  "pre-01": { constructId:"credential-protection", surfaceScenario:"social-vote", formVersion:"A", pairId:"pair-01" },
  "post-03": { constructId:"credential-protection", surfaceScenario:"streaming-refund", formVersion:"B", pairId:"pair-01" },
  "pre-02": { constructId:"official-channel", surfaceScenario:"school-event-reminder", formVersion:"A", pairId:"pair-02" },
  "post-02": { constructId:"official-channel", surfaceScenario:"ticket-delivery", formVersion:"B", pairId:"pair-02" },
  "pre-03": { constructId:"payment-stop", surfaceScenario:"marketplace-receiving", formVersion:"A", pairId:"pair-03" },
  "post-01": { constructId:"payment-stop", surfaceScenario:"family-borrowing", formVersion:"B", pairId:"pair-03" },
  "pre-04": { constructId:"independent-verification", surfaceScenario:"volunteer-recruitment", formVersion:"A", pairId:"pair-04" },
  "post-08": { constructId:"independent-verification", surfaceScenario:"internship-invitation", formVersion:"B", pairId:"pair-04" },
  "pre-05": { constructId:"sensitive-data-protection", surfaceScenario:"payment-otp-alert", formVersion:"A", pairId:"pair-05" },
  "post-04": { constructId:"sensitive-data-protection", surfaceScenario:"grant-application", formVersion:"B", pairId:"pair-05" },
  "pre-06": { constructId:"official-workflow", surfaceScenario:"scholarship-supplement", formVersion:"A", pairId:"pair-06" },
  "post-07": { constructId:"official-workflow", surfaceScenario:"club-fee", formVersion:"B", pairId:"pair-06" },
  "pre-07": { constructId:"known-platform-verification", surfaceScenario:"in-game-event", formVersion:"A", pairId:"pair-07" },
  "post-05": { constructId:"known-platform-verification", surfaceScenario:"course-registration", formVersion:"B", pairId:"pair-07" },
  "pre-08": { constructId:"mixed-signal-verification", surfaceScenario:"ticket-resale", formVersion:"A", pairId:"pair-08" },
  "post-06": { constructId:"mixed-signal-verification", surfaceScenario:"game-marketplace", formVersion:"B", pairId:"pair-08" },
  "train-01": { constructId:"payment-stop", surfaceScenario:"task-job", formVersion:"T" },
  "train-02": { constructId:"official-channel", surfaceScenario:"account-login-alert", formVersion:"T" },
  "train-03": { constructId:"payment-stop", surfaceScenario:"shopping-refund-atm", formVersion:"T" },
  "train-04": { constructId:"independent-verification", surfaceScenario:"competition-deposit", formVersion:"T" },
  "train-05": { constructId:"official-workflow", surfaceScenario:"school-trip-payment", formVersion:"T" },
  "train-06": { constructId:"payment-stop", surfaceScenario:"investment-group", formVersion:"T" },
  "train-07": { constructId:"official-channel", surfaceScenario:"club-recruitment", formVersion:"T" },
  "train-08": { constructId:"mixed-signal-verification", surfaceScenario:"delivery-redelivery", formVersion:"T" },
};

function annotate(question) {
  const meta = META[question.id];
  if (!meta) throw new Error(`Missing construct metadata for ${question.id}`);
  return { ...question, ...meta };
}
const PRE = [...PRE_A, ...PRE_B].map(annotate);
const TRAINING = [...TRAINING_A, ...TRAINING_B].map(annotate);
const POST = [...POST_A, ...POST_B].map(annotate);
const FORMAL_QUESTIONS = [...PRE, ...TRAINING, ...POST];
const QUICK_QUESTIONS = QUICK_BANK.map((question) => ({ ...question }));

export const PAIRING_TABLE = [
  { pairId:"pair-01", constructId:"credential-protection", preQuestionId:"pre-01", postQuestionId:"post-03" },
  { pairId:"pair-02", constructId:"official-channel", preQuestionId:"pre-02", postQuestionId:"post-02" },
  { pairId:"pair-03", constructId:"payment-stop", preQuestionId:"pre-03", postQuestionId:"post-01" },
  { pairId:"pair-04", constructId:"independent-verification", preQuestionId:"pre-04", postQuestionId:"post-08" },
  { pairId:"pair-05", constructId:"sensitive-data-protection", preQuestionId:"pre-05", postQuestionId:"post-04" },
  { pairId:"pair-06", constructId:"official-workflow", preQuestionId:"pre-06", postQuestionId:"post-07" },
  { pairId:"pair-07", constructId:"known-platform-verification", preQuestionId:"pre-07", postQuestionId:"post-05" },
  { pairId:"pair-08", constructId:"mixed-signal-verification", preQuestionId:"pre-08", postQuestionId:"post-06" },
];

function clone(value) { return typeof structuredClone === "function" ? structuredClone(value) : JSON.parse(JSON.stringify(value)); }
export function getQuestions() { return FORMAL_QUESTIONS.map(clone); }
export function getQuickBank() { return QUICK_QUESTIONS.map(clone); }
export function getQuestionsByPhase(phase) { return FORMAL_QUESTIONS.filter((question) => question.phase === phase).map(clone); }
export function getQuestionById(id) { const found = [...FORMAL_QUESTIONS, ...QUICK_QUESTIONS].find((question) => question.id === id); return found ? clone(found) : null; }
export function getPairingTable() { return PAIRING_TABLE.map(clone); }
function seededRandom(seed) { let state = Number(seed) >>> 0; return () => { state = (state * 1664525 + 1013904223) >>> 0; return state / 4294967296; }; }
function shuffle(items, seed) { const random = seededRandom(seed || Date.now()); const output = [...items]; for (let index = output.length - 1; index > 0; index -= 1) { const swap = Math.floor(random() * (index + 1)); [output[index], output[swap]] = [output[swap], output[index]]; } return output; }
export function pickQuickQuestions(seed = Date.now()) {
  const shuffled = shuffle(QUICK_QUESTIONS, Number(seed) || Date.now());
  const picks = ["risk", "insufficient", "trusted"].map((judgment) => shuffled.find((question) => question.correctJudgment === judgment)).filter(Boolean);
  return (picks.length === 3 ? picks : shuffled.slice(0, 3)).map(clone);
}
