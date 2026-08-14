/* SignalSafe V2: intent-first product layer. Loaded last so legacy v0.3 research code remains available but invisible from consumer IA. */
const V2_VERSION = window.SIGNALSAFE_V2_VERSION ?? "2.0.0-intent-safety-research";
const v2BaseShell = shell;
const v2BaseHandleAction = handleAction;
const v2BaseBindEvents = bindEvents;
const v2BaseCaptureFocusToken = captureFocusToken;
const v2BaseFeedbackPanel = feedbackPanel;

const V2_RISK_LABELS = { tactic:"話術辨識", source:"來源辨識", action:"行為風險", money:"金流風險" };
const V2_RISK_SHORT = { tactic:"話術", source:"來源", action:"行為", money:"金流" };
const V2_ROUTE_ALLOWLIST = new Set(["home","quick","assessment-intro","dashboard","emergency","data"]);

function v2StudyContext() {
  const params = new URLSearchParams(location.search);
  const studyId = params.get("study");
  const participantId = params.get("participant");
  const taskId = params.get("task");
  if (!studyId || !participantId || !isValidParticipantId(participantId)) return null;
  return { studyId, participantId: participantId.toUpperCase(), taskId: taskId || null };
}

function v2Log(event, extra = {}) {
  const context = v2StudyContext() ?? state.v2StudyContext ?? null;
  if (!context) return;
  state.v2StudyContext = context;
  state.v2ResearchEvents ??= [];
  state.v2ResearchEvents.push({
    event,
    studyId: context.studyId,
    participantId: context.participantId,
    taskId: context.taskId,
    prototypeVersion: V2_VERSION,
    at: new Date().toISOString(),
    route,
    ...extra,
  });
  state = saveState(state);
}

function v2PersistentSafetyAction() {
  if (route === "emergency") return "";
  return `<button class="v2-persistent-safety" data-route="emergency" aria-label="我現在遇到可疑情況">${icon("siren",19)}<span>我現在遇到可疑情況</span></button>`;
}

shell = function(content, options = {}) {
  const { compact = false, researchLocked = false } = options;
  if (researchLocked) return v2BaseShell(content, options);
  return `<div class="app-shell v2-shell ${compact ? "app-shell--compact" : ""}">
    <header class="topbar v2-topbar">
      <button class="brand" data-route="home" aria-label="回首頁"><span class="brand__mark">${icon("shield",26)}</span><span>SignalSafe</span></button>
      <nav class="v2-nav" aria-label="主要導覽">
        <button data-route="home" ${route==="home"?'aria-current="page"':""}>首頁</button>
        <button data-action="start-quick" ${route==="quick"?'aria-current="page"':""}>防詐訓練</button>
        <button data-route="dashboard" ${route==="dashboard"?'aria-current="page"':""}>我的能力</button>
      </nav>
      <div class="topbar__right"><button class="v2-header-safety" data-route="emergency">${icon("siren",18)}我現在遇到可疑情況</button><button class="icon-button" data-route="data" aria-label="資料與隱私">${icon("lock",20)}</button></div>
    </header>
    <main>${content}</main>
    <footer class="footer"><span>${storageNotice()}</span><span>SignalSafe V2 · 題庫 ${QUESTION_BANK_VERSION}</span></footer>
    ${v2PersistentSafetyAction()}
  </div>`;
};

function v2LatestConsumerResponses() {
  return state.sessions.filter((session)=>session.mode!=="research").flatMap((session)=>session.responses??[]);
}

function v2CategoryStats(responses = v2LatestConsumerResponses()) {
  const stats = Object.fromEntries(Object.keys(V2_RISK_LABELS).map((key)=>[key,{ opportunities:0, noticed:0 }]));
  for (const response of responses) {
    const question = getQuestionById(response.questionId);
    if (!question) continue;
    const selected = new Set(response.selectedSignalIds??[]);
    for (const signalId of question.correctSignalIds??[]) {
      const signal = question.signalOptions?.find((item)=>item.id===signalId);
      if (!signal || !stats[signal.category]) continue;
      stats[signal.category].opportunities += 1;
      if (selected.has(signalId)) stats[signal.category].noticed += 1;
    }
  }
  return stats;
}

function v2AbilityStatus(stat) {
  if (!stat || stat.opportunities < 3) return { label:"資料不足", level:"empty" };
  const ratio = stat.noticed / stat.opportunities;
  if (ratio >= .75) return { label:"目前較穩定", level:"strong" };
  if (ratio >= .5) return { label:"持續練習", level:"developing" };
  return { label:"優先加強", level:"priority" };
}

function v2WeakestCategory(stats) {
  return Object.entries(stats)
    .filter(([,stat])=>stat.opportunities>=2)
    .sort((a,b)=>(a[1].noticed/a[1].opportunities)-(b[1].noticed/b[1].opportunities))[0]?.[0] ?? null;
}

homeView = function() {
  const stats = v2CategoryStats();
  const weakness = v2WeakestCategory(stats);
  const recent = state.sessions.filter((session)=>session.mode!=="research").at(-1);
  return shell(`
    <section class="v2-home-hero">
      <div class="v2-home-copy">
        <h1>先學會判斷，真的遇到可疑情況時也知道怎麼做。</h1>
        <p>SignalSafe 不替你保證真假。平常用情境練習建立判斷能力；事件當下先停止高風險操作，再改走可信任的查證方式。</p>
      </div>
      <article class="v2-safety-hero" aria-labelledby="v2-safety-title">
        <div class="v2-safety-hero__icon">${icon("siren",30)}</div>
        <div><h2 id="v2-safety-title">我現在遇到可疑情況</h2><p>先不要點新連結、給驗證碼或依陌生人指示付款。先處理眼前風險。</p></div>
        <button class="button button--large v2-safety-primary" data-route="emergency">現在幫我處理 ${icon("arrow",19)}</button>
      </article>
    </section>
    <section class="v2-training-entry" aria-labelledby="v2-training-title">
      <div><h2 id="v2-training-title">平常練能力</h2><p>用 3 個短情境練習「判斷 → 找線索 → 做安全下一步」，速度不計分。</p></div>
      <div class="v2-training-actions"><button class="button button--primary button--large" data-action="start-quick">開始防詐訓練 ${icon("arrow",19)}</button><button class="button button--secondary" data-route="assessment-intro">完整能力訓練</button></div>
    </section>
    <section class="v2-home-grid">
      <article class="v2-ability-preview">
        <div class="section-heading"><div><h2>我的判斷能力</h2><p>${recent?"用已完成練習整理容易忽略的地方。":"完成幾個情境後，這裡會開始整理你的判斷盲點。"}</p></div><button class="text-button" data-route="dashboard">查看完整紀錄 ${icon("arrow",16)}</button></div>
        <div class="v2-mini-abilities">${Object.entries(stats).map(([key,stat])=>{const status=v2AbilityStatus(stat);return `<div><span>${V2_RISK_LABELS[key]}</span><strong class="is-${status.level}">${status.label}</strong><small>${stat.opportunities?`${stat.noticed} / ${stat.opportunities} 次有注意到`:"尚無資料"}</small></div>`;}).join("")}</div>
        ${weakness?`<div class="v2-next-practice"><span>目前建議</span><strong>多練 ${V2_RISK_LABELS[weakness]}</strong><button data-v2-weakness="${weakness}">針對弱項練習</button></div>`:""}
      </article>
      <article class="v2-principles"><h2>遇到可疑訊息，記住三件事</h2><ol><li><strong>先停下</strong><span>不要被限時、恐嚇或對方催促推著走。</span></li><li><strong>看來源與要求</strong><span>確認誰在找你、他要你做什麼。</span></li><li><strong>離開原訊息查證</strong><span>自行打開官方 App、官網或原本聯絡方式。</span></li></ol></article>
    </section>
  `);
};

startQuick = function(category = null) {
  let pool = getQuickBank();
  if (category) {
    const filtered = pool.filter((question)=>(question.correctSignalIds??[]).some((signalId)=>question.signalOptions?.find((item)=>item.id===signalId)?.category===category));
    if (filtered.length >= 1) pool = [...filtered, ...pool.filter((question)=>!filtered.some((item)=>item.id===question.id))];
  }
  const defaults = pickQuickQuestions(Date.now());
  const questions = category ? pool.slice(0,3) : defaults;
  currentFlow = { type:"quick", id:crypto.randomUUID(), questions, index:0, responses:[], selections:{ judgment:null, actionId:null, signalIds:[] }, step:"answer", startedAt:new Date().toISOString(), focusCategory:category };
  route="quick";
  v2Log("training_started", { focusCategory: category });
  startQuestionTimer();
  render();
};

quickView = function() {
  if (!currentFlow || currentFlow.type!=="quick") return homeView();
  const question=currentFlow.questions[currentFlow.index], total=currentFlow.questions.length;
  if (currentFlow.step==="complete") return quickCompleteView();
  const selections=currentFlow.selections, response=currentFlow.responses.at(-1);
  const progress=((currentFlow.index+(currentFlow.step==="feedback"?1:0))/total)*100;
  return shell(`<section class="flow-header"><button class="back-button" data-action="quit-flow">← 離開</button><div class="flow-header__center"><strong>防詐訓練</strong><span>情境 ${currentFlow.index+1} / ${total}</span></div><span class="timer-note">速度不計分</span></section><div class="progress" role="progressbar" aria-label="訓練進度" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(progress)}"><span style="width:${progress}%"></span></div><section class="question-layout"><article class="scenario-card"><div class="scenario-card__header"><span class="avatar">${question.senderLabel.slice(0,1)}</span><div><strong>${question.senderLabel}</strong><small>${question.category} · 模擬情境</small></div></div><div class="scenario-card__message"><strong>${question.title}</strong><p>${question.message}</p></div><p class="scenario-card__note">此為合成練習情境，不是真實帳號或連結。</p></article>${currentFlow.step==="answer"?`<div class="answer-panel v2-answer-panel"><div class="answer-block"><div class="answer-block__title"><span>1</span><div><h2>這則訊息目前看起來如何？</h2><p>先做自己的判斷，系統不會先告訴你答案。</p></div></div><div class="judgment-grid v2-judgment-grid">${Object.entries(JUDGMENT_LABELS).map(([key,label])=>`<button class="judgment judgment--${key} ${selections.judgment===key?"is-selected":""}" data-quick-judgment="${key}" aria-pressed="${selections.judgment===key}">${label}</button>`).join("")}</div></div><div class="answer-block"><div class="answer-block__title"><span>2</span><div><h2>現在最安全的下一步是？</h2><p>即使還不能確定真假，也可以先避免高風險操作。</p></div></div><div class="option-list">${question.actionOptions.map((option)=>`<button class="option ${selections.actionId===option.id?"is-selected":""}" data-select-action="${option.id}" aria-pressed="${selections.actionId===option.id}"><span class="option__radio"></span><span>${option.label}</span></button>`).join("")}</div></div><div class="answer-block"><div class="answer-block__title"><span>3</span><div><h2>哪一個地方最值得你提高警覺？</h2><p>選一個最關鍵的訊號。</p></div></div><div class="signal-grid">${question.signalOptions.map((option)=>`<button class="signal-option ${selections.signalIds.includes(option.id)?"is-selected":""}" data-select-signal="${option.id}" aria-pressed="${selections.signalIds.includes(option.id)}"><small>${SIGNAL_CATEGORY_LABELS[option.category]}</small><span>${option.label}</span></button>`).join("")}</div></div><button class="button button--primary button--full" data-action="submit-quick" ${!selections.judgment||!selections.actionId||selections.signalIds.length!==1?"disabled":""}>看看哪裡值得注意 ${icon("arrow",19)}</button></div>`:feedbackPanel(question,response,true)}</section>`,{compact:true});
};

feedbackPanel = function(question, response, isQuick = false) {
  const correctSignals = new Set(question.correctSignalIds??[]);
  const selectedSignals = response?.selectedSignalIds??[];
  const noticed = selectedSignals.filter((id)=>correctSignals.has(id));
  const missed = [...correctSignals].filter((id)=>!selectedSignals.includes(id));
  const judgmentMatch = response?.selectedJudgment ? response.isJudgmentCorrect : null;
  return `<div class="feedback-panel v2-feedback-panel"><div class="v2-feedback-summary"><span>${icon("brain",27)}</span><div><strong>把這題變成下次用得上的判斷方式</strong><p>${noticed.length} / ${correctSignals.size} 個重要訊號有被你注意到${judgmentMatch===false?"；分類不同沒關係，重點是先避免危險操作":""}。</p></div></div><section class="feedback-section"><p class="feedback-label">先做對下一步</p><h2>${question.actionOptions.find((item)=>question.correctActionIds.includes(item.id))?.label}</h2></section><section class="feedback-section"><p class="feedback-label">你有注意到</p>${noticed.length?`<div class="risk-tags">${noticed.map((id)=>{const item=question.signalOptions.find((signal)=>signal.id===id);return `<span>${SIGNAL_CATEGORY_LABELS[item.category]}：${item.label}</span>`;}).join("")}</div>`:"<p>這次沒有選到主要訊號，先看下面最值得補上的地方。</p>"}${missed.length?`<div class="v2-missed"><strong>比較容易漏掉</strong>${missed.map((id)=>{const item=question.signalOptions.find((signal)=>signal.id===id);return `<span>${SIGNAL_CATEGORY_LABELS[item.category]}：${item.label}</span>`;}).join("")}</div>`:""}</section><section class="feedback-section"><p class="feedback-label">為什麼</p><p>${question.explanation}</p></section><section class="feedback-section feedback-section--soft"><p class="feedback-label">離開原訊息查證</p><p>${question.officialVerification}</p></section><section class="feedback-section"><p class="feedback-label">下次看到類似情況</p><blockquote>${question.memoryTip}</blockquote></section><button class="button button--primary button--full" data-action="next-${isQuick?"quick":"assessment"}">${isQuick?"下一個情境":"繼續"} ${icon("arrow",19)}</button></div>`;
};

quickCompleteView = function() {
  const stats=v2CategoryStats(currentFlow.responses), weakness=v2WeakestCategory(stats);
  return shell(`<section class="completion-card v2-completion"><div class="completion-card__icon">${icon("shield",42)}</div><h1>這次防詐訓練完成。</h1><p>不是看你拿幾分，而是確認哪些訊號已經能主動注意、哪些地方還值得多練。</p><div class="v2-complete-abilities">${Object.entries(stats).map(([key,stat])=>`<div><span>${V2_RISK_LABELS[key]}</span><strong>${stat.opportunities?`${stat.noticed} / ${stat.opportunities}`:"—"}</strong></div>`).join("")}</div>${weakness?`<p class="v2-weakness-callout">這次最值得再練：<strong>${V2_RISK_LABELS[weakness]}</strong></p>`:""}<div class="completion-card__actions"><button class="button button--primary" data-action="finish-quick">看看我的能力</button><button class="button button--secondary" data-route="home">回首頁</button></div></section>`,{compact:true});
};

function v2EmergencyOptions(emergency) {
  const options=[
    ["login","要我點連結或登入帳號"],["otp","要我提供驗證碼、密碼或卡片資料"],["payment","要我付款、轉帳或操作 ATM"],["personal","要我提供身分證、地址或其他個資"],["download","要我下載 App、檔案或遠端控制工具"],["impersonation","對方自稱客服、銀行、政府或親友"],["transfer","要我改到其他帳號、群組或通訊軟體"],["other","只是覺得怪怪的／不確定"],
  ];
  return options.map(([id,label])=>`<button class="emergency-option ${emergency.answers.requests?.includes(id)?"is-selected":""}" data-emergency-request="${id}" aria-pressed="${emergency.answers.requests?.includes(id)}"><span>${icon(id==="payment"?"chart":id==="otp"?"lock":id==="impersonation"?"brain":"shield",23)}</span>${label}</button>`).join("");
}

emergencyView = function() {
  const emergency=currentFlow?.type==="emergency"?currentFlow:{type:"emergency",step:1,answers:{}};
  currentFlow=emergency;
  return shell(`<section class="v2-emergency-heading"><button class="back-button" data-route="home">← 回首頁</button><h1>我現在遇到可疑情況</h1><p>先降低眼前風險，不用急著把它分類成哪一種詐騙。</p></section><section class="v2-stop-now" role="note" aria-label="立即安全提醒"><div>${icon("siren",28)}</div><div><strong>現在先不要做這三件事</strong><ul><li>不要點新的連結或重新登入</li><li>不要提供驗證碼、密碼或個資</li><li>不要依陌生人指示付款、轉帳或操作 ATM</li></ul></div></section><section class="emergency-shell v2-emergency-shell">${emergency.step===1?`<div class="emergency-card"><p class="step-label">先確認眼前發生什麼</p><h2>現在最接近哪一種情況？</h2><p>可複選。不要貼上真實訊息、帳號、電話或驗證碼。</p><div class="emergency-options">${v2EmergencyOptions(emergency)}</div><button class="button button--primary button--full" data-action="emergency-next" ${!emergency.answers.requests?.length?"disabled":""}>下一步怎麼做 ${icon("arrow",19)}</button></div>`:emergency.step===2?emergencyStepTwo(emergency):emergencyResult(emergency)}</section>`);
};

emergencyStepTwo = function(emergency) {
  return `<div class="emergency-card"><p class="step-label">離開對方控制的路徑</p><h2>你知道原本的官方入口或原聯絡方式嗎？</h2><p>例如自己開啟官方 App、手動輸入官網、查看訂單頁、卡片背面電話，或用原本的電話／帳號聯絡本人。</p><div class="emergency-choice-grid"><button class="emergency-choice ${emergency.answers.official==="yes"?"is-selected":""}" data-emergency-official="yes" aria-pressed="${emergency.answers.official==="yes"}"><strong>知道</strong><span>我可以離開這則訊息後自己找到</span></button><button class="emergency-choice ${emergency.answers.official==="unknown"?"is-selected":""}" data-emergency-official="unknown" aria-pressed="${emergency.answers.official==="unknown"}"><strong>不確定</strong><span>我不知道哪個入口可信</span></button><button class="emergency-choice ${emergency.answers.official==="no"?"is-selected":""}" data-emergency-official="no" aria-pressed="${emergency.answers.official==="no"}"><strong>目前沒有</strong><span>對方要求只能照他提供的方式操作</span></button></div><div class="button-row"><button class="button button--ghost" data-action="emergency-back">上一步</button><button class="button button--primary" data-action="emergency-result" ${!emergency.answers.official?"disabled":""}>查看安全下一步</button></div></div>`;
};

emergencyResult = function(emergency) {
  const requests=emergency.answers.requests??[], stopItems=[];
  if(requests.includes("login"))stopItems.push("不要點訊息內連結，也不要在新開頁面登入");
  if(requests.includes("otp"))stopItems.push("不要提供 OTP、密碼、卡片或網銀資料");
  if(requests.includes("payment"))stopItems.push("不要付款、轉帳或依指示操作 ATM／網銀");
  if(requests.includes("personal"))stopItems.push("不要傳身分證、地址或其他不必要個資");
  if(requests.includes("download"))stopItems.push("不要下載安裝檔、遠端控制工具或不明 App");
  if(requests.includes("impersonation"))stopItems.push("不要只因名稱、頭像或自稱身分就相信對方");
  if(requests.includes("transfer"))stopItems.push("不要跟著對方轉移到新的帳號、群組或私訊管道");
  if(!stopItems.length)stopItems.push("先暫停回覆與操作，不必立刻做決定");
  return `<div class="emergency-result-card v2-emergency-result"><div class="emergency-result-card__status is-caution"><span>${icon("siren",29)}</span><div><p>安全優先</p><h2>先停下，再用獨立管道查證</h2></div></div><section><p class="feedback-label">現在先停什麼</p><ul class="safe-list">${stopItems.map((item)=>`<li>${icon("check",18)}${item}</li>`).join("")}</ul></section><section><p class="feedback-label">接下來這樣查</p><ol class="verification-steps"><li>離開原訊息、連結或通話，不使用對方提供的客服入口。</li><li>自己開啟官方 App、手動輸入官網、看卡片背面電話，或使用原本保存的聯絡方式。</li><li>若涉及金錢、帳號、個資或仍不確定，可找可信任大人、老師、官方客服或 165 協助。</li></ol></section><div class="emergency-warning"><strong>SignalSafe 不會告訴你「100% 安全」。</strong><p>目前的目標是先停止可能造成損失的操作，並把查證路徑移出對方控制。</p></div><div class="button-row"><button class="button button--secondary" data-action="restart-emergency">重新檢查</button><button class="button button--primary" data-route="home">完成</button></div></div>`;
};

function v2AbilityRows(stats) {
  return Object.entries(stats).map(([key,stat])=>{const status=v2AbilityStatus(stat);const width=stat.opportunities?Math.max(8,Math.round(stat.noticed/stat.opportunities*100)):0;return `<article class="v2-ability-row"><div class="v2-ability-row__head"><div><strong>${V2_RISK_LABELS[key]}</strong><span>${status.label}</span></div><small>${stat.opportunities?`${stat.noticed} / ${stat.opportunities} 次有注意到`:"完成幾個情境後才會判斷"}</small></div><div class="v2-ability-track" aria-hidden="true"><span class="is-${status.level}" style="width:${width}%"></span></div></article>`;}).join("");
}

dashboardView = function() {
  const consumerSessions=state.sessions.filter((session)=>session.mode!=="research"&&(session.responses??[]).length>0);
  const responses=consumerSessions.flatMap((session)=>session.responses??[]), stats=v2CategoryStats(responses), weakness=v2WeakestCategory(stats);
  return shell(`<section class="page-heading page-heading--row"><div><button class="back-button" data-route="home">← 回首頁</button><h1>我的判斷能力</h1><span>不只看答對幾題，而是看你是否有注意到話術、來源、行為與金流風險。</span></div><button class="button button--secondary" data-route="data">資料與隱私</button></section>${responses.length?`<section class="v2-dashboard"><div class="v2-ability-list">${v2AbilityRows(stats)}</div>${weakness?`<aside class="v2-practice-focus"><span>目前最值得加強</span><h2>${V2_RISK_LABELS[weakness]}</h2><p>系統會優先挑選包含${V2_RISK_SHORT[weakness]}線索的短情境。這不是永久標籤，之後會隨練習資料更新。</p><button class="button button--primary" data-v2-weakness="${weakness}">練習這個弱項</button></aside>`:""}</section><section class="history-section"><div class="section-heading"><div><h2>最近練習</h2><p>只顯示這台裝置上的一般訓練紀錄。</p></div><span>${consumerSessions.length} 次</span></div><div class="history-list">${consumerSessions.toReversed().slice(0,6).map((session)=>`<article><span class="history-icon">${icon(session.mode==="quick"?"bolt":"brain",21)}</span><div><strong>${session.mode==="quick"?"防詐短訓練":"完整能力訓練"}</strong><small>${new Date(session.completedAt).toLocaleString("zh-TW",{month:"numeric",day:"numeric",hour:"2-digit",minute:"2-digit"})}</small></div><div class="history-metric"><strong>${session.responses?.length??0}</strong><small>情境</small></div></article>`).join("")}</div></section>`:`<section class="empty-dashboard"><span>${icon("chart",44)}</span><h2>還沒有足夠的能力資料</h2><p>完成幾個情境後，我們會幫你整理比較容易忽略的風險，不會把「尚未作答」顯示成 0 分。</p><button class="button button--primary" data-action="start-quick">開始第一個情境</button></section>`}`);
};

captureFocusToken = function() {
  const base=v2BaseCaptureFocusToken();
  if(base) return base;
  const element=document.activeElement;
  if(!element||!app.contains(element))return null;
  for(const attribute of ["data-quick-judgment","data-v2-weakness"]){if(element.hasAttribute(attribute))return{attribute,value:element.getAttribute(attribute)};}
  return null;
};

bindEvents = function() {
  v2BaseBindEvents();
  document.querySelectorAll("[data-quick-judgment]").forEach((element)=>element.addEventListener("click",()=>{const next=element.dataset.quickJudgment;if(typeof v03Mark==="function")v03Mark(currentFlow.selections.judgment!==next);currentFlow.selections.judgment=next;v2Log("judgment_selected",{value:next,questionId:currentFlow.questions?.[currentFlow.index]?.id??null});render();}));
  document.querySelectorAll("[data-v2-weakness]").forEach((element)=>element.addEventListener("click",()=>{const category=element.dataset.v2Weakness;v2Log("weakness_training_started",{category});startQuick(category);}));
  document.querySelectorAll("[data-route=\"emergency\"]").forEach((element)=>element.addEventListener("click",()=>v2Log("emergency_cta_clicked",{source:route})));
  document.querySelectorAll("[data-emergency-request]").forEach((element)=>element.addEventListener("click",()=>v2Log("emergency_risk_selected",{risk:element.dataset.emergencyRequest})));
  document.querySelectorAll("[data-emergency-official]").forEach((element)=>element.addEventListener("click",()=>v2Log("verification_route_answered",{value:element.dataset.emergencyOfficial})));
};

handleAction = function(name) {
  if(name==="start-quick"){startQuick();return;}
  if(name==="submit-quick"){
    const question=currentFlow.questions[currentFlow.index];
    currentFlow.responses.push(createResponse(question,{...currentFlow.selections},"quick"));
    currentFlow.step="feedback";
    v2Log("answer_submitted",{questionId:question.id,judgment:currentFlow.selections.judgment});
    render();
    return;
  }
  if(name==="next-quick"){
    v2Log("feedback_viewed",{questionId:currentFlow.questions[currentFlow.index]?.id??null});
  }
  if(name==="emergency-next")v2Log("emergency_step_completed",{step:1});
  if(name==="emergency-result")v2Log("safe_action_viewed",{requests:currentFlow?.answers?.requests??[]});
  return v2BaseHandleAction(name);
};

(function v2BootstrapContext(){
  const params=new URLSearchParams(location.search), context=v2StudyContext();
  if(context){
    state.v2StudyContext=context;
    state=saveState(state);
    const requested=params.get("route");
    if(params.get("formal")==="1") route="research-intro";
    else if(requested&&V2_ROUTE_ALLOWLIST.has(requested)) route=requested;
    v2Log("session_started",{requestedRoute:requested??"home"});
  }
  render();
})();
