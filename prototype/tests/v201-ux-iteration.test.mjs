import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(path, import.meta.url), 'utf8');

test('V2.0.1 UX layer remains preserved and V2.1 loads after it', async () => {
  const bootstrap = await read('../bootstrap.mjs');
  const index = await read('../index.html');
  assert.match(bootstrap, /app-v201\.js/);
  assert.match(bootstrap, /app-v21\.js/);
  assert.ok(bootstrap.indexOf('app-v201.js') > bootstrap.indexOf('app-v2.js'));
  assert.ok(bootstrap.indexOf('app-v21.js') > bootstrap.indexOf('app-v201.js'));
  assert.match(index, /08-v201\.css/);
  assert.match(index, /09-v21\.css/);
  assert.ok(index.indexOf('09-v21.css') > index.indexOf('08-v201.css'));
});

test('homepage legacy layer separates safety intent from training intent and keeps resume inside training zone', async () => {
  const source = await read('../app-parts/app-v201.js');
  assert.match(source, /data-v201-safety-zone/);
  assert.match(source, /data-v201-training-zone/);
  assert.match(source, /現在真的遇到問題/);
  assert.match(source, /平常想練習/);
  assert.match(source, /data-v201-training-resume-zone/);
  const safetyIndex = source.indexOf('data-v201-safety-zone');
  const trainingIndex = source.indexOf('data-v201-training-zone');
  const resumeIndex = source.indexOf('data-v201-training-resume-zone');
  assert.ok(safetyIndex >= 0 && trainingIndex > safetyIndex && resumeIndex > trainingIndex);
  assert.match(source, /開始 90 秒快練/);
  assert.match(source, /完整能力訓練/);
  assert.doesNotMatch(source, /Research Mode|研究模式|Pilot Mode|測試模式|受試者模式/);
});

test('V2.1 overrides consumer timing and capability copy without deleting legacy research history', async () => {
  const source = await read('../app-parts/app-v21.js');
  assert.match(source, /開始 3 題快練/);
  assert.match(source, /完整能力練習/);
  assert.match(source, /我的判斷紀錄/);
  assert.match(source, /不是正式能力測驗分數/);
});

test('home suppresses duplicate mobile persistent safety CTA while preserving non-home access', async () => {
  const source = await read('../app-parts/app-v201.js');
  assert.match(source, /route === "home" \|\| route === "emergency"/);
  assert.match(source, /v201BasePersistentSafetyAction\(\)/);
});

test('complete assessment provides progressive sticky scenario context without revealing answer keys', async () => {
  const source = await read('../app-parts/app-v201.js');
  assert.match(source, /data-v201-scenario-summary/);
  assert.match(source, /data-v201-scenario-card/);
  assert.match(source, /data-v201-show-scenario/);
  assert.match(source, /aria-controls="assessment-scenario-card"/);
  assert.match(source, /IntersectionObserver/);
  assert.match(source, /scenario_summary_shown/);
  assert.match(source, /scenario_summary_opened/);
  assert.doesNotMatch(source, /correctActionIds|correctSignalIds|correctJudgment/);
});

test('sticky scenario view preserves existing assessment measurement controls', async () => {
  const source = await read('../app-parts/app-v201.js');
  for (const marker of ['data-assessment-action','data-assessment-judgment','data-assessment-signal','data-assessment-confidence','data-action="submit-assessment"']) assert.ok(source.includes(marker), `missing assessment control: ${marker}`);
  assert.doesNotMatch(source, /function createResponse|responseSchema|questionOrder\s*=|correctActionIds\s*=|confidence\s*=\s*5/);
});

test('V2.0.1 usability events remain bounded to meaningful interactions', async () => {
  const source = await read('../app-parts/app-v201.js');
  for (const event of ['scenario_summary_shown','scenario_summary_opened','scenario_summary_hidden','home_safety_cta_seen','training_resume_seen','training_resume_clicked','training_primary_clicked']) assert.ok(source.includes(event), `missing UX event: ${event}`);
  assert.doesNotMatch(source, /mousemove|pointermove|scrollY.{0,20}10|setInterval\([^,]+,\s*50/);
});

test('V2.1 assets are offline-cached with an independent product cache version', async () => {
  const sw = await read('../sw.js');
  assert.match(sw, /signalsafe-product-2\.1\.0/);
  assert.doesNotMatch(sw, /CACHE_NAME\s*=\s*["']signalsafe-v0\.3\.4-research-export-fix/);
  for (const asset of ['./styles/08-v201.css','./app-parts/app-v201.js','./styles/09-v21.css','./app-parts/app-v21.js']) assert.ok(sw.includes(`"${asset}"`), `missing offline asset: ${asset}`);
});

test('formal research version stays frozen while product UX and PWA versions advance independently', async () => {
  const version = JSON.parse(await read('../VERSION.json'));
  const study = await read('../study-v2.mjs');
  assert.equal(version.appVersion, '0.3.4-research-export-fix');
  assert.equal(version.questionBankVersion, '2026-08-10-v2-candidate');
  assert.equal(version.productVersion, '2.1.0');
  assert.equal(version.pwaCacheVersion, 'signalsafe-product-2.1.0');
  assert.match(study, /SIGNALSAFE_V2_VERSION = "2\.1\.0"/);
});

test('responsive and accessibility contracts exist for compact scenario context', async () => {
  const css = await read('../styles/08-v201.css');
  const v21css = await read('../styles/09-v21.css');
  assert.match(css, /@media \(max-width: 620px\)/);
  assert.match(css, /@media \(max-width: 390px\)/);
  assert.match(css, /min-height: 44px/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /env\(safe-area-inset-top\)/);
  assert.match(css, /v201-scenario-sticky\[hidden\]/);
  assert.match(v21css, /\.skip-link/);
  assert.match(v21css, /scroll-margin-top/);
});
