import { db } from "../db/instance";
import { Game } from "../domain/Game";
import { GamesRepository } from "./GamesRepository";

export class GamesRepositoryImpl implements GamesRepository {
  async create(game: Game): Promise<Game> {
    try {
      const response = await db.game.create({
        data: {
          ownerId: game.ownerId,
        },
      });
      return response;
    } catch (error) {
      throw new Error("Error creating game");
    }
  }

  async findById(id: string): Promise<Game> {
    let error;
    try {
      const response = await db.game.findUnique({
        include: {
          guest: {
            select: {
              id: true,
              name: true,
              imageUrl: true,
            },
          },
          owner: {
            select: {
              id: true,
              name: true,
              imageUrl: true,
            },
          },
        },
        where: {
          id,
        },
      });

      if (response) {
        return response;
      }
      error = new Error("Game not found");
    } catch (e) {
      throw new Error("Unknown error");
    }
    throw error || new Error("Unknown error");
  }

  async updateStatus(game: Game): Promise<Game> {
    let error;
    try {
      const response = await db.game.update({
        where: {
          id: game.id,
        },
        data: {
          status: game.status,
        },
      });

      if (response) {
        return new Game(response);
      }
    } catch (e) {
      throw new Error("Unknown error");
    }
    throw error || new Error("Unknown error");
  }
}
