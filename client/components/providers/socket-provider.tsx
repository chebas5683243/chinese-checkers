"use client";

import { useEffect } from "react";
import { io } from "socket.io-client";

const socketUrl = process.env.NEXT_PUBLIC_API_URL ?? "";
export const socket = io(socketUrl);

export function SocketProvider() {
  useEffect(() => {
    function onConnect() {
      console.log("connected");
    }

    function onDisconnect() {
      console.log("disconnected");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.disconnect();
    };
  }, []);

  return null;
}
