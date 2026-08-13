import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { MARKET_FEASIBILITY_VERSION, MARKET_FEASIBILITY_DIMENSIONS, BUSINESS_MODEL_HYPOTHESIS, SUSTAINABILITY_LOOP } from "../market-feasibility.mjs";

const here=path.dirname(fileURLToPath(import.meta.url));
const prototypeDir=path.resolve(here,"..");
const repoDir=path.resolve(prototypeDir,"..");
const read=(p)=>fs.readFileSync(path.join(repoDir,p),"utf8");

test("market feasibility model has exactly six required dimensions",()=>{
  assert.equal(MARKET_FEASIBILITY_VERSION,"signalsafe-market-feasibility-2026-08-13-v1");
  assert.deepEqual(MARKET_FEASIBILITY_DIMENSIONS.map(d=>d.title),["永續議題重要性","目標對象真實需求","科技適切性","商業可行性","可持續發展性","團隊資源"]);
  for(const dimension of MARKET_FEASIBILITY_DIMENSIONS){assert.ok(dimension.current.length>=3);assert.ok(dimension.upgraded.length>=3);}
});

test("business model remains a hypothesis instead of a validated revenue claim",()=>{
  assert.match(BUSINESS_MODEL_HYPOTHESIS.model,/free-student/);
  assert.match(BUSINESS_MODEL_HYPOTHESIS.model,/school-license/);
  assert.match(BUSINESS_MODEL_HYPOTHESIS.model,/government\/CSR/);
  assert.match(BUSINESS_MODEL_HYPOTHESIS.validationRule,/不宣稱/);
});

test("sustainability loop is Threat Training Measurement Update",()=>{
  assert.deepEqual(SUSTAINABILITY_LOOP,["Threat","Training","Measurement","Update"]);
});

test("public market feasibility page uses the versioned source of truth and is linked from homepage layer",()=>{
  const page=read("prototype/market-feasibility.html");
  const app=read("prototype/app-parts/app-v033-market.js");
  assert.match(page,/\.\/market-feasibility\.mjs/);
  assert.match(page,/證據邊界/);
  assert.match(app,/\/prototype\/market-feasibility\.html/);
});

test("strategy documents retain explicit evidence boundaries",()=>{
  const assignment=read("docs/strategy/MARKET_FEASIBILITY_ASSIGNMENT_v1.md");
  const business=read("docs/strategy/BUSINESS_MODEL_HYPOTHESIS_v1.md");
  const sustainability=read("docs/strategy/SUSTAINABILITY_AND_RESOURCE_PLAN_v1.md");
  assert.match(assignment,/待驗證假設/);
  assert.match(business,/不可提前宣稱/);
  assert.match(sustainability,/可持續成長/);
});
