import test from "node:test";
import assert from "node:assert/strict";
import { isValidParticipantId, buildResearchQuestionOrder } from "../research.mjs";
test("participant codes are anonymous-code shaped",()=>{for(const valid of ["UT001","UT-002","E001","DRYRUN-001","U003"])assert.equal(isValidParticipantId(valid),true);for(const invalid of ["Sean","student@example.com","0912345678","北大高中","UT1"])assert.equal(isValidParticipantId(invalid),false);});
test("research order is deterministic per session seed",()=>{const phases={pre:["p1","p2","p3","p4"],training:["t1","t2","t3","t4"],post:["o1","o2","o3","o4"]};const first=buildResearchQuestionOrder(phases,"session-a"),second=buildResearchQuestionOrder(phases,"session-a"),third=buildResearchQuestionOrder(phases,"session-b");assert.deepEqual(first,second);assert.notDeepEqual(first,third);for(const phase of Object.keys(phases))assert.deepEqual([...first[phase]].sort(),[...phases[phase]].sort());});
