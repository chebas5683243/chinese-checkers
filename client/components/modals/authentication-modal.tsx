import { createPlayer } from "@/api/player";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useModal } from "@/hooks/use-modal-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils/cn";

const formSchema = z.object({
  name: z.string().min(1, "Fill in your name"),
});

type FormData = z.infer<typeof formSchema>;

export function AuthenticationModal() {
  const queryClient = useQueryClient();
  const { type, isOpen, onClose } = useModal();

  const isModalOpen = type === "authentication" && isOpen;

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: createPlayer,
    onSuccess: (player) => {
      queryClient.setQueryData(["player"], player);
      localStorage.setItem("currentPlayer", player.id);
    },
  });

  async function onSubmit({ name }: FormData) {
    await createMutation.mutateAsync({
      name,
    });
  }

  if (!isModalOpen) {
    return null;
  }

  return (
    <AlertDialog open={isModalOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hi there!</AlertDialogTitle>
          <AlertDialogDescription>
            Before continuing, please tell us your nickname.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form className="flex flex-1 flex-col gap-4">
          <div
            className="flex flex-col gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
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
          <Button type="submit" disabled={isSubmitting}>
            Continue
          </Button>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
