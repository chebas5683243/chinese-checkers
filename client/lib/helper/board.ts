import { ITEMS_PER_ROW, MAX_X } from "@/constants/board";
import {
  PLAYER_FIVE_COORDINATES,
  PLAYER_FOUR_COORDINATES,
  PLAYER_ONE_COORDINATES,
  PLAYER_SIX_COORDINATES,
  PLAYER_THREE_COORDINATES,
  PLAYER_TWO_COORDINATES,
} from "@/constants/players";
import type { Board, Node } from "@/hooks/use-game-store";
import { GameMode } from "@/types/Game";

export function getRows() {
  const rows = [];
  for (let i = 0; i < ITEMS_PER_ROW.length; i++) {
    const row = [];
    const nItems = ITEMS_PER_ROW[i];

    let dx = 0;

    if (nItems > 9 && i < 8) {
      dx = 9 - nItems;
    }

    if (i > 12) {
      dx = i - 8;
    }
    for (let j = 0; j < nItems; j++) {
      row.push({
        x: j + dx + 4,
        y: i,
      });
    }
    rows.push(row);
  }

  return rows;
}

export function getInitialBoard() {
  const rowsTemplate = getRows();
  const board: Node[][] = [];

  for (let i = 0; i < MAX_X; i++) {
    board.push([]);
  }

  for (let i = 0; i < rowsTemplate.length; i++) {
    const currentLine = rowsTemplate[i];

    for (let j = 0; j < currentLine.length; j++) {
      const { x, y } = currentLine[j];
      board[x][y] = {
        isEmpty: true,
      };
    }
  }

  return board;
}

function setPlayerPieces(
  board: Board,
  coordinates: [number, number][],
  pieceGroup: number
) {
  coordinates.forEach(([x, y]) => {
    board[x][y] = {
      isEmpty: false,
      pieceGroup,
    };
  });
}

export function setupBoardPieces(
  board: Board,
  nPlayers = 2,
  mode = GameMode.STANDARD
) {
  if (mode === GameMode.STANDARD) {
    if (nPlayers === 2) {
      setPlayerPieces(board, PLAYER_FOUR_COORDINATES, 1);
      setPlayerPieces(board, PLAYER_ONE_COORDINATES, 2);
    }

    if (nPlayers === 3) {
      setPlayerPieces(board, PLAYER_FIVE_COORDINATES, 1);
      setPlayerPieces(board, PLAYER_THREE_COORDINATES, 2);
      setPlayerPieces(board, PLAYER_ONE_COORDINATES, 3);
    }

    if (nPlayers === 6) {
      setPlayerPieces(board, PLAYER_FOUR_COORDINATES, 1);
      setPlayerPieces(board, PLAYER_FIVE_COORDINATES, 2);
      setPlayerPieces(board, PLAYER_SIX_COORDINATES, 3);
      setPlayerPieces(board, PLAYER_ONE_COORDINATES, 4);
      setPlayerPieces(board, PLAYER_TWO_COORDINATES, 5);
      setPlayerPieces(board, PLAYER_THREE_COORDINATES, 6);
    }
  }

  if (mode === GameMode.CLASH) {
    if (nPlayers === 2) {
      setPlayerPieces(board, PLAYER_FOUR_COORDINATES, 1);
      setPlayerPieces(board, PLAYER_FIVE_COORDINATES, 3);

      setPlayerPieces(board, PLAYER_ONE_COORDINATES, 2);
      setPlayerPieces(board, PLAYER_TWO_COORDINATES, 4);
    }

    if (nPlayers === 3) {
      setPlayerPieces(board, PLAYER_THREE_COORDINATES, 1);
      setPlayerPieces(board, PLAYER_FOUR_COORDINATES, 4);

      setPlayerPieces(board, PLAYER_FIVE_COORDINATES, 2);
      setPlayerPieces(board, PLAYER_SIX_COORDINATES, 5);

      setPlayerPieces(board, PLAYER_ONE_COORDINATES, 3);
      setPlayerPieces(board, PLAYER_TWO_COORDINATES, 6);
    }
  }

  if (mode === GameMode.HORDE) {
    setPlayerPieces(board, PLAYER_FOUR_COORDINATES, 1);
    setPlayerPieces(board, PLAYER_FIVE_COORDINATES, 2);
    setPlayerPieces(board, PLAYER_SIX_COORDINATES, 3);
    setPlayerPieces(board, PLAYER_ONE_COORDINATES, 4);
    setPlayerPieces(board, PLAYER_TWO_COORDINATES, 5);
    setPlayerPieces(board, PLAYER_THREE_COORDINATES, 6);
  }
}

function checkIfGroupCompleted(
  board: Board,
  destinationCoords: [number, number][],
  group: number
) {
  console.log("entra");
  for (let i = 0; i < destinationCoords.length; i++) {
    const [coordX, coordY] = destinationCoords[i];

    const slot = board[coordX][coordY];

    if (group === 1) {
      console.log({ slot });
    }

    if (!slot) return false;

    if (slot.pieceGroup !== group) return false;
  }

  console.log("win");

  return true;
}

export function checkForWinner(
  board: Board,
  nPlayers = 2,
  mode = GameMode.STANDARD
) {
  console.log("entra 1");
  if (mode === GameMode.STANDARD) {
    console.log("entra 2");
    console.log({ nPlayers });
    if (nPlayers === 2) {
      console.log("entra 3");
      if (checkIfGroupCompleted(board, PLAYER_ONE_COORDINATES, 1)) return 1;
      if (checkIfGroupCompleted(board, PLAYER_FOUR_COORDINATES, 2)) return 2;
    }

    if (nPlayers === 3) {
      setPlayerPieces(board, PLAYER_FIVE_COORDINATES, 1);
      setPlayerPieces(board, PLAYER_THREE_COORDINATES, 2);
      setPlayerPieces(board, PLAYER_ONE_COORDINATES, 3);
    }

    if (nPlayers === 6) {
      setPlayerPieces(board, PLAYER_FOUR_COORDINATES, 1);
      setPlayerPieces(board, PLAYER_FIVE_COORDINATES, 2);
      setPlayerPieces(board, PLAYER_SIX_COORDINATES, 3);
      setPlayerPieces(board, PLAYER_ONE_COORDINATES, 4);
      setPlayerPieces(board, PLAYER_TWO_COORDINATES, 5);
      setPlayerPieces(board, PLAYER_THREE_COORDINATES, 6);
    }
  }

  if (mode === GameMode.CLASH) {
    if (nPlayers === 2) {
      setPlayerPieces(board, PLAYER_FOUR_COORDINATES, 1);
      setPlayerPieces(board, PLAYER_FIVE_COORDINATES, 3);

      setPlayerPieces(board, PLAYER_ONE_COORDINATES, 2);
      setPlayerPieces(board, PLAYER_TWO_COORDINATES, 4);
    }

    if (nPlayers === 3) {
      setPlayerPieces(board, PLAYER_THREE_COORDINATES, 1);
      setPlayerPieces(board, PLAYER_FOUR_COORDINATES, 4);

      setPlayerPieces(board, PLAYER_FIVE_COORDINATES, 2);
      setPlayerPieces(board, PLAYER_SIX_COORDINATES, 5);

      setPlayerPieces(board, PLAYER_ONE_COORDINATES, 3);
      setPlayerPieces(board, PLAYER_TWO_COORDINATES, 6);
    }
  }

  if (mode === GameMode.HORDE) {
    setPlayerPieces(board, PLAYER_FOUR_COORDINATES, 1);
    setPlayerPieces(board, PLAYER_FIVE_COORDINATES, 2);
    setPlayerPieces(board, PLAYER_SIX_COORDINATES, 3);
    setPlayerPieces(board, PLAYER_ONE_COORDINATES, 4);
    setPlayerPieces(board, PLAYER_TWO_COORDINATES, 5);
    setPlayerPieces(board, PLAYER_THREE_COORDINATES, 6);
  }
}
