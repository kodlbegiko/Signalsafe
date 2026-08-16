import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { V2_RESEARCH_SCENARIOS, V2_RESEARCH_TASKS, V2_TASK_STATUSES, buildV2StudyLink, SIGNALSAFE_V2_PROTOCOL_VERSION } from '../study-v2.mjs';
import { STUDY_FIXTURES } from '../study-fixtures.mjs';

const read = (path) => readFile(new URL(path, import.meta.url), 'utf8');

test('V2.1 layer is loaded after legacy prototype layers', async () => {
  const bootstrap = await read('../bootstrap.mjs');
  assert.match(bootstrap, /study-v2\.mjs/);
  assert.match(bootstrap, /study-fixtures\.mjs/);
  assert.match(bootstrap, /app-v2\.js/);
  assert.match(bootstrap, /app-v21\.js/);
  assert.ok(bootstrap.indexOf('app-v2.js') > bootstrap.indexOf('app-v034-export.js'));
  assert.ok(bootstrap.indexOf('app-v21.js') > bootstrap.indexOf('app-v201.js'));
});

test('V2 and V2.1 stylesheets are part of the product surface', async () => {
  const index = await read('../index.html');
  assert.match(index, /07-v2\.css/);
  assert.match(index, /09-v21\.css/);
  assert.match(index, /練習判斷，安全下一步/);
});

test('consumer V2 exposes emergency and training intent, not a research-mode home card', async () => {
  const source = await read('../app-parts/app-v2.js');
  const v21 = await read('../app-parts/app-v21.js');
  assert.match(source, /我現在遇到可疑情況/);
  assert.match(source, /開始防詐訓練/);
  assert.doesNotMatch(source, /research-entry-card/);
  assert.match(v21, /LIMIT DAMAGE → CONTACT → RECOVER/);
  assert.match(v21, /SignalSafe 不會告訴你|不會用 3 題就替你貼上長期弱項標籤/);
});

test('V2 runtime assets are included in the offline cache manifest', async () => {
  const sw = await read('../sw.js');
  for (const asset of ['./study-v2.mjs','./study-fixtures.mjs','./research-control.html','./styles/07-v2.css','./app-parts/app-v2.js','./styles/09-v21.css','./app-parts/app-v21.js']) assert.ok(sw.includes(`"${asset}"`), `missing V2 service-worker asset: ${asset}`);
});

test('usability protocol defines exactly two intent-based scenarios', () => {
  assert.equal(SIGNALSAFE_V2_PROTOCOL_VERSION, 'signalsafe-v2-usability-2026-08-16');
  assert.equal(V2_RESEARCH_SCENARIOS.length, 2);
  assert.deepEqual(V2_RESEARCH_SCENARIOS.map((scenario) => scenario.id), ['school-training','real-suspicious-event']);
  assert.equal(V2_RESEARCH_SCENARIOS[0].intent, 'training');
  assert.equal(V2_RESEARCH_SCENARIOS[1].intent, 'safety');
  assert.match(V2_RESEARCH_SCENARIOS[0].prompt, /老師只把 SignalSafe 網站交給你/);
  assert.match(V2_RESEARCH_SCENARIOS[1].prompt, /異常登入/);
});

test('usability tasks are independent records rather than a sequential unlock chain', () => {
  assert.equal(V2_RESEARCH_TASKS.length, 8);
  assert.deepEqual(V2_TASK_STATUSES, ['PASS','PARTIAL','FAIL','NOT_ATTEMPTED']);
  assert.equal(new Set(V2_RESEARCH_TASKS.map((task) => task.id)).size, 8);
  assert.ok(V2_RESEARCH_TASKS.every((task) => typeof task.startRoute === 'string'));
  assert.ok(V2_RESEARCH_TASKS.every((task) => task.independent === true));
  assert.ok(V2_RESEARCH_TASKS.every((task) => typeof task.participantPrompt === 'string' && task.participantPrompt.length > 0));
  assert.ok(V2_RESEARCH_TASKS.every((task) => typeof task.setup === 'string' && task.setup.length > 0));
});

test('T03 and T04 use real deterministic fixtures so earlier task failure cannot block them', () => {
  const t03 = V2_RESEARCH_TASKS.find((task) => task.id === 'T03');
  const t04 = V2_RESEARCH_TASKS.find((task) => task.id === 'T04');
  assert.equal(t03?.setup, 'seeded-learning-history-v1');
  assert.equal(t04?.setup, 'seeded-weakness-source-v1');
  assert.equal(t03?.startRoute, 'dashboard');
  assert.equal(t04?.startRoute, 'dashboard');
  assert.equal(STUDY_FIXTURES[t03.setup]?.synthetic, true);
  assert.equal(STUDY_FIXTURES[t04.setup]?.synthetic, true);
});

test('production study deep links carry anonymous context without prototype prefix', () => {
  const link = buildV2StudyLink({ studyId:'SST-V2', participantId:'U001', taskId:'T05', route:'home' });
  assert.equal(link, '/?study=SST-V2&participant=U001&task=T05&route=home');
  const local = buildV2StudyLink({ base:'/prototype/', studyId:'SST-V2', participantId:'U001', taskId:'T05', route:'home' });
  assert.equal(local, '/prototype/?study=SST-V2&participant=U001&task=T05&route=home');
});

test('moderator control surfaces scenario script, participant wording, lifecycle and setup state', async () => {
  const control = await read('../research-control.html');
  assert.match(control, /主持人專用/);
  assert.match(control, /Independent Tasks/);
  assert.match(control, /participantPrompt/);
  assert.match(control, /t\.setup/);
  assert.match(control, /NOT_ATTEMPTED/);
  for (const action of ['Start Task','Reset Task State','Apply Fixture','Open Participant View','End Task']) assert.match(control, new RegExp(action));
});

test('test guide uses dual scenarios and does not send participants into Research Mode', async () => {
  const guide = await read('../test-guide.html');
  assert.match(guide, /B\. 情境一：老師要求進行防詐訓練/);
  assert.match(guide, /C\. 情境二：收到疑似帳號異常通知/);
  assert.match(guide, /T01/);
  assert.match(guide, /T08/);
  assert.match(guide, /前一 Task FAIL 不得阻塞下一 Task/);
  assert.doesNotMatch(guide, /\?mode=research/);
  assert.doesNotMatch(guide, /從首頁自行找到 Research Mode/);
});
