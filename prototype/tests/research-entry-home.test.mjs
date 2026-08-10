import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const here=path.dirname(fileURLToPath(import.meta.url));
const read=(name)=>fs.readFileSync(path.resolve(here,"..",name),"utf8");

test("home exposes a dedicated same-origin Research Mode entry",()=>{
  const layer=read("app-parts/app-v031-consent.js");
  assert.match(layer,/參與 SignalSafe 研究測試/);
  assert.match(layer,/進入研究測試/);
  assert.match(layer,/href="\/prototype\/\?mode=research"/);
  assert.match(layer,/使用匿名受測者編號/);
  assert.match(layer,/進入前需閱讀研究參與說明/);
});

test("research card is additive and consumer training remains primary",()=>{
  const base=read("app-parts/app-v03.js");
  const layer=read("app-parts/app-v031-consent.js");
  assert.match(base,/開始 90 秒快練/);
  assert.match(base,/完整能力訓練/);
  assert.match(layer,/v031BaseHomeView/);
  assert.match(layer,/base\.replace\("<\/main>"/);
});
