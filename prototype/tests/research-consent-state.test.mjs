import test from "node:test";
import assert from "node:assert/strict";
import { clearIncompleteResearchState } from "../research-consent-state.mjs";

test("withdrawal clears only the current unfinished research session",()=>{
  const completedConsumer={id:"consumer-1",mode:"training"};
  const completedResearch={id:"research-complete-1",mode:"research",participantId:"UT900"};
  const state={
    anonymousUserId:"anon-1",
    settings:{reducedMotion:true},
    sessions:[completedConsumer,completedResearch],
    lastResearchSessionId:"research-complete-1",
    researchConsentDraft:{consentVersion:"signalsafe-consent-2026-08-10-v1",accepted:true},
    activeAssessment:{id:"research-active-1",mode:"research",participantId:"UT901"},
  };
  const next=clearIncompleteResearchState(state);
  assert.equal(next.activeAssessment,null);
  assert.equal(next.researchConsentDraft,null);
  assert.deepEqual(next.sessions,state.sessions);
  assert.equal(next.lastResearchSessionId,"research-complete-1");
  assert.deepEqual(next.settings,state.settings);
  assert.equal(next.anonymousUserId,"anon-1");
});

test("cleanup is a no-op for an active consumer assessment",()=>{
  const state={sessions:[],researchConsentDraft:{keep:true},activeAssessment:{id:"consumer-active",mode:"training"}};
  const next=clearIncompleteResearchState(state);
  assert.deepEqual(next,state);
  assert.notEqual(next,state);
});
