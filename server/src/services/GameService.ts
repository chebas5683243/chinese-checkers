import { Game } from "../domain/Game";
import { FormattedMove, Move } from "../domain/Move";

export interface GamesService {
  create(game: Game): Promise<Game>;
  findById(game: Game): Promise<Game>;
  update(game: Game): Promise<Game>;
  getMoves(game: Game): Promise<FormattedMove[]>;
  saveMove(move: Move): Promise<Move>;
}
