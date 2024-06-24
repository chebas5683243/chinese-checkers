import { Server, Socket } from "socket.io";
import { Player } from "../domain/Player";
import { Game } from "../domain/Game";
import { gamesService } from "../services";
import { Coordinate, Move } from "../domain/Move";

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

  function startGame(roomId: string) {
    io.to(roomId).emit("game:game:started");
  }

  function saveMove(roomId: string, from: Coordinate, to: Coordinate) {
    socket.to(roomId).emit("game:marble:moved", from, to);
    const move = Move.instanceFor("create", {
      from: Move.formatCoord(from),
      to: Move.formatCoord(to),
      gameId: roomId,
    });
    gamesService.saveMove(move);
  }

  // Room
  socket.on("game:room:join", joinRoom);
  socket.on("game:room:leave", leaveRoom);

  // Guest
  socket.on("game:guest:join", joinRoomAsGuest);
  socket.on("game:guest:leave", leaveRoomAsGuest);

  // Game
  socket.on("game:game:start", startGame);

  // Move
  socket.on("game:marble:move", saveMove);
}
