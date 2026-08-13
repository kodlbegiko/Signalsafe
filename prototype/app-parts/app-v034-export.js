/* v0.3.4 research-export reliability layer; no research-question or consent changes. */
const v034BaseHandleAction = handleAction;

function v034ResearchSession() {
  return state.sessions.find((item) => item.id === state.lastResearchSessionId && item.mode === "research")
    ?? state.sessions.filter((item) => item.mode === "research").at(-1)
    ?? null;
}

function v034PrepareResearchExport() {
  const session = v034ResearchSession();
  if (!session) throw new Error("找不到已完成的研究場次");
  const json = buildResearchExport(session);
  const parsed = validateResearchExportJson(json);
  return {
    session,
    json,
    parsed,
    filename: `signalsafe-research-${session.participantId}-${new Date().toISOString().slice(0, 10)}.json`,
  };
}

function v034SetExportStatus(message, type = "info") {
  const node = document.querySelector("#researchExportStatus");
  if (node) {
    node.className = `research-export-status research-export-status--${type}`;
    node.setAttribute("role", type === "error" ? "alert" : "status");
    node.textContent = message;
  }
  toast(message, type === "error" ? "error" : "success");
}

downloadFile = function (filename, content, type = "application/octet-stream") {
  let url = null;
  try {
    const blob = new Blob([content], { type });
    if (blob.size <= 0) throw new Error("Generated download is empty");
    url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    anchor.rel = "noopener";
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    const revokeUrl = url;
    setTimeout(() => URL.revokeObjectURL(revokeUrl), 30000);
    return { ok: true, filename, byteLength: blob.size };
  } catch (error) {
    if (url) {
      const revokeUrl = url;
      setTimeout(() => URL.revokeObjectURL(revokeUrl), 30000);
    }
    console.error("SignalSafe export failed", error);
    return { ok: false, filename, byteLength: 0, error };
  }
};

researchResultsView = function () {
  const session = v034ResearchSession();
  if (!session) return researchIntroView();
  return shell(`<section class="completion-card">
    <div class="completion-card__icon">${icon("check", 42)}</div>
    <p class="completion-card__meta">正式流程完成</p>
    <h1>本次測試已完成。</h1>
    <p>研究資料仍只保存在這台裝置。請先匯出研究 JSON，再依研究 SOP 保存。若瀏覽器沒有開始下載，可使用下方備援方式。</p>
    <div class="research-result-meta">
      <div><small>匿名代碼</small><strong>${session.participantId}</strong></div>
      <div><small>研究版本</small><strong>${session.studyVersion}</strong></div>
    </div>
    <div id="researchExportStatus" class="research-export-status" role="status" aria-live="polite">尚未匯出研究資料。</div>
    <div class="completion-card__actions">
      <button class="button button--primary" data-action="export-research-json">匯出研究 JSON</button>
      <button class="button button--secondary" data-action="copy-research-json">複製研究 JSON</button>
      <button class="button button--ghost" data-action="show-research-json">顯示備援 JSON</button>
      <button class="button button--ghost" data-action="end-research">結束</button>
    </div>
    <div id="researchExportFallback" hidden>
      <label for="researchExportFallbackText"><strong>備援研究 JSON</strong></label>
      <p class="scenario-card__note">只在研究者需要救援匯出時使用。內容已先通過研究 export schema 與 PII key guard。</p>
      <textarea id="researchExportFallbackText" readonly rows="14" spellcheck="false" aria-label="備援研究 JSON"></textarea>
    </div>
  </section>`, { compact: true, researchLocked: true });
};

async function v034CopyResearchJson() {
  try {
    const prepared = v034PrepareResearchExport();
    if (!navigator.clipboard?.writeText) throw new Error("Clipboard API unavailable");
    await navigator.clipboard.writeText(prepared.json);
    v034SetExportStatus(`研究 JSON 已複製到剪貼簿。檔案內容包含 ${prepared.parsed.responses.length} 筆作答。`, "success");
  } catch (error) {
    console.error("SignalSafe research JSON copy failed", error);
    v034SetExportStatus("無法複製研究 JSON。資料仍保存在此裝置，請改用「顯示備援 JSON」。", "error");
  }
}

function v034ShowResearchJson() {
  try {
    const prepared = v034PrepareResearchExport();
    const wrapper = document.querySelector("#researchExportFallback");
    const textarea = document.querySelector("#researchExportFallbackText");
    if (!wrapper || !textarea) throw new Error("Fallback export UI unavailable");
    textarea.value = prepared.json;
    wrapper.hidden = false;
    textarea.focus();
    v034SetExportStatus(`備援 JSON 已建立，共 ${prepared.parsed.responses.length} 筆作答。請由研究者保存後再結束場次。`, "success");
  } catch (error) {
    console.error("SignalSafe research JSON fallback failed", error);
    v034SetExportStatus("研究資料無法建立。資料仍保存在此裝置；請不要結束本次研究場次並聯絡研究者。", "error");
  }
}

handleAction = function (name) {
  if (name === "export-research-json") {
    try {
      const prepared = v034PrepareResearchExport();
      const result = downloadFile(prepared.filename, prepared.json, "application/json;charset=utf-8");
      if (!result.ok) throw result.error ?? new Error("Browser download could not be triggered");
      v034SetExportStatus(`研究 JSON 已建立，瀏覽器應開始下載：${result.filename}（${result.byteLength} bytes）。若沒有出現下載，請使用備援方式。`, "success");
    } catch (error) {
      console.error("SignalSafe research export failed", error);
      const privacyFailure = /forbidden key/i.test(String(error?.message ?? error));
      v034SetExportStatus(privacyFailure
        ? "研究資料未匯出：隱私檢查未通過。資料仍保存在此裝置，請不要結束本次研究場次並聯絡研究者。"
        : "研究資料匯出失敗。資料仍保存在此裝置，請不要結束本次研究場次；可嘗試「複製研究 JSON」或「顯示備援 JSON」。", "error");
    }
    return;
  }
  if (name === "copy-research-json") {
    void v034CopyResearchJson();
    return;
  }
  if (name === "show-research-json") {
    v034ShowResearchJson();
    return;
  }
  return v034BaseHandleAction(name);
};

if (route === "research-results") render();
