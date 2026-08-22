# SignalSafe Formal Round 1 Usability Data

此資料夾保留給 **Formal scored Round 1**。`UT001–UT004` 是正式 Round 1 的匿名模板／資料位置；目前正式 Round 1 **尚未開始**，現有 JSON 均維持 `status: "not_started"`，不是已完成的受測資料。

## Evidence boundary

2026-08-17 完成的 **exploratory usability observation 不屬於 Formal Round 1**。

因此：

- exploratory results 不會填入 `UT001.json`–`UT004.json`；
- 3 participants、15/15 completion、0/15 moderator intervention 不會被偽裝成 formal scored results；
- exploratory observation 只支持 usability / task completion / navigation-interaction feasibility / design iteration；
- 它不支持 learning effect、transfer、retention、scam-prevention effectiveness、statistical significance 或其他教育成效。

探索性觀察的公開 evidence boundary 見：[`../../../docs/research/usability/EXPLORATORY_USABILITY_2026-08-17.md`](../../../docs/research/usability/EXPLORATORY_USABILITY_2026-08-17.md)。

> **Formal Round 1 remains NOT STARTED.**

## Formal research version boundary

目前專案公開的 formal research boundary 為：

- Formal research appVersion: `0.3.4-research-export-fix`
- Question Bank: `2026-08-10-v2-candidate`
- V2 usability protocol: `signalsafe-v2-usability-2026-08-16`

`UT001–UT004` 是尚未啟用的空白模板，部分模板 metadata 仍保留較早 candidate 值；因正式 Round 1 尚未開始，這些欄位不是研究結果。**本次 semifinal evidence sync 不改寫這些 JSON 來配合簡報。** Formal Round 1 真正啟動前必須重新確認並凍結正式 study version / template metadata。

## 禁止提交

不得提交姓名、學校、班級、電話、Email、社群帳號、原始聲音、可識別影像、同意書簽名或任何姓名 ↔ UT ID 對照。

## 正式資料流程

正式場次真正開始並完成後，才把符合 `schema.json` 的匿名 export、觀察摘要與去識別化資料納入版本控制。聯絡資料與同意紀錄必須另行私密保存並依資料政策處理。
