export const action = (id, label, riskLevel = "neutral") => ({ id, label, riskLevel });
export const signal = (id, label, category) => ({ id, label, category });
