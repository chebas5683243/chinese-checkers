import {
  checkForWinner,
  getInitialBoard,
  setupBoardPieces,
} from "@/lib/helper/board";
import { getPieceGroups } from "@/lib/helper/piece";
import { Game, GameMode } from "@/types/Game";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface Coordinate {
  x: number;
  y: number;
}

export interface Move {
  from: Coordinate;
  to: Coordinate;
}

export interface Node {
  isEmpty: boolean;
  pieceGroup?: number;
}

export type Board = (Node | undefined)[][];

interface State {
  mode?: GameMode;
  nPlayers: number;
  board: Board;
  moves: Move[];
  groupTurn: number;
  nGroups: number;
  winner?: number;
}

interface Actions {
  onMove: (from: Coordinate, to: Coordinate) => boolean;
  onPopulateBoard: (game: Game, moves: Move[]) => void;
  onReset: () => void;
}

export const useGame = create<State & Actions>()(
  immer((set) => ({
    mode: undefined,
    nPlayers: 0,
    nGroups: 0,
    groupTurn: 1,
    board: getInitialBoard(),
    moves: [],
    winner: undefined,
    onPopulateBoard: (game, moves) => {
      set((state) => {
        setupBoardPieces(state.board, game.nPlayers, game.mode);
        const newBoard = state.board;

        state.mode = game.mode;
        state.nPlayers = game.nPlayers ?? 2;

        moves.forEach(({ from, to }) => {
          const fromCell = newBoard[from.x][from.y]!;
          const toCell = newBoard[to.x][to.y]!;

          toCell.isEmpty = false;
          toCell.pieceGroup = fromCell.pieceGroup;

          fromCell.isEmpty = true;
          fromCell.pieceGroup = undefined;
        });

        const pieceGroups = getPieceGroups(game);

        state.board = newBoard;
        state.moves = moves;
        state.nGroups = pieceGroups.length * pieceGroups[0].length;
        state.groupTurn = (state.moves.length % state.nGroups) + 1;
        state.winner = checkForWinner(newBoard, game.nPlayers, game.mode);
      });
    },
    onMove: (from: Coordinate, to: Coordinate) => {
      let allowedMove = true;

      set((state) => {
        const { board, moves, nGroups } = state;

        const fromCell = board[from.x][from.y];
        const toCell = board[to.x][to.y];

        const invalidOrigin =
          !fromCell || fromCell.isEmpty || !fromCell.pieceGroup;
        const invalidDestination = !toCell || !toCell.isEmpty;

        if (invalidOrigin || invalidDestination) {
          allowedMove = false;
          return;
        }

        toCell.isEmpty = false;
        toCell.pieceGroup = fromCell.pieceGroup;

        fromCell.isEmpty = true;
        fromCell.pieceGroup = undefined;

        moves.push({ from, to });

        console.log("antes");
        state.winner = checkForWinner(board, state.nPlayers, state.mode);
        console.log("despues");

        state.groupTurn = (state.groupTurn % nGroups) + 1;
      });

      return allowedMove;
    },
    onReset: () => {
      set((state) => {
        state.board = getInitialBoard();
        state.moves = [];
        state.mode = undefined;
        state.nPlayers = 0;
      });
    },
  }))
);
