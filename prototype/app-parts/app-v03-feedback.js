feedbackPanel = function (question, response, isQuick = false) {
  const actionCorrect = response?.isActionCorrect;
  const signalCorrect = response?.selectedSignalIds.includes(question.primarySignalId);
  const allCorrect = actionCorrect && signalCorrect;
  const primary = question.signalOptions.find((item) => item.id === question.primarySignalId);
  return `<div class="feedback-panel">
    <div class="feedback-result ${allCorrect ? "feedback-result--good" : "feedback-result--learn"}"><span>${allCorrect ? icon("check",27) : icon("brain",27)}</span><div><strong>${allCorrect ? "判斷方向正確" : "這題值得再看一次"}</strong><p>${allCorrect ? "你先選了安全行動，也抓到最關鍵線索。" : "重點不是猜中真假，而是避免危險操作。"}</p></div></div>
    <section class="feedback-section"><p class="feedback-label">1. 最安全的下一步</p><h2>${question.actionOptions.find((item)=>question.correctActionIds.includes(item.id))?.label}</h2></section>
    <section class="feedback-section"><p class="feedback-label">2. 最值得注意的線索</p><h2>${primary?.label ?? "先回官方管道核對"}</h2><div class="risk-tags">${question.correctSignalIds.map((id)=>{const item=question.signalOptions.find((signalItem)=>signalItem.id===id);return `<span>${SIGNAL_CATEGORY_LABELS[item.category]}：${item.label}</span>`;}).join("")}</div></section>
    <section class="feedback-section"><p class="feedback-label">3. 為什麼</p><p>${question.explanation}</p></section>
    <section class="feedback-section feedback-section--soft"><p class="feedback-label">4. 如果照著做，可能發生什麼</p><p>${question.consequence}</p></section>
    <section class="feedback-section feedback-section--soft"><p class="feedback-label">5. 如何獨立查證</p><p>${question.officialVerification}</p></section>
    <section class="feedback-section"><p class="feedback-label">記住這句</p><blockquote>${question.memoryTip}</blockquote></section>
    <button class="button button--primary button--full" data-action="next-${isQuick ? "quick" : "assessment"}">${isQuick ? "下一題" : "繼續"} ${icon("arrow",19)}</button>
  </div>`;
};
