export const JUDGMENTS = ["risk", "insufficient", "trusted"];

export function safeDivide(numerator, denominator) {
  return denominator > 0 ? numerator / denominator : 0;
}

export function median(values) {
  const nums = values.filter(Number.isFinite).toSorted((a, b) => a - b);
  if (!nums.length) return 0;
  const mid = Math.floor(nums.length / 2);
  return nums.length % 2 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
}

export function signalScores(selectedIds = [], correctIds = []) {
  const selected = new Set(selectedIds);
  const correct = new Set(correctIds);
  let truePositive = 0;
  for (const id of selected) {
    if (correct.has(id)) truePositive += 1;
  }
  const precision = safeDivide(truePositive, selected.size);
  const recall = safeDivide(truePositive, correct.size);
  const f1 = precision + recall > 0 ? (2 * precision * recall) / (precision + recall) : 0;
  return { precision, recall, f1 };
}

export function recallByJudgment(responses = []) {
  const recalls = {};
  for (const judgment of JUDGMENTS) {
    const relevant = responses.filter((response) => response.correctJudgment === judgment);
    const hits = relevant.filter((response) => response.selectedJudgment === judgment).length;
    recalls[judgment] = safeDivide(hits, relevant.length);
  }
  return recalls;
}

export function macroRecall(responses = []) {
  const recalls = recallByJudgment(responses);
  return JUDGMENTS.reduce((sum, key) => sum + recalls[key], 0) / JUDGMENTS.length;
}

export function actionAccuracy(responses = []) {
  return safeDivide(responses.filter((response) => response.isActionCorrect).length, responses.length);
}

export function trustedFalsePositiveRate(responses = []) {
  const trusted = responses.filter((response) => response.correctJudgment === "trusted");
  const falseRisk = trusted.filter((response) => response.selectedJudgment === "risk").length;
  return safeDivide(falseRisk, trusted.length);
}

export function highConfidenceErrorRate(responses = []) {
  const confident = responses.filter((response) => Number(response.confidence) >= 4);
  const errors = confident.filter((response) => !response.isJudgmentCorrect).length;
  return safeDivide(errors, confident.length);
}

export function aggregateSignalScores(responses = []) {
  if (!responses.length) return { precision: 0, recall: 0, f1: 0 };
  const scores = responses.map((response) =>
    signalScores(response.selectedSignalIds, response.correctSignalIds),
  );
  return {
    precision: scores.reduce((sum, score) => sum + score.precision, 0) / scores.length,
    recall: scores.reduce((sum, score) => sum + score.recall, 0) / scores.length,
    f1: scores.reduce((sum, score) => sum + score.f1, 0) / scores.length,
  };
}

export function completionRate(responses = []) {
  return safeDivide(
    responses.filter((response) => response.selectedActionId && response.selectedJudgment).length,
    responses.length,
  );
}

export function calculateMetrics(responses = []) {
  const recalls = recallByJudgment(responses);
  const signal = aggregateSignalScores(responses);
  const times = responses
    .filter((response) => !response.wasInterrupted)
    .map((response) => Number(response.responseTimeMs))
    .filter((value) => Number.isFinite(value) && value >= 0);
  const calibration = macroRecall(responses);
  const action = actionAccuracy(responses);
  const completeness = completionRate(responses);
  const overall = calibration * 0.4 + signal.f1 * 0.25 + action * 0.25 + completeness * 0.1;

  return {
    actionAccuracy: action,
    judgmentMacroRecall: calibration,
    recallRisk: recalls.risk,
    recallInsufficient: recalls.insufficient,
    recallTrusted: recalls.trusted,
    trustedFalsePositiveRate: trustedFalsePositiveRate(responses),
    highConfidenceErrorRate: highConfidenceErrorRate(responses),
    signalPrecision: signal.precision,
    signalRecall: signal.recall,
    signalF1: signal.f1,
    completionRate: completeness,
    averageResponseTimeMs: times.length ? times.reduce((sum, value) => sum + value, 0) / times.length : 0,
    medianResponseTimeMs: median(times),
    overallScore: overall,
    sampleSize: responses.length,
  };
}

export function formatPercent(value) {
  return `${Math.round((Number(value) || 0) * 100)}%`;
}
