function v03DecisionBias(metrics, latestAssessment) {
  if (!latestAssessment) return { label: "先累積完整訓練資料", detail: "完成完整能力訓練後，才能看出你是否容易低估風險或過度警覺。" };
  if (metrics.recallRisk < 0.75) return { label: "較容易低估明顯風險", detail: "遇到要求帳密、付款、OTP 或不明安裝時，先停止操作，再查來源。" };
  if (metrics.trustedFalsePositiveRate > 0.25) return { label: "較容易過度警覺", detail: "有期限或通知不一定是詐騙；重點是能否回到原 App、官網或正式管道獨立核對。" };
  return { label: "目前沒有明顯單向偏誤", detail: "繼續維持『先停下、找重點、回官方管道』，不要只靠直覺猜真假。" };
}
function v03NextFocus(metrics, blindSpots, latestAssessment) {
  if (metrics.actionAccuracy < 0.75) return "優先練習安全下一步：先停止高風險操作，再改走官方查證。";
  if (metrics.signalF1 < 0.75) return `優先練習找關鍵線索${blindSpots[0] ? `，尤其是「${blindSpots[0].label}」` : ""}。`;
  if (latestAssessment && metrics.trustedFalsePositiveRate > 0.25) return "優先練習區分『資訊不足』與『有明顯風險』，避免看到陌生訊息就全部判成危險。";
  return "下一步維持跨情境練習，確認遇到新包裝時仍能做對安全行動。";
}
dashboardView = function () {
  const completed = state.sessions.filter((session) => session.mode !== "research" && (session.responses ?? []).length > 0);
  const latest = completed.at(-1);
  const latestAssessment = completed.filter((session) => session.mode === "assessment").at(-1);
  const metrics = latestAssessment
    ? calculateMetrics(latestAssessment.responses.filter((response) => response.phase === "post"))
    : latest ? calculateMetrics(latest.responses) : null;
  const allResponses = completed.flatMap((session) => session.responses ?? []);
  const blindSpots = computeBlindSpots(allResponses);
  if (!metrics) {
    return shell(`<section class="page-heading page-heading--row"><div><button class="back-button" data-route="home">← 回首頁</button><p>本機學習紀錄</p><h1>我的學習盲點</h1><span>只顯示這台裝置上的匿名練習紀錄。</span></div><button class="button button--secondary" data-route="data">資料與隱私</button></section><section class="empty-dashboard"><span>${icon("chart",44)}</span><h2>還沒有足夠紀錄</h2><p>完成一次 90 秒快練或完整能力訓練後，這裡會整理你最容易忽略的線索與最需要加強的下一步。</p><button class="button button--primary" data-action="start-quick">開始 90 秒快練</button></section>`);
  }
  const bias = v03DecisionBias(metrics, latestAssessment);
  const focus = v03NextFocus(metrics, blindSpots, latestAssessment);
  const mainBlindSpot = blindSpots[0]?.label ?? "目前沒有明顯重複漏看線索";
  return shell(`<section class="page-heading page-heading--row"><div><button class="back-button" data-route="home">← 回首頁</button><p>本機學習紀錄</p><h1>我的學習盲點</h1><span>先看「哪裡容易漏掉」與「下一步怎麼改」，分數只做輔助。</span></div><button class="button button--secondary" data-route="data">資料與隱私</button></section>
  <section class="dashboard-grid dashboard-grid--v03">
    <article class="score-card score-card--primary"><p>安全下一步</p><strong>${formatPercent(metrics.actionAccuracy)}</strong><span>遇到高風險要求時，是否先停下並改走獨立查證。</span></article>
    <article class="score-card"><p>你最容易忽略的線索</p><strong class="score-card__text">${mainBlindSpot}</strong><span>${blindSpots[0] ? `目前共漏看 ${blindSpots[0].count} 次。` : "再多完成幾次練習，系統會找出重複盲點。"}</span></article>
    <article class="score-card"><p>你目前的判斷偏向</p><strong class="score-card__text">${bias.label}</strong><span>${bias.detail}</span></article>
    <article class="score-card"><p>下一個優先練習</p><strong class="score-card__text">${latestAssessment ? "把原理用到新情境" : "先累積完整訓練"}</strong><span>${focus}</span></article>
  </section>
  <section class="dashboard-detail"><article class="calibration-card"><div class="section-heading"><div><p>接下來怎麼練</p><h2>先處理最影響安全的盲點</h2></div><span>${latestAssessment ? "最近一次後測" : "最近一次快練"}</span></div><div class="quick-insight"><span>${icon("shield",28)}</span><div><strong>${focus}</strong><p>SignalSafe 不用單一總分判斷你「會不會防詐」，而是分開看安全行動、關鍵線索與判斷偏向。</p></div></div><div class="calibration-footer"><span>關鍵線索掌握 ${formatPercent(metrics.signalF1)}</span><span>中位主動作答 ${Math.round(metrics.medianResponseTimeMs / 1000)} 秒</span></div></article>
  <article class="blind-spot-card"><div class="section-heading"><div><p>重複盲點</p><h2>最常漏看的地方</h2></div></div>${blindSpots.length ? blindSpots.map((item,index)=>`<div class="blind-item"><span>${String(index+1).padStart(2,"0")}</span><div><strong>${item.label}</strong><small>漏選 ${item.count} 次</small></div></div>`).join("") : `<div class="empty-state">目前沒有足夠資料。再完成幾次不同情境後會顯示。</div>`}</article></section>
  <section class="history-section"><div class="section-heading"><div><p>最近紀錄</p><h2>這台裝置上的練習</h2></div><span>${completed.length} 次</span></div><div class="history-list">${completed.toReversed().slice(0,6).map((session)=>{const m=calculateMetrics(session.responses);return `<article><span class="history-icon">${icon(session.mode==="quick"?"bolt":"brain",21)}</span><div><strong>${session.mode==="quick"?"90 秒快練":"完整能力訓練"}</strong><small>${new Date(session.completedAt).toLocaleString("zh-TW",{month:"numeric",day:"numeric",hour:"2-digit",minute:"2-digit"})}</small></div><div class="history-metric"><strong>${formatPercent(m.actionAccuracy)}</strong><small>安全下一步</small></div></article>`;}).join("")}</div></section>`);
};
