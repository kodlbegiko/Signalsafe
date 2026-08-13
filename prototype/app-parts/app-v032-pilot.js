/* v0.3.2 pilot protocol layer; operational protocol only, no question-bank changes. */
const v032BaseHomeView = homeView;
const v032BaseStartAssessment = startAssessment;
const v032BaseFinishAssessment = finishAssessment;

homeView = function () {
  const base = v032BaseHomeView();
  const marker = "</section></main>";
  const index = base.lastIndexOf(marker);
  if (index < 0) return base;
  const pilotInfo = `<div class="research-entry-card__pilot" aria-label="Pilot 測試資訊">
    <div><strong>Pilot 測試對象</strong><span>16–18 歲高中生 · 日常使用智慧型手機 · 未完成同版本正式 Research Mode</span></div>
    <a class="text-button" href="/prototype/test-guide.html">查看原型測試說明 ${icon("arrow",17)}</a>
  </div>`;
  return `${base.slice(0, index)}${pilotInfo}${base.slice(index)}`;
};

startAssessment = function (restart = false, mode = "training", participantId = null) {
  v032BaseStartAssessment(restart, mode, participantId);
  if (mode === "research" && state.activeAssessment?.mode === "research") {
    state.activeAssessment.pilotProtocolVersion = PILOT_PROTOCOL_VERSION;
    state = saveState(state);
  }
};

finishAssessment = function () {
  const active = state.activeAssessment?.mode === "research" ? state.activeAssessment : null;
  const researchId = active?.id ?? null;
  const protocolVersion = active?.pilotProtocolVersion ?? PILOT_PROTOCOL_VERSION;
  v032BaseFinishAssessment();
  if (researchId) {
    const session = state.sessions.find((item) => item.id === researchId && item.mode === "research");
    if (session) {
      session.pilotProtocolVersion = protocolVersion;
      state = saveState(state);
      if (route === "research-results") render();
    }
  }
};

render();
