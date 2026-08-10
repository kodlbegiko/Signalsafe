import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const here=path.dirname(fileURLToPath(import.meta.url));
const read=(name)=>fs.readFileSync(path.resolve(here,"..",name),"utf8");

test("consent UI exposes semantic headings, fieldset, labels and explicit choices",()=>{
  const source=read("app-parts/app-v031-consent.js");
  assert.match(source,/aria-labelledby="consent-title"/);
  assert.match(source,/<fieldset class="consent-acknowledgements">/);
  assert.match(source,/<legend>必要確認項目<\/legend>/);
  assert.match(source,/for="consent-ack-\$\{index\}"/);
  assert.match(source,/id="consent-ack-\$\{index\}"/);
  assert.match(source,/我願意參與 SignalSafe 本次研究測試/);
  assert.match(source,/暫不參與/);
});

test("consent controls retain 44px targets and keyboard focus visibility",()=>{
  const css=read("styles/05-v031-consent.css");
  assert.match(css,/min-height:44px/);
  assert.match(css,/:focus-visible/);
  assert.match(css,/outline:3px/);
  assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
});

test("Research Mode keeps explicit exit-and-clear wording",()=>{
  const source=read("app-parts/app-v031-consent.js");
  assert.match(source,/退出研究並清除本次未完成紀錄/);
  assert.match(source,/其他一般使用紀錄與已完成研究場次不會被刪除/);
});
