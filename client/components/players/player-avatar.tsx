import { Player } from "@/types/Player";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";

interface PlayerAvatarConnectedProps {
  player?: Player;
  status: "connected" | "ready";
}

interface PlayerAvatarConnectingProps {
  status: "connecting";
}

type PlayerAvatarProps =
  | PlayerAvatarConnectedProps
  | PlayerAvatarConnectingProps;

export function PlayerAvatar(props: PlayerAvatarProps) {
  if (props.status === "connecting" || !props.player) {
    return (
      <div className="flex sm:flex-col justify-center items-center gap-2 sm:gap-4">
        <Skeleton className="size-10 rounded-full sm:size-20" />
        <Skeleton className="h-4 w-24 sm:w-32 sm:h-8" />
      </div>
    );
  }

  const { player, status } = props;

  return (
    <div className="flex sm:flex-col justify-center items-center gap-2 sm:gap-4">
      <div className="relative size-10 sm:size-20">
        <Image
          src={player.imageUrl}
          alt="avatar"
          className="rounded-full bg-primary/20"
          layout="fill"
        />
      </div>
      <span className="text-sm sm:text-lg text-primary">
        {player.name} {status === "ready" ? "✅" : "🕒"}
      </span>
    </div>
  );
}
