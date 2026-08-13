import PRE_A from "./question-data/pre-a.mjs";
import PRE_B from "./question-data/pre-b.mjs";
import TRAINING_A from "./question-data/training-a.mjs";
import TRAINING_B from "./question-data/training-b.mjs";
import POST_A from "./question-data/post-a.mjs";
import POST_B from "./question-data/post-b.mjs";
import QUICK_BANK from "./question-data/quick.mjs";

export const APP_VERSION = "0.3.4-research-export-fix";
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
  const meta=META[question.id];
  if(!meta) throw new Error(`Missing research metadata for ${question.id}`);
  return {...question,...meta};
}
const ALL=[...PRE_A,...TRAINING_A,...POST_A].map(annotate);
export function getQuestions(){return ALL.map(q=>structuredClone(q));}
export function getQuestionsByPhase(phase){return ALL.filter(q=>q.phase===phase).map(q=>structuredClone(q));}
export function getQuestionById(id){const q=ALL.find(item=>item.id===id);return q?structuredClone(q):null;}
export function getQuickBank(){return QUICK_BANK.map(q=>structuredClone(q));}
export function getPairingTable(){return Object.entries(META).filter(([id])=>id.startsWith("pre-")).map(([preId,meta])=>{const post=Object.entries(META).find(([id,m])=>id.startsWith("post-")&&m.pairId===meta.pairId);return{pairId:meta.pairId,constructId:meta.constructId,preId,preSurfaceScenario:meta.surfaceScenario,postId:post[0],postSurfaceScenario:post[1].surfaceScenario};});}
function seededRandom(seed){let state=(Number(seed)||0)>>>0||0x9e3779b9;return()=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return state/4294967296;};}
export function pickQuickQuestions(seed=Date.now()){const rand=seededRandom(seed),groups=["risk","insufficient","trusted"].map(j=>QUICK_BANK.filter(q=>q.correctJudgment===j));return groups.map(group=>structuredClone(group[Math.floor(rand()*group.length)]));}
