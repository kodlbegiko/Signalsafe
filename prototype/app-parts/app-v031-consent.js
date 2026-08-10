/* v0.3.1 research entry + informed participation consent layer. */
const v031BaseHomeView = homeView;
const v031BaseStartAssessment = startAssessment;
const v031BaseFinishAssessment = finishAssessment;
const v031BaseBindEvents = bindEvents;

function v031ConsentDraft() {
  const normalized = normalizeConsentDraft(state.researchConsentDraft);
  if (state.researchConsentDraft?.consentVersion !== CONSENT_VERSION) {
    state.researchConsentDraft = normalized;
    state = saveState(state);
  }
  return normalized;
}

function v031SaveConsentDraft(next) {
  state.researchConsentDraft = normalizeConsentDraft(next);
  state = saveState(state);
  return state.researchConsentDraft;
}

function v031ConsentFromSession(session) {
  return {
    consentVersion: session?.consentVersion,
    reviewed: session?.consentReviewed === true,
    reviewedAt: session?.consentReviewedAt ?? null,
    accepted: session?.consentAccepted === true,
    acceptedAt: session?.consentAcceptedAt ?? null,
    acknowledgements: session?.consentAcknowledgements ?? {},
  };
}

function v031SessionConsentValid(session) {
  return Boolean(session && isConsentComplete(v031ConsentFromSession(session)));
}

function v031ConsentMetadata(consent) {
  return {
    consentVersion: CONSENT_VERSION,
    consentReviewed: consent.reviewed === true,
    consentReviewedAt: consent.reviewedAt ?? null,
    consentAccepted: consent.accepted === true,
    consentAcceptedAt: consent.acceptedAt ?? null,
    consentAcknowledgements: { ...(consent.acknowledgements ?? {}) },
  };
}

function v031AllAcknowledged(draft) {
  return CONSENT_ACKNOWLEDGEMENTS.every(({ key }) => draft.acknowledgements?.[key] === true);
}

function v031ConsentSectionsMarkup() {
  return CONSENT_SECTIONS.map((section) => `
    <section class="consent-section" aria-labelledby="consent-${section.id}">
      <h2 id="consent-${section.id}">${section.title}</h2>
      ${section.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("")}
    </section>`).join("");
}

homeView = function () {
  const base = v031BaseHomeView();
  const researchEntry = `<section class="research-entry-card" aria-labelledby="research-entry-title">
    <div class="research-entry-card__copy">
      <div class="research-entry-card__badges"><span>Research Mode</span><span>匿名研究</span></div>
      <h2 id="research-entry-title">參與 SignalSafe 研究測試</h2>
      <p>協助我們了解高中生面對可疑訊息時，如何判斷風險並選擇更安全的下一步。</p>
      <ul>
        <li>使用匿名受測者編號</li>
        <li>包含訓練前、訓練與訓練後情境</li>
        <li>進入前需閱讀研究參與說明</li>
      </ul>
    </div>
    <a class="button button--secondary button--large research-entry-card__cta" href="/prototype/?mode=research">進入研究測試 ${icon("arrow",19)}</a>
  </section>`;
  return base.replace("</main>", `${researchEntry}</main>`);
};

researchIntroView = function () {
  const active = state.activeAssessment?.mode === "research" ? state.activeAssessment : null;
  if (active && v031SessionConsentValid(active)) {
    return shell(`<section class="research-gate research-gate--resume">
      <p class="hero__eyebrow">Research Mode · 匿名研究</p>
      <h1>繼續本次研究測試</h1>
      <p>你已完成目前版本的研究參與說明與同意確認。Research Mode 期間不提供 90 秒快練、一般 Dashboard 或其他會干擾正式測量的內容。</p>
      <div class="research-result-meta">
        <div><small>匿名代碼</small><strong>${active.participantId}</strong></div>
        <div><small>目前進度</small><strong>${({ pre: "前測", training: "訓練", post: "後測" })[active.phase]} ${active.questionIndex + 1}/8</strong></div>
        <div><small>Consent version</small><strong>${active.consentVersion}</strong></div>
        <div><small>研究版本</small><strong>${active.studyVersion}</strong></div>
      </div>
      <button class="button button--primary button--full" data-action="resume-research">繼續本次測試</button>
      <button class="button button--ghost button--full" data-v031-action="exit-research">退出研究並清除本次未完成紀錄</button>
    </section>`, { researchLocked: true });
  }

  const draft = v031ConsentDraft();

  if (draft.step === "declined") {
    return shell(`<section class="research-gate consent-declined" aria-labelledby="declined-title">
      <p class="hero__eyebrow">Research Mode</p>
      <h1 id="declined-title">你目前不會進入研究測試</h1>
      <p>參與是自願的。你可以關閉此頁，或在之後想參加時重新閱讀研究參與說明。</p>
      <div class="consent-actions">
        <button class="button button--secondary" data-v031-action="consent-restart">重新閱讀研究說明</button>
        <a class="button button--ghost" href="/">回 SignalSafe 首頁</a>
      </div>
    </section>`, { researchLocked: true });
  }

  if (draft.step === "notice") {
    return shell(`<article class="consent-document" aria-labelledby="consent-title">
      <header class="consent-document__header">
        <p class="hero__eyebrow">Research Mode · Step 1 / 4</p>
        <h1 id="consent-title">研究參與說明與同意確認</h1>
        <p class="consent-lead">請完整閱讀以下內容。網站中的確認只代表你已閱讀並願意繼續；若另有監護人、學校、研究倫理或其他正式程序，仍須由研究團隊依規定另外完成。</p>
        <p class="consent-version">Consent version：${CONSENT_VERSION}</p>
      </header>
      ${v031ConsentSectionsMarkup()}
      <section class="consent-end" aria-labelledby="consent-end-title">
        <h2 id="consent-end-title">你已到達研究參與說明的結尾</h2>
        <p>按下「我已閱讀完整研究參與說明」後，下一步會請你逐項確認理解內容；這個按鈕不代表你已同意參加。</p>
        <button class="button button--primary button--full" data-v031-action="consent-reviewed">我已閱讀完整研究參與說明</button>
        <button class="button button--ghost button--full" data-v031-action="consent-decline">暫不參與</button>
      </section>
    </article>`, { researchLocked: true });
  }

  if (draft.step === "acknowledge") {
    const allAcknowledged = v031AllAcknowledged(draft);
    return shell(`<section class="research-gate consent-confirmation" aria-labelledby="consent-confirm-title">
      <p class="hero__eyebrow">Research Mode · Step 2 / 4</p>
      <h1 id="consent-confirm-title">確認你理解研究內容</h1>
      <p>請逐項確認。四項都完成後，才可以表達是否願意參與。</p>
      <fieldset class="consent-acknowledgements">
        <legend>必要確認項目</legend>
        ${CONSENT_ACKNOWLEDGEMENTS.map(({ key, label }, index) => `<label class="research-consent" for="consent-ack-${index}">
          <input id="consent-ack-${index}" type="checkbox" data-v031-ack="${key}" ${draft.acknowledgements?.[key] ? "checked" : ""}>
          <span>${label}</span>
        </label>`).join("")}
      </fieldset>
      <section class="consent-choice" aria-labelledby="consent-choice-title">
        <h2 id="consent-choice-title">是否願意參與？</h2>
        <p>只有你自己可以做這個選擇；系統不會預設同意。</p>
        <div class="consent-actions">
          <button class="button button--primary" data-v031-action="consent-accept" ${allAcknowledged ? "" : "disabled"}>我願意參與 SignalSafe 本次研究測試</button>
          <button class="button button--ghost" data-v031-action="consent-decline">暫不參與</button>
        </div>
      </section>
    </section>`, { researchLocked: true });
  }

  if (draft.step === "participant") {
    const existingId = active?.participantId ?? "";
    return shell(`<section class="research-gate consent-participant" aria-labelledby="participant-title">
      <p class="hero__eyebrow">Research Mode · Step 3 / 4</p>
      <h1 id="participant-title">輸入匿名 Participant ID</h1>
      <p>Consent 已完成。現在只輸入研究者提供的匿名代碼，不要輸入姓名、學校、電話、Email 或社群帳號。</p>
      <div class="consent-status" role="status"><strong>已完成研究參與確認</strong><span>${CONSENT_VERSION}</span></div>
      <div class="research-field">
        <label for="participantId">匿名受測代碼</label>
        <input id="participantId" inputmode="text" autocomplete="off" placeholder="例如 UT001" value="${existingId}" ${existingId ? "readonly" : ""}>
        <small>只接受匿名代碼，例如 UT001、U004、E001、DRYRUN-001。</small>
      </div>
      <button class="button button--primary button--full" data-v031-action="start-research-v031">進入 Step 4：開始研究測試 ${icon("arrow", 19)}</button>
      <button class="button button--ghost button--full" data-v031-action="consent-decline">暫不參與</button>
    </section>`, { researchLocked: true });
  }

  v031SaveConsentDraft(createConsentDraft());
  return researchIntroView();
};

startAssessment = function (restart = false, mode = "training", participantId = null) {
  if (mode !== "research") return v031BaseStartAssessment(restart, mode, participantId);

  const existing = state.activeAssessment?.mode === "research" ? state.activeAssessment : null;
  const existingValid = v031SessionConsentValid(existing);
  const consent = existingValid ? v031ConsentFromSession(existing) : v031ConsentDraft();
  if (!isConsentComplete(consent)) {
    route = "research-intro";
    toast("請先完成研究參與說明與同意確認。", "error");
    render();
    return;
  }

  const metadata = v031ConsentMetadata(consent);
  v031BaseStartAssessment(restart, mode, participantId);
  if (state.activeAssessment?.mode === "research") {
    Object.assign(state.activeAssessment, metadata);
    state.activeAssessment.events ??= [];
    if (!existingValid) {
      state.activeAssessment.events.unshift({
        type: "consent_accepted",
        at: metadata.consentAcceptedAt,
        phase: "pre",
        questionId: null,
      });
    }
    state.researchConsentDraft = null;
    state = saveState(state);
  }
};

finishAssessment = function () {
  const active = state.activeAssessment?.mode === "research" ? state.activeAssessment : null;
  const consentMetadata = active ? v031ConsentMetadata(v031ConsentFromSession(active)) : null;
  const researchId = active?.id ?? null;
  v031BaseFinishAssessment();
  if (researchId && consentMetadata) {
    const session = state.sessions.find((item) => item.id === researchId && item.mode === "research");
    if (session) {
      Object.assign(session, consentMetadata);
      state = saveState(state);
      if (route === "research-results") render();
    }
  }
};

function v031DecorateResearchControls() {
  if (state.activeAssessment?.mode !== "research") return;
  if (!['assessment', 'assessment-phase-complete'].includes(route)) return;
  if (document.querySelector('[data-v031-action="exit-research"]')) return;
  const button = document.createElement("button");
  button.type = "button";
  button.className = "back-button v031-exit-research";
  button.dataset.v031Action = "exit-research";
  button.textContent = "退出研究";
  const header = document.querySelector(".flow-header");
  if (header) header.append(button);
  else document.querySelector("main")?.prepend(button);
}

function v031HandleAction(name) {
  if (name === "consent-reviewed") {
    const draft = v031ConsentDraft();
    draft.reviewed = true;
    draft.reviewedAt ??= new Date().toISOString();
    draft.step = "acknowledge";
    v031SaveConsentDraft(draft);
    render();
    return;
  }

  if (name === "consent-accept") {
    const draft = v031ConsentDraft();
    if (!draft.reviewed || !v031AllAcknowledged(draft)) {
      toast("請先完成四項必要確認。", "error");
      return;
    }
    draft.accepted = true;
    draft.acceptedAt = new Date().toISOString();
    draft.step = "participant";
    v031SaveConsentDraft(draft);
    render();
    return;
  }

  if (name === "consent-decline") {
    const draft = v031ConsentDraft();
    draft.accepted = false;
    draft.acceptedAt = null;
    draft.step = "declined";
    v031SaveConsentDraft(draft);
    render();
    return;
  }

  if (name === "consent-restart") {
    v031SaveConsentDraft(createConsentDraft());
    render();
    return;
  }

  if (name === "start-research-v031") {
    const draft = v031ConsentDraft();
    if (!isConsentComplete(draft)) {
      toast("研究參與確認尚未完成。", "error");
      route = "research-intro";
      render();
      return;
    }
    const input = document.querySelector("#participantId");
    const participantId = input?.value?.trim() ?? "";
    if (!isValidParticipantId(participantId)) {
      toast("請使用匿名代碼，例如 UT001。不要輸入姓名或聯絡資料。", "error");
      return;
    }
    const existing = state.activeAssessment?.mode === "research" ? state.activeAssessment : null;
    if (existing && existing.participantId !== participantId.toUpperCase()) {
      toast("目前已有另一個未完成研究場次；請先退出並清除該場次。", "error");
      return;
    }
    startAssessment(!existing, "research", participantId.toUpperCase());
    return;
  }

  if (name === "exit-research") {
    if (!state.activeAssessment || state.activeAssessment.mode !== "research") {
      route = "research-intro";
      render();
      return;
    }
    if (!confirm("確定要退出本次研究嗎？\n\n選擇確定後，只會清除此裝置上的本次未完成研究紀錄；其他一般使用紀錄與已完成研究場次不會被刪除。")) return;
    state.activeAssessment = null;
    state.researchConsentDraft = null;
    state = saveState(state);
    currentFlow = null;
    route = "research-intro";
    render();
  }
}

bindEvents = function () {
  v031DecorateResearchControls();
  v031BaseBindEvents();
  document.querySelectorAll("[data-v031-action]").forEach((element) => {
    element.addEventListener("click", () => v031HandleAction(element.dataset.v031Action));
  });
  document.querySelectorAll("[data-v031-ack]").forEach((element) => {
    element.addEventListener("change", () => {
      const draft = v031ConsentDraft();
      draft.acknowledgements[element.dataset.v031Ack] = element.checked;
      v031SaveConsentDraft(draft);
      render();
    });
  });
};

if (new URLSearchParams(location.search).get("mode") === "research") route = "research-intro";
render();
