import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export default function Room() {
  return (
    <div className="flex flex-col gap-10 items-center justify-center min-h-screen text-primary p-4">
      <div className="flex flex-col gap-10 max-w-[500px]">
        <h1 className="font-bold text-3xl text-center">
          Waiting for player(s) to join...
        </h1>
        <div className="flex items-center justify-between">
          <PlayerView status="ready" nickname="Sebastian" />
          <div className="h-1 bg-primary w-4" />
          <PlayerView status="connecting" />
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
  nickname: string;
  status: "connected" | "ready";
}

interface PlayerViewConnectingProps {
  status: "connecting";
}

type PlayerViewProps = PlayerViewConnectedProps | PlayerViewConnectingProps;

function PlayerView(props: PlayerViewProps) {
  if (props.status === "connecting") {
    return (
      <div className="flex flex-col justify-center items-center gap-4">
        <Skeleton className="w-20 h-20 rounded-full" />
        <Skeleton className="w-32 h-8" />
      </div>
    );
  }

  const { nickname, status } = props;

  const imgNumber =
    nickname[0].charCodeAt(0) +
    nickname[nickname.length - 1].charCodeAt(0) +
    nickname.length;

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <Image
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${imgNumber}.png`}
        alt="avatar"
        className="rounded-full bg-primary/20"
        width={80}
        height={80}
      />
      <span className="text-lg text-primary">
        {nickname} {status === "ready" ? "✅" : "🕒"}
      </span>
    </div>
  );
}
