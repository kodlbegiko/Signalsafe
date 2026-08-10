export function clearIncompleteResearchState(state) {
  if (!state || typeof state !== "object") throw new Error("SignalSafe state required");
  if (state.activeAssessment?.mode !== "research") return { ...state };
  return {
    ...state,
    activeAssessment: null,
    researchConsentDraft: null,
  };
}
