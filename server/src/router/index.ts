import express from 'express';
import { playersController } from '../controllers';

const routerHandler = express.Router();

/* -------------------------------------------------------------------------- */
/*                               Players Router                               */
/* -------------------------------------------------------------------------- */
//#region [PlayersRouter]

routerHandler.post("/players", (req, res) => {
  playersController.create(req, res);
});

routerHandler.get("/players/:playerId", (req, res) => {
  playersController.findById(req, res);
})

routerHandler.patch("/players/:playerId", (req, res) => {
  playersController.update(req, res);
})
//#endregion [PlayersRouter]

export default routerHandler;