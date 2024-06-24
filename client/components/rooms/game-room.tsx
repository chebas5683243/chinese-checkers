"use client";

import { socket } from "@/components/providers/socket-provider";
import { GameBoard } from "@/components/board/game-board";
import { useObserveQuery } from "@/hooks/use-observable-query";
import { Coordinate, Move, useGame } from "@/hooks/use-game-store";
import { getPlayerPieceGroups } from "@/lib/helper/piece";
import { Game } from "@/types/Game";
import { Player } from "@/types/Player";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { PlayerAvatar } from "../players/player-avatar";
import { useShallow } from "zustand/react/shallow";
import { getMoves } from "@/api/game";

interface GameProps {
  room: Game;
}

export function GameRoom({ room }: GameProps) {
  const { data: player } = useObserveQuery<Player>(["player"]);

  const { data: dbMoves } = useQuery({
    queryKey: ["room", room.id, "moves"],
    queryFn: () => getMoves(room.id),
    retry: false,
  });

  const pieceGroups = getPlayerPieceGroups(room, player?.id);

  const { board, onPopulateBoard, moves, onMove, winner } = useGame(
    useShallow((state) => ({
      board: state.board,
      onPopulateBoard: state.onPopulateBoard,
      moves: state.moves,
      onMove: state.onMove,
      winner: state.winner,
    }))
  );

  useEffect(() => {
    socket.on(
      "game:marble:moved",
      (firstCoord: Coordinate, lastCoord: Coordinate) => {
        onMove(firstCoord, lastCoord);
      }
    );
  }, [onMove]);

  useEffect(() => {
    if (!dbMoves) return;
    onPopulateBoard(room, dbMoves);
  }, [onPopulateBoard, room, dbMoves]);

  console.log({ winner });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-primary p-4">
      <div className="flex flex-col">
        <PlayerAvatar player={room.owner} status="ready" />
        <GameBoard
          key={moves.length}
          board={board}
          playerPieceGroups={pieceGroups}
          roomId={room.id}
        />
        <PlayerAvatar player={room.guest} status="ready" />
        {!!winner && <p>There&apos;s a winner</p>}
      </div>
    </div>
  );
}
