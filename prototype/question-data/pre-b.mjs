import { action, signal } from "./shared.mjs";

export default [
  {
    id: "pre-05",
    phase: "pre",
    category: "電子支付",
    platformStyle: "sms",
    senderLabel: "支付安全中心",
    title: "帳戶異常，30 分鐘內驗證",
    message: "偵測到異常付款。請回覆本簡訊 6 位數驗證碼，否則帳戶將被停用。",
    correctJudgment: "risk",
    signalOptions: [signal("otp", "要求回覆一次性驗證碼", "action"),signal("threat", "威脅帳戶即將停用", "tactic"),signal("generic-sender", "寄件人名稱很籠統", "source"),signal("security", "訊息提到安全中心", "source")],
    correctSignalIds: ["otp", "threat", "generic-sender"], primarySignalId: "otp",
    actionOptions: [action("reply-otp", "回覆驗證碼以免停用", "unsafe"),action("app-check", "自行開啟支付 App 查看交易與通知", "safe"),action("call-number", "撥打簡訊內提供的電話", "unsafe"),action("delete", "刪除後不再查看任何交易", "neutral")],
    correctActionIds: ["app-check"],
    explanation: "OTP 是用來完成敏感操作的驗證資訊，不應透過訊息回覆給任何人。", consequence: "交出 OTP 可能讓他人完成登入、綁定裝置或付款。", memoryTip: "驗證碼只輸入自己正在操作的官方 App。", officialVerification: "自行開啟原支付 App，查看交易紀錄或使用 App 內官方客服。", difficulty: 1
  },
  {
    id: "pre-06", phase: "pre", category: "獎學金", platformStyle: "email", senderLabel: "學校學務處", title: "校內清寒獎學金補件通知", message: "你提交的文件缺少戶籍謄本。請於週五前登入原校務系統的獎助學金專區補件；本信不附登入連結。", correctJudgment: "trusted",
    signalOptions: [signal("known-office", "寄件單位是校內既有單位", "source"),signal("no-link", "不附登入連結", "action"),signal("official-system", "要求自行進入原校務系統", "action"),signal("deadline", "有補件期限", "tactic")],
    correctSignalIds: ["known-office", "no-link", "official-system"], primarySignalId: "official-system",
    actionOptions: [action("portal", "自行進入原校務系統確認補件狀態", "safe"),action("reply-doc", "直接回信附上戶籍謄本", "unsafe"),action("ignore", "因為有期限所以全部忽略", "neutral"),action("public", "把通知截圖公開詢問", "unsafe")], correctActionIds: ["portal"],
    explanation: "訊息引導你回到原有官方系統，而不是點陌生連結或回信傳送敏感文件。", consequence: "正確核對可避免錯失補件，也降低敏感資料寄錯對象的風險。", memoryTip: "敏感文件回到原官方系統處理。", officialVerification: "自行輸入學校校務系統網址或開啟原 App。", difficulty: 1
  },
  {
    id: "pre-07", phase: "pre", category: "遊戲福利", platformStyle: "chat", senderLabel: "遊戲系統公告", title: "登入簽到送限定角色", message: "活動規則已放在遊戲內公告。請從遊戲首頁的『活動』按鈕進入，不需重新輸入帳號、密碼或付款。", correctJudgment: "trusted",
    signalOptions: [signal("in-game", "可從遊戲內既有入口查看", "source"),signal("no-credential", "不要求重新輸入帳密", "action"),signal("no-payment", "不要求付款或轉帳", "money"),signal("reward", "提供限定角色", "tactic")], correctSignalIds: ["in-game", "no-credential", "no-payment"], primarySignalId: "in-game",
    actionOptions: [action("in-game-check", "自行開啟遊戲，從活動頁核對規則", "safe"),action("reply-password", "回覆帳密請客服代領", "unsafe"),action("ignore-all", "所有遊戲福利都直接忽略", "neutral"),action("share-account", "把帳號借給朋友先測試", "unsafe")], correctActionIds: ["in-game-check"],
    explanation: "福利活動可以是正常通知。關鍵是使用遊戲內既有入口、不重新索取帳密，也不要求付款。", consequence: "從遊戲內自行核對可安全參與，也避免因過度警戒錯失正常活動。", memoryTip: "遊戲福利回遊戲內看，不從陌生頁登入。", officialVerification: "自行開啟遊戲內活動頁或官方網站公告。", difficulty: 1
  },
  {
    id: "pre-08", phase: "pre", category: "票券交易", platformStyle: "chat", senderLabel: "社團網友", title: "原價讓票，可面交", message: "我臨時不能去，可以在捷運站面交。票券來源與座位照片可先提供，但希望你先付 200 元保留金。", correctJudgment: "insufficient",
    signalOptions: [signal("deposit", "要求先付保留金", "money"),signal("unknown-seller", "賣家身分尚未驗證", "source"),signal("meet", "提出面交", "action"),signal("photos", "願意提供票券照片", "source")], correctSignalIds: ["deposit", "unknown-seller"], primarySignalId: "deposit",
    actionOptions: [action("deposit", "先付 200 元保留", "unsafe"),action("platform-check", "先核對售票規則、票券可轉讓性與賣家身分，不先付款", "safe"),action("accuse", "直接公開賣家一定是詐騙", "neutral"),action("id-photo", "要求對方傳完整身分證照片", "unsafe")], correctActionIds: ["platform-check"],
    explanation: "面交與照片不能自動證明真實；在票券來源、轉讓規則與賣家身分尚未確認前，應視為資訊不足。", consequence: "先付小額保留金仍可能遭到封鎖；索取完整身分證也會增加他人個資風險。", memoryTip: "票券先查規則與來源，再談付款。", officialVerification: "查官方售票平台轉讓規則、訂單驗證方式及安全交易機制。", difficulty: 2
  }
];
