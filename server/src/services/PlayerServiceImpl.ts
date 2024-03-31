import { Player } from "../domain/Player";
import { PlayersRepository } from "../repositories/PlayersRepository";
import { PlayersService } from "./PlayersService";

export interface PlayerServiceProps {
  playersRepo: PlayersRepository;
  config: {};
}

export class PlayerServiceImpl implements PlayersService {
  constructor(private props: PlayerServiceProps) {}

  async create(player: Player): Promise<Player> {
    try {
      const playerName = player.name;
      const imgNumber =
        playerName[0].charCodeAt(0) +
        playerName[playerName.length - 1].charCodeAt(0) +
        playerName.length;
      player.imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${imgNumber}.png`;

      const response = await this.props.playersRepo.create(player);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async findById(player: Player): Promise<Player> {
    try {
      const response = await this.props.playersRepo.findById(player.id);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async update(player: Player): Promise<Player> {
    try {
      const response = await this.props.playersRepo.update(player);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
