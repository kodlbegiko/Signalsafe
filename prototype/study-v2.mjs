export const SIGNALSAFE_V2_VERSION = "2.0.1-context-home-ux";
export const SIGNALSAFE_V2_PROTOCOL_VERSION = "signalsafe-v2-usability-2026-08-14";

export const V2_STUDY_ASSIGNMENTS = Object.freeze({
  studyId: "SST-V2",
  pretest: ["pre-01","pre-02","pre-03","pre-04","pre-05","pre-06","pre-07","pre-08"],
  training: ["train-01","train-02","train-03","train-04","train-05","train-06","train-07","train-08"],
  posttest: ["post-03","post-02","post-01","post-08","post-04","post-07","post-05","post-06"],
});

export const V2_RESEARCH_SCENARIOS = Object.freeze([
  {
    id: "school-training",
    title: "學校防詐訓練",
    prompt: "老師今天希望同學使用 SignalSafe 練習判斷可疑訊息。",
    taskIds: ["T01","T02","T03","T04"],
  },
  {
    id: "real-suspicious-event",
    title: "真實可疑事件",
    prompt: "你剛收到一則要求今天內登入帳號，否則帳號會被停權的訊息。你不確定是不是真的。",
    taskIds: ["T05","T06","T07","T08"],
  },
]);

export const V2_RESEARCH_TASKS = Object.freeze([
  { id:"T01", scenarioId:"school-training", goal:"找到開始防詐訓練的方法", startRoute:"home" },
  { id:"T02", scenarioId:"school-training", goal:"完成一次你認為適合自己的練習", startRoute:"home" },
  { id:"T03", scenarioId:"school-training", goal:"找出自己比較容易忽略哪一種風險", startRoute:"dashboard" },
  { id:"T04", scenarioId:"school-training", goal:"再進行一個針對弱項的練習", startRoute:"dashboard" },
  { id:"T05", scenarioId:"real-suspicious-event", goal:"使用 SignalSafe 處理現在的情況", startRoute:"home" },
  { id:"T06", scenarioId:"real-suspicious-event", goal:"找出現在第一件不應該做的事情", startRoute:"emergency" },
  { id:"T07", scenarioId:"real-suspicious-event", goal:"找到安全的下一步", startRoute:"emergency" },
  { id:"T08", scenarioId:"real-suspicious-event", goal:"找到可信任的查證方式", startRoute:"emergency" },
]);

export const V2_TASK_STATUSES = Object.freeze(["PASS","PARTIAL","FAIL","NOT_ATTEMPTED"]);

export function getV2Task(taskId) {
  return V2_RESEARCH_TASKS.find((task) => task.id === taskId) ?? null;
}

export function buildV2StudyLink({ base = "/prototype/", studyId = "SST-V2", participantId, taskId, route }) {
  const url = new URL(base, "https://signalsafe.local");
  url.searchParams.set("study", studyId);
  if (participantId) url.searchParams.set("participant", participantId);
  if (taskId) url.searchParams.set("task", taskId);
  if (route) url.searchParams.set("route", route);
  return `${url.pathname}${url.search}`;
}
