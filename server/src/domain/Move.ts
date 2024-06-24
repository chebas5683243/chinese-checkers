import { MovesValidator } from "../validators/movesValidators";

type MoveSchema = "create";

export type Coordinate = {
  x: number;
  y: number;
};

export type FormattedMove = {
  from: Coordinate;
  to: Coordinate;
};

export class Move {
  id: string;

  from: number;
  to: number;

  gameId: string;

  createdAt: Date;

  updatedAt: Date;

  constructor(data?: Partial<Move>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  static formatCoord(coord: Coordinate) {
    return coord.x * 100 + coord.y;
  }

  static parseFormattedCoord(coord: number) {
    return {
      x: Math.floor(coord / 100),
      y: coord % 100,
    };
  }

  static instanceFor(instanceSchema: MoveSchema, data?: Partial<Move>) {
    const validation = MovesValidator[instanceSchema].safeParse(data);

    if (!validation.success) {
      throw new Error(JSON.stringify(validation.error.errors));
    }

    const { from, gameId, to } = validation.data;

    return new Move({
      from,
      to,
      gameId,
    });
  }
}
