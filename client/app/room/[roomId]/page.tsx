"use client";

import { getGame } from "@/api/game";
import { socket } from "@/components/providers/socket-provider";
import { GameStatus } from "@/types/Game";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { WaitingRoom } from "./waiting-room";

export default function Room() {
  const { roomId } = useParams();

  const {
    data: room,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["room", roomId],
    queryFn: () => getGame(roomId as string),
  });

  useEffect(() => {
    socket.emit("join:room", roomId);

    return () => {
      socket.emit("leave:room", roomId);
    };
  }, [roomId]);

  if (isLoading) {
    return <div>Loading room...</div>;
  }

  if (!room || isError) {
    return <div>The room does not exist</div>;
  }

  if (room.status === GameStatus.WAITING) {
    return <WaitingRoom room={room} />;
  }

  return (
    <div className="flex flex-col gap-10 items-center justify-center min-h-screen text-primary p-4">
      Game
    </div>
  );
}
