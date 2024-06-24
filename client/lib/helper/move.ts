import { Coordinate } from "@/hooks/use-game-store";
import { Board } from "../../hooks/use-game-store";

export type MoveType = "step" | "jump";

const simpleDirections = [
  { x: 0, y: 1 },
  { x: 1, y: 0 },
  { x: 0, y: -1 },
  { x: -1, y: 0 },
  { x: 1, y: 1 },
  { x: -1, y: -1 },
];

const jumpDirections = [
  { x: 0, y: 2 },
  { x: 2, y: 0 },
  { x: 0, y: -2 },
  { x: -2, y: 0 },
  { x: 2, y: 2 },
  { x: -2, y: -2 },
];

export function evaluateMove(
  board: Board,
  prevCood: Coordinate,
  nextCood: Coordinate,
  lastMoveType?: MoveType
): {
  isValid: boolean;
  moveType?: MoveType;
} {
  return {
    isValid: true,
    moveType: "jump",
  };
  // const destination = board[nextCood.x][nextCood.y];

  // if (!destination || !destination.isEmpty) {
  //   return {
  //     isValid: false,
  //   };
  // }

  // const dx = nextCood.x - prevCood.x;
  // const dy = nextCood.y - prevCood.y;

  // const simpleMove = simpleDirections.find(
  //   (dir) => dir.x === dx && dir.y === dy
  // );
  // const isSimpleMove = simpleMove !== undefined;

  // if (isSimpleMove) {
  //   return {
  //     isValid: lastMoveType === "jump" ? false : true,
  //     moveType: "step",
  //   };
  // }

  // const jumpMove = jumpDirections.find((dir) => dir.x === dx && dir.y === dy);
  // const isJumpMove = jumpMove !== undefined;

  // if (isJumpMove) {
  //   const midX = prevCood.x + jumpMove.x / 2;
  //   const midY = prevCood.y + jumpMove.y / 2;

  //   const midNode = board[midX][midY];

  //   if (!midNode || midNode.isEmpty) {
  //     return {
  //       isValid: false,
  //     };
  //   }

  //   return {
  //     isValid: true,
  //     moveType: "jump",
  //   };
  // }

  // return {
  //   isValid: false,
  // };
}
