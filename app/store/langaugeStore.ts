import { create } from "zustand";

type Languages = "en" | "ja";

interface LanguageStore {
  language: Languages;
  setLanguage: (language: Languages) => void;
}

export const useLanguageStore = create<LanguageStore>((set) => ({
  language: "en",
  setLanguage: (language: Languages) => set({ language }),
}));
