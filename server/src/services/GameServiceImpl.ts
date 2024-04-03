import { Game } from "../domain/Game";
import { GamesRepository } from "../repositories/GamesRepository";
import { GamesService } from "./GameService";

export interface GamesServiceProps {
  gamesRepo: GamesRepository;
  config: {};
}

export class GamesServicesImpl implements GamesService {
  constructor(protected props: GamesServiceProps) {}

  async create(game: Game): Promise<Game> {
    try {
      const response = await this.props.gamesRepo.create(game);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async findById(game: Game): Promise<Game> {
    try {
      const response = await this.props.gamesRepo.findById(game.id);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async update(game: Game): Promise<Game> {
    try {
      const response = await this.props.gamesRepo.update(game);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
