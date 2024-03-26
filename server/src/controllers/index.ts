import { playerService } from "../services";
import { PlayersController } from "./PlayersController";

export const playersController = new PlayersController({
  service: playerService
});