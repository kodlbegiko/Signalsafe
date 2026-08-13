import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildResearchExport, validateResearchExportJson, assertNoForbiddenKeys } from "../research.mjs";

function response(phase,index){return{
  formVersion: phase === "pre" ? "A" : phase === "post" ? "B" : "T",
  constructId:`construct-${index+1}`,
  surfaceScenario:`${phase}-scenario-${index+1}`,
  questionId:`${phase}-${String(index+1).padStart(2,"0")}`,
  phase,
  selectedJudgment:"risk",
  selectedActionId:"safe",
  selectedSignalIds:["signal"],
  confidence:2,
  isJudgmentCorrect:true,
  isActionCorrect:true,
  signalF1:1,
  responseTimeMs:5000,
  activeResponseTimeMs:4800,
  answerChangedCount:0,
  interruptionDurationMs:200,
  questionShownAt:"2026-08-13T12:00:00.000Z",
  firstInteractionAt:"2026-08-13T12:00:02.000Z",
  submittedAt:"2026-08-13T12:00:05.000Z"
};}
function session(){return{
  id:"research-session-test",
  mode:"research",
  researchSessionId:"research-session-test",
  participantId:"DRYRUN-999",
  appVersion:"0.3.4-research-export-fix",
  questionBankVersion:"2026-08-10-v2-candidate",
  studyVersion:"signalsafe-study-2026-08-r1",
  formVersion:"A-B-v0.3",
  pilotProtocolVersion:"signalsafe-pilot-2026-08-13-v1",
  consentVersion:"signalsafe-consent-2026-08-10-v1",
  consentReviewed:true,
  consentReviewedAt:"2026-08-13T11:55:00.000Z",
  consentAccepted:true,
  consentAcceptedAt:"2026-08-13T11:56:00.000Z",
  consentAcknowledgements:{purposeAndProcedure:true,dataCollection:true,voluntaryParticipation:true,externalConsentBoundary:true},
  startedAt:"2026-08-13T12:00:00.000Z",
  completedAt:"2026-08-13T12:30:00.000Z",
  questionOrder:{pre:Array.from({length:8},(_,i)=>`pre-${i+1}`),training:Array.from({length:8},(_,i)=>`training-${i+1}`),post:Array.from({length:8},(_,i)=>`post-${i+1}`)},
  pauseCount:0,
  resumeCount:0,
  events:[],
  responses:[...Array.from({length:8},(_,i)=>response("pre",i)),...Array.from({length:8},(_,i)=>response("training",i)),...Array.from({length:8},(_,i)=>response("post",i))]
};}

test("research export self-validates 24 responses with 8/8/8 phases",()=>{
  const json=buildResearchExport(session());
  const parsed=validateResearchExportJson(json);
  assert.equal(parsed.participantId,"DRYRUN-999");
  assert.equal(parsed.responses.length,24);
  assert.deepEqual(Object.fromEntries(["pre","training","post"].map(p=>[p,parsed.responses.filter(r=>r.phase===p).length])),{pre:8,training:8,post:8});
  assert.equal(parsed.consentVersion,"signalsafe-consent-2026-08-10-v1");
  assert.equal(parsed.pilotProtocolVersion,"signalsafe-pilot-2026-08-13-v1");
});

test("research export rejects incomplete response sets",()=>{
  const value=session();
  value.responses.pop();
  assert.throws(()=>buildResearchExport(value),/24 responses/);
});

test("research privacy guard fails closed on forbidden identity keys",()=>{
  assert.throws(()=>assertNoForbiddenKeys({participantId:"DRYRUN-999",email:"student@example.invalid"}),/forbidden key/i);
});

test("v0.3.4 download layer delays URL revocation and exposes recovery paths",()=>{
  const here=path.dirname(fileURLToPath(import.meta.url));
  const source=fs.readFileSync(path.resolve(here,"../app-parts/app-v034-export.js"),"utf8");
  assert.match(source,/setTimeout\(\(\) => URL\.revokeObjectURL\(revokeUrl\), 30000\)/);
  assert.match(source,/研究 JSON 已建立/);
  assert.match(source,/複製研究 JSON/);
  assert.match(source,/顯示備援 JSON/);
  assert.match(source,/validateResearchExportJson\(json\)/);
  assert.match(source,/console\.error\("SignalSafe research export failed"/);
});
