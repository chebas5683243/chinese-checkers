"use client";

import { getPlayer } from "@/api/player";
import { useModal } from "@/hooks/use-modal-store";
import { getCurrentPlayerToken } from "@/lib/utils/current-player";
import { Player } from "@/types/Player";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function AuthenticationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen, type, onOpen } = useModal();
  const [isMounted, setIsMounted] = useState(false);
  const playerToken = getCurrentPlayerToken();
  const pathname = usePathname();

  const { isError, isLoading } = useQuery<Player>({
    queryKey: ["player"],
    queryFn: () => getPlayer(playerToken!),
    enabled: !!playerToken,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isError) {
      localStorage.removeItem("currentPlayer");
    }
  }, [isError]);

  if (!isMounted || isLoading) {
    return <div>Loading...</div>;
  }

  const isAuthenticating = isOpen && type === "authentication";
  const showRevalidation =
    (isError || !playerToken) && pathname !== "/" && !isAuthenticating;

  if (showRevalidation) {
    onOpen("authentication");
  }

  return children;
}
