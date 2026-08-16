/* SignalSafe V2.1 — production integrity, safety recovery, measurement integrity. */
const V21_PRODUCT_VERSION = "2.1.0";
const V21_EVENT_SCHEMA_VERSION = "signalsafe-research-events-v1";
const V21_STUDY_CONTEXT_KEY = "signalsafe:v21:study-context";
const V21_STUDY_FIXTURE_KEY = "signalsafe:v21:study-fixture";
const V21_STUDY_TASK_KEY = "signalsafe:v21:task-state";
const V21_EVENT_STORE_KEY = "signalsafe:v21:study-events";
const V21_CONTROL_CHANNEL = "signalsafe:v21:study-control";
const MIN_OBSERVATIONS_FOR_STATUS = 5;
const MIN_OBSERVATIONS_FOR_WEAKNESS = 5;
const V21_OFFICIAL_165_URL = "https://165.npa.gov.tw/";

const v21BaseShell = shell;
const v21BaseHomeView = homeView;
const v21BaseQuickView = quickView;
const v21BaseQuickCompleteView = quickCompleteView;
const v21BaseFeedbackPanel = feedbackPanel;
const v21BaseAssessmentIntroView = assessmentIntroView;
const v21BaseAssessmentView = assessmentView;
const v21BaseBindEvents = bindEvents;
const v21BaseHandleAction = handleAction;
const v21BaseRender = render;
const v21BaseStartQuick = startQuick;
const v21BaseFinishQuick = finishQuick;
const v21BaseSaveState = saveState;

V2_RISK_LABELS.tactic = "話術線索";
V2_RISK_LABELS.source = "來源線索";
V2_RISK_LABELS.action = "行為風險";
V2_RISK_LABELS.money = "金流風險";
V2_RISK_SHORT.tactic = "話術";
V2_RISK_SHORT.source = "來源";

let v21MemoryContext = null;
let v21MemoryFixture = null;
let v21MemoryEvents = [];
let v21HistoryApplying = false;
let v21LastRenderedRoute = route;
let v21LastLoggedRoute = null;
let v21ControlChannel = null;
let v21ProductStateSnapshot = null;

function v21SessionGet(key) {
  try { return sessionStorage.getItem(key); } catch (_) { return null; }
}
function v21SessionSet(key, value) {
  try { sessionStorage.setItem(key, value); return true; } catch (_) { return false; }
}
function v21SessionRemove(key) {
  try { sessionStorage.removeItem(key); } catch (_) {}
}
function v21LocalGet(key) {
  try { return localStorage.getItem(key); } catch (_) { return null; }
}
function v21LocalSet(key, value) {
  try { localStorage.setItem(key, value); return true; } catch (_) { return false; }
}

function v21ReadContext() {
  const raw = v21SessionGet(V21_STUDY_CONTEXT_KEY);
  if (raw) {
    try { return JSON.parse(raw); } catch (_) {}
  }
  return v21MemoryContext;
}

function v21WriteContext(context) {
  v21MemoryContext = context;
  if (context) v21SessionSet(V21_STUDY_CONTEXT_KEY, JSON.stringify(context));
  else v21SessionRemove(V21_STUDY_CONTEXT_KEY);
}

function v21ReadFixture() {
  const raw = v21SessionGet(V21_STUDY_FIXTURE_KEY);
  if (raw) {
    try { return JSON.parse(raw); } catch (_) {}
  }
  return v21MemoryFixture;
}

function v21WriteFixture(fixture) {
  v21MemoryFixture = fixture;
  if (fixture) v21SessionSet(V21_STUDY_FIXTURE_KEY, JSON.stringify(fixture));
  else v21SessionRemove(V21_STUDY_FIXTURE_KEY);
}

function v21SanitizeMetadata(extra = {}) {
  const allowed = new Set([
    "questionId","value","risk","category","focusCategory","requestedRoute","source","requests",
    "setupId","phase","taskResult","target","control","count","reason","status","scenarioId"
  ]);
  const safe = {};
  for (const [key, value] of Object.entries(extra || {})) {
    if (!allowed.has(key)) continue;
    if (typeof value === "string") safe[key] = value.slice(0, 120);
    else if (typeof value === "number" || typeof value === "boolean" || value == null) safe[key] = value;
    else if (Array.isArray(value)) safe[key] = value.filter((item) => typeof item === "string").slice(0, 12).map((item) => item.slice(0, 80));
  }
  return safe;
}

function v21ReadEvents() {
  const raw = v21LocalGet(V21_EVENT_STORE_KEY);
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    } catch (_) {}
  }
  return v21MemoryEvents;
}

function v21WriteEvents(events) {
  v21MemoryEvents = events;
  v21LocalSet(V21_EVENT_STORE_KEY, JSON.stringify(events.slice(-3000)));
}

function v21TaskState() {
  const raw = v21SessionGet(V21_STUDY_TASK_KEY);
  if (raw) { try { return JSON.parse(raw); } catch (_) {} }
  return null;
}

function v21SetTaskState(next) {
  if (next) v21SessionSet(V21_STUDY_TASK_KEY, JSON.stringify(next));
  else v21SessionRemove(V21_STUDY_TASK_KEY);
}

function v21AppendStudyEvent(event, extra = {}, contextOverride = null) {
  const context = contextOverride || v21ReadContext();
  if (!context) return;
  const task = v21TaskState();
  const now = Date.now();
  const record = {
    schemaVersion: V21_EVENT_SCHEMA_VERSION,
    studyId: context.studyId,
    participantId: context.participantId,
    taskId: context.taskId || null,
    protocolVersion: SIGNALSAFE_V2_PROTOCOL_VERSION,
    productVersion: V21_PRODUCT_VERSION,
    event,
    route,
    control: "participant",
    timestamp: new Date(now).toISOString(),
    durationMs: task?.startedAtMs ? Math.max(0, now - task.startedAtMs) : null,
    metadata: v21SanitizeMetadata(extra),
  };
  const events = v21ReadEvents();
  events.push(record);
  v21WriteEvents(events);
}

function v21MaybeFirstAction(event, extra) {
  const actionEvents = new Set([
    "training_primary_clicked","training_started","answer_submitted","emergency_cta_clicked",
    "emergency_action_selected","verification_route_viewed","safe_action_viewed","scenario_summary_opened"
  ]);
  if (!actionEvents.has(event)) return;
  const task = v21TaskState();
  if (!task || task.firstActionAt) return;
  const next = { ...task, firstActionAt: new Date().toISOString(), firstAction: event };
  v21SetTaskState(next);
  v21AppendStudyEvent("first_action", { source: event, ...extra });
}

v2StudyContext = function () {
  return v21ReadContext();
};

v2Log = function (event, extra = {}) {
  if (!v21ReadContext()) return;
  v21MaybeFirstAction(event, extra);
  v21AppendStudyEvent(event, extra);
};

function v21EndStudyContext(reason = "ended") {
  const context = v21ReadContext();
  if (context) v21AppendStudyEvent("task_ended", { reason }, context);
  v21WriteContext(null);
  v21WriteFixture(null);
  v21SetTaskState(null);
  if (v21ProductStateSnapshot) {
    state = v21BaseSaveState(structuredClone(v21ProductStateSnapshot));
    v21ProductStateSnapshot = null;
  }
}

function v21EstablishStudyContextFromUrl() {
  const params = new URLSearchParams(location.search);
  const studyId = params.get("study");
  const participantId = params.get("participant")?.toUpperCase();
  const taskId = params.get("task");
  const setupId = params.get("setup");
  if (studyId && participantId && isValidParticipantId(participantId)) {
    const cleanProductState = structuredClone(state);
    delete cleanProductState.v2StudyContext;
    delete cleanProductState.v2ResearchEvents;
    state = v21BaseSaveState(cleanProductState);
    v21ProductStateSnapshot = structuredClone(state);
    const context = { studyId, participantId, taskId: taskId || null, setupId: setupId || null };
    v21WriteContext(context);
    const fixture = setupId ? getStudyFixture(setupId) : null;
    v21WriteFixture(fixture);
    const startedAtMs = Date.now();
    v21SetTaskState({ taskId: taskId || null, startedAtMs, firstActionAt: null, firstAction: null });
    v21AppendStudyEvent("task_started", { requestedRoute: params.get("route") || "home", setupId: fixture?.id || setupId || "none" }, context);
    const requested = params.get("route");
    if (params.get("formal") === "1") route = "research-intro";
    else if (requested && V2_ROUTE_ALLOWLIST.has(requested)) route = requested;
    params.delete("participant");
    params.delete("task");
    params.delete("setup");
    const clean = `${location.pathname}${params.toString() ? `?${params}` : ""}${location.hash}`;
    history.replaceState({ ...(history.state || {}), route }, "", clean);
  }
  if (state && (state.v2StudyContext || state.v2ResearchEvents)) {
    delete state.v2StudyContext;
    delete state.v2ResearchEvents;
    state = v21BaseSaveState(state);
  }
}

saveState = function (next) {
  if (!v21ReadContext()) return v21BaseSaveState(next);
  return { ...next, storageMode: next?.storageMode || state?.storageMode || "persistent" };
};

function v21SetUpControlChannel() {
  if (!("BroadcastChannel" in window)) return;
  try {
    v21ControlChannel = new BroadcastChannel(V21_CONTROL_CHANNEL);
    v21ControlChannel.addEventListener("message", (event) => {
      const message = event.data || {};
      const context = v21ReadContext();
      if (!context || message.type !== "end-study") return;
      if (message.participantId && message.participantId !== context.participantId) return;
      if (message.taskId && context.taskId && message.taskId !== context.taskId) return;
      v21EndStudyContext("moderator-ended");
    });
  } catch (_) {}
}

function v21EmptyCategoryEvidence() {
  return Object.fromEntries(Object.keys(V2_RISK_LABELS).map((key) => [key, {
    quick: { opportunities: 0, hits: 0 },
    full: { opportunities: 0, hits: 0 },
    opportunities: 0,
    noticed: 0,
  }]));
}

function v21EvidenceFromFixture(fixture) {
  const stats = v21EmptyCategoryEvidence();
  for (const [key, category] of Object.entries(fixture?.categories || {})) {
    if (!stats[key]) continue;
    stats[key].quick = { opportunities: Number(category.quick?.opportunities || 0), hits: Number(category.quick?.hits || 0) };
    stats[key].full = { opportunities: Number(category.full?.opportunities || 0), hits: Number(category.full?.hits || 0) };
    const preferred = stats[key].full.opportunities ? stats[key].full : stats[key].quick;
    stats[key].opportunities = preferred.opportunities;
    stats[key].noticed = preferred.hits;
  }
  return stats;
}

function v21CategoryEvidence(responses = null) {
  const fixture = v21ReadFixture();
  if (fixture && v21ReadContext()) return v21EvidenceFromFixture(fixture);
  const source = responses || v2LatestConsumerResponses();
  const stats = v21EmptyCategoryEvidence();
  for (const response of source) {
    const question = getQuestionById(response.questionId);
    if (!question) continue;
    const selected = new Set(response.selectedSignalIds || []);
    if (response.phase === "quick" || question.phase === "quick") {
      const primary = question.primarySignalId;
      const signal = question.signalOptions?.find((item) => item.id === primary);
      if (!primary || !signal || !stats[signal.category]) continue;
      stats[signal.category].quick.opportunities += 1;
      if (selected.has(primary)) stats[signal.category].quick.hits += 1;
      continue;
    }
    for (const signalId of question.correctSignalIds || []) {
      const signal = question.signalOptions?.find((item) => item.id === signalId);
      if (!signal || !stats[signal.category]) continue;
      stats[signal.category].full.opportunities += 1;
      if (selected.has(signalId)) stats[signal.category].full.hits += 1;
    }
  }
  for (const stat of Object.values(stats)) {
    const preferred = stat.full.opportunities ? stat.full : stat.quick;
    stat.opportunities = preferred.opportunities;
    stat.noticed = preferred.hits;
  }
  return stats;
}

v2CategoryStats = function (responses = null) {
  return v21CategoryEvidence(responses);
};

function v21StatusChannel(stat) {
  if (stat?.full?.opportunities >= MIN_OBSERVATIONS_FOR_STATUS) return { ...stat.full, source: "完整練習" };
  if (stat?.quick?.opportunities >= MIN_OBSERVATIONS_FOR_STATUS) return { ...stat.quick, source: "3 題快練" };
  return null;
}

v2AbilityStatus = function (stat) {
  const channel = v21StatusChannel(stat);
  if (!channel) return { label: "資料不足", level: "empty" };
  const ratio = channel.hits / channel.opportunities;
  if (ratio >= 0.75) return { label: "目前較穩定", level: "strong", source: channel.source };
  if (ratio >= 0.5) return { label: "持續練習", level: "developing", source: channel.source };
  return { label: "優先加強", level: "priority", source: channel.source };
};

v2WeakestCategory = function (stats) {
  const eligible = Object.entries(stats).map(([key, stat]) => {
    const full = stat.full?.opportunities >= MIN_OBSERVATIONS_FOR_WEAKNESS ? { ...stat.full, source: "full" } : null;
    const quick = !full && stat.quick?.opportunities >= MIN_OBSERVATIONS_FOR_WEAKNESS ? { ...stat.quick, source: "quick" } : null;
    const channel = full || quick;
    return channel ? [key, channel] : null;
  }).filter(Boolean);
  return eligible.sort((a, b) => (a[1].hits / a[1].opportunities) - (b[1].hits / b[1].opportunities))[0]?.[0] || null;
};

shell = function (content, options = {}) {
  let html = v21BaseShell(content, options);
  if (!html.includes('class="skip-link"')) html = html.replace(/(<div class="app-shell[^>]*>)/, '$1<a class="skip-link" href="#main">跳到主要內容</a>');
  html = html.replace(/<main(?![^>]*\bid=)/, '<main id="main" tabindex="-1"');
  return html;
};

homeView = function () {
  let html = v21BaseHomeView();
  html = html.replaceAll("開始 90 秒快練", "開始 3 題快練");
  html = html.replaceAll("完整能力訓練", "完整能力練習");
  html = html.replaceAll("我的判斷能力", "我的判斷紀錄");
  html = html.replace("<p>用已完成練習整理容易忽略的地方。</p>", "<p>以下依你在練習中注意到的風險線索整理，不是正式能力測驗分數。</p>");
  html = html.replace("<p>完成幾個情境後，這裡會開始整理你的判斷盲點。</p>", "<p>目前資料還不足，再做幾個情境後會開始整理。這不是正式能力測驗分數。</p>");
  return html;
};

quickView = function () {
  return v21BaseQuickView().replace("哪一個地方最值得你提高警覺？", "哪一個訊號最值得你先注意？");
};

feedbackPanel = function (question, response, isQuick = false) {
  if (!isQuick) return v21BaseFeedbackPanel(question, response, isQuick);
  const selectedId = response?.selectedSignalIds?.[0] || null;
  const primaryId = question.primarySignalId || question.correctSignalIds?.[0] || null;
  const selected = question.signalOptions?.find((item) => item.id === selectedId);
  const primary = question.signalOptions?.find((item) => item.id === primaryId);
  const others = (question.correctSignalIds || []).filter((id) => id !== primaryId).map((id) => question.signalOptions?.find((item) => item.id === id)).filter(Boolean);
  const primaryHit = selectedId === primaryId;
  const selectedText = selected ? `${SIGNAL_CATEGORY_LABELS[selected.category]}：${selected.label}` : "這次沒有選到線索";
  const primaryText = primary ? `${SIGNAL_CATEGORY_LABELS[primary.category]}：${primary.label}` : "請先看安全下一步";
  return `<div class="feedback-panel v2-feedback-panel v21-quick-feedback">
    <div class="v2-feedback-summary"><span>${icon("brain",27)}</span><div><strong>把這題變成下次用得上的判斷方式</strong><p>${primaryHit ? "你先抓到這題最值得優先注意的核心訊號。" : "這次選到的線索不一定沒價值；先對照最值得優先注意的核心訊號。"}</p></div></div>
    <section class="feedback-section"><p class="feedback-label">你先注意到</p><h2>${selectedText}</h2></section>
    <section class="feedback-section"><p class="feedback-label">最重要的核心訊號</p><h2>${primaryText}</h2></section>
    ${others.length ? `<section class="feedback-section"><p class="feedback-label">另外還可以留意</p><div class="risk-tags">${others.map((item) => `<span>${SIGNAL_CATEGORY_LABELS[item.category]}：${item.label}</span>`).join("")}</div></section>` : ""}
    <section class="feedback-section"><p class="feedback-label">先做對下一步</p><h2>${question.actionOptions.find((item) => question.correctActionIds.includes(item.id))?.label || "先停止高風險操作"}</h2></section>
    <section class="feedback-section"><p class="feedback-label">為什麼</p><p>${question.explanation}</p></section>
    <section class="feedback-section feedback-section--soft"><p class="feedback-label">離開原訊息查證</p><p>${question.officialVerification}</p></section>
    <section class="feedback-section"><p class="feedback-label">下次看到類似情況</p><blockquote>${question.memoryTip}</blockquote></section>
    <button class="button button--primary button--full" data-action="next-quick">下一個情境 ${icon("arrow",19)}</button>
  </div>`;
};

quickCompleteView = function () {
  if (!currentFlow || currentFlow.type !== "quick") return v21BaseQuickCompleteView();
  const stats = v21CategoryEvidence(currentFlow.responses);
  const seen = Object.entries(stats).filter(([, stat]) => stat.quick.opportunities > 0);
  const least = seen.sort((a, b) => (a[1].quick.hits / a[1].quick.opportunities) - (b[1].quick.hits / b[1].quick.opportunities))[0]?.[0] || null;
  return shell(`<section class="completion-card v2-completion"><div class="completion-card__icon">${icon("shield",42)}</div><h1>這次 3 題快練完成。</h1><p>這裡只整理本次練習觀察，不會用 3 題就替你貼上長期弱項標籤。</p>${least ? `<p class="v2-weakness-callout">這次比較少注意到：<strong>${V2_RISK_LABELS[least]}</strong></p>` : ""}<div class="completion-card__actions"><button class="button button--primary" data-action="finish-quick">查看我的判斷紀錄</button><button class="button button--secondary" data-route="home">回首頁</button></div></section>`, { compact: true });
};

assessmentIntroView = function () {
  if (state.activeAssessment?.mode === "research") return v21BaseAssessmentIntroView();
  return v21BaseAssessmentIntroView()
    .replaceAll("完整能力訓練", "完整能力練習")
    .replace("前測 8 題 → 訓練 8 題 → 後測 8 題；速度不加分，可中途暫停。", "三個階段，共 24 個情境；約 20–30 分鐘，可以暫停。練習階段會立即看到解析。")
    .replaceAll("開始完整能力訓練", "開始完整能力練習")
    .replaceAll("繼續完整能力訓練", "繼續完整能力練習");
};

assessmentView = function () {
  const html = v21BaseAssessmentView();
  if (state.activeAssessment?.mode === "research") return html;
  const labels = {
    pre: "Phase 1｜先看看你原本怎麼判斷",
    training: "Phase 2｜練習拆解風險",
    post: "Phase 3｜換個情境再試一次",
  };
  const current = state.activeAssessment?.phase;
  if (!labels[current]) return html;
  const legacy = current === "pre" ? "前測" : current === "training" ? "訓練" : "後測";
  return html.replaceAll(`>${legacy}<`, `>${labels[current]}<`);
};

function v21DashboardMetric(label, metric) {
  if (!metric.opportunities) return `<div class="v21-metric"><span>${label}</span><strong>尚無資料</strong></div>`;
  return `<div class="v21-metric"><span>${label}</span><strong>${metric.hits} / ${metric.opportunities} 次有注意到</strong></div>`;
}

function v21DashboardCard(key, stat) {
  const status = v2AbilityStatus(stat);
  return `<article class="v21-observation-card"><div class="v21-observation-card__head"><h2>${V2_RISK_LABELS[key]}</h2><strong class="is-${status.level}">${status.label}</strong></div>${v21DashboardMetric("快練：核心線索", stat.quick)}${v21DashboardMetric("完整練習：多線索回想", stat.full)}<small>${status.source ? `目前狀態依 ${status.source} 的 product heuristic 整理。` : "目前資料還不足，再做幾個情境後會開始整理。"}</small></article>`;
}

dashboardView = function () {
  const consumerSessions = state.sessions.filter((session) => session.mode !== "research" && (session.responses || []).length > 0);
  const responses = consumerSessions.flatMap((session) => session.responses || []);
  const stats = v21CategoryEvidence(responses);
  const fixture = v21ReadContext() ? v21ReadFixture() : null;
  const hasData = fixture || responses.length;
  const weakness = v2WeakestCategory(stats);
  return shell(`<section class="page-heading page-heading--row"><div><button class="back-button" data-route="home">← 回首頁</button><h1>我的判斷紀錄</h1><span>以下依你在練習中注意到的風險線索整理，不是正式能力測驗分數。</span></div><button class="button button--secondary" data-route="data">資料與隱私</button></section>${hasData ? `<section class="v21-dashboard"><div class="v21-observation-grid">${Object.entries(stats).map(([key, stat]) => v21DashboardCard(key, stat)).join("")}</div>${fixture ? `<p class="v21-fixture-note">研究測試狀態：使用匿名、合成、固定 fixture「${fixture.id}」，不會寫入一般學習紀錄。</p>` : ""}${weakness ? `<aside class="v2-practice-focus"><span>目前建議優先練習</span><h2>${V2_RISK_LABELS[weakness]}</h2><p>此建議至少需要 ${MIN_OBSERVATIONS_FOR_WEAKNESS} 次同類觀察，屬產品 heuristic，不是經驗證能力分數。</p><button class="button button--primary" data-v2-weakness="${weakness}">練習這類線索</button></aside>` : `<aside class="v2-practice-focus"><span>資料不足</span><h2>目前還不判定長期弱項</h2><p>再做幾個情境後會開始整理；3 題快練只會顯示當次觀察。</p></aside>`}</section>` : `<section class="empty-dashboard"><span>${icon("chart",44)}</span><h2>目前資料還不足</h2><p>再做幾個情境後會開始整理你的風險線索觀察紀錄，不會把尚未作答顯示成 0 分。</p><button class="button button--primary" data-action="start-quick">開始 3 題快練</button></section>`}`);
};

function v21ActedOptions(emergency) {
  const options = [
    ["none", "還沒有"],
    ["clicked", "已點連結"],
    ["password", "已輸入帳號／密碼"],
    ["otp-card", "已提供 OTP／卡片資料"],
    ["paid", "已付款／轉帳"],
    ["remote", "已安裝 App／遠端控制工具"],
    ["unsure", "不確定"],
  ];
  return options.map(([id, label]) => `<button class="emergency-option ${emergency.answers.acted === id ? "is-selected" : ""}" data-v21-acted="${id}" aria-pressed="${emergency.answers.acted === id}"><span>${icon(id === "paid" ? "chart" : id === "otp-card" ? "lock" : "shield",23)}</span>${label}</button>`).join("");
}

function v21RequestOptions(emergency) {
  const options = [
    ["login", "登入帳號或開啟連結"],
    ["otp", "提供 OTP、密碼或卡片資料"],
    ["payment", "付款、轉帳或操作 ATM／網銀"],
    ["personal", "提供個資"],
    ["download", "下載 App、檔案或遠端控制工具"],
    ["transfer", "換到其他帳號、群組或通訊軟體"],
    ["other", "其他／不確定"],
  ];
  return options.map(([id, label]) => `<button class="emergency-option ${emergency.answers.requests?.includes(id) ? "is-selected" : ""}" data-emergency-request="${id}" aria-pressed="${emergency.answers.requests?.includes(id)}"><span>${icon(id === "payment" ? "chart" : id === "otp" ? "lock" : "shield",23)}</span>${label}</button>`).join("");
}

function v21OfficialResources() {
  return `<div class="v21-official-actions"><a class="button button--primary" href="tel:165" data-v21-165-call>撥打 165</a><a class="button button--secondary" href="${V21_OFFICIAL_165_URL}" target="_blank" rel="noopener noreferrer" data-v21-165-web>開啟 165 官方查證入口</a></div>`;
}

function v21PreActionResult(emergency) {
  const requests = emergency.answers.requests || [];
  const stop = [];
  if (requests.includes("login")) stop.push("不要點訊息內的新連結，也不要在該頁登入。");
  if (requests.includes("otp")) stop.push("不要提供 OTP、密碼、卡片或網銀資料。");
  if (requests.includes("payment")) stop.push("不要付款、轉帳或依對方指示操作 ATM／網銀。");
  if (requests.includes("personal")) stop.push("不要傳身分證、地址或其他不必要個資。");
  if (requests.includes("download")) stop.push("不要下載安裝檔、遠端控制工具或不明 App。");
  if (requests.includes("transfer")) stop.push("不要跟著對方轉移到新的帳號、群組或私訊管道。");
  if (!stop.length) stop.push("先暫停回覆與操作，不必急著做決定。");
  return `<div class="emergency-result-card v2-emergency-result"><div class="emergency-result-card__status is-caution"><span>${icon("siren",29)}</span><div><p>STOP → SEPARATE → VERIFY</p><h2>你還沒做高風險操作，先把風險停在這裡</h2></div></div><section><p class="feedback-label">STOP｜先停下</p><ul class="safe-list">${stop.map((item) => `<li>${icon("check",18)}${item}</li>`).join("")}</ul></section><section><p class="feedback-label">SEPARATE｜離開對方控制的管道</p><p>關閉原訊息、連結或通話；不要用對方提供的客服入口。</p></section><section><p class="feedback-label">VERIFY｜自己找官方入口</p><p>自行開官方 App、手動輸入官網、看卡片背面電話，或使用你原本保存的聯絡方式。仍不確定時，可使用 165。</p>${v21OfficialResources()}</section><p class="v21-trusted-adult">如果你希望有人一起處理，可以找可信任的大人／家長／老師陪你查證。</p><div class="button-row"><button class="button button--secondary" data-action="v21-emergency-restart">重新檢查</button><button class="button button--primary" data-route="home">完成</button></div></div>`;
}

function v21RecoveryPlan(acted) {
  const plans = {
    clicked: ["停止在原連結繼續操作，不再輸入任何資料。", "關閉該頁面，改從官方 App／官網檢查帳號與通知。", "若剛才有下載檔案或後續又輸入資料，依實際情況採取更高一級的處理。"],
    password: ["不要再使用原連結。改用可信任裝置與官方入口修改密碼。", "檢查登入紀錄、安全設定與已登入裝置；能登出其他工作階段時一併處理。", "若相同密碼也用在其他重要帳號，逐一從官方入口更換。"],
    "otp-card": ["立即停止與對方互動，不再提供任何驗證碼或金融資料。", "使用卡片背面、銀行 App 或官網上的官方客服聯絡金融機構。", "保留必要的交易／對話證據，並使用 165 尋求後續協助。"],
    paid: ["不要再追加付款，也不要相信『再付一筆才能退款』。", "儘速透過金融機構官方管道說明已付款／轉帳情況，詢問可採取的處置。", "保留必要證據並使用 165；若有其他帳號或卡片資料外洩，也一起處理。"],
    remote: ["立即停止依對方指令操作，終止遠端控制或不明 App 的連線。", "改用可信任裝置檢查重要帳號；若涉及金融資訊，聯絡金融機構官方客服。", "保留必要證據並使用 165；不要讓對方再遠端『協助處理』。"],
    unsure: ["先停止互動與新的操作，避免風險繼續擴大。", "從可信任裝置檢查帳號、付款或下載紀錄，確認自己已經做了哪些事。", "只要可能涉及金融資料、OTP、付款或遠端控制，就使用官方客服與 165 協助處理。"],
  };
  return plans[acted] || plans.unsure;
}

function v21PostActionResult(emergency) {
  const plan = v21RecoveryPlan(emergency.answers.acted);
  return `<div class="emergency-result-card v2-emergency-result v21-recovery"><div class="emergency-result-card__status is-caution"><span>${icon("siren",29)}</span><div><p>LIMIT DAMAGE → CONTACT → RECOVER</p><h2>你已經做過操作，現在重點是限制損害並改走官方管道</h2></div></div><section><p class="feedback-label">LIMIT DAMAGE｜先停止擴大</p><p>${plan[0]}</p></section><section><p class="feedback-label">CONTACT｜聯絡可信任來源</p><p>${plan[1]}</p></section><section><p class="feedback-label">RECOVER｜保留證據、完成後續處理</p><p>${plan[2]}</p>${v21OfficialResources()}</section><p class="v21-trusted-adult">如果你是學生，不需要自己扛完整個處理流程；可以找可信任的大人／家長／老師一起確認下一步。</p><div class="button-row"><button class="button button--secondary" data-action="v21-emergency-restart">重新檢查</button><button class="button button--primary" data-route="home">完成</button></div></div>`;
}

emergencyView = function () {
  const emergency = currentFlow?.type === "emergency" ? currentFlow : { type: "emergency", step: "acted", answers: {} };
  currentFlow = emergency;
  return shell(`<section class="v2-emergency-heading"><button class="back-button" data-route="home">← 回首頁</button><h1>我現在遇到可疑情況</h1><p>先處理安全下一步，不必先猜是哪一種詐騙。</p></section><section class="v2-stop-now" role="note" aria-label="立即安全提醒"><div>${icon("siren",28)}</div><div><strong>不論真假，先不要再做新的高風險操作</strong><ul><li>不要再點新的連結或重新登入</li><li>不要再提供 OTP、密碼或金融資料</li><li>不要再付款、轉帳或安裝對方指定的工具</li></ul></div></section><section class="emergency-shell v2-emergency-shell">${emergency.step === "acted" ? `<div class="emergency-card"><p class="step-label">第一步</p><h2>你是否已經做了其中一件事？</h2><p>只選最接近目前狀況的一項；不要貼上真實帳密、OTP 或金融資料。</p><div class="emergency-options">${v21ActedOptions(emergency)}</div><button class="button button--primary button--full" data-action="v21-emergency-acted-next" ${!emergency.answers.acted ? "disabled" : ""}>繼續 ${icon("arrow",19)}</button></div>` : emergency.step === "requests" ? `<div class="emergency-card"><p class="step-label">第二步</p><h2>對方要你做什麼？</h2><p>可複選。先辨認對方推你做的行動，不需要先分類對方自稱誰。</p><div class="emergency-options">${v21RequestOptions(emergency)}</div><div class="button-row"><button class="button button--secondary" data-action="v21-emergency-back">上一步</button><button class="button button--primary" data-action="v21-emergency-pre-result" ${!emergency.answers.requests?.length ? "disabled" : ""}>查看安全下一步</button></div></div>` : emergency.step === "pre-result" ? v21PreActionResult(emergency) : v21PostActionResult(emergency)}</section>`);
};

startQuick = function (category = null) {
  v21BaseStartQuick(category);
};

finishQuick = function (shouldSave = true) {
  if (v21ReadContext() && currentFlow?.type === "quick") {
    v2Log("task_ended", { reason: shouldSave ? "quick-complete" : "quick-quit" });
    currentFlow = null;
    setRoute(shouldSave ? "dashboard" : "home");
    return;
  }
  return v21BaseFinishQuick(shouldSave);
};

handleAction = function (name) {
  if (name === "v21-emergency-acted-next") {
    v2Log("emergency_action_selected", { value: currentFlow?.answers?.acted || "unknown" });
    currentFlow.step = currentFlow.answers.acted === "none" ? "requests" : "post-result";
    if (currentFlow.step === "post-result") v2Log("safe_action_viewed", { value: currentFlow.answers.acted });
    render();
    return;
  }
  if (name === "v21-emergency-back") { currentFlow.step = "acted"; render(); return; }
  if (name === "v21-emergency-pre-result") { currentFlow.step = "pre-result"; v2Log("safe_action_viewed", { requests: currentFlow.answers.requests || [] }); render(); return; }
  if (name === "v21-emergency-restart") { currentFlow = { type: "emergency", step: "acted", answers: {} }; render(); return; }
  return v21BaseHandleAction(name);
};

bindEvents = function () {
  v21BaseBindEvents();
  document.querySelectorAll("[data-v21-acted]").forEach((element) => element.addEventListener("click", () => {
    currentFlow.answers.acted = element.dataset.v21Acted;
    render();
  }));
  document.querySelectorAll("[data-v21-165-call],[data-v21-165-web]").forEach((element) => element.addEventListener("click", () => v2Log("verification_route_viewed", { source: element.hasAttribute("data-v21-165-call") ? "tel:165" : "165-official-web" })));
};

function v21RouteTitle(currentRoute) {
  return {
    home: "SignalSafe｜首頁",
    quick: "SignalSafe｜防詐訓練",
    "assessment-intro": "SignalSafe｜完整能力練習",
    assessment: "SignalSafe｜完整能力練習",
    "assessment-phase-complete": "SignalSafe｜完整能力練習",
    dashboard: "SignalSafe｜我的判斷紀錄",
    emergency: "SignalSafe｜我現在遇到可疑情況",
    data: "SignalSafe｜資料與隱私",
  }[currentRoute] || "SignalSafe｜練習判斷，安全下一步";
}

function v21ManageHistory(previousRoute, nextRoute) {
  const meaningful = V2_ROUTE_ALLOWLIST.has(nextRoute);
  if (!meaningful) return;
  if (v21HistoryApplying) return;
  if (previousRoute !== nextRoute) history.pushState({ ...(history.state || {}), route: nextRoute }, "", location.href);
  else if (!history.state?.route) history.replaceState({ ...(history.state || {}), route: nextRoute }, "", location.href);
}

function v21AfterRender(previousRoute) {
  document.title = v21RouteTitle(route);
  const routeChanged = previousRoute !== route;
  v21ManageHistory(previousRoute, route);
  if (routeChanged) {
    if (v21ReadContext() && v21LastLoggedRoute !== route) {
      v21LastLoggedRoute = route;
      v2Log("route_changed", { value: route });
      if (route === "emergency") v2Log("emergency_started");
      if (route === "dashboard") v2Log("target_reached", { target: "dashboard" });
    }
    requestAnimationFrame(() => {
      const main = document.querySelector("#main");
      const heading = main?.querySelector("h1");
      (heading || main)?.focus?.({ preventScroll: true });
    });
  }
}

render = function () {
  const previousRoute = v21LastRenderedRoute;
  v21BaseRender();
  v21AfterRender(previousRoute);
  v21LastRenderedRoute = route;
};

window.addEventListener("popstate", (event) => {
  const next = event.state?.route;
  if (!next || !V2_ROUTE_ALLOWLIST.has(next)) return;
  v21HistoryApplying = true;
  route = next;
  if (route !== "quick" && currentFlow?.type === "quick") currentFlow = null;
  if (route !== "emergency" && currentFlow?.type === "emergency") currentFlow = null;
  render();
  v21HistoryApplying = false;
});

v21EstablishStudyContextFromUrl();
v21SetUpControlChannel();
history.replaceState({ ...(history.state || {}), route: V2_ROUTE_ALLOWLIST.has(route) ? route : "home" }, "", location.href);
render();
