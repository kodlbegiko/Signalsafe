export const SIGNALSAFE_V2_VERSION = "2.0.1-context-home-ux";
export const SIGNALSAFE_V2_PROTOCOL_VERSION = "signalsafe-v2-usability-2026-08-16";

export const V2_STUDY_ASSIGNMENTS = Object.freeze({
  studyId: "SST-V2",
  pretest: ["pre-01","pre-02","pre-03","pre-04","pre-05","pre-06","pre-07","pre-08"],
  training: ["train-01","train-02","train-03","train-04","train-05","train-06","train-07","train-08"],
  posttest: ["post-03","post-02","post-01","post-08","post-04","post-07","post-05","post-06"],
});

export const V2_RESEARCH_SCENARIOS = Object.freeze([
  {
    id: "school-training",
    title: "老師要求進行防詐訓練",
    intent: "training",
    prompt: "你是一名高中生。今天班導師告訴全班，最近很多學生收到假帳號通知、假購物訊息與假客服訊息，因此希望每個人使用 SignalSafe 練習自己的防詐判斷能力。老師只把 SignalSafe 網站交給你，沒有告訴你要按哪個功能。請依照你自己的理解使用這個網站。",
    taskIds: ["T01","T02","T03","T04"],
  },
  {
    id: "real-suspicious-event",
    title: "收到疑似帳號異常通知",
    intent: "safety",
    prompt: "你正在使用手機，突然收到一則看起來像是你常用服務官方帳號傳來的訊息：「系統偵測到您的帳號有異常登入。為避免帳號停權，請於今天 18:00 前完成身分驗證。」訊息下方附有一個「立即驗證帳號」連結。你不確定這到底是真的通知，還是有人想騙你。這時你想到可以打開 SignalSafe。",
    taskIds: ["T05","T06","T07","T08"],
  },
]);

export const V2_RESEARCH_TASKS = Object.freeze([
  {
    id:"T01",
    scenarioId:"school-training",
    goal:"找到並開始適合的防詐訓練",
    participantPrompt:"請開始一次你認為適合這個情況的防詐訓練。",
    startRoute:"home",
    setup:"fresh-home",
    independent:true,
  },
  {
    id:"T02",
    scenarioId:"school-training",
    goal:"完成一次防詐情境練習",
    participantPrompt:"請完成一次防詐情境練習。",
    startRoute:"home",
    setup:"fresh-home",
    independent:true,
  },
  {
    id:"T03",
    scenarioId:"school-training",
    goal:"找出目前最容易忽略的風險類型",
    participantPrompt:"假設你已經使用 SignalSafe 練習一段時間，現在請找出自己目前最容易忽略哪一類風險。",
    startRoute:"dashboard",
    setup:"seeded-learning-history",
    independent:true,
  },
  {
    id:"T04",
    scenarioId:"school-training",
    goal:"找到針對弱項繼續練習的方法",
    participantPrompt:"請找出一個可以針對這個弱項繼續練習的方法。",
    startRoute:"dashboard",
    setup:"seeded-weakness-state",
    independent:true,
  },
  {
    id:"T05",
    scenarioId:"real-suspicious-event",
    goal:"從一般產品入口開始處理目前的可疑情況",
    participantPrompt:"請使用 SignalSafe 處理你現在遇到的情況。",
    startRoute:"home",
    setup:"fresh-home",
    independent:true,
  },
  {
    id:"T06",
    scenarioId:"real-suspicious-event",
    goal:"找出現在第一件應避免的高風險操作",
    participantPrompt:"請找出你現在第一件應該避免做的事情。",
    startRoute:"emergency",
    setup:"fresh-emergency",
    independent:true,
  },
  {
    id:"T07",
    scenarioId:"real-suspicious-event",
    goal:"找到目前比較安全的下一步",
    participantPrompt:"請找出目前比較安全的下一步。",
    startRoute:"emergency",
    setup:"fresh-emergency",
    independent:true,
  },
  {
    id:"T08",
    scenarioId:"real-suspicious-event",
    goal:"找到可信任的獨立查證方式",
    participantPrompt:"請找出你可以怎麼確認這則通知是不是真的。",
    startRoute:"emergency",
    setup:"fresh-emergency",
    independent:true,
  },
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
