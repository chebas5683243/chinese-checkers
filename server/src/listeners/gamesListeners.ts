import { Server, Socket } from "socket.io";

export default function gamesListeners(io: Server, socket: Socket) {
  function joinRoom(roomId: string) {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  }

  function leaveRoom(roomId: string) {
    socket.leave(roomId);
    console.log(`Socket ${socket.id} left room ${roomId}`);
  }

  socket.on("join:room", joinRoom);
  socket.on("leave:room", leaveRoom);
}
