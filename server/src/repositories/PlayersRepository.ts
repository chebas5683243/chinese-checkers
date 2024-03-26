import { Player } from "@prisma/client";

export interface PlayersRepository {
  create(player: Player): Promise<Player>;
  findById(id: string): Promise<Player>;
  update(player: Player): Promise<Player>;
}