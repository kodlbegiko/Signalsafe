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
  "post-06": { constructId:"mixed-signal-verification", surfaceScenario:"game-marketplace", formVersion:"B", pairId:"pair-08" }
};

function enrich(question) { const meta=META[question.id]??{}; return { ...question, constructId:question.constructId??meta.constructId??null, surfaceScenario:question.surfaceScenario??meta.surfaceScenario??question.category??null, formVersion:question.formVersion??meta.formVersion??null, pairId:question.pairId??meta.pairId??null }; }
const BANK = [...PRE_A,...PRE_B,...TRAINING_A,...TRAINING_B,...POST_A,...POST_B].map(enrich);
const QUICK = QUICK_BANK.map((question)=>({ ...question, constructId:question.constructId??null, surfaceScenario:question.surfaceScenario??null, formVersion:question.formVersion??"Q1" }));

export function getQuestions() { return BANK.map((question)=>({ ...question })); }
export function getQuestionById(id) { const question=BANK.find((item)=>item.id===id); return question ? { ...question } : null; }
export function getQuestionsByPhase(phase) { return BANK.filter((question)=>question.phase===phase).map((question)=>({ ...question })); }
export function getQuickBank() { return QUICK.map((question)=>({ ...question })); }
export function getPairingTable() { return Object.entries(META).map(([questionId,meta])=>({ questionId,...meta })); }
function hashSeed(value) { let hash=2166136261; for(const char of String(value)){hash^=char.charCodeAt(0);hash=Math.imul(hash,16777619);} return hash>>>0; }
export function pickQuickQuestions(seed=Date.now()) { const groups={risk:QUICK.filter(q=>q.correctJudgment==="risk"),insufficient:QUICK.filter(q=>q.correctJudgment==="insufficient"),trusted:QUICK.filter(q=>q.correctJudgment==="trusted")}; const selected=Object.entries(groups).map(([key,items],index)=>items[(hashSeed(`${seed}:${key}:${index}`)%items.length)]); return selected.sort((a,b)=>hashSeed(`${seed}:${a.id}`)-hashSeed(`${seed}:${b.id}`)).map(q=>({ ...q })); }
