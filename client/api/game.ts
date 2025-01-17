import { axiosInstance } from "@/config/axios";
import { Move } from "@/hooks/use-game-store";
import { Game } from "@/types/Game";

export async function createGame(game: Partial<Game>) {
  const response = await axiosInstance.post<Game>(`/games`, game);
  return response.data;
}

export async function getGame(gameId: string) {
  const response = await axiosInstance.get<Game>(`/games/${gameId}`);
  return response.data;
}

export async function updateGame(gameId: string, game: Partial<Game>) {
  const response = await axiosInstance.patch<Game>(`/games/${gameId}`, game);
  return response.data;
}

export async function getMoves(gameId: string) {
  const response = await axiosInstance.get<Move[]>(`/games/${gameId}/moves`);
  return response.data;
}
