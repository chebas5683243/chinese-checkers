import { gamesRepo, playersRepo } from "../repositories";
import { GamesServicesImpl } from "./GameServiceImpl";
import { PlayerServiceImpl } from "./PlayerServiceImpl";

export const playersService = new PlayerServiceImpl({
  playersRepo,
  config: {},
});

export const gamesService = new GamesServicesImpl({
  gamesRepo,
  config: {},
});
