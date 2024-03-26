import { getNicknameFromLocalStorage } from "@/lib/utils";
import { create } from "zustand";

interface GameState {
  nickname: string;
  updateNickname: (nickname: string) => void;
}

export const useGameStore = create<GameState>((set) => ({
  nickname: getNicknameFromLocalStorage() ?? "",
  updateNickname: (nickname: string) => set({ nickname }),
}));
