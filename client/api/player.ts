import { axiosInstance } from "@/config/axios";
import { Player } from "@/types/Player";

export async function getPlayer(playerId: string) {
  const response = await axiosInstance.get<Player>(`/players/${playerId}`);
  return response.data;
}

type CreateOrUpdatePlayerMode = "update" | "create";
export type CreateOrUpdatePlayerArgs = Partial<Player> & {
  mode: CreateOrUpdatePlayerMode;
};

export function createOrUpdatePlayer(args: CreateOrUpdatePlayerArgs) {
  const { mode, ...player } = args;

  if (mode === "update") {
    return updatePlayer(player);
  }
  return createPlayer(player);
}

export async function createPlayer(player: Partial<Player>) {
  const response = await axiosInstance.post<Player>("/players", player);
  return response.data;
}

async function updatePlayer(player: Partial<Player>) {
  const { id: playerId, ...playerInfo } = player;
  const response = await axiosInstance.patch<Player>(
    `/players/${player.id}`,
    playerInfo
  );
  return response.data;
}
