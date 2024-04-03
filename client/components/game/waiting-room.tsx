"use client";

import { updateGame } from "@/api/game";
import { socket } from "@/components/providers/socket-provider";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useObserveQuery } from "@/hooks/use-observable-query";
import { Game, GameStatus } from "@/types/Game";
import { Player } from "@/types/Player";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect } from "react";

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

  const startGameMutation = useMutation({
    mutationFn: () => updateGame(room.id, { status: GameStatus.PLAYING }),
    onSuccess: (game) => {
      queryClient.setQueryData(["room", room.id], game);
    },
    onError: () => {
      queryClient.setQueryData(["room", room.id], (old: Game) => ({
        ...old,
        status: "waiting",
      }));
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
  }, [queryClient, room.id]);

  return (
    <div className="flex flex-col gap-10 items-center justify-center min-h-screen text-primary p-4">
      <div className="flex flex-col gap-10 max-w-[500px]">
        <h1 className="font-bold text-3xl text-center">
          Waiting for player(s) to join...
        </h1>
        <div className="flex items-center justify-between">
          <PlayerView player={room.owner} status="ready" />
          <div className="h-1 bg-primary w-4" />
          <PlayerView player={room.guest} status="ready" />
        </div>
      </div>
      <div className="flex flex-col gap-2 justify-center items-center">
        <span className="text-sm">No users yet</span>
        {isOwner && (
          <Button onClick={async () => await startGameMutation.mutateAsync()}>
            Start game
          </Button>
        )}
        {isGuest && <Button onClick={onLeaveRoom}>Leave game</Button>}
        {canJoin && <Button onClick={onJoinGame}>Join game</Button>}
      </div>
    </div>
  );
}

interface PlayerViewConnectedProps {
  player?: Player;
  status: "connected" | "ready";
}

interface PlayerViewConnectingProps {
  status: "connecting";
}

type PlayerViewProps = PlayerViewConnectedProps | PlayerViewConnectingProps;

function PlayerView(props: PlayerViewProps) {
  if (props.status === "connecting" || !props.player) {
    return (
      <div className="flex flex-col justify-center items-center gap-4">
        <Skeleton className="w-20 h-20 rounded-full" />
        <Skeleton className="w-32 h-8" />
      </div>
    );
  }

  const { player, status } = props;

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <Image
        src={player.imageUrl}
        alt="avatar"
        className="rounded-full bg-primary/20"
        width={80}
        height={80}
      />
      <span className="text-lg text-primary">
        {player.name} {status === "ready" ? "✅" : "🕒"}
      </span>
    </div>
  );
}
