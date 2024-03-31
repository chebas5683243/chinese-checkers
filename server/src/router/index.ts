import express from "express";
import { gamesController, playersController } from "../controllers";

const routerHandler = express.Router();

/* -------------------------------------------------------------------------- */
/*                               Players Router                               */
/* -------------------------------------------------------------------------- */
//#region [PlayersRouter]

routerHandler.post("/players", (req, res, next) => {
  playersController.create({ req, res, next });
});

routerHandler.get("/players/:playerId", (req, res, next) => {
  playersController.findById({ req, res, next });
});

routerHandler.patch("/players/:playerId", (req, res, next) => {
  playersController.update({ req, res, next });
});
//#endregion [PlayersRouter]

/* -------------------------------------------------------------------------- */
/*                                Games Router                                */
/* -------------------------------------------------------------------------- */
//#region [GamesRouter]

routerHandler.post("/games", (req, res, next) => {
  gamesController.create({ req, res, next });
});

routerHandler.get("/games/:gameId", (req, res, next) => {
  gamesController.findById({ req, res, next });
});

//#endregion [GamesRouter]

export default routerHandler;
