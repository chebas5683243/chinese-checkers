import { useGame, type Board, Coordinate, Node } from "@/hooks/use-game-store";
import { getRows } from "@/lib/helper/board";
import { MoveType, evaluateMove } from "@/lib/helper/move";
import { cva } from "class-variance-authority";
import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils/cn";
import { socket } from "../providers/socket-provider";

interface Props {
  board: Board;
  playerPieceGroups: number[];
  roomId: string;
}

const ROWS = getRows();

const slotVariants = cva(
  "flex flex-col justify-center items-center size-5 border-2 border-gray-200 rounded-full text-[8px] sm:size-8 xl:text-xs",
  {
    variants: {
      pieceGroup: {
        1: "bg-green-700 ring-green-700",
        2: "bg-blue-600 ring-blue-600",
        3: "bg-yellow-500 ring-yellow-500",
        4: "bg-red-500 ring-red-500",
        5: "bg-purple-600 ring-purple-600",
        6: "bg-gray-400 ring-gray-400",
      },
      pieceOwner: {
        current: "cursor-pointer",
      },
      content: {
        empty: "ring-1",
        filled: "ring-2",
      },
      status: {
        selected: "ring-[3px] ring-cyan-500",
      },
    },
    compoundVariants: [
      {
        pieceGroup: 1,
        pieceOwner: "current",
        content: "filled",
        className: "hover:bg-green-900",
      },
      {
        pieceGroup: 2,
        pieceOwner: "current",
        content: "filled",
        className: "hover:bg-blue-800",
      },
      {
        pieceGroup: 3,
        pieceOwner: "current",
        content: "filled",
        className: "hover:bg-yellow-700",
      },
      {
        pieceGroup: 4,
        pieceOwner: "current",
        content: "filled",
        className: "hover:bg-red-700",
      },
      {
        pieceGroup: 5,
        pieceOwner: "current",
        content: "filled",
        className: "hover:bg-purple-800",
      },
      {
        pieceGroup: 6,
        pieceOwner: "current",
        content: "filled",
        className: "hover:bg-gray-500",
      },
    ],
  }
);

export function GameBoard({ board, playerPieceGroups, roomId }: Props) {
  const { groupTurn, onMove } = useGame(
    useShallow((state) => ({
      groupTurn: state.groupTurn,
      onMove: state.onMove,
    }))
  );

  const [selectedSlots, setSelectedSlots] = useState<Coordinate[]>([]);
  const [lastMoveType, setLastMoveType] = useState<MoveType>();

  const isCurrentPlayerTurn = playerPieceGroups.includes(groupTurn);

  function onSlotClick(node: Node | undefined, slot: Coordinate) {
    if (!node) return;
    if (!isCurrentPlayerTurn) return;
    if (lastMoveType === "step") return;
    if (selectedSlots.length === 0 && node.pieceGroup !== groupTurn) return;

    if (selectedSlots.length === 0) {
      setSelectedSlots([slot]);
      return;
    }

    const { isValid, moveType } = evaluateMove(
      board,
      selectedSlots[selectedSlots.length - 1],
      slot,
      lastMoveType
    );

    if (isValid) {
      setSelectedSlots((prev) => [...prev, slot]);
      setLastMoveType(moveType);
    }
  }

  async function onSubmitMove() {
    if (selectedSlots.length < 2) return;

    const firstCoord = selectedSlots[0];
    const lastCoord = selectedSlots[selectedSlots.length - 1];

    socket.emit("game:marble:move", roomId, firstCoord, lastCoord);
    onMove(firstCoord, lastCoord);
  }

  function onResetMove() {
    setSelectedSlots([]);
    setLastMoveType(undefined);
  }

  return (
    <div className="flex flex-col gap-[2px] items-center justify-center mt-16">
      {ROWS.map((row, i) => (
        <div key={i} className="flex gap-[8px]">
          {row.map((cell, j) => {
            const node = board[cell.x][cell.y];

            if (!node) return null;

            const { pieceGroup, isEmpty } = node;

            const isPlayerPiece = playerPieceGroups.includes(pieceGroup!);

            const isSelected = selectedSlots.some(
              (slot) => slot.x === cell.x && slot.y === cell.y
            );

            return (
              <div
                key={j}
                className={cn(
                  slotVariants({
                    pieceGroup: pieceGroup as any,
                    pieceOwner: isPlayerPiece ? "current" : null,
                    content: isEmpty ? "empty" : "filled",
                    status: isSelected ? "selected" : null,
                  })
                )}
                onClick={() => onSlotClick(node, cell)}
              >
                {cell.x},{cell.y}
              </div>
            );
          })}
        </div>
      ))}
      <div className="flex gap-4 h-16 items-center">
        {isCurrentPlayerTurn && (
          <>
            <Button
              onClick={onSubmitMove}
              className="text-white px-4 py-2 rounded-md text-xs sm:text-sm"
            >
              Submit Move
            </Button>
            <Button
              onClick={onResetMove}
              className="text-white px-4 py-2 rounded-md text-xs sm:text-sm"
            >
              Reset Move
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
