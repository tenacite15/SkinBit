export type EvolutionLevel = "decrease" | "stable" | "increase";

export const EVOLUTION_COLORS: Record<EvolutionLevel, string> = {
  decrease: "#4caf50",
  stable: "#ff9800",
  increase: "#f44336",
};

export const EVOLUTION_LABELS: Record<EvolutionLevel, string> = {
  decrease: "Diminution",
  stable: "Stable",
  increase: "Augmentation",
};

export function getEvolutionColor(evolution: EvolutionLevel): string {
  return EVOLUTION_COLORS[evolution];
}

export function getEvolutionLabel(evolution: EvolutionLevel): string {
  return EVOLUTION_LABELS[evolution];
}
