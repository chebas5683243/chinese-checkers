import { GameStatus } from "@prisma/client";
import { GamesValidator } from "../validators/gamesValidators";

type GameSchema = "create" | "findById" | "update" | "getMoves";

export class Game {
  id: string;

  status: GameStatus;

  ownerId: string;

  guestId: string | null;

  createdAt: Date;

  updatedAt: Date;

  constructor(data?: Partial<Game>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  static instanceFor(instanceSchema: GameSchema, data?: Partial<Game>) {
    const validation = GamesValidator[instanceSchema].safeParse(data);

    if (!validation.success) {
      throw new Error(JSON.stringify(validation.error.errors));
    }

    return new Game(validation.data);
  }
}
