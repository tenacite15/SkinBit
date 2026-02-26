import type { ImageSourcePropType } from 'react-native';

export interface Note {
  id: string;
  text: string;
  x: number;
  y: number;
}

export interface Diagnostic {
  date: string;
  condition: string;
  notes: string;
  img: ImageSourcePropType;
  annotations: Note[];
  zone: string;
  evolution: 'decrease' | 'stable' | 'increase';
  risque: 'low' | 'medium' | 'high';
}

export interface Patient {
  id: number;
  name: string;
  age: number;
  condition: string;
  lastVisit: string;
  diagnostic: Diagnostic[];
}

export interface AppState {
  patients: Patient[];
  saveNotes: (patientId: number, diagIndex: number, notes: Note[]) => void;
}
