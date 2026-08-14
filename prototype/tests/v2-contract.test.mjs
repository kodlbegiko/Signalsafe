import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { V2_RESEARCH_TASKS, V2_TASK_STATUSES, buildV2StudyLink } from '../study-v2.mjs';

const read = (path) => readFile(new URL(path, import.meta.url), 'utf8');

test('V2 layer is loaded after legacy prototype layers', async () => {
  const bootstrap = await read('../bootstrap.mjs');
  assert.match(bootstrap, /study-v2\.mjs/);
  assert.match(bootstrap, /app-v2\.js/);
  assert.ok(bootstrap.indexOf('app-v2.js') > bootstrap.indexOf('app-v034-export.js'));
});

test('V2 stylesheet is part of the product surface', async () => {
  const index = await read('../index.html');
  assert.match(index, /07-v2\.css/);
  assert.match(index, /練習判斷，安全下一步/);
});

test('consumer V2 exposes emergency and training intent, not a research-mode home card', async () => {
  const source = await read('../app-parts/app-v2.js');
  assert.match(source, /我現在遇到可疑情況/);
  assert.match(source, /開始防詐訓練/);
  assert.doesNotMatch(source, /research-entry-card/);
  assert.match(source, /現在先不要做這三件事/);
  assert.match(source, /SignalSafe 不會告訴你「100% 安全」/);
});

test('V2 runtime assets are included in the offline cache manifest', async () => {
  const sw = await read('../sw.js');
  for (const asset of ['./study-v2.mjs','./research-control.html','./styles/07-v2.css','./app-parts/app-v2.js']) {
    assert.ok(sw.includes(`"${asset}"`), `missing V2 service-worker asset: ${asset}`);
  }
});

test('usability tasks are independent records rather than a sequential unlock chain', () => {
  assert.equal(V2_RESEARCH_TASKS.length, 8);
  assert.deepEqual(V2_TASK_STATUSES, ['PASS','PARTIAL','FAIL','NOT_ATTEMPTED']);
  assert.equal(new Set(V2_RESEARCH_TASKS.map((task) => task.id)).size, 8);
  assert.ok(V2_RESEARCH_TASKS.every((task) => typeof task.startRoute === 'string'));
});

test('study deep links carry anonymous research context without changing visible IA labels', () => {
  const link = buildV2StudyLink({ studyId:'SST-V2', participantId:'U001', taskId:'T05', route:'home' });
  assert.equal(link, '/prototype/?study=SST-V2&participant=U001&task=T05&route=home');
});

test('moderator control remains a separate surface', async () => {
  const control = await read('../research-control.html');
  assert.match(control, /主持人專用/);
  assert.match(control, /Independent Tasks/);
  assert.match(control, /NOT_ATTEMPTED/);
});
