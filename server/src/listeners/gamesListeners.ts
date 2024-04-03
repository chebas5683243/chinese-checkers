import { Server, Socket } from "socket.io";
import { Player } from "../domain/Player";
import { Game } from "../domain/Game";
import { gamesService } from "../services";

export default function gamesListeners(io: Server, socket: Socket) {
  function joinRoom(roomId: string) {
    socket.join(roomId);
  }

  function leaveRoom(roomId: string) {
    socket.leave(roomId);
  }

  function joinRoomAsGuest(roomId: string, player: Player) {
    io.to(roomId).emit("game:guest:joined", player);

    const game = Game.instanceFor("update", {
      id: roomId,
      guestId: player.id,
    });
    gamesService.update(game);
  }

  function leaveRoomAsGuest(roomId: string) {
    io.to(roomId).emit("game:guest:left");

    const game = Game.instanceFor("update", {
      id: roomId,
      guestId: null,
    });
    gamesService.update(game);
  }

  // Room
  socket.on("game:room:join", joinRoom);
  socket.on("game:room:leave", leaveRoom);

  // Guest
  socket.on("game:guest:join", joinRoomAsGuest);
  socket.on("game:guest:leave", leaveRoomAsGuest);
}
