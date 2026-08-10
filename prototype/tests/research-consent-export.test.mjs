import test from "node:test";
import assert from "node:assert/strict";
import { buildResearchExport } from "../research.mjs";
import { CONSENT_VERSION, CONSENT_ACKNOWLEDGEMENTS } from "../research-consent.mjs";

function session(){return {
  id:"session-consent-1",mode:"research",researchSessionId:"session-consent-1",participantId:"UT001",
  appVersion:"0.3.1-research-entry-consent",questionBankVersion:"2026-08-10-v2-candidate",studyVersion:"signalsafe-study-2026-08-r1",formVersion:"A-B-v0.3",
  consentVersion:CONSENT_VERSION,consentReviewed:true,consentReviewedAt:"2026-08-10T00:00:00.000Z",consentAccepted:true,consentAcceptedAt:"2026-08-10T00:01:00.000Z",
  consentAcknowledgements:Object.fromEntries(CONSENT_ACKNOWLEDGEMENTS.map(({key})=>[key,true])),
  startedAt:"2026-08-10T00:02:00.000Z",completedAt:"2026-08-10T00:20:00.000Z",questionOrder:{pre:["pre-01"],training:["train-01"],post:["post-03"]},pauseCount:0,resumeCount:0,events:[],responses:[]
};}

test("research export carries consent evidence without direct identity fields",()=>{
  const exported=JSON.parse(buildResearchExport(session()));
  assert.equal(exported.consentVersion,CONSENT_VERSION);
  assert.equal(exported.consentReviewed,true);
  assert.equal(exported.consentAccepted,true);
  assert.equal(exported.consentReviewedAt,"2026-08-10T00:00:00.000Z");
  assert.equal(exported.consentAcceptedAt,"2026-08-10T00:01:00.000Z");
  for(const {key} of CONSENT_ACKNOWLEDGEMENTS) assert.equal(exported.consentAcknowledgements[key],true,key);
  const text=JSON.stringify(exported).toLowerCase();
  for(const forbidden of ["guardianname","signatureimage","\"name\"","\"school\"","\"email\"","\"phone\""]) assert.equal(text.includes(forbidden),false,forbidden);
});
