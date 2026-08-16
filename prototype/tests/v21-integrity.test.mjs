import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { STUDY_FIXTURES, STUDY_FIXTURE_VERSION } from '../study-fixtures.mjs';
import { buildV2StudyLink, SIGNALSAFE_V2_PROTOCOL_VERSION, SIGNALSAFE_V2_VERSION, V2_RESEARCH_TASKS } from '../study-v2.mjs';

const read = (path) => readFile(new URL(path, import.meta.url), 'utf8');

test('V2.1 preserves formal research freeze while separating product/PWA versions', async () => {
  const version = JSON.parse(await read('../VERSION.json'));
  assert.equal(version.appVersion, '0.3.4-research-export-fix');
  assert.equal(version.questionBankVersion, '2026-08-10-v2-candidate');
  assert.equal(version.productVersion, '2.1.0');
  assert.equal(version.v2ProtocolVersion, 'signalsafe-v2-usability-2026-08-16');
  assert.equal(version.pwaCacheVersion, 'signalsafe-product-2.1.0');
  assert.equal(SIGNALSAFE_V2_VERSION, '2.1.0');
  assert.equal(SIGNALSAFE_V2_PROTOCOL_VERSION, 'signalsafe-v2-usability-2026-08-16');
});

test('production entry is first-party and includes V2.1 resources', async () => {
  const html = await read('../index.html');
  assert.doesNotMatch(html, /cdn\.jsdelivr\.net\/gh\//);
  assert.match(html, /\.\/bootstrap\.mjs/);
  assert.match(html, /\.\/styles\/09-v21\.css/);
  const vercel = JSON.parse(await read('../../vercel.json'));
  const map = new Map(vercel.rewrites.map((r) => [r.source, r.destination]));
  for (const path of ['/', '/manifest.webmanifest', '/icon.svg', '/sw.js', '/VERSION.json', '/test-guide.html', '/research-control.html']) assert.ok(map.has(path), `missing production rewrite ${path}`);
  assert.equal(map.get('/'), '/prototype/index.html');
});

test('PWA cache version is product-scoped and caches V2.1 shell', async () => {
  const sw = await read('../sw.js');
  assert.match(sw, /signalsafe-product-2\.1\.0/);
  assert.doesNotMatch(sw, /CACHE_NAME\s*=\s*["']signalsafe-v0\.3\.4-research-export-fix/);
  for (const asset of ['./VERSION.json','./study-fixtures.mjs','./styles/09-v21.css','./app-parts/app-v21.js']) assert.match(sw, new RegExp(asset.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
});

test('T03/T04 fixtures are deterministic, synthetic, anonymous and versioned', () => {
  assert.equal(STUDY_FIXTURE_VERSION, 'signalsafe-study-fixtures-v1');
  for (const id of ['seeded-learning-history-v1','seeded-weakness-source-v1']) {
    const fixture = STUDY_FIXTURES[id];
    assert.equal(fixture.synthetic, true);
    assert.equal(fixture.anonymous, true);
    assert.equal(fixture.version, STUDY_FIXTURE_VERSION);
    assert.ok(Object.isFrozen(fixture));
  }
  assert.equal(V2_RESEARCH_TASKS.find((t) => t.id === 'T03').setup, 'seeded-learning-history-v1');
  assert.equal(V2_RESEARCH_TASKS.find((t) => t.id === 'T04').setup, 'seeded-weakness-source-v1');
});

test('study deep link carries setup and production default has no prototype prefix', () => {
  const link = buildV2StudyLink({ participantId:'U001', taskId:'T03', route:'dashboard', setup:'seeded-learning-history-v1' });
  assert.ok(link.startsWith('/?'));
  assert.match(link, /participant=U001/);
  assert.match(link, /task=T03/);
  assert.match(link, /route=dashboard/);
  assert.match(link, /setup=seeded-learning-history-v1/);
});

test('V2.1 makes study context session-scoped and strips identifiers', async () => {
  const app = await read('../app-parts/app-v21.js');
  assert.match(app, /sessionStorage/);
  assert.match(app, /params\.delete\("participant"\)/);
  assert.match(app, /params\.delete\("task"\)/);
  assert.match(app, /params\.delete\("setup"\)/);
  assert.match(app, /delete state\.v2StudyContext/);
  assert.match(app, /delete state\.v2ResearchEvents/);
  assert.doesNotMatch(app, /state\.v2StudyContext\s*=/);
  assert.match(app, /v21ProductStateSnapshot/);
  assert.match(app, /if \(!v21ReadContext\(\)\) return v21BaseSaveState/);
});

test('quick training uses primary-signal semantics and dashboard separates task types', async () => {
  const app = await read('../app-parts/app-v21.js');
  assert.match(app, /primarySignalId/);
  assert.match(app, /哪一個訊號最值得你先注意/);
  assert.match(app, /最重要的核心訊號/);
  assert.match(app, /另外還可以留意/);
  assert.match(app, /快練：核心線索/);
  assert.match(app, /完整練習：多線索回想/);
  assert.doesNotMatch(app, /個重要訊號有被你注意到/);
});

test('weakness thresholds are consistent and framed as product heuristic', async () => {
  const app = await read('../app-parts/app-v21.js');
  assert.match(app, /MIN_OBSERVATIONS_FOR_STATUS = 5/);
  assert.match(app, /MIN_OBSERVATIONS_FOR_WEAKNESS = 5/);
  assert.match(app, /product heuristic/);
  assert.match(app, /不是正式能力測驗分數/);
  assert.match(app, /這次比較少注意到/);
});

test('emergency flow covers before-action, post-action recovery and official 165 routes', async () => {
  const app = await read('../app-parts/app-v21.js');
  for (const text of ['還沒有','已點連結','已輸入帳號／密碼','已提供 OTP／卡片資料','已付款／轉帳','已安裝 App／遠端控制工具','不確定']) assert.match(app, new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')));
  assert.match(app, /STOP → SEPARATE → VERIFY/);
  assert.match(app, /LIMIT DAMAGE → CONTACT → RECOVER/);
  assert.match(app, /href=\"tel:165\"/);
  assert.match(app, /https:\/\/165\.npa\.gov\.tw\//);
  assert.match(app, /rel=\"noopener noreferrer\"/);
});

test('consumer wording, history routing and focus management meet V2.1 contract', async () => {
  const app = await read('../app-parts/app-v21.js');
  const css = await read('../styles/09-v21.css');
  assert.match(app, /開始 3 題快練/);
  assert.match(app, /Phase 1｜先看看你原本怎麼判斷/);
  assert.match(app, /Phase 2｜練習拆解風險/);
  assert.match(app, /Phase 3｜換個情境再試一次/);
  assert.match(app, /history\.pushState/);
  assert.match(app, /popstate/);
  assert.match(app, /class=\"skip-link\"/);
  assert.match(app, /id=\"main\" tabindex=\"-1\"/);
  assert.match(app, /document\.title/);
  assert.match(css, /\.skip-link/);
  assert.match(css, /scroll-margin-top/);
});

test('research event store uses versioned privacy-bounded schema', async () => {
  const app = await read('../app-parts/app-v21.js');
  assert.match(app, /signalsafe-research-events-v1/);
  for (const field of ['studyId','participantId','taskId','protocolVersion','productVersion','event','route','control','timestamp','durationMs','metadata']) assert.match(app, new RegExp(field));
  assert.doesNotMatch(app, /metadata\s*:\s*extra/);
  for (const forbidden of ['rawMessage','password','phone','email','school','name']) assert.doesNotMatch(app, new RegExp(`["']${forbidden}["']\\s*:`,'i'));
});

test('research control exposes independent task lifecycle and anonymous export fields', async () => {
  const control = await read('../research-control.html');
  for (const label of ['Start Task','Reset Task State','Apply Fixture','Open Participant View','End Task']) assert.match(control, new RegExp(label));
  for (const field of ['study_id','participant_id','protocol_version','product_version','deployment_sha','scenario_id','tasks','events']) assert.match(control, new RegExp(field));
  assert.match(control, /time_to_first_action_ms/);
  assert.match(control, /non_target_action_count/);
  assert.match(control, /backtrack_count/);
});
