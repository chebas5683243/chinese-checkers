import { Game } from "../domain/Game";
import { Move } from "../domain/Move";

export interface GamesRepository {
  create(game: Game): Promise<Game>;
  findById(id: string): Promise<Game>;
  update(game: Game): Promise<Game>;
  getMoves(gameId: string): Promise<Pick<Move, "from" | "to">[]>;
  saveMove(move: Move): Promise<Move>;
}
