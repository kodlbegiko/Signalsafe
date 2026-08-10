import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { CONSENT_VERSION, CONSENT_ACKNOWLEDGEMENTS, CONSENT_SECTIONS } from "../research-consent.mjs";
const here=path.dirname(fileURLToPath(import.meta.url));
const notice=fs.readFileSync(path.resolve(here,"../../docs/research/RESEARCH_PARTICIPATION_NOTICE_v1.md"),"utf8");

test("website consent and checked-in participation notice share one version and section set",()=>{
  assert.match(notice,new RegExp(CONSENT_VERSION.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")));
  for(const section of CONSENT_SECTIONS) assert.ok(notice.includes(section.title),`missing section: ${section.title}`);
  for(const acknowledgement of CONSENT_ACKNOWLEDGEMENTS) assert.ok(notice.includes(acknowledgement.label),`missing acknowledgement: ${acknowledgement.key}`);
});
