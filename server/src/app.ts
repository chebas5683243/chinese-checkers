import dotenv from "dotenv";
import express from "express";
import routerHandler from "./router";
import loggers from "./middlewares/loggers";
import { createServer } from "http";
import cors from "cors";
import setupListeners from "./listeners";

dotenv.config();

const app = express();
const httpServer = createServer(app);

setupListeners(httpServer);

app.use(cors());
app.use(express.json());

// app.use(loggers.requestLogger);
app.use(routerHandler);

app.use(loggers.errorLogger);

function start() {
  const port = process.env.PORT || 3000;
  httpServer.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

start();
