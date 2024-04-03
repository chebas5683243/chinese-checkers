import { Game } from "../domain/Game";

export interface GamesRepository {
  create(game: Game): Promise<Game>;
  findById(id: string): Promise<Game>;
  update(game: Game): Promise<Game>;
}
