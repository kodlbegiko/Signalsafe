function startQuick() {
  const questions = pickQuickQuestions(Date.now());
  currentFlow = { type: "quick", id: crypto.randomUUID(), questions, index: 0, responses: [], selections: { actionId: null, signalIds: [] }, step: "answer", startedAt: new Date().toISOString() };
  route = "quick"; startQuestionTimer(); render();
}

function quickView() {
  if (!currentFlow || currentFlow.type !== "quick") return homeView();
  const question = currentFlow.questions[currentFlow.index];
  const total = currentFlow.questions.length;
  const progress = ((currentFlow.index + (currentFlow.step === "feedback" ? 1 : 0)) / total) * 100;
  const selections = currentFlow.selections;
  const response = currentFlow.responses.at(-1);
  if (currentFlow.step === "complete") return quickCompleteView();
  return shell(`
    <section class="flow-header"><button class="back-button" data-action="quit-flow">← 離開</button><div class="flow-header__center"><strong>90 秒快練</strong><span>第 ${currentFlow.index + 1}／${total} 題</span></div><span class="timer-note">速度不計分</span></section>
    <div class="progress" role="progressbar" aria-label="90 秒快練進度" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(progress)}"><span style="width:${progress}%"></span></div>
    <section class="question-layout">
      <article class="scenario-card"><div class="scenario-card__header"><span class="avatar">${question.senderLabel.slice(0,1)}</span><div><strong>${question.senderLabel}</strong><small>${question.category} · 模擬情境</small></div></div><div class="scenario-card__message"><strong>${question.title}</strong><p>${question.message}</p></div><p class="scenario-card__note">此為合成練習情境，不是真實帳號或連結。</p></article>
      ${currentFlow.step === "answer" ? `<div class="answer-panel"><div class="answer-block"><div class="answer-block__title"><span>1</span><div><h2>現在最安全的行動是？</h2><p>先選下一步，不用急著判定真假。</p></div></div><div class="option-list">${question.actionOptions.map((option)=>`<button class="option ${selections.actionId===option.id?"is-selected":""}" data-select-action="${option.id}" aria-pressed="${selections.actionId===option.id}"><span class="option__radio"></span><span>${option.label}</span></button>`).join("")}</div></div><div class="answer-block"><div class="answer-block__title"><span>2</span><div><h2>哪一個訊號最值得先注意？</h2><p>選一個最關鍵的訊號。</p></div></div><div class="signal-grid">${question.signalOptions.map((option)=>`<button class="signal-option ${selections.signalIds.includes(option.id)?"is-selected":""}" data-select-signal="${option.id}" aria-pressed="${selections.signalIds.includes(option.id)}"><small>${SIGNAL_CATEGORY_LABELS[option.category]}</small><span>${option.label}</span></button>`).join("")}</div></div><button class="button button--primary button--full" data-action="submit-quick" ${!selections.actionId||selections.signalIds.length!==1?"disabled":""}>查看解析 ${icon("arrow",19)}</button></div>` : feedbackPanel(question,response,true)}
    </section>`, { compact: true });
}

function feedbackPanel(question, response, isQuick = false) {
  const actionCorrect = response?.isActionCorrect;
  const signalCorrect = response?.selectedSignalIds.includes(question.primarySignalId);
  const allCorrect = actionCorrect && signalCorrect;
  return `<div class="feedback-panel"><div class="feedback-result ${allCorrect?"feedback-result--good":"feedback-result--learn"}"><span>${allCorrect?icon("check",27):icon("brain",27)}</span><div><strong>${allCorrect?"判斷方向正確":"這題值得再看一次"}</strong><p>${allCorrect?"你先選了安全行動，也抓到最關鍵訊號。":"重點不是猜中真假，而是避免危險操作。"}</p></div></div><section class="feedback-section"><p class="feedback-label">建議的安全行動</p><h2>${question.actionOptions.find((item)=>question.correctActionIds.includes(item.id))?.label}</h2></section><section class="feedback-section"><p class="feedback-label">為什麼</p><p>${question.explanation}</p><div class="risk-tags">${question.correctSignalIds.map((id)=>{const item=question.signalOptions.find((signalItem)=>signalItem.id===id);return `<span>${SIGNAL_CATEGORY_LABELS[item.category]}：${item.label}</span>`;}).join("")}</div></section><section class="feedback-section feedback-section--soft"><p class="feedback-label">獨立查證</p><p>${question.officialVerification}</p></section><section class="feedback-section"><p class="feedback-label">記住這句</p><blockquote>${question.memoryTip}</blockquote></section><button class="button button--primary button--full" data-action="next-${isQuick?"quick":"assessment"}">${isQuick?"下一題":"繼續"} ${icon("arrow",19)}</button></div>`;
}

function quickCompleteView() {
  const metrics = calculateMetrics(currentFlow.responses);
  return shell(`<section class="completion-card"><div class="completion-card__icon">${icon("shield",42)}</div><p class="completion-card__meta">90 秒快練完成</p><h1>今天練了 3 次安全下一步。</h1><p>速度不計分。真正重要的是遇到新情境時，能先停下，再回官方管道查證。</p><div class="metric-row"><div><strong>${formatPercent(metrics.actionAccuracy)}</strong><span>安全行動</span></div><div><strong>${formatPercent(metrics.signalF1)}</strong><span>關鍵訊號</span></div><div><strong>${Math.round(metrics.medianResponseTimeMs/1000)} 秒</strong><span>中位作答</span></div></div><div class="completion-card__actions"><button class="button button--primary" data-action="finish-quick">查看學習紀錄</button><button class="button button--secondary" data-route="home">回首頁</button></div></section>`, { compact: true });
}

function finishQuick(save = true) {
  if (save && currentFlow?.type === "quick") {
    state.sessions.push({ id: currentFlow.id, mode: "quick", startedAt: currentFlow.startedAt, completedAt: new Date().toISOString(), appVersion: APP_VERSION, questionBankVersion: QUESTION_BANK_VERSION, questionOrder: currentFlow.questions.map((question)=>question.id), responses: currentFlow.responses });
    state = saveState(state);
  }
  currentFlow = null; setRoute(save ? "dashboard" : "home");
}
