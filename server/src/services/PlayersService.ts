import { Player } from "@prisma/client";

export interface PlayersService {
  create(player: Player): Promise<Player>;
  findById(player: Player): Promise<Player>;
  update(player: Player): Promise<Player>;
}