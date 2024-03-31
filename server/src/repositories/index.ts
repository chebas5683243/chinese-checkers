import { GamesRepositoryImpl } from "./GamesRepositoryImpl";
import { PlayersRepositoryImpl } from "./PlayersRepositoryImpl";

export const playersRepo = new PlayersRepositoryImpl();
export const gamesRepo = new GamesRepositoryImpl();
