import "./compat.mjs";
import {
  APP_VERSION,
  QUESTION_BANK_VERSION,
  getQuestionById,
  getQuestionsByPhase,
  pickQuickQuestions,
} from "./questions.mjs";
import { calculateMetrics, formatPercent, signalScores } from "./scoring.mjs";
import {
  clearState,
  exportState,
  importState,
  loadState,
  saveState,
  sessionsToCsv,
} from "./storage.mjs";

Object.assign(window, {
  APP_VERSION,
  QUESTION_BANK_VERSION,
  getQuestionById,
  getQuestionsByPhase,
  pickQuickQuestions,
  calculateMetrics,
  formatPercent,
  signalScores,
  clearState,
  exportState,
  importState,
  loadState,
  saveState,
  sessionsToCsv,
});

const parts = [
  "./app-parts/app-core.js",
  "./app-parts/app-home.js",
  "./app-parts/app-quick.js",
  "./app-parts/app-assessment.js",
  "./app-parts/app-insights.js",
  "./app-parts/app-runtime.js",
];

for (const src of parts) {
  await new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    script.onerror = () => reject(new Error(`無法載入 ${src}`));
    document.head.append(script);
  });
}
