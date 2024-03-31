import { Game } from "../domain/Game";

export interface GamesService {
  create(game: Game): Promise<Game>;
  findById(game: Game): Promise<Game>;
  updateStatus(game: Game): Promise<Game>;
}
