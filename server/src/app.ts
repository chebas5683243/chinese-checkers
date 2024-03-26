import dotenv from "dotenv";
import express from "express";
import routerHandler from "./router";
import loggers from "./middlewares/loggers";
import { Server } from "socket.io";
import {createServer} from "http";

dotenv.config();

const app = express();
const httpServer = createServer(app);
export const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000"]
  }
});

io.on("connection", (socket) => {
  console.log(socket.id);
});

// app.use(loggers.requestLogger);

app.use(routerHandler);

// app.use(loggers.errorLogger);

function start() {
  const port = process.env.PORT || 3000;
  httpServer.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

start();