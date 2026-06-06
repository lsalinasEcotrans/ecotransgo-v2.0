import { create } from "zustand";
import { persist } from "zustand/middleware";

const COLORS = [
  { id: "violet", hex: "#7C3AED", label: "Violeta" },
  { id: "blue", hex: "#2563EB", label: "Azul" },
  { id: "teal", hex: "#0D9488", label: "Teal" },
  { id: "green", hex: "#16A34A", label: "Verde" },
  { id: "orange", hex: "#EA580C", label: "Naranja" },
  { id: "red", hex: "#DC2626", label: "Rojo" },
  { id: "pink", hex: "#DB2777", label: "Rosa" },
  { id: "slate", hex: "#475569", label: "Slate" },
];

interface ColorStore {
  colorId: string;
  hex: string;
  setColor: (id: string) => void;
}

export const useColorStore = create<ColorStore>()(
  persist(
    (set) => ({
      colorId: "green",
      hex: "#16A34A",
      setColor: (id) => {
        const found = COLORS.find((c) => c.id === id);
        if (found) set({ colorId: id, hex: found.hex });
      },
    }),
    { name: "autocab-color" }, // ← key en localStorage
  ),
);

export { COLORS };
