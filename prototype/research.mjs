export const STUDY_VERSION = "signalsafe-study-2026-08-r1";
export const RESEARCH_FORM_VERSION = "A-B-v0.3";
const PARTICIPANT_ID = /^(?:UT|U|E|P|R|DRYRUN)-?\d{3,4}$/i;
const FORBIDDEN_KEYS = new Set(["name","school","phone","email","address","instagram","lineId","discordId","password","otp","creditCard","identityNumber","guardianName","signature","signatureImage"]);
export function isValidParticipantId(value) { return PARTICIPANT_ID.test(String(value ?? "").trim()); }
function hashSeed(value) { let hash=2166136261; for(const char of String(value)){hash^=char.charCodeAt(0);hash=Math.imul(hash,16777619);} return hash>>>0; }
export function seededShuffle(values, seed) { const output=[...values]; let state=hashSeed(seed)||1; const random=()=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return state/4294967296;}; for(let index=output.length-1;index>0;index-=1){const swap=Math.floor(random()*(index+1));[output[index],output[swap]]=[output[swap],output[index]];} return output; }
export function buildResearchQuestionOrder(phases, seed) { return Object.fromEntries(Object.entries(phases).map(([phase,ids])=>[phase,seededShuffle(ids,`${seed}:${phase}`)])); }
export function assertNoForbiddenKeys(value,path="root") { if(Array.isArray(value)){value.forEach((item,index)=>assertNoForbiddenKeys(item,`${path}[${index}]`));return true;} if(!value||typeof value!=="object")return true; for(const [key,item] of Object.entries(value)){if(FORBIDDEN_KEYS.has(key))throw new Error(`Research export contains forbidden key: ${path}.${key}`);assertNoForbiddenKeys(item,`${path}.${key}`);} return true; }
export function validateResearchExportJson(json) {
  if(typeof json!=="string"||json.trim().length===0)throw new Error("Research export is empty");
  const parsed=JSON.parse(json);
  assertNoForbiddenKeys(parsed);
  for(const key of ["researchSessionId","participantId","appVersion","questionBankVersion","studyVersion"]){if(!parsed[key])throw new Error(`Research export missing required field: ${key}`);}
  if(!Array.isArray(parsed.responses)||parsed.responses.length!==24)throw new Error(`Research export must contain 24 responses; observed ${parsed.responses?.length??0}`);
  const phases={pre:0,training:0,post:0};
  for(const response of parsed.responses){if(!(response.phase in phases))throw new Error(`Research export contains unexpected phase: ${response.phase}`);phases[response.phase]+=1;for(const key of ["questionId","constructId","surfaceScenario"]){if(!response[key])throw new Error(`Research response missing ${key}`);}}
  for(const phase of Object.keys(phases)){if(phases[phase]!==8)throw new Error(`Research export phase ${phase} must contain 8 responses; observed ${phases[phase]}`);}
  return parsed;
}
export function buildResearchExport(session) {
  if(!session||session.mode!=="research")throw new Error("Research session required");
  const responses=(session.responses??[]).map((response)=>({studyVersion:session.studyVersion,formVersion:response.formVersion??session.formVersion,constructId:response.constructId,surfaceScenario:response.surfaceScenario,questionId:response.questionId,phase:response.phase,judgment:response.selectedJudgment,safeAction:response.selectedActionId,signalChoice:response.selectedSignalIds??[],confidence:response.confidence,correctness:{judgment:response.isJudgmentCorrect,safeAction:response.isActionCorrect,signalF1:response.signalF1},responseTime:response.responseTimeMs,activeResponseTime:response.activeResponseTimeMs,answerChanges:response.answerChangedCount??0,interruptionDuration:response.interruptionDurationMs??0,questionShownAt:response.questionShownAt,firstInteractionAt:response.firstInteractionAt,answerSubmittedAt:response.submittedAt}));
  const exported={exportedAt:new Date().toISOString(),researchSessionId:session.researchSessionId??session.id,participantId:session.participantId,appVersion:session.appVersion,questionBankVersion:session.questionBankVersion,studyVersion:session.studyVersion,formVersion:session.formVersion,pilotProtocolVersion:session.pilotProtocolVersion??null,consentVersion:session.consentVersion??null,consentReviewed:session.consentReviewed===true,consentReviewedAt:session.consentReviewedAt??null,consentAccepted:session.consentAccepted===true,consentAcceptedAt:session.consentAcceptedAt??null,consentAcknowledgements:{...(session.consentAcknowledgements??{})},startedAt:session.startedAt,completedAt:session.completedAt,questionOrder:session.questionOrder,pauseCount:session.pauseCount??0,resumeCount:session.resumeCount??0,events:(session.events??[]).map((event)=>({type:event.type,at:event.at,phase:event.phase??null,questionId:event.questionId??null})),responses};
  assertNoForbiddenKeys(exported); return JSON.stringify(exported,null,2);
}
