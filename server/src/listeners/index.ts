import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import gamesListeners from "./gamesListeners";

export default function setupListeners(httpServer: HttpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: ["http://localhost:3000"],
    },
  });

  io.on("connection", (socket) => {
    console.log(socket.id);

    gamesListeners(io, socket);
  });
}
