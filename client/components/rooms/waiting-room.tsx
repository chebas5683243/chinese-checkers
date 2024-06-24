"use client";

import { updateGame } from "@/api/game";
import { socket } from "@/components/providers/socket-provider";
import { Button } from "@/components/ui/button";
import { useObserveQuery } from "@/hooks/use-observable-query";
import { Game, GameStatus } from "@/types/Game";
import { Player } from "@/types/Player";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { PlayerAvatar } from "../players/player-avatar";

interface WaitingRoomProps {
  room: Game;
}

export function WaitingRoom({ room }: WaitingRoomProps) {
  const queryClient = useQueryClient();
  const { data: player } = useObserveQuery<Player>(["player"]);

  const isOwner = room.ownerId === player?.id;
  const isGuest = room.guestId === player?.id;
  const isViewer = !isOwner && !isGuest;
  const canJoin = isViewer && !room.guest;
  const canStart = isOwner && !!room.guest;

  const startGameMutation = useMutation({
    mutationFn: () => updateGame(room.id, { status: GameStatus.PLAYING }),
    onSuccess: (game) => {
      queryClient.setQueryData(["room", room.id], game);
      socket.emit("game:game:start", room.id);
    },
  });

  function onLeaveRoom() {
    socket.emit("game:guest:leave", room.id);
  }

  function onJoinGame() {
    socket.emit("game:guest:join", room.id, player);
  }

  useEffect(() => {
    socket.on("game:guest:joined", async (player: Player) => {
      await queryClient.cancelQueries({ queryKey: ["room", room.id] });
      queryClient.setQueryData(["room", room.id], (old: Game) => ({
        ...old,
        guestId: player.id,
        guest: player,
      }));
    });

    socket.on("game:guest:left", async () => {
      await queryClient.cancelQueries({ queryKey: ["room", room.id] });
      queryClient.setQueryData(["room", room.id], (old: Game) => ({
        ...old,
        guestId: undefined,
        guest: undefined,
      }));
    });

    socket.on("game:game:started", async () => {
      await queryClient.cancelQueries({ queryKey: ["room", room.id] });
      queryClient.setQueryData(["room", room.id], (old: Game) => ({
        ...old,
        status: GameStatus.PLAYING,
      }));
    });
  }, [queryClient, room.id]);

  return (
    <div className="flex flex-col gap-10 items-center justify-center min-h-screen text-primary p-4">
      <div className="flex flex-col gap-10 max-w-[500px]">
        <h1 className="font-bold text-lg sm:text-3xl text-center">
          Waiting for player(s) to join...
        </h1>
        <div className="flex flex-col gap-10 sm:gap-0 sm:flex-row sm:items-center sm:justify-between">
          <PlayerAvatar player={room.owner} status="ready" />
          <div className="hidden h-1 bg-primary w-4 sm:block" />
          <PlayerAvatar player={room.guest} status="ready" />
        </div>
      </div>
      <div className="flex flex-col gap-2 justify-center items-center">
        <span className="text-sm">No users yet</span>
        {isOwner && (
          <Button
            disabled={!canStart || startGameMutation.isPending}
            onClick={() => startGameMutation.mutate()}
          >
            Start game
          </Button>
        )}
        {isGuest && <Button onClick={onLeaveRoom}>Leave game</Button>}
        {canJoin && <Button onClick={onJoinGame}>Join game</Button>}
      </div>
    </div>
  );
}
