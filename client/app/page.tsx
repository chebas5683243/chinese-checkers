"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useGameStore } from "@/store/game";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SyntheticEvent } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useShallow } from "zustand/react/shallow";

const formSchema = z.object({
  nickname: z.string().min(1, "Fill in your nickname"),
});

export default function Home() {
  const router = useRouter();

  const { nickname, updateNickname } = useGameStore(
    useShallow((state) => ({
      nickname: state.nickname,
      updateNickname: state.updateNickname,
    }))
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: nickname,
    },
  });

  const {
    register,
    formState: { errors },
  } = form;

  function saveNickname() {
    const nickname = form.watch("nickname");
    localStorage.setItem("nickname", nickname);
    updateNickname(nickname);
  }

  async function handleNewGame(e: SyntheticEvent) {
    e.preventDefault();
    const isValid = await form.trigger();
    saveNickname();
    if (isValid) {
      router.push("/room/abcd-efgh-ijkl-mnop");
    }
  }

  async function handleJoinGame(e: SyntheticEvent) {
    e.preventDefault();
    saveNickname();
    const isValid = await form.trigger();
    if (isValid) {
      router.push("/join");
    }
  }

  return (
    <div className="flex flex-col gap-10 items-center justify-center min-h-screen text-primary p-4">
      <h1 className="font-bold text-3xl">Chinese Checkers</h1>
      <div className="flex p-6 rounded-xl border-2 border-primary max-w-[480px] w-full">
        <form className="flex flex-1 flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="nickname">Nickname</Label>
            <Input
              id="nickname"
              className={cn({
                "border-red-500 focus-visible:ring-red-500": !!errors.nickname,
              })}
              type="text"
              placeholder="Nickname"
              {...register("nickname")}
            />
            {!!errors.nickname && (
              <p className="text-red-500 text-sm">{errors.nickname.message}</p>
            )}
          </div>
          <div className="flex gap-4">
            <Button className="grow" type="submit" onClick={handleNewGame}>
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
