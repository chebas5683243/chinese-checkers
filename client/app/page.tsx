"use client";

import { createGame } from "@/api/game";
import { CreateOrUpdatePlayerArgs, createOrUpdatePlayer } from "@/api/player";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils/cn";
import { Game } from "@/types/Game";
import { Player } from "@/types/Player";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Fill in your name"),
});

export default function Home() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: player } = useQuery<Player>({
    queryKey: ["player"],
    enabled: false,
  });

  const updateOrCreatePlayerMutation = useMutation({
    mutationFn: (args: CreateOrUpdatePlayerArgs) => createOrUpdatePlayer(args),
    onSuccess: (player) => {
      queryClient.setQueryData(["player"], player);
      localStorage.setItem("currentPlayer", player.id);
    },
  });

  const createGameMutation = useMutation({
    mutationFn: () =>
      createGame({
        ownerId: player?.id,
      }),
    onSuccess: (game: Game) => {
      queryClient.setQueryData(["game", game], player);
    },
  });

  const {
    register,
    formState: { errors, isDirty },
    watch,
    resetField,
    trigger,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (player) {
      resetField("name", { defaultValue: player.name });
    }
  }, [player, resetField]);

  async function savePlayerName() {
    const name = watch("name");

    if (!isDirty) return;

    const update = player ? "update" : "create";

    await updateOrCreatePlayerMutation.mutateAsync({
      id: player?.id,
      name,
      mode: update,
    });
  }

  async function handleNewGame(e: SyntheticEvent) {
    e.preventDefault();

    const isValid = await trigger();
    if (!isValid) return;

    await savePlayerName();

    const newGame = await createGameMutation.mutateAsync();
    router.push(`/room/${newGame.id}`);
  }

  async function handleJoinGame(e: SyntheticEvent) {
    e.preventDefault();
    await savePlayerName();

    // const isValid = await trigger();
    // if (isValid) {
    //   router.push("/join");
    // }
  }

  return (
    <div className="flex flex-col gap-10 items-center justify-center min-h-screen text-primary p-4">
      <h1 className="font-bold text-3xl">Chinese Checkers</h1>
      <div className="flex p-6 rounded-xl border-2 border-primary max-w-[480px] w-full">
        <form className="flex flex-1 flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              className={cn({
                "border-red-500 focus-visible:ring-red-500": !!errors.name,
              })}
              type="text"
              placeholder="Name"
              autoComplete="off"
              {...register("name")}
            />
            {!!errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="flex gap-4">
            <Button className="grow" type="button" onClick={handleNewGame}>
              New Game
            </Button>
            <Button className="grow" type="button" onClick={handleJoinGame}>
              Join Game
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
