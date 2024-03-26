import { PlayersValidator } from "../validators/playersValidator";

type PlayerSchema = "create" | "findById" | "update";

export class Player {
  id: string;

  name: string;

  imageUrl: string;

  createdAt: Date;

  updatedAt: Date;

  constructor(data?: Partial<Player>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  static instanceFor(instanceSchema: PlayerSchema, data?: Partial<Player>) {

    const validation = PlayersValidator[instanceSchema].safeParse(data);

    if (!validation.success) {
      throw new Error(validation.error.errors[0].message);
    }

    return new Player(validation.data);
  }
}