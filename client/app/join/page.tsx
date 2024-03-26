"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

import {
  CalendarIcon,
  EnvelopeClosedIcon,
  FaceIcon,
  GearIcon,
  PersonIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import {
  GitCompareArrowsIcon,
  PersonStandingIcon,
  ScanFaceIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Command } from "cmdk";

const formSchema = z.object({
  roomCode: z.string().min(1, "Enter the code"),
});

export default function Join() {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roomCode: "",
    },
  });

  const {
    register,
    formState: { errors },
  } = form;

  function joinGame() {
    setOpen(true);
  }

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div className="flex flex-col gap-10 items-center justify-center min-h-screen text-primary p-4">
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(joinGame)}
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="roomCode">Room code</Label>
          <Input
            id="roomCode"
            className={cn({
              "border-red-500 focus-visible:ring-red-500": !!errors.roomCode,
            })}
            type="text"
            {...register("roomCode")}
          />
          {!!errors.roomCode && (
            <p className="text-red-500 text-sm">{errors.roomCode.message}</p>
          )}
        </div>
        <div className="flex gap-4">
          <Button className="grow" type="submit">
            Join Game
          </Button>
        </div>
      </form>
      <Command.Dialog open={open} onOpenChange={setOpen}>
        <Command.Input />

        <Command.List>
          <Command.Empty>No results found.</Command.Empty>

          <Command.Group heading="Fruits">
            <Command.Item>Apple</Command.Item>
            <Command.Item>Orange</Command.Item>
            <Command.Separator />
            <Command.Item>Pear</Command.Item>
            <Command.Item>Blueberry</Command.Item>
          </Command.Group>

          <Command.Item>Fish</Command.Item>
        </Command.List>
      </Command.Dialog>
    </div>
  );
}
