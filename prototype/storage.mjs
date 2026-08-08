import { APP_VERSION, QUESTION_BANK_VERSION } from "./questions.mjs";

const STORAGE_KEY = "signalsafe:v0.2";
const memoryStorage = new Map();
let storageMode = "persistent";

function getStorageItem(key) {
  try {
    const value = window.localStorage.getItem(key);
    storageMode = "persistent";
    return value;
  } catch (error) {
    storageMode = "memory";
    console.warn("SignalSafe localStorage unavailable; using temporary memory storage", error);
    return memoryStorage.has(key) ? memoryStorage.get(key) : null;
  }
}

function setStorageItem(key, value) {
  const text = String(value);
  try {
    window.localStorage.setItem(key, text);
    storageMode = "persistent";
  } catch (error) {
    storageMode = "memory";
    console.warn("SignalSafe localStorage write unavailable; using temporary memory storage", error);
    memoryStorage.set(key, text);
  }
}

function removeStorageItem(key) {
  try {
    window.localStorage.removeItem(key);
    storageMode = "persistent";
  } catch (error) {
    storageMode = "memory";
    console.warn("SignalSafe localStorage removal unavailable; clearing temporary memory storage", error);
    memoryStorage.delete(key);
  }
}

function freshState() {
  return {
    schemaVersion: 1,
    appVersion: APP_VERSION,
    questionBankVersion: QUESTION_BANK_VERSION,
    anonymousUserId: crypto.randomUUID(),
    storageMode,
    settings: { reducedMotion: false },
    activeAssessment: null,
    sessions: [],
    updatedAt: new Date().toISOString(),
  };
}

export function loadState() {
  try {
    const raw = getStorageItem(STORAGE_KEY);
    if (!raw) {
      const state = freshState();
      return saveState(state);
    }
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || !Array.isArray(parsed.sessions)) {
      throw new Error("invalid state");
    }
    return {
      ...freshState(),
      ...parsed,
      appVersion: APP_VERSION,
      questionBankVersion: QUESTION_BANK_VERSION,
      storageMode,
      updatedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.warn("SignalSafe local state reset", error);
    const state = freshState();
    return saveState(state);
  }
}

export function saveState(state) {
  const next = {
    ...state,
    appVersion: APP_VERSION,
    questionBankVersion: QUESTION_BANK_VERSION,
    storageMode,
    updatedAt: new Date().toISOString(),
  };
  setStorageItem(STORAGE_KEY, JSON.stringify(next));
  return { ...next, storageMode };
}

export function clearState() {
  removeStorageItem(STORAGE_KEY);
  const state = freshState();
  return saveState(state);
}

export function exportState(state) {
  const sessions = Array.isArray(state?.sessions) ? state.sessions : [];
  const anonymousUserId = String(state?.anonymousUserId ?? "");
  return JSON.stringify(
    {
      exportedAt: new Date().toISOString(),
      schemaVersion: 1,
      appVersion: APP_VERSION,
      questionBankVersion: QUESTION_BANK_VERSION,
      anonymousUserId,
      sessions,
      storageMode: state?.storageMode ?? storageMode,
      data: {
        ...state,
        appVersion: APP_VERSION,
        questionBankVersion: QUESTION_BANK_VERSION,
        anonymousUserId,
        sessions,
        storageMode: state?.storageMode ?? storageMode,
      },
    },
    null,
    2,
  );
}

export function importState(text) {
  const parsed = JSON.parse(text);
  const candidate = parsed?.data ?? parsed;
  if (!candidate || typeof candidate !== "object" || !Array.isArray(candidate.sessions)) {
    throw new Error("資料格式不正確：缺少 sessions 陣列");
  }
  if (!candidate.anonymousUserId || typeof candidate.anonymousUserId !== "string") {
    throw new Error("資料格式不正確：缺少匿名使用者 ID");
  }
  const normalized = {
    ...freshState(),
    ...candidate,
    appVersion: APP_VERSION,
    questionBankVersion: QUESTION_BANK_VERSION,
    storageMode,
    activeAssessment: null,
  };
  return saveState(normalized);
}

export function sessionsToCsv(sessions) {
  const header = [
    "sessionId",
    "mode",
    "phase",
    "questionId",
    "selectedActionId",
    "isActionCorrect",
    "selectedJudgment",
    "correctJudgment",
    "isJudgmentCorrect",
    "selectedSignalIds",
    "confidence",
    "responseTimeMs",
    "wasInterrupted",
    "submittedAt",
    "appVersion",
    "questionBankVersion",
  ];
  const rows = [header];
  for (const session of sessions) {
    for (const response of session.responses ?? []) {
      rows.push([
        session.id,
        session.mode,
        response.phase,
        response.questionId,
        response.selectedActionId,
        response.isActionCorrect,
        response.selectedJudgment,
        response.correctJudgment,
        response.isJudgmentCorrect,
        (response.selectedSignalIds ?? []).join("|"),
        response.confidence ?? "",
        response.responseTimeMs,
        response.wasInterrupted,
        response.submittedAt,
        session.appVersion,
        session.questionBankVersion,
      ]);
    }
  }
  const escape = (value) => {
    const text = String(value ?? "");
    return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
  };
  return rows.map((row) => row.map(escape).join(",")).join("\n");
}
