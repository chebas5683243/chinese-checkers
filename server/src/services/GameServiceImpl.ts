import { GameStatus } from "@prisma/client";
import { Game } from "../domain/Game";
import { FormattedMove, Move } from "../domain/Move";
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

  async getMoves(game: Game): Promise<FormattedMove[]> {
    try {
      const requestedGame = await this.props.gamesRepo.findById(game.id);

      if (
        requestedGame.status === GameStatus.CLOSED ||
        requestedGame.status === GameStatus.WAITING
      ) {
        throw new Error("No moves available for this game");
      }

      const moves = await this.props.gamesRepo.getMoves(requestedGame.id);

      const formattedMoves: FormattedMove[] = moves.map((move) => ({
        from: Move.parseFormattedCoord(move.from),
        to: Move.parseFormattedCoord(move.to),
      }));

      return formattedMoves;
    } catch (error) {
      throw error;
    }
  }

  async saveMove(move: Move): Promise<Move> {
    try {
      const game = await this.props.gamesRepo.findById(move.gameId);

      if (game.status !== GameStatus.PLAYING) {
        throw new Error("Game is not in progress");
      }

      const response = await this.props.gamesRepo.saveMove(move);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
