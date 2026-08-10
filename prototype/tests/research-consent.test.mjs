import test from "node:test";
import assert from "node:assert/strict";
import { CONSENT_VERSION, CONSENT_ACKNOWLEDGEMENTS, CONSENT_SECTIONS, createConsentDraft, isConsentComplete, normalizeConsentDraft } from "../research-consent.mjs";

test("consent is blocked until review, all acknowledgements, and explicit acceptance",()=>{
  const draft=createConsentDraft();
  assert.equal(draft.consentVersion,CONSENT_VERSION);
  assert.equal(isConsentComplete(draft),false);
  draft.reviewed=true;
  draft.reviewedAt="2026-08-10T00:00:00.000Z";
  for(const {key} of CONSENT_ACKNOWLEDGEMENTS) draft.acknowledgements[key]=true;
  assert.equal(isConsentComplete(draft),false,"acknowledgements alone must not imply acceptance");
  draft.accepted=true;
  draft.acceptedAt="2026-08-10T00:01:00.000Z";
  assert.equal(isConsentComplete(draft),true);
});

test("missing any required acknowledgement keeps consent incomplete",()=>{
  const draft=createConsentDraft();
  draft.reviewed=true;
  draft.accepted=true;
  for(const {key} of CONSENT_ACKNOWLEDGEMENTS) draft.acknowledgements[key]=true;
  draft.acknowledgements[CONSENT_ACKNOWLEDGEMENTS[0].key]=false;
  assert.equal(isConsentComplete(draft),false);
});

test("old consent version is invalidated rather than reused",()=>{
  const old={...createConsentDraft(),consentVersion:"signalsafe-consent-old",reviewed:true,accepted:true};
  for(const {key} of CONSENT_ACKNOWLEDGEMENTS) old.acknowledgements[key]=true;
  const normalized=normalizeConsentDraft(old);
  assert.equal(normalized.consentVersion,CONSENT_VERSION);
  assert.equal(normalized.reviewed,false);
  assert.equal(normalized.accepted,false);
  assert.equal(isConsentComplete(normalized),false);
});

test("participation notice has all thirteen required sections and four confirmations",()=>{
  assert.equal(CONSENT_SECTIONS.length,13);
  assert.equal(CONSENT_ACKNOWLEDGEMENTS.length,4);
  assert.ok(CONSENT_SECTIONS.some(section=>section.title.includes("自願")));
  assert.ok(CONSENT_SECTIONS.some(section=>section.title.includes("正式同意程序")));
});
