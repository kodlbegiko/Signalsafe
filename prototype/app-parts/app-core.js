const app = document.querySelector("#app");
let state = loadState();
let route = "home";
let currentFlow = null;
let questionStartedAt = 0;
let hiddenStartedAt = null;
let interruptedDuration = 0;
let toastTimer = null;

const JUDGMENT_LABELS = { risk: "有明顯風險", insufficient: "資訊不足", trusted: "目前較可信" };
const SIGNAL_CATEGORY_LABELS = { tactic: "話術", source: "來源", action: "行為", money: "金流" };
const icon = (name, size = 24) => {
  const paths = {
    shield: '<path d="M12 3 5 6v5c0 4.5 2.8 8.2 7 10 4.2-1.8 7-5.5 7-10V6l-7-3Z"/><path d="m9.3 12 1.8 1.8 3.8-4"/>',
    bolt: '<path d="m13 2-8 11h6l-1 9 9-12h-6l0-8Z"/>',
    siren: '<path d="M8 17h8"/><path d="M9 17V9a3 3 0 0 1 6 0v8"/><path d="M5 21h14"/><path d="m4 10-2 0"/><path d="m20 10 2 0"/><path d="m6 4-1.5-1.5"/><path d="m18 4 1.5-1.5"/>',
    chart: '<path d="M4 19V9"/><path d="M10 19V5"/><path d="M16 19v-7"/><path d="M22 19H2"/>',
    check: '<path d="m5 12 4 4L19 6"/>', arrow: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
    lock: '<rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    export: '<path d="M12 3v12"/><path d="m7 8 5-5 5 5"/><path d="M5 21h14"/>',
    trash: '<path d="M4 7h16"/><path d="M9 7V4h6v3"/><path d="m6 7 1 14h10l1-14"/>',
    brain: '<path d="M9.5 4A3.5 3.5 0 0 0 6 7.5c0 .3 0 .6.1.8A3.5 3.5 0 0 0 5 15a3.5 3.5 0 0 0 4.5 3.3"/><path d="M14.5 4A3.5 3.5 0 0 1 18 7.5c0 .3 0 .6-.1.8A3.5 3.5 0 0 1 19 15a3.5 3.5 0 0 1-4.5 3.3"/><path d="M12 4v16"/><path d="M8 10h4"/><path d="M12 14h4"/>',
    home: '<path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/>'
  };
  return `<svg aria-hidden="true" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${paths[name] ?? paths.shield}</svg>`;
};
function setRoute(nextRoute) { route = nextRoute; window.scrollTo({ top: 0, behavior: "instant" }); render(); }
function toast(message, type = "info") { clearTimeout(toastTimer); let node = document.querySelector("#toast"); if (!node) { node = document.createElement("div"); node.id = "toast"; document.body.append(node); } node.className = `toast toast--${type} is-visible`; node.textContent = message; toastTimer = setTimeout(() => node.classList.remove("is-visible"), 2800); }
function downloadFile(filename, content, type) { const blob = new Blob([content], { type }); const url = URL.createObjectURL(blob); const anchor = document.createElement("a"); anchor.href = url; anchor.download = filename; document.body.append(anchor); anchor.click(); anchor.remove(); URL.revokeObjectURL(url); }
function storageNotice() { return state?.storageMode === "memory" ? "暫時記憶模式：重新整理或關閉頁面可能遺失資料" : "資料只保存在這台裝置"; }
function shell(content, options = {}) {
  const { compact = false } = options;
  return `<div class="app-shell ${compact ? "app-shell--compact" : ""}"><header class="topbar"><button class="brand" data-route="home" aria-label="回首頁"><span class="brand__mark">${icon("shield",26)}</span><span>SignalSafe</span></button><div class="topbar__right"><span class="offline-status" id="offlineStatus"><span></span>${navigator.onLine ? "本機模式" : "離線可用"}</span><button class="icon-button" data-route="data" aria-label="資料與隱私">${icon("lock",20)}</button></div></header><main>${content}</main><footer class="footer"><span>${storageNotice()}</span><span>App ${APP_VERSION} · 題庫 ${QUESTION_BANK_VERSION}</span></footer></div>`;
}
