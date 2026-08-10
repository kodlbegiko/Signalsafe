import test from "node:test";
import assert from "node:assert/strict";
import { assertNoForbiddenKeys, buildResearchExport } from "../research.mjs";
test("PII guard rejects forbidden export keys",()=>{for(const key of ["name","school","phone","email","address","instagram","lineId","discordId","password","otp","creditCard","identityNumber"])assert.throws(()=>assertNoForbiddenKeys({[key]:"x"}),/forbidden key/);});
test("research export does not serialize direct PII keys",()=>{const session={id:"s",mode:"research",participantId:"UT001",appVersion:"v",questionBankVersion:"q",studyVersion:"study",formVersion:"form",startedAt:"a",completedAt:"b",questionOrder:{pre:[],training:[],post:[]},events:[],responses:[]};const text=buildResearchExport(session);for(const token of ['"name"','"school"','"phone"','"email"','"address"','"instagram"','"lineId"','"discordId"','"password"','"otp"','"creditCard"','"identityNumber"'])assert.ok(!text.includes(token),token);});
