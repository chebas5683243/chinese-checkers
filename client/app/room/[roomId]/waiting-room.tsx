"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Game } from "@/types/Game";
import { Player } from "@/types/Player";
import Image from "next/image";

interface WaitingRoomProps {
  room: Game;
}

export function WaitingRoom({ room }: WaitingRoomProps) {
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
        <Button disabled className="">
          Start game
        </Button>
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
