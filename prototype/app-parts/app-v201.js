/* SignalSafe V2.0.1 UX iteration: context persistence + homepage intent separation. */
const V201_PRODUCT_VERSION = "2.0.1-context-home-ux";
const v201BaseHomeView = homeView;
const v201BaseAssessmentView = assessmentView;
const v201BaseAssessmentIntroView = assessmentIntroView;
const v201BaseBindEvents = bindEvents;
const v201BasePersistentSafetyAction = v2PersistentSafetyAction;
let v201ScenarioObserver = null;
let v201StickyAbortController = null;
const v201TelemetryOnce = new Set();

function v201TextSummary(value, max = 78) {
  const text = String(value ?? "").replace(/\s+/g, " ").trim();
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

function v201LogOnce(key, event, extra = {}) {
  if (v201TelemetryOnce.has(key)) return;
  v201TelemetryOnce.add(key);
  v2Log(event, extra);
}

v2PersistentSafetyAction = function () {
  if (route === "home" || route === "emergency") return "";
  return v201BasePersistentSafetyAction();
};

homeView = function () {
  const stats = v2CategoryStats();
  const weakness = v2WeakestCategory(stats);
  const recent = state.sessions.filter((session) => session.mode !== "research").at(-1);
  const hasResume = Boolean(state.activeAssessment && state.activeAssessment.mode !== "research");
  return shell(`
    <section class="v2-home-hero v201-home" data-v201-home>
      <div class="v2-home-copy">
        <h1>先學會判斷，真的遇到可疑情況時也知道怎麼做。</h1>
        <p>SignalSafe 不替你保證真假。平常用情境練習建立判斷能力；事件當下先停止高風險操作，再改走可信任的查證方式。</p>
      </div>
    </section>

    <section class="v201-intent-stack" aria-label="SignalSafe 主要功能">
      <article class="v2-safety-hero v201-safety-zone" aria-labelledby="v201-safety-title" data-v201-safety-zone>
        <div class="v2-safety-hero__icon">${icon("siren",30)}</div>
        <div class="v201-zone-copy">
          <p class="v201-zone-label">現在真的遇到問題</p>
          <h2 id="v201-safety-title">我現在遇到可疑情況</h2>
          <p>先不要點新的連結、提供驗證碼，或依陌生人的指示付款。你不需要先判斷是不是詐騙。</p>
        </div>
        <button class="button button--large v2-safety-primary v201-home-safety-primary" data-route="emergency">現在幫我處理 ${icon("arrow",19)}</button>
      </article>

      <article class="v2-training-entry v201-training-zone" aria-labelledby="v201-training-title" data-v201-training-zone>
        <div class="v201-zone-copy">
          <p class="v201-zone-label">平常想練習</p>
          <h2 id="v201-training-title">平常練能力</h2>
          <p>用不同情境練習「先判斷 → 找線索 → 做安全下一步」，速度不計分。</p>
        </div>
        <div class="v2-training-actions v201-training-actions">
          <button class="button button--primary button--large" data-action="start-quick" data-v201-training-primary>${icon("bolt",19)}開始 90 秒快練</button>
          <button class="button button--secondary button--large" data-route="assessment-intro">${icon("brain",19)}完整能力訓練</button>
        </div>
        ${hasResume ? `<div class="v201-resume-training" data-v201-training-resume-zone><div><span>上次尚未完成</span><strong>完整能力訓練可以從原進度繼續</strong></div><button class="text-button" data-action="resume-assessment" data-v201-training-resume>繼續完整能力訓練 ${icon("arrow",17)}</button></div>` : ""}
      </article>
    </section>

    <section class="v2-home-grid">
      <article class="v2-ability-preview">
        <div class="section-heading"><div><h2>我的判斷能力</h2><p>${recent ? "用已完成練習整理容易忽略的地方。" : "完成幾個情境後，這裡會開始整理你的判斷盲點。"}</p></div><button class="text-button" data-route="dashboard">查看完整紀錄 ${icon("arrow",16)}</button></div>
        <div class="v2-mini-abilities">${Object.entries(stats).map(([key, stat]) => { const status = v2AbilityStatus(stat); return `<div><span>${V2_RISK_LABELS[key]}</span><strong class="is-${status.level}">${status.label}</strong><small>${stat.opportunities ? `${stat.noticed} / ${stat.opportunities} 次有注意到` : "尚無資料"}</small></div>`; }).join("")}</div>
        ${weakness ? `<div class="v2-next-practice"><span>目前建議</span><strong>多練 ${V2_RISK_LABELS[weakness]}</strong><button data-v2-weakness="${weakness}">針對弱項練習</button></div>` : ""}
      </article>
      <article class="v2-principles"><h2>遇到可疑訊息，記住三件事</h2><ol><li><strong>先停下</strong><span>不要被限時、恐嚇或對方催促推著走。</span></li><li><strong>看來源與要求</strong><span>確認誰在找你、他要你做什麼。</span></li><li><strong>離開原訊息查證</strong><span>自行打開官方 App、官網或原本聯絡方式。</span></li></ol></article>
    </section>
  `);
};

assessmentIntroView = function () {
  if (state.activeAssessment?.mode === "research") return v201BaseAssessmentIntroView();
  const hasResume = Boolean(state.activeAssessment);
  return shell(`
    <section class="page-heading"><button class="back-button" data-route="home">← 回首頁</button><p>完整能力訓練</p><h1>用 24 個情境看自己的判斷方式</h1><span>前測 8 題 → 訓練 8 題 → 後測 8 題；速度不加分，可中途暫停。</span></section>
    <section class="assessment-intro"><div class="assessment-intro__timeline"><article><span>01</span><div><h2>先看原本的判斷方式</h2><p>8 個情境先記錄安全行動、分類、證據與自信，不立即公布答案。</p></div><strong>8 題</strong></article><article><span>02</span><div><h2>練習判斷與安全行動</h2><p>8 個新情境提供完整解析、關鍵訊號與官方查證路徑。</p></div><strong>8 題</strong></article><article><span>03</span><div><h2>換情境再試一次</h2><p>再用 8 個不同表面情境，觀察相同底層能力是否能轉移。</p></div><strong>8 題</strong></article></div><aside class="assessment-intro__aside"><div>${icon("lock",26)}<h2>匿名、本機保存</h2><p>不收姓名、學校或聯絡方式。分頁失焦時會暫停計時。</p></div><ul><li>約 20–30 分鐘</li><li>速度不加分</li><li>可中途暫停並在本機繼續</li></ul>${hasResume ? `<button class="button button--primary button--full" data-action="resume-assessment">繼續上次進度</button><button class="button button--ghost button--full" data-action="restart-assessment">重新開始</button>` : `<button class="button button--primary button--full" data-action="start-assessment">開始完整能力訓練</button>`}</aside></section>`);
};

function v201ScenarioSummary(question) {
  return `<aside class="v201-scenario-sticky" data-v201-scenario-summary hidden aria-label="本題情境摘要">
    <div class="v201-scenario-sticky__copy">
      <span>本題情境</span>
      <strong>${question.senderLabel}｜${question.title}</strong>
      <small>${v201TextSummary(question.message)}</small>
    </div>
    <button class="v201-scenario-sticky__open" type="button" data-v201-show-scenario aria-controls="assessment-scenario-card">查看完整情境</button>
  </aside>`;
}

assessmentView = function () {
  const assessment = state.activeAssessment;
  const question = currentAssessmentQuestion();
  if (!assessment || !question) return assessmentIntroView();
  const phaseLabels = { pre:"前測", training:"訓練", post:"後測" };
  const selections = assessment.selections ?? blankAssessmentSelections();
  const phaseTotal = assessment.questionOrder[assessment.phase].length;
  const overallIndex = assessment.phaseIndex * 8 + assessment.questionIndex + (assessment.step === "feedback" ? 1 : 0);
  const progress = (overallIndex / 24) * 100;
  const phaseResponse = assessment.responses.at(-1);
  const reminder = `${question.senderLabel}｜${question.title}`;
  return shell(`<section class="flow-header"><button class="back-button" data-action="pause-assessment">← 暫停</button><div class="flow-header__center"><strong>${phaseLabels[assessment.phase]}</strong><span>第 ${assessment.questionIndex + 1}／${phaseTotal} 題 · 總進度 ${Math.min(24, overallIndex + 1)}／24</span></div><span class="phase-badge phase-badge--${assessment.phase}">${phaseLabels[assessment.phase]}</span></section><div class="progress" role="progressbar" aria-label="完整能力訓練總進度" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(progress)}"><span style="width:${progress}%"></span></div><section class="research-question v201-research-question">${v201ScenarioSummary(question)}<article class="scenario-card scenario-card--wide v201-assessment-scenario" id="assessment-scenario-card" data-v201-scenario-card tabindex="-1"><div class="scenario-card__header"><span class="avatar">${question.senderLabel.slice(0, 1)}</span><div><strong>${question.senderLabel}</strong><small>${question.category} · 模擬情境</small></div></div><div class="scenario-card__message"><strong>${question.title}</strong><p>${question.message}</p></div><p class="scenario-card__note">此為合成練習情境，不是真實帳號或連結。</p></article>${assessment.step === "feedback" ? feedbackPanel(question, phaseResponse, false) : `<div class="research-form"><p class="v201-context-reminder" aria-label="目前作答情境">目前作答：${reminder}</p><section class="research-step"><div class="research-step__heading"><span>1</span><div><h2>最安全的下一步</h2><p>選一項。</p></div></div><div class="option-list option-list--compact">${question.actionOptions.map((option) => `<button class="option ${selections.actionId === option.id ? "is-selected" : ""}" data-assessment-action="${option.id}" aria-pressed="${selections.actionId === option.id}"><span class="option__radio"></span><span>${option.label}</span></button>`).join("")}</div></section><section class="research-step"><div class="research-step__heading"><span>2</span><div><h2>目前應如何分類？</h2><p>不是所有情境都能直接判定。</p></div></div><div class="judgment-grid">${Object.entries(JUDGMENT_LABELS).map(([key, label]) => `<button class="judgment judgment--${key} ${selections.judgment === key ? "is-selected" : ""}" data-assessment-judgment="${key}" aria-pressed="${selections.judgment === key}">${label}</button>`).join("")}</div></section><section class="research-step"><div class="research-step__heading"><span>3</span><div><h2>哪些訊號支持你的判斷？</h2><p>可複選；上方摘要會保留本題 context。</p></div></div><div class="signal-grid">${question.signalOptions.map((option) => `<button class="signal-option ${selections.signalIds.includes(option.id) ? "is-selected" : ""}" data-assessment-signal="${option.id}" aria-pressed="${selections.signalIds.includes(option.id)}"><small>${SIGNAL_CATEGORY_LABELS[option.category]}</small><span>${option.label}</span></button>`).join("")}</div></section><section class="research-step"><div class="research-step__heading"><span>4</span><div><h2>你有多確定？</h2><p>1 是很不確定，4 是很確定。</p></div></div><div class="confidence-grid">${[1, 2, 3, 4].map((value) => `<button class="confidence ${selections.confidence === value ? "is-selected" : ""}" data-assessment-confidence="${value}" aria-pressed="${selections.confidence === value}"><strong>${value}</strong><span>${["很不確定", "有點不確定", "有點確定", "很確定"][value - 1]}</span></button>`).join("")}</div></section><button class="button button--primary button--full" data-action="submit-assessment" ${!selections.actionId || !selections.judgment || selections.signalIds.length === 0 || !selections.confidence ? "disabled" : ""}>提交這題 ${icon("arrow",19)}</button></div>`}</section>`, { compact:true });
};

function v201SetScenarioSummaryVisible(summary, visible, questionId) {
  if (!summary) return;
  const wasVisible = !summary.hidden;
  if (wasVisible === visible) return;
  summary.hidden = !visible;
  summary.dataset.visible = String(visible);
  if (visible) v201LogOnce(`summary-shown:${questionId}`, "scenario_summary_shown", { questionId });
  else v201LogOnce(`summary-hidden:${questionId}`, "scenario_summary_hidden", { questionId });
}

function v201BindScenarioContext() {
  v201ScenarioObserver?.disconnect();
  v201StickyAbortController?.abort();
  v201ScenarioObserver = null;
  v201StickyAbortController = null;
  if (route !== "assessment") return;
  const card = document.querySelector("[data-v201-scenario-card]");
  const summary = document.querySelector("[data-v201-scenario-summary]");
  if (!card || !summary) return;
  const question = currentAssessmentQuestion();
  const questionId = question?.id ?? "unknown";
  const updateFromRect = () => {
    const rect = card.getBoundingClientRect();
    const threshold = 92 + Math.max(0, Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--safe-area-inset-top")) || 0);
    v201SetScenarioSummaryVisible(summary, rect.bottom <= threshold, questionId);
  };
  if ("IntersectionObserver" in window) {
    v201ScenarioObserver = new IntersectionObserver((entries) => {
      const entry = entries[0];
      v201SetScenarioSummaryVisible(summary, !entry.isIntersecting && entry.boundingClientRect.top < 0, questionId);
    }, { root:null, rootMargin:"-92px 0px 0px 0px", threshold:0 });
    v201ScenarioObserver.observe(card);
  } else {
    v201StickyAbortController = new AbortController();
    window.addEventListener("scroll", updateFromRect, { passive:true, signal:v201StickyAbortController.signal });
    window.addEventListener("resize", updateFromRect, { passive:true, signal:v201StickyAbortController.signal });
    updateFromRect();
  }
}

function v201BindIterationEvents() {
  const safety = document.querySelector("[data-v201-safety-zone]");
  if (route === "home" && safety) v201LogOnce("home-safety-seen", "home_safety_cta_seen");
  const resume = document.querySelector("[data-v201-training-resume]");
  if (route === "home" && resume) {
    v201LogOnce("training-resume-seen", "training_resume_seen");
    resume.addEventListener("click", () => v2Log("training_resume_clicked"));
  }
  const trainingPrimary = document.querySelector("[data-v201-training-primary]");
  if (trainingPrimary) trainingPrimary.addEventListener("click", () => v2Log("training_primary_clicked"));
  document.querySelectorAll("[data-v201-show-scenario]").forEach((button) => button.addEventListener("click", () => {
    const card = document.querySelector("[data-v201-scenario-card]");
    const questionId = currentAssessmentQuestion()?.id ?? null;
    if (!card) return;
    v2Log("scenario_summary_opened", { questionId });
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    card.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block:"start" });
    window.setTimeout(() => card.focus({ preventScroll:true }), reduced ? 0 : 350);
  }));
}

bindEvents = function () {
  v201BaseBindEvents();
  v201BindScenarioContext();
  v201BindIterationEvents();
};

render();
