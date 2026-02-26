export type RiskLevel = "low" | "medium" | "high";

export const RISK_COLORS: Record<RiskLevel, string> = {
  low: "#4caf50",
  medium: "#ff9800",
  high: "#f44336",
};

export const RISK_LABELS: Record<RiskLevel, string> = {
  low: "Faible",
  medium: "Moyen",
  high: "Élevé",
};

export function getRiskColor(risque: RiskLevel): string {
  return RISK_COLORS[risque];
}

export function getRiskLabel(risque: RiskLevel): string {
  return RISK_LABELS[risque];
}
