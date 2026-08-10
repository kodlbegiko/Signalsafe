export const CONSENT_VERSION = "signalsafe-consent-2026-08-10-v1";

export const CONSENT_ACKNOWLEDGEMENTS = [
  { key: "purposeAndProcedure", label: "我已閱讀並理解這項研究的目的與測試流程。" },
  { key: "dataCollection", label: "我了解系統會記錄匿名研究資料、作答內容與研究流程資料。" },
  { key: "voluntaryParticipation", label: "我了解參與是自願的，並且可以暫停或停止參與。" },
  { key: "externalConsentBoundary", label: "我確認研究者已向我完成本次研究所需的說明；如果另有書面、監護人、學校或其他正式同意程序，這些程序應由研究團隊依規定另外完成。" },
];

export const CONSENT_SECTIONS = [
  {
    id: "purpose",
    title: "1. 這項測試在做什麼？",
    paragraphs: [
      "SignalSafe 是一套以情境練習為核心的反詐騙決策訓練系統。",
      "這次研究希望了解 16–18 歲學生在面對可疑訊息或數位情境時，如何判斷風險、辨識重要線索，以及選擇較安全的下一步行動。",
      "研究也會觀察參與者在完成 SignalSafe 訓練前後，作答方式是否出現變化。本研究目前屬於產品與研究流程驗證的一部分，這並不代表 SignalSafe 已經被證明具有教育成效。",
    ],
  },
  {
    id: "procedure",
    title: "2. 如果我參加，我需要做什麼？",
    paragraphs: [
      "本次測試會依序進行訓練前測 Pre-test 8 題、SignalSafe Training 8 題、訓練後測 Post-test 8 題，共 24 個情境題。",
      "不同題目可能要求你判斷目前情況、選擇最安全的下一步、辨識值得注意的線索，以及評估自己對答案的信心程度。",
      "Training 階段會提供學習回饋。Pre-test 與 Post-test 不會在每題回答後立即公布正確答案，以避免前後測受到額外提示影響。完成時間會依個人的閱讀與作答速度而不同。",
    ],
  },
  {
    id: "not-an-exam",
    title: "3. 我需要答對所有問題嗎？",
    paragraphs: [
      "不需要。這不是學校考試，也不是智力測驗。研究真正想了解的是你在真實情境下會怎麼判斷與行動。",
      "請按照你當下最真實的判斷回答，不要因為擔心答錯而刻意猜測研究者想要的答案。",
    ],
  },
  {
    id: "data-collected",
    title: "4. 系統會記錄哪些資料？",
    paragraphs: [
      "研究模式可能記錄匿名 Participant ID、研究版本、題目版本、題目 ID、測量構面 Construct、情境類型、Pre / Training / Post 階段、你的判斷、你選擇的安全行動、你選擇的重要線索、信心程度、答案是否符合題目設定、作答時間、實際操作時間、是否曾修改答案、暫停與恢復狀態，以及部分研究流程事件與時間戳記。",
      "這些資料主要用來分析哪些情境較容易誤判、哪些反詐能力較弱、使用者是否過度有信心或低估風險、訓練前後的作答是否出現變化，以及研究流程本身是否可靠。",
    ],
  },
  {
    id: "data-not-needed",
    title: "5. 系統不需要你提供哪些資料？",
    paragraphs: [
      "SignalSafe Research Mode 不需要你在研究資料中提供真實姓名、身分證字號、電話號碼、Email、LINE ID、Instagram 帳號、Discord ID、住址、密碼、一次性驗證碼 OTP、信用卡資料或銀行帳戶資訊。",
      "如果研究者另外維護真實身分與 Participant ID 的對照表，該資料必須與 SignalSafe 匯出的研究資料分開保存。不要在 Participant ID 欄位輸入姓名、電話、Email、學校名稱或其他可辨認身分的資料。",
    ],
  },
  {
    id: "participant-id",
    title: "6. 什麼是 Participant ID？",
    paragraphs: [
      "研究者會提供一組匿名編號，例如 U004、U005、U006。研究資料使用的是這組代碼，而不應直接使用你的姓名。請只輸入研究者提供給你的 Participant ID。",
    ],
  },
  {
    id: "voluntary",
    title: "7. 參加這項測試是自願的嗎？",
    paragraphs: [
      "是。參與研究應建立在自願的前提下。你可以選擇不參加、在開始前退出、在測試中要求暫停，或在測試中停止參與。",
      "如果你在測試過程感到不舒服、壓力過大、不想繼續或不希望繼續回答，可以停止。SignalSafe 不應以強迫方式要求你完成所有題目。",
    ],
  },
  {
    id: "risks",
    title: "8. 可能有哪些不適或風險？",
    paragraphs: [
      "測試內容會包含可疑付款、帳號安全、社群訊息、網路購物、假冒通知、身分或資料要求，以及其他常見數位詐騙情境。部分情境可能讓人感到緊張、困惑、擔心答錯，或聯想到過去遇到的可疑經驗。",
      "如果感到不適，可以暫停或停止測試。本系統不是警方、銀行、法律機構或即時詐騙判定服務。如果你正在面對真實的高風險事件，不應只依賴研究測驗結果處理。",
    ],
  },
  {
    id: "benefits",
    title: "9. 參與可能帶來什麼好處？",
    paragraphs: [
      "參與者可能在過程中接觸到辨識可疑線索、停止高風險操作、使用官方管道、獨立查證、保護帳號與付款資訊等反詐決策概念。",
      "但不能保證每一位參與者一定因此提升反詐能力。研究也會協助 SignalSafe 團隊了解產品與研究流程哪些地方需要改善。",
    ],
  },
  {
    id: "use-of-data",
    title: "10. 我的研究資料會如何使用？",
    paragraphs: [
      "匿名研究資料可能被用於 SignalSafe 產品改善、研究分析、研究報告、競賽報告、簡報、統計結果，以及學術或教育相關成果整理。",
      "對外報告應優先使用匿名統計、群體結果或 Participant ID，而不是直接公開真實姓名。任何真實身分對照資料，都應與研究原始資料分開管理。",
    ],
  },
  {
    id: "withdrawal",
    title: "11. 如果我中途退出呢？",
    paragraphs: [
      "在尚未完成測驗時，你可以暫停研究或退出本次研究。系統提供退出研究並清除此裝置上的本次未完成紀錄功能。",
      "如果資料已經由研究者匯出到外部檔案，網站本身無法自動刪除研究者已保存的外部副本；相關後續資料處理應依研究團隊的既定研究流程辦理。",
    ],
  },
  {
    id: "external-consent-boundary",
    title: "12. 網站上的確認是否等於所有正式同意程序？",
    paragraphs: [
      "不一定。本頁面的確認用途，是確認你已閱讀本研究的主要參與資訊，並表達是否願意繼續進入 SignalSafe Research Mode。",
      "如果研究計畫、學校、競賽、研究機構或相關規定另外要求書面同意、監護人同意、研究倫理審查、學校行政同意或其他正式研究程序，本網站的確認不能自動取代那些程序。研究者有責任在需要時先完成相關外部程序。",
    ],
  },
  {
    id: "before-continuing",
    title: "13. 繼續前請確認",
    paragraphs: [
      "只有在你已閱讀以上內容、了解測試會做什麼、了解系統會記錄哪些資料、了解參與是自願的、知道可以停止參與，並願意繼續的情況下，才進入下一步。",
    ],
  },
];

export function createConsentDraft() {
  return {
    consentVersion: CONSENT_VERSION,
    step: "notice",
    reviewed: false,
    reviewedAt: null,
    accepted: false,
    acceptedAt: null,
    acknowledgements: Object.fromEntries(CONSENT_ACKNOWLEDGEMENTS.map(({ key }) => [key, false])),
  };
}

export function isConsentComplete(consent) {
  return Boolean(
    consent &&
      consent.consentVersion === CONSENT_VERSION &&
      consent.reviewed === true &&
      consent.accepted === true &&
      CONSENT_ACKNOWLEDGEMENTS.every(({ key }) => consent.acknowledgements?.[key] === true),
  );
}

export function normalizeConsentDraft(value) {
  if (!value || value.consentVersion !== CONSENT_VERSION) return createConsentDraft();
  const fresh = createConsentDraft();
  return {
    ...fresh,
    ...value,
    acknowledgements: {
      ...fresh.acknowledgements,
      ...(value.acknowledgements ?? {}),
    },
  };
}
