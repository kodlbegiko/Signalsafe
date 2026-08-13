export const MARKET_FEASIBILITY_VERSION = "signalsafe-market-feasibility-2026-08-13-v1";

export const MARKET_FEASIBILITY_DIMENSIONS = [
  {
    id: "importance",
    title: "永續議題重要性",
    current: [
      "聚焦 16–18 歲學生的數位反詐決策訓練，而不是只做單次真假判定。",
      "核心價值是降低數位情境中的財務、帳號與個資風險，提升可持續的數位社會韌性。",
      "目前已有目標族群定義、情境題庫與 Pilot 研究流程作為問題驗證基礎。"
    ],
    upgraded: [
      "把反詐能力明確定位為可持續的數位公民與安全決策能力。",
      "建立校園常見情境與新型詐騙手法的持續更新機制。",
      "以 Pilot 與後續正式研究證據檢驗是否真的改善安全下一步，而不是只宣稱有教育效果。"
    ]
  },
  {
    id: "target",
    title: "目標對象真實需求",
    current: [
      "主要對象為 16–18 歲高中階段學生，日常高度接觸手機、社群、遊戲、購物與各類數位服務。",
      "SignalSafe 的需求假設是：學生需要練習『先停下、找重點、去查證』與安全下一步，而不只是知道詐騙知識。",
      "目前已建立 Pre / Training / Post 與 5–8 人 Pilot 流程驗證可理解性與操作需求。"
    ],
    upgraded: [
      "先用 5–8 人 Pilot 驗證介面、題目理解、真實感與資料流程，再擴大樣本。",
      "依 construct 弱點與錯誤型態決定下一輪訓練情境，而不是所有學生都收到相同補強。",
      "正式研究前凍結版本、招募條件與主持流程，避免資料不可比較。"
    ]
  },
  {
    id: "technology",
    title: "科技適切性",
    current: [
      "以瀏覽器 / PWA 形式降低安裝門檻，可在手機、平板與桌面使用。",
      "Research Mode 已分離正式 Pre / Training / Post，並支援匿名 Participant ID、暫停恢復與 JSON 匯出。",
      "Quick bank 與正式研究題庫分離，避免一般練習污染前後測。"
    ],
    upgraded: [
      "持續維持跨裝置、低安裝摩擦與同站研究入口。",
      "建立題庫與情境內容的版本治理、人工語意審查與可追溯更新流程。",
      "未來可評估學校端匿名班級洞察與教師資源，但在需求驗證前不擴大收集 PII 或複雜後台。"
    ]
  },
  {
    id: "business",
    title: "商業可行性",
    current: [
      "目前尚未驗證學生或家長直接付費意願，也沒有足夠證據支持特定定價。",
      "真正可能的採購者不只學生，也包括學校、教育單位、政府及企業 CSR / 金融與電信合作夥伴。",
      "現階段應把商業模式視為待驗證假設，而不是已成立的營收模式。"
    ],
    upgraded: [
      "採混合模式：學生核心訓練維持低門檻或免費，先確保使用與研究樣本可累積。",
      "B2B2C：學校授權可包含課程導入、教師資源與匿名群體能力洞察。",
      "B2G / CSR：爭取政府、金融、電信或企業社會責任計畫贊助校園導入。",
      "先以 Pilot、學校訪談與合作意願驗證採購需求，再決定定價、成本與單位經濟。"
    ]
  },
  {
    id: "sustainability",
    title: "可持續發展性",
    current: [
      "題庫、Study、Consent 與 Pilot protocol 已版本化，可保留研究可追溯性。",
      "匿名作答資料可以協助辨識共同弱點與需要補強的 construct。",
      "但長期內容更新、專家審查頻率與維運責任目前尚未完全制度化。"
    ],
    upgraded: [
      "建立 Threat → Training → Measurement → Update 的持續循環。",
      "依新型詐騙事件、校園回饋與研究結果定期更新情境，而不是做完一次題庫就停止。",
      "每次題庫改版保留版本、語意審查、測試證據與舊資料邊界。",
      "建立合作學校、教師與反詐專家的回饋網路，形成長期內容治理。"
    ]
  },
  {
    id: "team",
    title: "團隊資源",
    current: [
      "現有能力涵蓋產品原型、Web 前端、研究流程、版本控制、CI 與部署。",
      "已有 Pilot 主持人流程、招募條件、Research Mode 與資料匯出基礎。",
      "主要缺口是反詐領域專家、教學設計、心理測量 / 研究方法、大規模校園導入與商業合作資源。"
    ],
    upgraded: [
      "核心團隊持續負責產品、研究工程與資料品質。",
      "邀請反詐 / 金融專家參與情境與答案的人工審查。",
      "與教師及學校夥伴合作做教學整合、Pilot 招募與場域驗證。",
      "引入研究方法顧問協助測量設計，並尋找企業 / 政府夥伴支援擴大導入。"
    ]
  }
];

export const BUSINESS_MODEL_HYPOTHESIS = {
  model: "free-student + school-license + government/CSR partnership",
  student: "核心學生訓練維持低門檻或免費",
  school: "學校授權：課程導入、教師資源、匿名群體洞察",
  partner: "政府、金融、電信或企業 CSR 支援校園導入",
  validationRule: "在 Pilot、採購者訪談與合作意願未形成證據前，不宣稱定價或商業模式已被驗證"
};

export const SUSTAINABILITY_LOOP = ["Threat", "Training", "Measurement", "Update"];
