import { gamesService, playersService } from "../services";
import { GamesController } from "./GamesController";
import { PlayersController } from "./PlayersController";
import express from "express";

export interface RequestHandlerArgs {
  req: express.Request;
  res: express.Response;
  next: express.NextFunction;
}

export const playersController = new PlayersController({
  service: playersService,
});

export const gamesController = new GamesController({
  service: gamesService,
});
