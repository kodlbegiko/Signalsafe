/* v0.3.1 tested state boundary for research withdrawal. */
const v031ConsentStateBaseHandleAction = v031HandleAction;
v031HandleAction = function (name) {
  if (name !== "exit-research") return v031ConsentStateBaseHandleAction(name);
  if (!state.activeAssessment || state.activeAssessment.mode !== "research") {
    route = "research-intro";
    render();
    return;
  }
  if (!confirm("確定要退出本次研究嗎？\n\n選擇確定後，只會清除此裝置上的本次未完成研究紀錄；其他一般使用紀錄與已完成研究場次不會被刪除。")) return;
  state = saveState(clearIncompleteResearchState(state));
  currentFlow = null;
  route = "research-intro";
  render();
};
