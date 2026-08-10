import "./compat.mjs";
import { APP_VERSION, QUESTION_BANK_VERSION, STUDY_VERSION, getQuestionById, getQuestionsByPhase, getQuickBank, getPairingTable, pickQuickQuestions } from "./questions.mjs";
import { calculateMetrics, formatPercent, signalScores } from "./scoring.mjs";
import { clearState, exportState, importState, loadState, saveState, sessionsToCsv } from "./storage.mjs";
import { RESEARCH_FORM_VERSION, isValidParticipantId, buildResearchQuestionOrder, buildResearchExport, assertNoForbiddenKeys } from "./research.mjs";
import { CONSENT_VERSION, CONSENT_ACKNOWLEDGEMENTS, CONSENT_SECTIONS, createConsentDraft, isConsentComplete, normalizeConsentDraft } from "./research-consent.mjs";
Object.assign(window,{APP_VERSION,QUESTION_BANK_VERSION,STUDY_VERSION,RESEARCH_FORM_VERSION,CONSENT_VERSION,CONSENT_ACKNOWLEDGEMENTS,CONSENT_SECTIONS,getQuestionById,getQuestionsByPhase,getQuickBank,getPairingTable,pickQuickQuestions,calculateMetrics,formatPercent,signalScores,clearState,exportState,importState,loadState,saveState,sessionsToCsv,isValidParticipantId,buildResearchQuestionOrder,buildResearchExport,assertNoForbiddenKeys,createConsentDraft,isConsentComplete,normalizeConsentDraft});
const parts=["./app-parts/app-core.js","./app-parts/app-home.js","./app-parts/app-quick.js","./app-parts/app-assessment.js","./app-parts/app-insights.js","./app-parts/app-runtime.js","./app-parts/app-v03.js","./app-parts/app-v03-insights.js","./app-parts/app-v03-feedback.js","./app-parts/app-v031-consent.js"];
for(const src of parts){await new Promise((resolve,reject)=>{const script=document.createElement("script");script.src=new URL(src,import.meta.url).href;script.onload=resolve;script.onerror=()=>reject(new Error(`無法載入 ${src}`));document.head.append(script);});}
