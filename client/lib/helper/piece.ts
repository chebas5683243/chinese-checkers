import { Game, GameMode } from "@/types/Game";

export function getPieceGroups(game: Game) {
  let pieceGroups = [[1], [2]];

  if (game.mode === GameMode.STANDARD) {
    if (game.nPlayers === 2) {
      pieceGroups = [[1], [2]];
    }

    if (game.nPlayers === 3) {
      pieceGroups = [[1], [2], [3]];
    }

    if (game.nPlayers === 6) {
      pieceGroups = [[1], [2], [3], [4], [5], [6]];
    }
  }

  if (game.mode === GameMode.CLASH) {
    if (game.nPlayers === 2) {
      pieceGroups = [
        [1, 3],
        [2, 4],
      ];
    }

    if (game.nPlayers === 3) {
      pieceGroups = [
        [1, 4],
        [2, 5],
        [3, 6],
      ];
    }
  }

  if (game.mode === GameMode.HORDE) {
    pieceGroups = [
      [1, 3, 5],
      [2, 4, 6],
    ];
  }

  return pieceGroups;
}

export function getPlayerPieceGroups(game: Game, playerId?: string) {
  const pieceGroups = getPieceGroups(game);

  const isOwner = game.ownerId === playerId;
  const isGuest = game.guestId === playerId;

  if (isOwner) {
    return pieceGroups[0];
  }

  if (isGuest) {
    return pieceGroups[1];
  }

  return [];
}
