import type { Patient } from "./store/types";
import grain2 from "../assets/images/grain2.jpg";
import grain3 from "../assets/images/grain3.jpg";
import grain4 from "../assets/images/imageSkin.jpg";

export const patients: Patient[] = [
  {
    id: 1,
    name: "John Doe",
    age: 30,
    condition: "Eczema",
    lastVisit: "2024-05-01",
    diagnostic: [
      {
        date: "2024-05-01",
        condition: "Eczema",
        notes: "",
        img: grain4,
        annotations: [],
        zone: "Dos",
        evolution: "stable",
        risque: "low",
      },
      {
        date: "2024-01-15",
        condition: "psoriasis",
        notes: "",
        img: grain4,
        annotations: [],
        zone: "Dos",
        evolution: "decrease",
        risque: "high",
      },
    ],
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 25,
    condition: "Psoriasis",
    lastVisit: "2024-04-15",
    diagnostic: [
      {
        date: "2024-05-01",
        condition: "Eczema",
        notes: "",
        img: grain2,
        annotations: [],
        zone: "Dos",
        evolution: "stable",
        risque: "low",
      },
      {
        date: "2024-01-15",
        condition: "Eczema",
        notes: "",
        img: grain2,
        annotations: [],
        zone: "Dos",
        evolution: "stable",
        risque: "medium",
      },
    ],
  },
  {
    id: 3,
    name: "Alice Johnson",
    age: 40,
    condition: "Acne",
    lastVisit: "2024-03-20",
    diagnostic: [
      {
        date: "2024-05-01",
        condition: "Eczema",
        notes: "",
        img: grain3,
        annotations: [],
        zone: "Dos",
        evolution: "stable",
        risque: "low",
      },
      {
        date: "2024-01-15",
        condition: "Eczema",
        notes: "",
        img: grain3,
        annotations: [],
        zone: "Dos",
        evolution: "increase",
        risque: "medium",
      },
    ],
  },
];
