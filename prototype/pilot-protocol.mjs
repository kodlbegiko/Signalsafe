export const PILOT_PROTOCOL_VERSION = "signalsafe-pilot-2026-08-13-v1";
export const PILOT_PHASE = "pilot";
export const PILOT_SAMPLE_TARGET = Object.freeze({ min: 5, max: 8 });
export const PILOT_SCENARIO_SCRIPT = "想像你平常會使用 LINE、Instagram、遊戲、購物平台和其他網路服務，也可能收到活動通知、帳號提醒、付款要求或陌生訊息。今天我們想了解高中生面對這些數位訊息時，會如何判斷情況並選擇下一步。請依照你當下最真實的直覺操作，不需要猜研究者想要的答案；這不是學校考試。";
export const PILOT_TASKS = Object.freeze([
  "從 SignalSafe 首頁找到適合參與正式研究測試的入口，並開始測試。",
  "閱讀研究參與說明，依照自己的理解完成必要確認並進入正式測試。",
  "依照當下真實判斷，完成系統提供的 Pre-test、Training 與 Post-test 情境流程。",
  "完成後查看結果頁，指出自己最需要加強的地方，並向主持人說明這套系統是否有幫助、哪裡需要修改。"
]);
export const PILOT_SETTING = Object.freeze({
  location: "學校圖書館、自習空間或等價的安靜校內空間",
  format: "一次一名受測者、個別進行",
  network: "穩定 Wi-Fi",
  device: "統一使用 iPad Air 與 Safari；橫向或直向由受測者自然選擇",
  moderator: "主持人坐在側後方觀察，不主動提示答案或操作路徑"
});
export const PILOT_ELIGIBILITY = Object.freeze([
  "16–18 歲、高中階段學生。",
  "日常有使用智慧型手機，以及 LINE、Instagram、遊戲、購物平台或其他數位服務的經驗。",
  "能自行閱讀繁體中文並完成一般網頁操作。",
  "Pilot 可曾使用 SignalSafe 一般模式，但未曾完成同版本的正式 Research Mode，以降低重複作答造成的學習效應。"
]);
export const PILOT_ASSISTANCE_LEVELS = Object.freeze([
  "Level 0：不提示，讓受測者自行完成。",
  "Level 1：只說『請再看看畫面上還有哪些選項』，不指出位置。",
  "Level 2：只提示功能所在區域，不告訴受測者應選哪一個答案。",
  "Level 3：為避免流程完全中斷，直接說明操作方式；必須記錄使用了 Level 3。"
]);
