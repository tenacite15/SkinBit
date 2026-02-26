import { create } from "zustand";
import { patients as initialPatients } from "../patients";
import type { AppState, Note } from "./types";

export const useAppStore = create<AppState>((set) => ({
  patients: initialPatients.map((p) => ({
    ...p,
    diagnostic: p.diagnostic.map((d) => ({ ...d, annotations: [] })),
  })),

  saveNotes: (patientId: number, diagIndex: number, notes: Note[]) =>
    set((state) => ({
      patients: state.patients.map((p) => {
        if (p.id !== patientId) return p;
        const diagnostic = [...p.diagnostic];
        diagnostic[diagIndex] = { ...diagnostic[diagIndex], annotations: notes };
        return { ...p, diagnostic };
      }),
    })),
}));
