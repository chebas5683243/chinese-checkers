import { PlayersRepository } from "./PlayersRepository";
import { db } from "../db/instance";
import { Player } from "../domain/Player";

export class PlayersRepositoryImpl implements PlayersRepository {
  async create(player: Player): Promise<Player> {
    try {
      const response = await db.player.create({
        data: {
          name: player.name,
          imageUrl: player.imageUrl
        }
      });
      return response;
    } catch (error) {
      throw new Error('Error creating player');
    }
    
  }

  async findById(id: string): Promise<Player> {
    let error;
    try {
      const response = await db.player.findUnique({
        where: {
          id
        }
      });
      
      if (response) {
        return response;
      }
      error = new Error('Player not found');
    } 
    catch (e) {
      throw new Error('Unknown error');
    }
    throw error || new Error('Unknown error');
  }

  async update(player: Player): Promise<Player> {
    let error;
    try {
      const response = await db.player.update({
        where: {
          id: player.id
        },
        data: {
          name: player.name,
          imageUrl: player.imageUrl
        }
      });

      if (response) {
        return new Player(response);
      }
    } catch (e) {
      throw new Error('Unknown error');
    }
    throw error || new Error('Unknown error');
  }
}